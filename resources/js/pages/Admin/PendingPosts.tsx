import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Check, Eye, MoreHorizontal, PenTool, Trash2, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Pending Posts',
        href: '/admin/posts/pending',
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
    user: {
        id: number;
        name: string;
        email: string;
    };
    reactions_count: number;
    comments_count: number;
}

interface Props {
    pendingPosts: {
        data: Post[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function PendingPosts({ pendingPosts }: Props) {
    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const handleApprove = (postId: number) => {
        if (confirm('Are you sure you want to approve this post? It will be published immediately.')) {
            router.patch(route('admin.posts.approve', postId), {
                onSuccess: () => toast.success('Post approved and published successfully!'),
                onError: () => toast.error('Failed to approve post. Please try again.'),
            });
        }
    };

    const handleReject = (postId: number) => {
        const reason = prompt('Please provide a reason for rejection (optional):');
        if (reason !== null) {
            router.patch(
                route('admin.posts.reject', postId),
                {
                    rejection_reason: reason,
                },
                {
                    onSuccess: () => toast.success('Post rejected successfully!'),
                    onError: () => toast.error('Failed to reject post. Please try again.'),
                },
            );
        }
    };

    const handleDelete = (postId: number) => {
        if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            router.delete(route('admin.posts.destroy', postId), {
                onSuccess: () => toast.success('Post deleted successfully!'),
                onError: () => toast.error('Failed to delete post. Please try again.'),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pending Posts" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Pending Posts</h1>
                        <p className="text-muted-foreground">Review and approve posts submitted by users</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button asChild variant="outline">
                            <Link href={route('admin.posts.index')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View All Posts
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('admin.posts.create')}>
                                <PenTool className="mr-2 h-4 w-4" />
                                Create Post
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
                            <Badge variant="secondary" className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{pendingPosts.total}</div>
                            <p className="text-muted-foreground text-xs">Posts awaiting approval</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">This Week</CardTitle>
                            <Calendar className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {
                                    pendingPosts.data.filter((post) => {
                                        const postDate = new Date(post.created_at);
                                        const weekAgo = new Date();
                                        weekAgo.setDate(weekAgo.getDate() - 7);
                                        return postDate >= weekAgo;
                                    }).length
                                }
                            </div>
                            <p className="text-muted-foreground text-xs">Submitted this week</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Age</CardTitle>
                            <Calendar className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {pendingPosts.data.length > 0
                                    ? Math.round(
                                          pendingPosts.data.reduce((acc, post) => {
                                              const postDate = new Date(post.created_at);
                                              const now = new Date();
                                              return acc + (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
                                          }, 0) / pendingPosts.data.length,
                                      )
                                    : 0}
                                d
                            </div>
                            <p className="text-muted-foreground text-xs">Days in queue</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ready to Review</CardTitle>
                            <Check className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{pendingPosts.data.length}</div>
                            <p className="text-muted-foreground text-xs">Posts on this page</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Pending Posts Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Posts Pending Approval</CardTitle>
                        <CardDescription>Review and approve posts submitted by users. Approved posts will be published immediately.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {pendingPosts.data.length > 0 ? (
                            <div className="space-y-4">
                                {pendingPosts.data.map((post) => (
                                    <div key={post.id} className="flex items-center space-x-4 rounded-lg border p-4">
                                        {post.featured_image && (
                                            <img src={post.featured_image} alt={post.title} className="h-16 w-16 rounded-lg object-cover" />
                                        )}
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <Link href={route('posts.show', post.slug)} className="font-medium hover:underline" target="_blank">
                                                    {post.title}
                                                </Link>
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                >
                                                    Pending
                                                </Badge>
                                            </div>
                                            <p className="text-muted-foreground line-clamp-2 text-sm">{post.excerpt || 'No excerpt provided'}</p>
                                            <div className="text-muted-foreground flex items-center space-x-4 text-xs">
                                                <span>By {post.user.name}</span>
                                                <span>•</span>
                                                <span>{post.category?.name || 'Uncategorized'}</span>
                                                <span>•</span>
                                                <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button size="sm" onClick={() => handleApprove(post.id)} className="bg-green-600 hover:bg-green-700">
                                                <Check className="mr-1 h-3 w-3" />
                                                Approve
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleReject(post.id)}
                                                className="border-red-300 text-red-700 hover:bg-red-50"
                                            >
                                                <X className="mr-1 h-3 w-3" />
                                                Reject
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('admin.posts.edit', post.id)}>
                                                            <PenTool className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('posts.show', post.slug)} target="_blank">
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Preview
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(post.id)} className="text-red-600">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <Check className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No pending posts</h3>
                                <p className="text-muted-foreground">All posts have been reviewed and processed.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
