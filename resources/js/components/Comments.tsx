import { router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle, MessageCircle, Reply, Send, Trash2, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Comment {
    id: number;
    comment: string;
    created_at: string;
    formatted_date: string;
    user: {
        id: number;
        name: string;
    };
    replies: Comment[];
}

interface Props {
    comments: Comment[];
    postId: number;
    isAdmin?: boolean;
}

const Comments: React.FC<Props> = ({ comments, postId, isAdmin = false }) => {
    const { auth } = usePage().props as unknown as { auth: { user: { id: number; role?: string } | null } };
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [showCommentForm, setShowCommentForm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        comment: '',
        parent_id: null as number | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('posts.comments.store', postId), {
            onSuccess: (page) => {
                // Check if the response contains a new comment
                if (page.props.flash?.success) {
                    toast.success(page.props.flash.success);

                    // Refresh the page to get updated comments
                    router.reload({ only: ['comments'] });

                    reset();
                    setReplyingTo(null);
                    // Keep the form open for more comments
                    setShowCommentForm(true);
                }
            },
            onError: () => {
                toast.error('Failed to add comment. Please try again.');
            },
        });
    };

    const handleReply = (commentId: number) => {
        setReplyingTo(commentId);
        setData('parent_id', commentId);
        setShowCommentForm(true);
    };

    const handleDelete = (commentId: number) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            router.delete(route('posts.comments.destroy', { post: postId, comment: commentId }), {
                onSuccess: () => {
                    toast.success('Comment deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete comment.');
                },
            });
        }
    };

    const handleApprove = (commentId: number) => {
        router.patch(
            route('admin.comments.approve', commentId),
            {},
            {
                onSuccess: () => {
                    toast.success('Comment approved successfully!');
                },
                onError: () => {
                    toast.error('Failed to approve comment.');
                },
            },
        );
    };

    const handleReject = (commentId: number) => {
        router.patch(
            route('admin.comments.reject', commentId),
            {},
            {
                onSuccess: () => {
                    toast.success('Comment rejected successfully!');
                },
                onError: () => {
                    toast.error('Failed to reject comment.');
                },
            },
        );
    };

    const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
        <div className={`${isReply ? 'ml-6 border-l border-gray-100 pl-4' : ''} mb-4`}>
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-gray-400 to-gray-500 text-sm font-medium text-white">
                        {comment.user.name.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                    <div className="rounded-lg bg-gray-50 p-3">
                        <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900">{comment.user.name}</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">{comment.formatted_date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {isAdmin && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(comment.id)}
                                            className="rounded p-1 text-green-600 hover:bg-green-50"
                                            title="Approve comment"
                                        >
                                            <CheckCircle className="h-3 w-3" />
                                        </button>
                                        <button
                                            onClick={() => handleReject(comment.id)}
                                            className="rounded p-1 text-red-600 hover:bg-red-50"
                                            title="Reject comment"
                                        >
                                            <XCircle className="h-3 w-3" />
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => handleReply(comment.id)}
                                    className="rounded p-1 text-gray-500 hover:bg-gray-100"
                                    title="Reply to comment"
                                >
                                    <Reply className="h-3 w-3" />
                                </button>
                                {(isAdmin || comment.user.id === auth.user?.id) && (
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="rounded p-1 text-red-500 hover:bg-red-50"
                                        title="Delete comment"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-700">{comment.comment}</p>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-3 space-y-3">
                            {comment.replies.map((reply) => (
                                <CommentItem key={reply.id} comment={reply} isReply={true} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center text-lg font-semibold text-gray-900">
                    <MessageCircle className="mr-2 h-4 w-4 text-gray-600" />
                    Comments ({comments.length})
                </h3>
                {!showCommentForm && (
                    <button
                        onClick={() => setShowCommentForm(true)}
                        className="inline-flex items-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                    >
                        Add Comment
                    </button>
                )}
            </div>

            {/* Comment Form */}
            {showCommentForm && (
                <div className="mb-6">
                    <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                        {replyingTo && (
                            <div className="mb-3 rounded-md border border-blue-200 bg-blue-50 p-2">
                                <p className="text-xs text-blue-700">Replying to a comment...</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setReplyingTo(null);
                                        setData('parent_id', null);
                                    }}
                                    className="mt-1 text-xs text-blue-600 underline hover:text-blue-800"
                                >
                                    Cancel reply
                                </button>
                            </div>
                        )}

                        <div className="mb-3">
                            <textarea
                                value={data.comment}
                                onChange={(e) => setData('comment', e.target.value)}
                                rows={3}
                                className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:ring-gray-500 focus:outline-none"
                                placeholder="Write your comment here..."
                                required
                            />
                            {errors.comment && <p className="mt-1 text-xs text-red-600">{errors.comment}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCommentForm(false);
                                    setReplyingTo(null);
                                    reset();
                                }}
                                className="text-sm text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                            >
                                {processing ? (
                                    'Posting...'
                                ) : (
                                    <>
                                        <Send className="mr-1 h-3 w-3" />
                                        Post Comment
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <div className="py-6 text-center">
                        <MessageCircle className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                        <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
                    </div>
                ) : (
                    comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
                )}
            </div>
        </div>
    );
};

export default Comments;
