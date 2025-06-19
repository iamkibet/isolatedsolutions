import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, CheckCircle, Eye, Filter, MessageCircle, Search, Trash2, User, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Comment {
    id: number;
    comment: string;
    created_at: string;
    formatted_date: string;
    is_approved: boolean;
    user: {
        id: number;
        name: string;
    };
    post: {
        id: number;
        title: string;
        slug: string;
    };
    replies: Comment[];
}

interface Props {
    comments: Comment[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Comments',
        href: '/admin/comments',
    },
];

export default function Comments({ comments }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending'>('all');
    const [selectedComments, setSelectedComments] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleApprove = (commentId: number) => {
        router.patch(
            route('admin.comments.approve', commentId),
            {},
            {
                onSuccess: () => toast.success('Comment approved successfully'),
                onError: () => toast.error('Failed to approve comment'),
            },
        );
    };

    const handleReject = (commentId: number) => {
        router.patch(
            route('admin.comments.reject', commentId),
            {},
            {
                onSuccess: () => toast.success('Comment rejected successfully'),
                onError: () => toast.error('Failed to reject comment'),
            },
        );
    };

    const handleDelete = (commentId: number) => {
        if (confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
            router.delete(route('admin.comments.destroy', commentId), {
                onSuccess: () => toast.success('Comment deleted successfully'),
                onError: () => toast.error('Failed to delete comment'),
            });
        }
    };

    const handleBulkApprove = () => {
        if (selectedComments.length === 0) {
            toast.error('Please select comments to approve');
            return;
        }

        if (confirm(`Are you sure you want to approve ${selectedComments.length} comment(s)?`)) {
            // For now, we'll approve them one by one. In a real app, you'd want a bulk endpoint
            selectedComments.forEach((commentId) => {
                router.patch(route('admin.comments.approve', commentId), {}, { preserveScroll: true });
            });
            setSelectedComments([]);
            setSelectAll(false);
            toast.success(`${selectedComments.length} comment(s) approved successfully`);
        }
    };

    const handleBulkDelete = () => {
        if (selectedComments.length === 0) {
            toast.error('Please select comments to delete');
            return;
        }

        if (confirm(`Are you sure you want to delete ${selectedComments.length} comment(s)? This action cannot be undone.`)) {
            // For now, we'll delete them one by one. In a real app, you'd want a bulk endpoint
            selectedComments.forEach((commentId) => {
                router.delete(route('admin.comments.destroy', commentId), { preserveScroll: true });
            });
            setSelectedComments([]);
            setSelectAll(false);
            toast.success(`${selectedComments.length} comment(s) deleted successfully`);
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedComments([]);
            setSelectAll(false);
        } else {
            setSelectedComments(filteredComments.map((comment) => comment.id));
            setSelectAll(true);
        }
    };

    const handleSelectComment = (commentId: number) => {
        if (selectedComments.includes(commentId)) {
            setSelectedComments(selectedComments.filter((id) => id !== commentId));
            setSelectAll(false);
        } else {
            setSelectedComments([...selectedComments, commentId]);
            if (selectedComments.length + 1 === filteredComments.length) {
                setSelectAll(true);
            }
        }
    };

    const filteredComments = useMemo(() => {
        let filtered = comments;

        // Filter by status
        if (filterStatus !== 'all') {
            filtered = filtered.filter((comment) => (filterStatus === 'approved' ? comment.is_approved : !comment.is_approved));
        }

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (comment) =>
                    comment.comment.toLowerCase().includes(term) ||
                    comment.user.name.toLowerCase().includes(term) ||
                    comment.post.title.toLowerCase().includes(term),
            );
        }

        return filtered;
    }, [comments, searchTerm, filterStatus]);

    const approvedComments = comments.filter((comment) => comment.is_approved);
    const pendingComments = comments.filter((comment) => !comment.is_approved);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Comments Management" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Comments Management</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage and moderate comments on your posts.</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Comments</p>
                                <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{comments.length}</h3>
                            </div>
                            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                                <MessageCircle className="text-blue-500" size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
                                <h3 className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">{approvedComments.length}</h3>
                            </div>
                            <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                                <CheckCircle className="text-green-500" size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                                <h3 className="mt-1 text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingComments.length}</h3>
                            </div>
                            <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
                                <XCircle className="text-yellow-500" size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search comments..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64 rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm focus:border-red-500 focus:ring-red-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'approved' | 'pending')}
                                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-red-500 focus:ring-red-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="all">All Comments</option>
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {filteredComments.length} of {comments.length} comments
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedComments.length > 0 && (
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900/30">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                    {selectedComments.length} comment(s) selected
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleBulkApprove}
                                    className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Approve Selected
                                </button>
                                <button
                                    onClick={handleBulkDelete}
                                    className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Delete Selected
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Comments List */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Comments</h2>
                            {filteredComments.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                            className="rounded border-gray-300 text-red-600 focus:ring-red-500 dark:border-gray-600"
                                        />
                                        Select All
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredComments.length === 0 ? (
                            <div className="p-8 text-center">
                                <MessageCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <p className="text-gray-500 dark:text-gray-400">
                                    {searchTerm || filterStatus !== 'all' ? 'No comments match your filters.' : 'No comments found.'}
                                </p>
                            </div>
                        ) : (
                            filteredComments.map((comment) => (
                                <div key={comment.id} className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-1 items-start gap-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedComments.includes(comment.id)}
                                                onChange={() => handleSelectComment(comment.id)}
                                                className="mt-2 rounded border-gray-300 text-red-600 focus:ring-red-500 dark:border-gray-600"
                                            />
                                            <div className="flex-1">
                                                <div className="mb-3 flex items-center space-x-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600">
                                                        <User className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-900 dark:text-white">{comment.user.name}</span>
                                                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                                            {comment.formatted_date}
                                                        </span>
                                                    </div>
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                            comment.is_approved
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                        }`}
                                                    >
                                                        {comment.is_approved ? 'Approved' : 'Pending'}
                                                    </span>
                                                </div>

                                                <p className="mb-3 whitespace-pre-wrap text-gray-700 dark:text-gray-300">{comment.comment}</p>

                                                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <Link
                                                        href={route('posts.show', comment.post.slug)}
                                                        className="flex items-center space-x-1 hover:text-red-600 dark:hover:text-red-400"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        <span>View Post: {comment.post.title}</span>
                                                    </Link>
                                                    <div className="flex items-center space-x-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{comment.formatted_date}</span>
                                                    </div>
                                                </div>

                                                {/* Replies */}
                                                {comment.replies && comment.replies.length > 0 && (
                                                    <div className="mt-4 ml-8 space-y-3">
                                                        {comment.replies.map((reply) => (
                                                            <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                                                                <div className="mb-2 flex items-center space-x-2">
                                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                                        {reply.user.name}
                                                                    </span>
                                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                        {reply.formatted_date}
                                                                    </span>
                                                                    <span
                                                                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                                                            reply.is_approved
                                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                                        }`}
                                                                    >
                                                                        {reply.is_approved ? 'Approved' : 'Pending'}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-gray-700 dark:text-gray-300">{reply.comment}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="ml-4 flex space-x-2">
                                            {!comment.is_approved && (
                                                <button
                                                    onClick={() => handleApprove(comment.id)}
                                                    className="rounded-lg p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30"
                                                    title="Approve comment"
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                            {comment.is_approved && (
                                                <button
                                                    onClick={() => handleReject(comment.id)}
                                                    className="rounded-lg p-2 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
                                                    title="Reject comment"
                                                >
                                                    <XCircle size={16} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                className="rounded-lg p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
                                                title="Delete comment"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
