<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::with(['user', 'post', 'replies.user'])
            ->latest()
            ->get()
            ->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'comment' => $comment->comment,
                    'created_at' => $comment->created_at,
                    'formatted_date' => $comment->created_at->format('M j, Y \a\t g:i A'),
                    'is_approved' => $comment->is_approved,
                    'user' => [
                        'id' => $comment->user->id,
                        'name' => $comment->user->name,
                    ],
                    'post' => [
                        'id' => $comment->post->id,
                        'title' => $comment->post->title,
                        'slug' => $comment->post->slug,
                    ],
                    'replies' => $comment->replies->map(function ($reply) {
                        return [
                            'id' => $reply->id,
                            'comment' => $reply->comment,
                            'created_at' => $reply->created_at,
                            'formatted_date' => $reply->created_at->format('M j, Y \a\t g:i A'),
                            'is_approved' => $reply->is_approved,
                            'user' => [
                                'id' => $reply->user->id,
                                'name' => $reply->user->name,
                            ],
                        ];
                    }),
                ];
            });

        return inertia('Admin/Comments', [
            'comments' => $comments,
        ]);
    }

    public function store(Request $request, $postId)
    {
        $request->validate([
            'comment' => 'required|string|max:1000',
            'parent_id' => 'nullable|exists:comments,id'
        ]);

        $post = Post::findOrFail($postId);

        $comment = Comment::create([
            'comment' => $request->comment,
            'user_id' => Auth::id(),
            'post_id' => $post->id,
            'parent_id' => $request->parent_id,
            'is_approved' => Auth::user()->role === 'A' // Auto-approve admin comments
        ]);

        return back()->with('success', 'Comment added successfully!');
    }

    public function destroy($postId, $commentId)
    {
        $comment = Comment::where('id', $commentId)
            ->where('post_id', $postId)
            ->firstOrFail();

        // Only allow users to delete their own comments or admins to delete any
        if (Auth::id() !== $comment->user_id && Auth::user()->role !== 'A') {
            abort(403);
        }

        $comment->delete();

        return back()->with('success', 'Comment deleted successfully!');
    }

    public function adminDestroy(Comment $comment)
    {
        if (Auth::user()->role !== 'A') {
            abort(403);
        }

        $comment->delete();

        return back()->with('success', 'Comment deleted successfully!');
    }

    public function approve(Comment $comment)
    {
        if (Auth::user()->role !== 'A') {
            abort(403);
        }

        $comment->update(['is_approved' => true]);

        return back()->with('success', 'Comment approved successfully!');
    }

    public function reject(Comment $comment)
    {
        if (Auth::user()->role !== 'A') {
            abort(403);
        }

        $comment->update(['is_approved' => false]);

        return back()->with('success', 'Comment rejected successfully!');
    }
}
