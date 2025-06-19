import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Tag {
    id: number;
    name: string;
    slug: string;
    posts_count: number;
}

interface Props {
    tags: {
        data: Tag[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Tags',
        href: '/admin/tags',
    },
];

export default function TagsIndex({ tags }: Props) {
    const handleDelete = (tagId: number) => {
        if (confirm('Are you sure you want to delete this tag?')) {
            router.delete(route('admin.tags.destroy', tagId), {
                onSuccess: () => toast.success('Tag deleted successfully'),
                onError: () => toast.error('Failed to delete tag'),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Tags" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Tags</h1>
                        <p className="text-gray-600 dark:text-gray-400">Create and manage your blog tags.</p>
                    </div>
                    <Link
                        href={route('admin.tags.create')}
                        className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 font-medium text-white transition-all hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                    >
                        <PlusCircle size={16} />
                        New Tag
                    </Link>
                </div>

                {/* Tags List */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Tags</h2>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {tags.data.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <p className="text-gray-500 dark:text-gray-400">No tags found. Create your first tag to get started.</p>
                            </div>
                        ) : (
                            tags.data.map((tag) => (
                                <div key={tag.id} className="flex items-center justify-between px-6 py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                            <span className="text-sm font-semibold">#{tag.name.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">#{tag.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {tag.posts_count} {tag.posts_count === 1 ? 'post' : 'posts'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            href={route('admin.tags.edit', tag.id)}
                                            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            <Edit size={16} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(tag.id)}
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
                {tags.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Showing {(tags.current_page - 1) * tags.per_page + 1} to {Math.min(tags.current_page * tags.per_page, tags.total)} of{' '}
                            {tags.total} results
                        </p>
                        <div className="flex space-x-2">
                            {tags.current_page > 1 && (
                                <Link
                                    href={route('admin.tags.index', { page: tags.current_page - 1 })}
                                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Previous
                                </Link>
                            )}
                            {tags.current_page < tags.last_page && (
                                <Link
                                    href={route('admin.tags.index', { page: tags.current_page + 1 })}
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
}
