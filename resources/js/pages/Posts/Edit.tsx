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

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category_id: number | null;
    featured_image: string | null;
    featured_image_url: string | null;
    is_published: boolean;
    tags: Tag[];
}

interface Props {
    post: Post;
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
    [key: string]: string | string[] | boolean | File | null;
}

const Edit: React.FC<Props> = ({ post, categories, tags }) => {
    const { data, setData, patch, processing, errors } = useForm<FormData>({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content,
        category_id: post.category_id?.toString() || '',
        tags: post.tags.map((tag) => tag.name),
        new_tags: '',
        featured_image: null,
        is_published: post.is_published,
    });

    const [preview, setPreview] = useState<string | null>(post.featured_image_url);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(route('admin.posts.update', post.id), {
            onSuccess: () => toast.success('Post updated successfully!'),
            onError: () => toast.error('Failed to update post. Please try again.'),
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
            setPreview(post.featured_image_url);
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
            <Head title={`Edit Post - ${post.title}`} />

            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 p-1"></div>

                        <div className="p-6 md:p-8">
                            <div className="mb-8 flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
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
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                        <select
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className={`w-full rounded-lg border px-4 py-2.5 ${
                                                errors.category_id
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 focus:border-red-400 focus:ring-red-400'
                                            } transition focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white`}
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
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Featured Image</label>
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-red-400 focus:ring-2 focus:ring-red-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        />
                                        {preview && (
                                            <div className="mt-2">
                                                <img src={preview} alt="Preview" className="h-20 w-20 rounded object-cover" />
                                            </div>
                                        )}
                                    </div>
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

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={data.is_published}
                                                onChange={(e) => setData('is_published', e.target.checked)}
                                                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Publish immediately</span>
                                        </label>
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => window.history.back()}
                                            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-6 py-2.5 text-sm font-medium text-white transition-all hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                                        >
                                            {processing ? 'Updating...' : 'Update Post'}
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

export default Edit;
