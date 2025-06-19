import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BarChart3, Calendar, Eye, Heart, MessageSquare, TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Analytics',
        href: '/dashboard/analytics',
    },
];

interface MonthlyStat {
    month: number;
    year: number;
    posts_count: number;
    total_views: number;
    published_count: number;
}

interface TopPost {
    id: number;
    title: string;
    slug: string;
    views: number;
    reactions_count: number;
    comments_count: number;
    created_at: string;
}

interface CategoryPerformance {
    id: number;
    name: string;
    posts_count: number;
    posts_sum_views: number;
}

interface AnalyticsProps {
    monthlyStats: MonthlyStat[];
    topPosts: TopPost[];
    categoryPerformance: CategoryPerformance[];
}

export default function Analytics({ monthlyStats, topPosts, categoryPerformance }: AnalyticsProps) {
    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const getMonthName = (month: number) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month - 1];
    };

    const totalViews = monthlyStats.reduce((sum, stat) => sum + (stat.total_views || 0), 0);
    const totalPosts = monthlyStats.reduce((sum, stat) => sum + stat.posts_count, 0);
    const totalPublished = monthlyStats.reduce((sum, stat) => sum + stat.published_count, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                        <p className="text-muted-foreground">Track your content performance and insights</p>
                    </div>
                    <Button asChild>
                        <Link href={route('dashboard.posts.create')}>
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Create New Post
                        </Link>
                    </Button>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(totalViews)}</div>
                            <p className="text-muted-foreground text-xs">All time views</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                            <BarChart3 className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalPosts}</div>
                            <p className="text-muted-foreground text-xs">Published posts</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
                            <TrendingUp className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalPublished}</div>
                            <p className="text-muted-foreground text-xs">Approved and published</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Monthly Performance */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Performance</CardTitle>
                            <CardDescription>Your posts and views over the last 12 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {monthlyStats.length > 0 ? (
                                    monthlyStats.map((stat) => (
                                        <div key={`${stat.year}-${stat.month}`} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="text-muted-foreground h-4 w-4" />
                                                <span className="font-medium">
                                                    {getMonthName(stat.month)} {stat.year}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm">
                                                <span className="flex items-center">
                                                    <BarChart3 className="mr-1 h-3 w-3" />
                                                    {stat.posts_count} posts
                                                </span>
                                                <span className="flex items-center">
                                                    <Eye className="mr-1 h-3 w-3" />
                                                    {formatNumber(stat.total_views || 0)} views
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-muted-foreground py-8 text-center">
                                        <BarChart3 className="mx-auto mb-2 h-8 w-8" />
                                        <p>No data available yet</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Category Performance */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Category Performance</CardTitle>
                            <CardDescription>How your posts perform by category</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {categoryPerformance.length > 0 ? (
                                    categoryPerformance.map((category) => (
                                        <div key={category.id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Badge variant="outline">{category.name}</Badge>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm">
                                                <span className="flex items-center">
                                                    <BarChart3 className="mr-1 h-3 w-3" />
                                                    {category.posts_count} posts
                                                </span>
                                                <span className="flex items-center">
                                                    <Eye className="mr-1 h-3 w-3" />
                                                    {formatNumber(category.posts_sum_views || 0)} views
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-muted-foreground py-8 text-center">
                                        <BarChart3 className="mx-auto mb-2 h-8 w-8" />
                                        <p>No category data available</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Top Performing Posts */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Performing Posts</CardTitle>
                        <CardDescription>Your best performing content by views</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {topPosts.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Post</TableHead>
                                        <TableHead>Views</TableHead>
                                        <TableHead>Engagement</TableHead>
                                        <TableHead>Published</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topPosts.map((post) => (
                                        <TableRow key={post.id}>
                                            <TableCell>
                                                <Link href={route('posts.show', post.slug)} className="font-medium hover:underline">
                                                    {post.title}
                                                </Link>
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
                                                <div className="text-muted-foreground text-sm">{new Date(post.created_at).toLocaleDateString()}</div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-muted-foreground py-8 text-center">
                                <TrendingUp className="mx-auto mb-2 h-8 w-8" />
                                <p>No posts available yet</p>
                                <Button asChild variant="outline" className="mt-2">
                                    <Link href={route('dashboard.posts.create')}>Create your first post</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
