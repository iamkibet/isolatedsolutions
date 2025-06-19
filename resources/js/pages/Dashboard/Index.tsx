import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BarChart3, Bell, Clock, Eye, Heart, MessageSquare, PenTool, TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    stats: {
        totalPosts: number;
        publishedPosts: number;
        draftPosts: number;
        pendingPosts: number;
        approvedPosts: number;
        rejectedPosts: number;
        totalViews: number;
        totalLikes: number;
        totalComments: number;
        engagementRate: number;
        unreadNotifications: number;
    };
    recentPosts: Array<{
        id: number;
        title: string;
        slug: string;
        views: number;
        date: string;
        likes: number;
        comments: number;
        is_published: boolean;
        approval_status: string;
        featured_image: string | null;
    }>;
    weeklyViews: Array<{
        date: string;
        views: number;
    }>;
    recentNotifications: Array<{
        id: number;
        type: string;
        title: string;
        message: string;
        is_read: boolean;
        created_at: string;
        data: Record<string, unknown>;
    }>;
}

export default function Dashboard({ stats, recentPosts, weeklyViews, recentNotifications }: DashboardProps) {
    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const getApprovalStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return (
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Approved
                    </Badge>
                );
            case 'pending':
                return (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        Pending
                    </Badge>
                );
            case 'rejected':
                return (
                    <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        Rejected
                    </Badge>
                );
            default:
                return <Badge variant="secondary">Draft</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
                        <p className="text-muted-foreground">Here's what's happening with your content today.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        {stats.unreadNotifications > 0 && (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route('dashboard.notifications')}>
                                    <Bell className="mr-2 h-4 w-4" />
                                    {stats.unreadNotifications} new
                                </Link>
                            </Button>
                        )}
                        <Button asChild>
                            <Link href={route('dashboard.posts.create')}>
                                <PenTool className="mr-2 h-4 w-4" />
                                Create Post
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                            <PenTool className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(stats.totalPosts)}</div>
                            <p className="text-muted-foreground text-xs">
                                {stats.publishedPosts} published, {stats.draftPosts} drafts
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                            <Clock className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(stats.pendingPosts)}</div>
                            <p className="text-muted-foreground text-xs">
                                {stats.approvedPosts} approved, {stats.rejectedPosts} rejected
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(stats.totalViews)}</div>
                            <p className="text-muted-foreground text-xs">Across all published posts</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                            <TrendingUp className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.engagementRate}%</div>
                            <p className="text-muted-foreground text-xs">Likes + comments / views</p>
                        </CardContent>
                    </Card>
                </div>

                {/* New Analytics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {/* Top Performing Post */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Top Post</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentPosts.length > 0 ? (
                                <Link href={route('posts.show', recentPosts[0].slug)} className="font-semibold hover:underline">
                                    {recentPosts[0].title}
                                </Link>
                            ) : (
                                <span className="text-muted-foreground">N/A</span>
                            )}
                        </CardContent>
                    </Card>
                    {/* Most Used Tag */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Most Used Tag</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-muted-foreground">N/A</span>
                        </CardContent>
                    </Card>
                    {/* Average Post Length */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Post Length</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <span className="text-muted-foreground">N/A</span>
                        </CardContent>
                    </Card>
                    {/* Best Posting Day */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Best Posting Day</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {(() => {
                                const dayCounts: Record<string, number> = {};
                                recentPosts.forEach((post) => {
                                    const day = new Date(post.date).toLocaleDateString('en-US', { weekday: 'long' });
                                    dayCounts[day] = (dayCounts[day] || 0) + 1;
                                });
                                const bestDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0];
                                return bestDay ? (
                                    <span className="font-semibold">{bestDay[0]}</span>
                                ) : (
                                    <span className="text-muted-foreground">N/A</span>
                                );
                            })()}
                        </CardContent>
                    </Card>
                    {/* Approval Rate */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {stats.totalPosts > 0 ? (
                                <span className="font-semibold">{Math.round((stats.approvedPosts / stats.totalPosts) * 100)}%</span>
                            ) : (
                                <span className="text-muted-foreground">N/A</span>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Posts and Analytics */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Posts */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Posts</CardTitle>
                            <CardDescription>Your latest content and its performance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentPosts.length > 0 ? (
                                    recentPosts.map((post) => (
                                        <div key={post.id} className="flex items-center space-x-4">
                                            {post.featured_image && (
                                                <img src={post.featured_image} alt={post.title} className="h-12 w-12 rounded-lg object-cover" />
                                            )}
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <Link href={route('posts.show', post.slug)} className="font-medium hover:underline">
                                                        {post.title}
                                                    </Link>
                                                    {getApprovalStatusBadge(post.approval_status)}
                                                </div>
                                                <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                                                    <span className="flex items-center">
                                                        <Eye className="mr-1 h-3 w-3" />
                                                        {formatNumber(post.views)}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Heart className="mr-1 h-3 w-3" />
                                                        {formatNumber(post.likes)}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <MessageSquare className="mr-1 h-3 w-3" />
                                                        {formatNumber(post.comments)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-muted-foreground text-sm">{post.date}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-muted-foreground py-8 text-center">
                                        <PenTool className="mx-auto mb-2 h-8 w-8" />
                                        <p>No posts yet</p>
                                        <Button asChild variant="outline" className="mt-2">
                                            <Link href={route('dashboard.posts.create')}>Create your first post</Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                            {recentPosts.length > 0 && (
                                <div className="mt-4">
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href={route('dashboard.posts.index')}>View all posts</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Notifications</CardTitle>
                            <CardDescription>Latest updates about your posts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentNotifications.length > 0 ? (
                                    recentNotifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start space-x-3 rounded-lg p-3 ${notification.is_read ? 'bg-muted/50' : 'bg-blue-50 dark:bg-blue-900/20'}`}
                                        >
                                            <div className={`mt-1 h-2 w-2 rounded-full ${notification.is_read ? 'bg-muted' : 'bg-blue-500'}`} />
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <p className="text-sm font-medium">{notification.title}</p>
                                                    {!notification.is_read && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            New
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-muted-foreground text-sm">{notification.message}</p>
                                                <p className="text-muted-foreground text-xs">{notification.created_at}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-muted-foreground py-8 text-center">
                                        <Bell className="mx-auto mb-2 h-8 w-8" />
                                        <p>No notifications yet</p>
                                    </div>
                                )}
                            </div>
                            {recentNotifications.length > 0 && (
                                <div className="mt-4">
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href={route('dashboard.notifications')}>View all notifications</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Weekly Views Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Views</CardTitle>
                        <CardDescription>View trends for the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {weeklyViews.map((day) => (
                                <div key={day.date} className="flex items-center space-x-2">
                                    <div className="text-muted-foreground w-16 text-sm">
                                        {new Date(day.date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-muted relative h-8 rounded">
                                            <div
                                                className="bg-primary absolute inset-y-1 left-1 rounded"
                                                style={{
                                                    width: `${Math.max((day.views / Math.max(...weeklyViews.map((d) => d.views))) * 100, 2)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-12 text-right text-sm font-medium">{formatNumber(day.views)}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common tasks and shortcuts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <Button asChild variant="outline" className="h-auto flex-col p-4">
                                <Link href={route('dashboard.posts.create')}>
                                    <PenTool className="mb-2 h-6 w-6" />
                                    <span>Create Post</span>
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="h-auto flex-col p-4">
                                <Link href={route('dashboard.posts.index')}>
                                    <BarChart3 className="mb-2 h-6 w-6" />
                                    <span>Manage Posts</span>
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="h-auto flex-col p-4">
                                <Link href={route('dashboard.notifications')}>
                                    <Bell className="mb-2 h-6 w-6" />
                                    <span>Notifications</span>
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="h-auto flex-col p-4">
                                <Link href={route('dashboard.analytics')}>
                                    <TrendingUp className="mb-2 h-6 w-6" />
                                    <span>Analytics</span>
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
