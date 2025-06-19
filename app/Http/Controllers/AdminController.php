<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Comment;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

class AdminController extends Controller
{
    public function posts(): Response
    {
        $posts = Post::with(['category', 'user'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Index', [
            'posts' => $posts
        ]);
    }

    public function dashboard(): Response
    {
        // Get total posts count (all posts for admin)
        $totalPosts = Post::count();
        $publishedPosts = Post::where('is_published', true)->count();
        $draftPosts = Post::where('is_published', false)->count();
        $pendingPosts = Post::where('approval_status', 'pending')->count();
        $approvedPosts = Post::where('approval_status', 'approved')->count();
        $rejectedPosts = Post::where('approval_status', 'rejected')->count();

        // Get total views (only published posts)
        $totalViews = Post::where('is_published', true)->sum('views');

        // Calculate engagement rate (likes + comments) / views * 100 (only published posts)
        $totalLikes = Post::where('is_published', true)
            ->withCount(['reactions' => function ($query) {
                $query->where('reaction_type', 'like');
            }])->get()->sum('reactions_count');

        $totalComments = Schema::hasTable('comments') ? Comment::count() : 0;
        $engagementRate = $totalViews > 0 ? round(($totalLikes + $totalComments) / $totalViews * 100, 1) : 0;

        // Get recent posts with their stats (all posts for admin)
        $recentPosts = Post::with(['category', 'user'])
            ->withCount(['reactions' => function ($query) {
                $query->where('reaction_type', 'like');
            }, 'comments'])
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'views' => $post->views,
                    'date' => $post->created_at->format('M d, Y'),
                    'likes' => $post->reactions_count,
                    'comments' => $post->comments_count,
                    'is_published' => $post->is_published,
                    'approval_status' => $post->approval_status,
                    'user' => [
                        'name' => $post->user->name,
                    ],
                    'category' => $post->category ? [
                        'name' => $post->category->name,
                    ] : null,
                ];
            });

        // Get weekly view statistics
        $weeklyViews = Post::where('is_published', true)
            ->where('created_at', '>=', now()->subDays(7))
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(views) as total_views')
            )
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'views' => (int)$item->total_views
                ];
            });

        // Fill in missing dates with zero views
        $last7Days = collect(range(6, 0))->map(function ($day) {
            return now()->subDays($day)->format('Y-m-d');
        });

        $weeklyViews = $last7Days->map(function ($date) use ($weeklyViews) {
            $dayData = $weeklyViews->firstWhere('date', $date);
            return [
                'date' => $date,
                'views' => $dayData ? $dayData['views'] : 0
            ];
        });

        // Get categories and tags for quick stats
        $categories = Category::withCount('posts')->orderBy('posts_count', 'desc')->take(5)->get();
        $tags = Tag::withCount('posts')->orderBy('posts_count', 'desc')->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalPosts' => $totalPosts,
                'publishedPosts' => $publishedPosts,
                'draftPosts' => $draftPosts,
                'pendingPosts' => $pendingPosts,
                'approvedPosts' => $approvedPosts,
                'rejectedPosts' => $rejectedPosts,
                'totalViews' => $totalViews,
                'totalLikes' => $totalLikes,
                'totalComments' => $totalComments,
                'engagementRate' => $engagementRate
            ],
            'recentPosts' => $recentPosts,
            'weeklyViews' => $weeklyViews,
            'categories' => $categories,
            'tags' => $tags
        ]);
    }

    /**
     * Approve a post
     */
    public function approvePost(Post $post)
    {
        try {
            $post->update([
                'approval_status' => 'approved',
                'is_published' => true,
                'approved_at' => now(),
                'approved_by' => Auth::id(),
            ]);

            // Send notification to user
            NotificationService::sendPostApprovedNotification($post);

            return redirect()->route('admin.posts.index')
                ->with('success', 'Post approved and published successfully!');
        } catch (\Exception $e) {
            return redirect()->route('admin.posts.index')
                ->with('error', 'Failed to approve post: ' . $e->getMessage());
        }
    }

    /**
     * Reject a post
     */
    public function rejectPost(Request $request, Post $post)
    {
        $request->validate([
            'rejection_reason' => 'nullable|string|max:500'
        ]);

        try {
            $post->update([
                'approval_status' => 'rejected',
                'is_published' => false,
                'rejection_reason' => $request->rejection_reason,
            ]);

            // Send notification to user
            NotificationService::sendPostRejectedNotification($post, $request->rejection_reason);

            return redirect()->route('admin.posts.index')
                ->with('success', 'Post rejected successfully!');
        } catch (\Exception $e) {
            return redirect()->route('admin.posts.index')
                ->with('error', 'Failed to reject post: ' . $e->getMessage());
        }
    }

    /**
     * Show pending posts for approval
     */
    public function pendingPosts(): Response
    {
        $pendingPosts = Post::where('approval_status', 'pending')
            ->with(['category', 'user'])
            ->withCount(['reactions' => function ($query) {
                $query->where('reaction_type', 'like');
            }, 'comments'])
            ->orderBy('created_at', 'asc')
            ->paginate(15);

        return Inertia::render('Admin/PendingPosts', [
            'pendingPosts' => $pendingPosts
        ]);
    }

    /**
     * Display all users for admin management
     */
    public function users(): Response
    {
        $users = User::withCount(['posts', 'notifications'])
            ->withSum('posts', 'views')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show specific user details
     */
    public function showUser(User $user): Response
    {
        $user->load(['posts' => function ($query) {
            $query->withCount(['reactions' => function ($q) {
                $q->where('reaction_type', 'like');
            }, 'comments'])
                ->orderBy('created_at', 'desc');
        }]);

        return Inertia::render('Admin/Users/Show', [
            'user' => $user
        ]);
    }

    /**
     * Update user role
     */
    public function updateUserRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|in:U,A,D'
        ]);

        $user->update(['role' => $request->role]);

        return redirect()->route('admin.users.index')
            ->with('success', 'User role updated successfully.');
    }

    /**
     * Delete user
     */
    public function deleteUser(User $user)
    {
        // Prevent admin from deleting themselves
        if ($user->id === Auth::id()) {
            return redirect()->route('admin.users.index')
                ->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }

    /**
     * Display comprehensive site analytics
     */
    public function analytics(): Response
    {
        // User statistics
        $totalUsers = User::count();
        $activeUsers = User::whereHas('posts')->count();
        $adminUsers = User::where('role', 'A')->count();
        $newUsersThisMonth = User::where('created_at', '>=', now()->startOfMonth())->count();

        // Post statistics
        $totalPosts = Post::count();
        $publishedPosts = Post::where('is_published', true)->count();
        $pendingPosts = Post::where('approval_status', 'pending')->count();
        $postsThisMonth = Post::where('created_at', '>=', now()->startOfMonth())->count();

        // Engagement statistics
        $totalViews = Post::where('is_published', true)->sum('views');
        $totalLikes = Post::where('is_published', true)
            ->withCount(['reactions' => function ($query) {
                $query->where('reaction_type', 'like');
            }])->get()->sum('reactions_count');
        $totalComments = Comment::count();
        $engagementRate = $totalViews > 0 ? round(($totalLikes + $totalComments) / $totalViews * 100, 1) : 0;

        // Monthly growth data
        $monthlyStats = Post::where('created_at', '>=', now()->subMonths(12))
            ->select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('YEAR(created_at) as year'),
                DB::raw('COUNT(*) as posts_count'),
                DB::raw('SUM(views) as total_views')
            )
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        // Top performing posts
        $topPosts = Post::where('is_published', true)
            ->with(['user', 'category'])
            ->withCount(['reactions' => function ($query) {
                $query->where('reaction_type', 'like');
            }, 'comments'])
            ->orderBy('views', 'desc')
            ->take(10)
            ->get();

        // Category performance
        $categoryPerformance = Category::withCount('posts')
            ->withSum('posts', 'views')
            ->orderBy('posts_count', 'desc')
            ->get();

        // User activity
        $activeUsersList = User::withCount('posts')
            ->withSum('posts', 'views')
            ->orderBy('posts_count', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('Admin/Analytics', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'activeUsers' => $activeUsers,
                'adminUsers' => $adminUsers,
                'newUsersThisMonth' => $newUsersThisMonth,
                'totalPosts' => $totalPosts,
                'publishedPosts' => $publishedPosts,
                'pendingPosts' => $pendingPosts,
                'postsThisMonth' => $postsThisMonth,
                'totalViews' => $totalViews,
                'totalLikes' => $totalLikes,
                'totalComments' => $totalComments,
                'engagementRate' => $engagementRate
            ],
            'monthlyStats' => $monthlyStats,
            'topPosts' => $topPosts,
            'categoryPerformance' => $categoryPerformance,
            'activeUsersList' => $activeUsersList
        ]);
    }
}
