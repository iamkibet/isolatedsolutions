import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, PlusCircle, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    created_at: string;
    views: number;
    is_published: boolean;
    user: {
        name: string;
    };
    category?: {
        name: string;
    };
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    posts: PaginatedData<Post>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Posts',
        href: '/admin/posts',
    },
];

const Index: React.FC<Props> = ({ posts }) => {
    const handleDelete = (postId: number) => {
        if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            router.delete(route('admin.posts.destroy', postId), {
                onSuccess: () => toast.success('Post deleted successfully'),
                onError: () => toast.error('Failed to delete post'),
            });
        }
    };

    const handlePublish = (postId: number) => {
        if (confirm('Are you sure you want to publish this post?')) {
            router.patch(
                route('admin.posts.publish', postId),
                {},
                {
                    onSuccess: () => toast.success('Post published successfully'),
                    onError: () => toast.error('Failed to publish post'),
                },
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Posts" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Posts</h1>
                        <p className="text-gray-600 dark:text-gray-400">Create, edit, and manage your blog posts.</p>
                    </div>
                    <Link
                        href={route('admin.posts.create')}
                        className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 font-medium text-white transition-all hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                    >
                        <PlusCircle size={16} />
                        New Post
                    </Link>
                </div>

                {/* Posts List */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Posts</h2>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {posts.data.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <p className="text-gray-500 dark:text-gray-400">No posts found. Create your first post to get started.</p>
                            </div>
                        ) : (
                            posts.data.map((post) => (
                                <div key={post.id} className="flex items-center justify-between px-6 py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                            <span className="text-lg font-semibold">{post.title.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 dark:text-white">{post.title}</h3>
                                            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span>By {post.user.name}</span>
                                                <span>•</span>
                                                <span>{post.views.toLocaleString()} views</span>
                                                <span>•</span>
                                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                                {post.category && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-700">
                                                            {post.category.name}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            {post.excerpt && (
                                                <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{post.excerpt}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                post.is_published
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}
                                        >
                                            {post.is_published ? 'Published' : 'Draft'}
                                        </span>
                                        <Link
                                            href={route('posts.show', post.slug)}
                                            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            title={post.is_published ? 'View published post' : 'Preview draft post'}
                                        >
                                            <Eye size={16} />
                                        </Link>
                                        <Link
                                            href={route('admin.posts.edit', post.id)}
                                            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            <Edit size={16} />
                                        </Link>
                                        {!post.is_published && (
                                            <button
                                                onClick={() => handlePublish(post.id)}
                                                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-green-100 hover:text-green-600 dark:text-gray-400 dark:hover:bg-green-900/30"
                                                title="Publish post"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/30"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {posts.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Showing {(posts.current_page - 1) * posts.per_page + 1} to {Math.min(posts.current_page * posts.per_page, posts.total)} of{' '}
                            {posts.total} results
                        </p>
                        <div className="flex space-x-2">
                            {posts.current_page > 1 && (
                                <Link
                                    href={route('admin.posts.index', { page: posts.current_page - 1 })}
                                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Previous
                                </Link>
                            )}
                            {posts.current_page < posts.last_page && (
                                <Link
                                    href={route('admin.posts.index', { page: posts.current_page + 1 })}
                                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default Index;
