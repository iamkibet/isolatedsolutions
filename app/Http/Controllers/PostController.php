<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Tag;
use App\Models\PostReaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the posts.
     */
    public function index()
    {
        $posts = Post::with(['category', 'tags', 'user'])
            ->where('is_published', true)
            ->latest()
            ->paginate(15);
        $categories = \App\Models\Category::all();
        return inertia('Posts/Index', [
            'posts' => $posts,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new post.
     */
    public function create()
    {
        return inertia('Posts/Create', [
            'categories' => Category::all(),
            'tags' => Tag::all(),
        ]);
    }

    /**
     * Store a newly created post.
     */
    public function store(Request $request)
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
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
            'is_published' => 'boolean',
        ]);

        // Handle category
        if ($request->filled('new_category')) {
            $category = Category::firstOrCreate(['name' => $request->new_category]);
            $categoryId = $category->id;
        } else {
            $categoryId = $request->category_id;
        }

        $title = $request->input('title');
        $isPublished = $request->boolean('is_published', false);

        $postData = [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => $request->input('content'),
            'excerpt' => $request->input('excerpt'),
            'category_id' => $categoryId,
            'user_id' => Auth::id(),
            'is_published' => $isPublished,
            // For admin-created posts, if published, mark as approved; otherwise pending
            'approval_status' => $isPublished ? 'approved' : 'pending',
            'approved_at' => $isPublished ? now() : null,
            'approved_by' => $isPublished ? Auth::id() : null,
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

        return redirect()->route('admin.posts.index')->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified post.
     */
    public function show(Post $post)
    {
        // Check if post is published, if not, only allow access to admin users
        if (!$post->is_published && (!Auth::check() || Auth::user()->role !== 'A')) {
            abort(404);
        }

        // Check if user has viewed this post in the last hour
        $viewKey = 'post_' . $post->id . '_viewed';
        $lastViewed = session($viewKey);
        $now = now();

        if (!$lastViewed || $now->diffInMinutes($lastViewed) >= 60) {
            $post->increment('views');
            session([$viewKey => $now]);
        }

        $post->load(['category', 'tags', 'user']);

        // Load comments with replies and user information
        $comments = $post->comments()
            ->with(['user', 'replies.user'])
            ->topLevel()
            ->approved()
            ->latest()
            ->get()
            ->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'comment' => $comment->comment,
                    'created_at' => $comment->created_at,
                    'formatted_date' => $comment->formatted_date,
                    'user' => [
                        'id' => $comment->user->id,
                        'name' => $comment->user->name,
                    ],
                    'replies' => $comment->replies->map(function ($reply) {
                        return [
                            'id' => $reply->id,
                            'comment' => $reply->comment,
                            'created_at' => $reply->created_at,
                            'formatted_date' => $reply->formatted_date,
                            'user' => [
                                'id' => $reply->user->id,
                                'name' => $reply->user->name,
                            ],
                        ];
                    }),
                ];
            });

        // Get reaction counts
        $likes_count = $post->reactions()->where('reaction_type', 'like')->count();
        $dislikes_count = $post->reactions()->where('reaction_type', 'dislike')->count();
        $user_reaction = null;

        if (Auth::check()) {
            $userReaction = PostReaction::where('user_id', Auth::id())
                ->where('post_id', $post->id)
                ->value('reaction_type');
            $user_reaction = $userReaction;
        }

        return inertia('Posts/Show', [
            'post' => $post,
            'likes_count' => $likes_count,
            'dislikes_count' => $dislikes_count,
            'user_reaction' => $user_reaction,
            'comments' => $comments,
        ]);
    }

    /**
     * Show the form for editing a post.
     */
    public function edit(Post $post)
    {
        $post->load(['category', 'tags']);

        return inertia('Posts/Edit', [
            'post' => $post,
            'categories' => Category::all(),
            'tags' => Tag::all(),
        ]);
    }

    /**
     * Update a post.
     */
    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
            'excerpt' => 'nullable|string|max:500',
            'category_id' => 'nullable|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
            'new_tags' => 'nullable|string|max:500',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
            'is_published' => 'boolean',
        ]);

        $isPublished = $request->boolean('is_published', false);

        $postData = [
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'excerpt' => $request->input('excerpt'),
            'category_id' => $request->input('category_id') ?: null,
            'is_published' => $isPublished,
            // For admin-updated posts, if published, mark as approved; otherwise pending
            'approval_status' => $isPublished ? 'approved' : 'pending',
            'approved_at' => $isPublished ? now() : null,
            'approved_by' => $isPublished ? Auth::id() : null,
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
        if ($request->has('tags')) {
            $tagIds = collect($request->input('tags'))->map(function ($tagName) {
                return Tag::firstOrCreate(
                    ['name' => $tagName],
                    ['slug' => Str::slug($tagName)]
                )->id;
            })->toArray(); // Convert Collection to array
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

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully.');
    }

    /**
     * Delete a post.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('admin.posts.index')->with('success', 'Post deleted successfully!');
    }

    /**
     * Publish a draft post.
     */
    public function publish(Post $post)
    {
        try {
            $post->update([
                'is_published' => true,
                'approval_status' => 'approved',
                'approved_at' => now(),
                'approved_by' => Auth::id(),
            ]);

            return redirect()->route('admin.posts.index')
                ->with('success', 'Post published successfully!');
        } catch (\Exception $e) {
            return redirect()->route('admin.posts.index')
                ->with('error', 'Failed to publish post: ' . $e->getMessage());
        }
    }

    /**
     * Handle post reaction (like/dislike)
     */
    public function thumbsUp(Post $post)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('posts.show', $post->slug)
                ->with('error', 'You must be logged in to react to posts.');
        }

        $existingReaction = PostReaction::where('user_id', $user->id)
            ->where('post_id', $post->id)
            ->first();

        if ($existingReaction) {
            if ($existingReaction->reaction_type === 'like') {
                $existingReaction->delete();
            } else {
                $existingReaction->update(['reaction_type' => 'like']);
            }
        } else {
            PostReaction::create([
                'user_id' => $user->id,
                'post_id' => $post->id,
                'reaction_type' => 'like'
            ]);
        }

        return redirect()->route('posts.show', $post->slug);
    }

    /**
     * Handle post reaction (like/dislike)
     */
    public function thumbsDown(Post $post)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('posts.show', $post->slug)
                ->with('error', 'You must be logged in to react to posts.');
        }

        $existingReaction = PostReaction::where('user_id', $user->id)
            ->where('post_id', $post->id)
            ->first();

        if ($existingReaction) {
            if ($existingReaction->reaction_type === 'dislike') {
                $existingReaction->delete();
            } else {
                $existingReaction->update(['reaction_type' => 'dislike']);
            }
        } else {
            PostReaction::create([
                'user_id' => $user->id,
                'post_id' => $post->id,
                'reaction_type' => 'dislike'
            ]);
        }

        return redirect()->route('posts.show', $post->slug);
    }
}
