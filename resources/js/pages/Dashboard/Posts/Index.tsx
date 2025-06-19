import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Edit, Eye, Heart, MessageSquare, MoreHorizontal, PenTool, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Posts',
        href: '/dashboard/posts',
    },
];

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    views: number;
    created_at: string;
    updated_at: string;
    is_published: boolean;
    approval_status: string;
    featured_image: string | null;
    category: {
        id: number;
        name: string;
    } | null;
    tags: Array<{
        id: number;
        name: string;
    }>;
    reactions_count: number;
    comments_count: number;
}

interface PostsProps {
    posts: {
        data: Post[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Posts({ posts }: PostsProps) {
    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const handleDelete = (postId: number) => {
        if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            router.delete(route('dashboard.posts.destroy', postId));
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
        if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
        return `${Math.floor(diffInDays / 365)} years ago`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Posts" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Posts</h1>
                        <p className="text-muted-foreground">Manage and track your content performance</p>
                    </div>
                    <Button asChild>
                        <Link href={route('dashboard.posts.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Post
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                            <PenTool className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{posts.total}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Published</CardTitle>
                            <Badge variant="default" className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{posts.data.filter((post) => post.approval_status === 'approved').length}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Badge variant="secondary" className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{posts.data.filter((post) => post.approval_status === 'pending').length}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(posts.data.reduce((sum, post) => sum + post.views, 0))}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Posts Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Posts</CardTitle>
                        <CardDescription>A list of all your posts with their performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {posts.data.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Post</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Views</TableHead>
                                        <TableHead>Engagement</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {posts.data.map((post) => (
                                        <TableRow key={post.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    {post.featured_image && (
                                                        <img
                                                            src={`/storage/${post.featured_image}`}
                                                            alt={post.title}
                                                            className="h-10 w-10 rounded object-cover"
                                                        />
                                                    )}
                                                    <div className="space-y-1">
                                                        <div className="font-medium">
                                                            <Link href={route('posts.show', post.slug)} className="hover:underline">
                                                                {post.title}
                                                            </Link>
                                                        </div>
                                                        {post.excerpt && <p className="text-muted-foreground line-clamp-1 text-sm">{post.excerpt}</p>}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {post.category ? (
                                                    <Badge variant="outline">{post.category.name}</Badge>
                                                ) : (
                                                    <span className="text-muted-foreground">No category</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {(() => {
                                                    switch (post.approval_status) {
                                                        case 'approved':
                                                            return (
                                                                <Badge
                                                                    variant="default"
                                                                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                                >
                                                                    Approved
                                                                </Badge>
                                                            );
                                                        case 'pending':
                                                            return (
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                                >
                                                                    Pending
                                                                </Badge>
                                                            );
                                                        case 'rejected':
                                                            return (
                                                                <Badge
                                                                    variant="destructive"
                                                                    className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                                                >
                                                                    Rejected
                                                                </Badge>
                                                            );
                                                        default:
                                                            return <Badge variant="secondary">Draft</Badge>;
                                                    }
                                                })()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-1">
                                                    <Eye className="text-muted-foreground h-3 w-3" />
                                                    <span>{formatNumber(post.views)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-3 text-sm">
                                                    <span className="flex items-center">
                                                        <Heart className="mr-1 h-3 w-3" />
                                                        {formatNumber(post.reactions_count)}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <MessageSquare className="mr-1 h-3 w-3" />
                                                        {formatNumber(post.comments_count)}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-muted-foreground flex items-center space-x-1 text-sm">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{formatDate(post.created_at)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link
                                                                href={
                                                                    post.approval_status === 'pending'
                                                                        ? route('dashboard.posts.edit', post.id)
                                                                        : route('posts.show', post.slug)
                                                                }
                                                            >
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('dashboard.posts.edit', post.id)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(post.id)} className="text-destructive">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="py-12 text-center">
                                <PenTool className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                <h3 className="mb-2 text-lg font-medium">No posts yet</h3>
                                <p className="text-muted-foreground mb-4">Start creating content to see it here</p>
                                <Button asChild>
                                    <Link href={route('dashboard.posts.create')}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create your first post
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
