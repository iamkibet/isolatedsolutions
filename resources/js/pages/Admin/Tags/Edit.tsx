import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Tag {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    tag: Tag;
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
    {
        title: 'Edit Tag',
        href: '/admin/tags/edit',
    },
];

export default function EditTag({ tag }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        name: tag.name,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.tags.update', tag.id), {
            onSuccess: () => {
                toast.success('Tag updated successfully!');
            },
            onError: () => {
                toast.error('Failed to update tag. Please check the form and try again.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Tag - ${tag.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route('admin.tags.index')}
                            className="flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Tags</span>
                        </Link>
                    </div>
                </div>

                {/* Form */}
                <div className="mx-auto w-full max-w-2xl">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Tag</h1>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Update the tag information below.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Tag Name */}
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Tag Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`w-full rounded-lg border px-4 py-2.5 transition focus:border-red-400 focus:ring-2 focus:ring-red-400 focus:outline-none dark:bg-gray-700 dark:text-white ${
                                        errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                    placeholder="Enter tag name"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                            </div>

                            {/* Tag Slug (Read-only) */}
                            <div>
                                <label htmlFor="slug" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Tag Slug
                                </label>
                                <input
                                    type="text"
                                    id="slug"
                                    value={tag.slug}
                                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
                                    disabled
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    The slug is automatically generated from the tag name and cannot be edited directly.
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-end space-x-4 pt-6">
                                <Link
                                    href={route('admin.tags.index')}
                                    className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 text-sm font-medium text-white transition-all hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                                >
                                    <Save size={16} />
                                    <span>{processing ? 'Updating...' : 'Update Tag'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
