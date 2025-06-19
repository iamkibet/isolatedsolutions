<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use App\Models\PostReaction;
use App\Models\Comment;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class UserDashboardController extends Controller
{
    /**
     * Display the main user dashboard
     */
    public function index(): Response
    {
        $user = Auth::user();

        // Get user's posts statistics
        $totalPosts = Post::where('user_id', $user->id)->count();
        $pendingPosts = Post::where('user_id', $user->id)->where('approval_status', 'pending')->count();
        $approvedPosts = Post::where('user_id', $user->id)->where('approval_status', 'approved')->count();
        $rejectedPosts = Post::where('user_id', $user->id)->where('approval_status', 'rejected')->count();
        // Drafts: not published and not pending (optional, or you can just use pending/draft as same)
        $draftPosts = Post::where('user_id', $user->id)
            ->where('is_published', false)
            ->where('approval_status', '!=', 'pending')
            ->count();
        $publishedPosts = $approvedPosts; // For clarity in UI

        // Get total views for user's published posts
        $totalViews = Post::where('user_id', $user->id)->where('approval_status', 'approved')->sum('views');

        // Get total likes for user's posts
        $totalLikes = PostReaction::whereHas('post', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->where('reaction_type', 'like')->count();

        // Get total comments on user's posts
        $totalComments = Comment::whereHas('post', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->count();

        // Calculate engagement rate
        $engagementRate = $totalViews > 0 ? round(($totalLikes + $totalComments) / $totalViews * 100, 1) : 0;

        // Get recent posts
        $recentPosts = Post::where('user_id', $user->id)
            ->with(['category', 'tags'])
            ->withCount(['reactions' => function ($query) {
                $query->where('reaction_type', 'like');
            }, 'comments'])
            ->orderBy('created_at', 'desc')
            ->take(5)
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
                    'featured_image' => $post->featured_image_url
                ];
            });

        // Get weekly view statistics for user's posts
        $weeklyViews = Post::where('user_id', $user->id)
            ->where('approval_status', 'approved')
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

        // Get recent notifications
        $recentNotifications = $user->notifications()
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($notification) {
                return [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'title' => $notification->title,
                    'message' => $notification->message,
                    'is_read' => $notification->is_read,
                    'created_at' => $notification->created_at->format('M d, Y g:i A'),
                    'data' => $notification->data,
                ];
            });

        return Inertia::render('Dashboard/Index', [
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
                'engagementRate' => $engagementRate,
                'unreadNotifications' => $user->unread_notifications_count
            ],
            'recentPosts' => $recentPosts,
            'weeklyViews' => $weeklyViews,
            'recentNotifications' => $recentNotifications
        ]);
    }

    /**
     * Display user's posts
     */
    public function posts(): Response
    {
        $posts = Post::where('user_id', Auth::id())
            ->with(['category', 'tags'])
            ->withCount(['reactions' => function ($query) {
                $query->where('reaction_type', 'like');
            }, 'comments'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Map approval_status for each post in the paginated result
        $posts->getCollection()->transform(function ($post) {
            $post->approval_status = $post->approval_status;
            return $post;
        });

        return Inertia::render('Dashboard/Posts/Index', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new post
     */
    public function createPost(): Response
    {
        return Inertia::render('Posts/Create', [
            'categories' => Category::all(),
            'tags' => Tag::all(),
        ]);
    }

    /**
     * Store a newly created post
     */
    public function storePost(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'excerpt' => 'nullable|string|max:500',
            'category_id' => 'nullable|exists:categories,id',
            'new_category' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'new_tags' => 'nullable|string|max:500',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        // Handle category
        if ($request->filled('new_category')) {
            $category = Category::firstOrCreate(['name' => $request->new_category]);
            $categoryId = $category->id;
        } else {
            $categoryId = $request->category_id;
        }

        $title = $request->input('title');
        $postData = [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => $request->input('content'),
            'excerpt' => $request->input('excerpt'),
            'category_id' => $categoryId,
            'user_id' => Auth::id(),
            'is_published' => false, // Always create as draft for regular users
            'approval_status' => 'pending', // Set as pending for approval
        ];

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('posts/featured-images', 'public');
            $postData['featured_image'] = $path;
        }

        $post = Post::create($postData);

        // Handle tags
        $tagIds = [];

        // Add existing selected tags
        if ($request->has('tags') && is_array($request->tags)) {
            $tagIds = collect($request->input('tags'))->map(function ($tagName) {
                return Tag::firstOrCreate(
                    ['name' => $tagName],
                    ['slug' => Str::slug($tagName)]
                )->id;
            })->toArray(); // Convert Collection to array
        }

        // Ensure $tagIds is always an array
        if (!is_array($tagIds)) {
            $tagIds = [];
        }

        // Add new tags from input
        if ($request->filled('new_tags')) {
            $newTagNames = array_map('trim', explode(',', $request->new_tags));
            foreach ($newTagNames as $newTagName) {
                if (!empty($newTagName)) {
                    $tag = Tag::firstOrCreate(
                        ['name' => $newTagName],
                        ['slug' => Str::slug($newTagName)]
                    );
                    if (!in_array($tag->id, $tagIds)) {
                        $tagIds[] = $tag->id;
                    }
                }
            }
        }

        $post->tags()->sync($tagIds);

        return redirect()->route('dashboard.posts.index')->with('success', 'Post created successfully and submitted for approval.');
    }

    /**
     * Show the form for editing a post
     */
    public function editPost(Post $post): Response
    {
        // Ensure user owns this post
        if ($post->user_id !== Auth::id()) {
            abort(403);
        }

        $post->load(['category', 'tags']);

        return Inertia::render('Dashboard/Posts/Edit', [
            'post' => $post,
            'categories' => Category::all(),
            'tags' => Tag::all(),
        ]);
    }

    /**
     * Update a post
     */
    public function updatePost(Request $request, Post $post)
    {
        // Ensure user owns this post
        if ($post->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'excerpt' => 'nullable|string|max:500',
            'category_id' => 'nullable|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'new_tags' => 'nullable|string|max:500',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        $title = $request->input('title');
        $postData = [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => $request->input('content'),
            'excerpt' => $request->input('excerpt'),
            'category_id' => $request->category_id,
            'approval_status' => 'pending', // Reset to pending when updated
        ];

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image if exists
            if ($post->featured_image) {
                Storage::disk('public')->delete($post->featured_image);
            }
            $path = $request->file('featured_image')->store('posts/featured-images', 'public');
            $postData['featured_image'] = $path;
        }

        $post->update($postData);

        // Handle tags
        $tagIds = [];

        // Add existing selected tags
        if ($request->has('tags') && is_array($request->tags)) {
            $tagIds = collect($request->input('tags'))->map(function ($tagName) {
                return Tag::firstOrCreate(
                    ['name' => $tagName],
                    ['slug' => Str::slug($tagName)]
                )->id;
            })->toArray(); // Convert Collection to array
        }

        // Ensure $tagIds is always an array
        if (!is_array($tagIds)) {
            $tagIds = [];
        }

        // Add new tags from input
        if ($request->filled('new_tags')) {
            $newTagNames = array_map('trim', explode(',', $request->new_tags));
            foreach ($newTagNames as $newTagName) {
                if (!empty($newTagName)) {
                    $tag = Tag::firstOrCreate(
                        ['name' => $newTagName],
                        ['slug' => Str::slug($newTagName)]
                    );
                    if (!in_array($tag->id, $tagIds)) {
                        $tagIds[] = $tag->id;
                    }
                }
            }
        }

        $post->tags()->sync($tagIds);

        return redirect()->route('dashboard.posts.index')->with('success', 'Post updated successfully and resubmitted for approval.');
    }

    /**
     * Delete a post
     */
    public function destroyPost(Post $post)
    {
        // Ensure user owns this post
        if ($post->user_id !== Auth::id()) {
            abort(403);
        }

        // Delete featured image if exists
        if ($post->featured_image) {
            Storage::disk('public')->delete($post->featured_image);
        }

        $post->delete();

        return redirect()->route('dashboard.posts.index')->with('success', 'Post deleted successfully.');
    }

    /**
     * Display user's liked posts
     */
    public function likedPosts(): Response
    {
        $likedPosts = Post::whereHas('reactions', function ($query) {
            $query->where('user_id', Auth::id())
                ->where('reaction_type', 'like');
        })
            ->with(['category', 'tags', 'user'])
            ->withCount(['reactions' => function ($query) {
                $query->where('reaction_type', 'like');
            }, 'comments'])
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('Dashboard/LikedPosts', [
            'likedPosts' => $likedPosts
        ]);
    }

    /**
     * Display user analytics
     */
    public function analytics(): Response
    {
        $user = Auth::user();

        // Get detailed analytics
        $monthlyStats = Post::where('user_id', $user->id)
            ->select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('YEAR(created_at) as year'),
                DB::raw('COUNT(*) as posts_count'),
                DB::raw('SUM(views) as total_views'),
                DB::raw('SUM(CASE WHEN is_published = 1 THEN 1 ELSE 0 END) as published_count')
            )
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        // Get top performing posts
        $topPosts = Post::where('user_id', $user->id)
            ->where('is_published', true)
            ->withCount(['reactions' => function ($query) {
                $query->where('reaction_type', 'like');
            }, 'comments'])
            ->orderBy('views', 'desc')
            ->take(10)
            ->get();

        // Get category performance
        $categoryPerformance = Category::whereHas('posts', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
            ->withCount(['posts' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }])
            ->withSum(['posts' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }], 'views')
            ->orderBy('posts_count', 'desc')
            ->get();

        return Inertia::render('Dashboard/Analytics', [
            'monthlyStats' => $monthlyStats,
            'topPosts' => $topPosts,
            'categoryPerformance' => $categoryPerformance
        ]);
    }

    /**
     * Display user profile
     */
    public function profile(): Response
    {
        return Inertia::render('Dashboard/Profile', [
            'user' => Auth::user()
        ]);
    }

    /**
     * Get user notifications
     */
    public function notifications(): Response
    {
        $notifications = Auth::user()->notifications()
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Dashboard/Notifications', [
            'notifications' => $notifications
        ]);
    }

    /**
     * Mark notification as read
     */
    public function markNotificationAsRead(Request $request)
    {
        $request->validate([
            'notification_id' => 'required|exists:notifications,id'
        ]);

        $notification = Notification::find($request->notification_id);

        // Ensure user owns this notification
        if ($notification->user_id !== Auth::id()) {
            abort(403);
        }

        $notification->markAsRead();

        return response()->json(['success' => true]);
    }

    /**
     * Mark all notifications as read
     */
    public function markAllNotificationsAsRead()
    {
        Auth::user()->notifications()
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

        return response()->json(['success' => true]);
    }
}
