import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Eye, Heart, MessageSquare } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Liked Posts',
        href: '/dashboard/liked-posts',
    },
];

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    views: number;
    created_at: string;
    featured_image: string | null;
    category: {
        id: number;
        name: string;
    } | null;
    tags: Array<{
        id: number;
        name: string;
    }>;
    user: {
        id: number;
        name: string;
    };
    reactions_count: number;
    comments_count: number;
}

interface LikedPostsProps {
    likedPosts: {
        data: Post[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function LikedPosts({ likedPosts }: LikedPostsProps) {
    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liked Posts" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button asChild variant="ghost" size="sm">
                            <Link href={route('dashboard.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Liked Posts</h1>
                            <p className="text-muted-foreground">Posts you've liked and saved for later</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Liked</CardTitle>
                            <Heart className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{likedPosts.total}</div>
                            <p className="text-muted-foreground text-xs">Posts you've liked</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(likedPosts.data.reduce((sum, post) => sum + post.views, 0))}</div>
                            <p className="text-muted-foreground text-xs">Across all liked posts</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Categories</CardTitle>
                            <Badge variant="outline" className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Set(likedPosts.data.map((post) => post.category?.name).filter(Boolean)).size}
                            </div>
                            <p className="text-muted-foreground text-xs">Different categories</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Posts Grid */}
                {likedPosts.data.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {likedPosts.data.map((post) => (
                            <Card key={post.id} className="overflow-hidden">
                                {post.featured_image && (
                                    <div className="aspect-video overflow-hidden">
                                        <img src={post.featured_image} alt={post.title} className="h-full w-full object-cover" />
                                    </div>
                                )}
                                <CardHeader>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            {post.category && (
                                                <Badge variant="outline" className="text-xs">
                                                    {post.category.name}
                                                </Badge>
                                            )}
                                            <div className="text-muted-foreground flex items-center space-x-1 text-xs">
                                                <Calendar className="h-3 w-3" />
                                                <span>{formatDate(post.created_at)}</span>
                                            </div>
                                        </div>
                                        <CardTitle className="line-clamp-2">
                                            <Link href={route('posts.show', post.slug)} className="hover:underline">
                                                {post.title}
                                            </Link>
                                        </CardTitle>
                                        {post.excerpt && <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {/* Author */}
                                        <div className="text-muted-foreground flex items-center space-x-2 text-sm">
                                            <span>By {post.user.name}</span>
                                        </div>

                                        {/* Tags */}
                                        {post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {post.tags.slice(0, 3).map((tag) => (
                                                    <Badge key={tag.id} variant="secondary" className="text-xs">
                                                        {tag.name}
                                                    </Badge>
                                                ))}
                                                {post.tags.length > 3 && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        +{post.tags.length - 3} more
                                                    </Badge>
                                                )}
                                            </div>
                                        )}

                                        {/* Engagement Metrics */}
                                        <div className="flex items-center justify-between border-t pt-2">
                                            <div className="flex items-center space-x-4 text-sm">
                                                <span className="flex items-center space-x-1">
                                                    <Eye className="text-muted-foreground h-3 w-3" />
                                                    <span>{formatNumber(post.views)}</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <Heart className="h-3 w-3 text-red-500" />
                                                    <span>{formatNumber(post.reactions_count)}</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <MessageSquare className="text-muted-foreground h-3 w-3" />
                                                    <span>{formatNumber(post.comments_count)}</span>
                                                </span>
                                            </div>
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={route('posts.show', post.slug)}>Read More</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Heart className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                            <h3 className="mb-2 text-lg font-medium">No liked posts yet</h3>
                            <p className="text-muted-foreground mb-4">Start exploring posts and like the ones you enjoy</p>
                            <Button asChild>
                                <Link href={route('posts.index')}>Browse Posts</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {likedPosts.last_page > 1 && (
                    <div className="flex justify-center">
                        <div className="flex space-x-2">
                            {likedPosts.current_page > 1 && (
                                <Button asChild variant="outline">
                                    <Link href={`${route('dashboard.liked-posts')}?page=${likedPosts.current_page - 1}`}>Previous</Link>
                                </Button>
                            )}
                            <span className="text-muted-foreground flex items-center px-4 text-sm">
                                Page {likedPosts.current_page} of {likedPosts.last_page}
                            </span>
                            {likedPosts.current_page < likedPosts.last_page && (
                                <Button asChild variant="outline">
                                    <Link href={`${route('dashboard.liked-posts')}?page=${likedPosts.current_page + 1}`}>Next</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
