import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Posts',
        href: '/dashboard/posts',
    },
    {
        title: 'Edit Post',
        href: '/dashboard/posts/edit',
    },
];

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
    content: string;
    excerpt: string;
    category_id: number | null;
    featured_image: string | null;
    tags: Tag[];
}

interface EditPostProps {
    post: Post;
    categories: Category[];
    tags: Tag[];
}

export default function EditPost({ post, categories, tags }: EditPostProps) {
    const {
        data,
        setData,
        post: submit,
        processing,
        errors,
    } = useForm({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        category_id: post.category_id?.toString() || '',
        tags: post.tags.map((tag) => tag.name),
        new_tags: '',
        featured_image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit(route('dashboard.posts.update', post.id), {
            method: 'patch',
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Post" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route('dashboard.posts.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Posts
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
                            <p className="text-muted-foreground">Update your post content and settings</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Title */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Post Title</CardTitle>
                                    <CardDescription>Enter a compelling title for your post</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter post title..."
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                                </CardContent>
                            </Card>

                            {/* Content */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Content</CardTitle>
                                    <CardDescription>Write your post content</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        placeholder="Write your post content..."
                                        rows={15}
                                        className={errors.content ? 'border-red-500' : ''}
                                    />
                                    {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                                </CardContent>
                            </Card>

                            {/* Excerpt */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Excerpt</CardTitle>
                                    <CardDescription>A brief summary of your post (optional)</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        id="excerpt"
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                        placeholder="Enter a brief excerpt..."
                                        rows={3}
                                        maxLength={500}
                                    />
                                    <p className="text-muted-foreground mt-1 text-xs">{data.excerpt.length}/500 characters</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Category */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Category</CardTitle>
                                    <CardDescription>Select a category for your post</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </CardContent>
                            </Card>

                            {/* Tags */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tags</CardTitle>
                                    <CardDescription>Add tags to help categorize your post</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="tags">Existing Tags</Label>
                                        <Select
                                            value=""
                                            onValueChange={(value) => {
                                                if (value && !data.tags.includes(value)) {
                                                    setData('tags', [...data.tags, value]);
                                                }
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select tags" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tags
                                                    .filter((tag) => !data.tags.includes(tag.name))
                                                    .map((tag) => (
                                                        <SelectItem key={tag.id} value={tag.name}>
                                                            {tag.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="new_tags">New Tags</Label>
                                        <Input
                                            id="new_tags"
                                            value={data.new_tags}
                                            onChange={(e) => setData('new_tags', e.target.value)}
                                            placeholder="Enter new tags separated by commas..."
                                        />
                                        <p className="text-muted-foreground mt-1 text-xs">Separate multiple tags with commas</p>
                                    </div>

                                    {/* Selected Tags */}
                                    {data.tags.length > 0 && (
                                        <div>
                                            <Label>Selected Tags</Label>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {data.tags.map((tag, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center space-x-1 rounded-full bg-blue-100 px-3 py-1 text-sm dark:bg-blue-900/30"
                                                    >
                                                        <span>{tag}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setData(
                                                                    'tags',
                                                                    data.tags.filter((_, i) => i !== index),
                                                                )
                                                            }
                                                            className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Featured Image */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Featured Image</CardTitle>
                                    <CardDescription>Upload a featured image for your post</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {post.featured_image && (
                                            <div>
                                                <Label>Current Image</Label>
                                                <img
                                                    src={`/storage/${post.featured_image}`}
                                                    alt="Current featured image"
                                                    className="mt-2 h-32 w-full rounded-lg object-cover"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <Label htmlFor="featured_image">Upload New Image</Label>
                                            <Input
                                                id="featured_image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setData('featured_image', e.target.files?.[0] || null)}
                                                className="mt-1"
                                            />
                                            <p className="text-muted-foreground mt-1 text-xs">Recommended size: 1200x630px. Max size: 5MB</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Actions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Button type="submit" disabled={processing} className="w-full">
                                            <Save className="mr-2 h-4 w-4" />
                                            {processing ? 'Updating...' : 'Update Post'}
                                        </Button>
                                        <Button type="button" variant="outline" asChild className="w-full">
                                            <Link href={route('dashboard.posts.index')}>Cancel</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
