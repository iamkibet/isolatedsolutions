import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import MarkdownIt from 'markdown-it';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

interface Category {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
    tags: Tag[];
}

interface FormData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category_id: string;
    tags: string[];
    new_tags: string;
    featured_image: File | null;
    is_published: boolean;
    [key: string]: string | string[] | boolean | File | null | undefined;
}

const Create: React.FC<Props> = ({ categories, tags }) => {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category_id: '',
        tags: [],
        new_tags: '',
        featured_image: null,
        is_published: false,
    });

    const [preview, setPreview] = useState<string | null>(null);

    // Determine the correct route based on the current URL
    const isAdminRoute = window.location.pathname.includes('/admin/');
    const submitRoute = isAdminRoute ? route('admin.posts.store') : route('dashboard.posts.store');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(submitRoute, {
            onSuccess: () => toast.success('Post created successfully!'),
            onError: () => toast.error('Failed to create post. Please try again.'),
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('featured_image', file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleTagChange = (tagName: string, checked: boolean) => {
        const currentTags = [...data.tags];
        if (checked) {
            if (!currentTags.includes(tagName)) {
                currentTags.push(tagName);
            }
        } else {
            const index = currentTags.indexOf(tagName);
            if (index > -1) {
                currentTags.splice(index, 1);
            }
        }
        setData('tags', currentTags);
    };

    return (
        <AppLayout>
            <Head title="Create Post" />

            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 p-1"></div>

                        <div className="p-6 md:p-8">
                            <div className="mb-8 flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Post</h1>
                                <div className="flex items-center">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            data.is_published
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                                        }`}
                                    >
                                        {data.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Title *</label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className={`w-full rounded-lg border px-4 py-2.5 ${
                                                errors.title
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 focus:border-red-400 focus:ring-red-400'
                                            } transition focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
                                            placeholder="Enter post title"
                                            required
                                        />
                                        {errors.title && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
                                        <input
                                            type="text"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-red-400 focus:ring-2 focus:ring-red-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            placeholder="post-url-slug"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Excerpt</label>
                                    <textarea
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                        rows={2}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-red-400 focus:ring-2 focus:ring-red-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Brief summary of your post"
                                    />
                                    {errors.excerpt && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.excerpt}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Category *</label>
                                        <select
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className={`w-full rounded-lg border px-4 py-2.5 ${
                                                errors.category_id
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 focus:border-red-400 focus:ring-red-400'
                                            } transition focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category_id && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.category_id}</p>}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>

                                        {/* Existing Tags */}
                                        {tags.length > 0 && (
                                            <div className="mb-4">
                                                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Select from existing tags:</p>
                                                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                                                    {tags.map((tag) => (
                                                        <label key={tag.id} className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={data.tags.includes(tag.name)}
                                                                onChange={(e) => handleTagChange(tag.name, e.target.checked)}
                                                                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                                            />
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">{tag.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* New Tags Input */}
                                        <div>
                                            <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Add new tags (comma-separated):</p>
                                            <input
                                                type="text"
                                                value={data.new_tags || ''}
                                                onChange={(e) => setData('new_tags', e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-red-400 focus:ring-2 focus:ring-red-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                placeholder="e.g., Technology, Design, Tutorial"
                                            />
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                New tags will be created automatically when you save the post.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content *</label>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Markdown supported</span>
                                    </div>
                                    <div className="overflow-hidden rounded-lg border border-gray-300 transition focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-400 dark:border-gray-600">
                                        <MdEditor
                                            value={data.content}
                                            style={{ height: '500px' }}
                                            renderHTML={(text: string) => mdParser.render(text)}
                                            onChange={({ text }: { text: string }) => setData('content', text)}
                                            view={{ menu: true, md: true, html: true }}
                                            className="dark:bg-gray-750"
                                        />
                                    </div>
                                    {errors.content && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.content}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Featured Image</label>
                                    <div className="flex flex-col gap-6 sm:flex-row">
                                        <div className="flex-1">
                                            <div className="flex w-full items-center justify-center">
                                                <label className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-red-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-red-400">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg
                                                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                                            ></path>
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                            <span className="font-semibold">Click to upload</span>
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF (MAX. 5MB)</p>
                                                    </div>
                                                    <input
                                                        id="featured_image"
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        {preview && (
                                            <div className="flex-1">
                                                <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Image Preview</p>
                                                <div className="relative h-48 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
                                                    <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setPreview(null);
                                                            setData('featured_image', null);
                                                        }}
                                                        className="absolute top-2 right-2 rounded-full bg-red-600 p-1.5 text-white transition hover:bg-red-700"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {errors.featured_image && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.featured_image}</p>}
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                                    <div className="flex items-center">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                id="is_published"
                                                checked={data.is_published}
                                                onChange={(e) => setData('is_published', e.target.checked)}
                                                className="sr-only"
                                            />
                                            <div
                                                className={`block h-6 w-12 rounded-full transition ${
                                                    data.is_published ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'
                                                }`}
                                            ></div>
                                            <div
                                                className={`absolute top-1 left-1 h-4 w-4 transform rounded-full bg-white transition ${
                                                    data.is_published ? 'translate-x-6' : 'translate-x-0'
                                                }`}
                                            ></div>
                                        </div>
                                        <label
                                            htmlFor="is_published"
                                            className="ml-3 block cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Publish immediately
                                        </label>
                                    </div>

                                    <div className="flex space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => window.history.back()}
                                            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className={`rounded-lg px-5 py-2.5 text-sm font-medium text-white transition focus:ring-2 focus:ring-red-300 focus:ring-offset-2 ${
                                                processing
                                                    ? 'cursor-not-allowed bg-red-400'
                                                    : 'bg-gradient-to-r from-red-600 to-red-700 shadow-md hover:from-red-700 hover:to-red-800'
                                            }`}
                                        >
                                            {processing ? (
                                                <span className="flex items-center">
                                                    <svg
                                                        className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Creating...
                                                </span>
                                            ) : (
                                                'Create Post'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
