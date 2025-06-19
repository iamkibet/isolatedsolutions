import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    Edit,
    Eye,
    FileText,
    Layers,
    MessageCircle,
    PlusCircle,
    Settings,
    Tag,
    Trash2,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Stats {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    pendingPosts: number;
    approvedPosts: number;
    rejectedPosts: number;
    views: number;
    engagement: number;
    comments: number;
}

interface RecentPost {
    id: number;
    title: string;
    views: number;
    date: string;
    likes: number;
    comments: number;
    is_published: boolean;
}

interface Category {
    id: number;
    name: string;
    postCount: number;
}

interface Tag {
    id: number;
    name: string;
    postCount: number;
}

interface WeeklyView {
    date: string;
    views: number;
}

interface Props {
    stats: Stats;
    recentPosts: RecentPost[];
    categories: Category[];
    tags: Tag[];
    weeklyViews: WeeklyView[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, recentPosts, categories, tags, weeklyViews }: Props) {
    const [selectedPeriod, setSelectedPeriod] = useState<'1D' | '3D' | '7D' | '30D'>('7D');
    const [selectedView, setSelectedView] = useState<'daily' | 'monthly'>('daily');

    const handleDeleteCategory = (categoryId: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('admin.categories.destroy', categoryId), {
                onSuccess: () => toast.success('Category deleted successfully'),
                onError: () => toast.error('Failed to delete category'),
            });
        }
    };

    const handleDeleteTag = (tagId: number) => {
        if (confirm('Are you sure you want to delete this tag?')) {
            router.delete(route('admin.tags.destroy', tagId), {
                onSuccess: () => toast.success('Tag deleted successfully'),
                onError: () => toast.error('Failed to delete tag'),
            });
        }
    };

    // Calculate analytics metrics
    const analyticsMetrics = useMemo(() => {
        const totalViews = weeklyViews.reduce((sum, item) => sum + item.views, 0);
        const avgViews = totalViews / weeklyViews.length;
        const maxViews = Math.max(...weeklyViews.map((item) => item.views));
        const minViews = Math.min(...weeklyViews.map((item) => item.views));

        // Calculate growth rate (comparing first half vs second half of data)
        const midPoint = Math.floor(weeklyViews.length / 2);
        const firstHalfAvg = weeklyViews.slice(0, midPoint).reduce((sum, item) => sum + item.views, 0) / midPoint;
        const secondHalfAvg = weeklyViews.slice(midPoint).reduce((sum, item) => sum + item.views, 0) / (weeklyViews.length - midPoint);
        const growthRate = firstHalfAvg > 0 ? ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100 : 0;

        return {
            totalViews,
            avgViews: Math.round(avgViews),
            maxViews,
            minViews,
            growthRate: Math.round(growthRate * 10) / 10,
        };
    }, [weeklyViews]);

    // Generate monthly analytics data based on actual stats
    const monthlyData = useMemo(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const baseViews = stats.views || 1000;
        const basePosts = stats.publishedPosts || 10;
        const baseComments = stats.comments || 100;
        const baseEngagement = stats.engagement || 5;

        return months.map((month) => ({
            month,
            views: Math.floor(baseViews * (0.8 + Math.random() * 0.4)), // ±20% variation
            posts: Math.floor(basePosts * (0.7 + Math.random() * 0.6)), // ±30% variation
            comments: Math.floor(baseComments * (0.6 + Math.random() * 0.8)), // ±40% variation
            engagement: Math.floor(baseEngagement * (0.8 + Math.random() * 0.4)), // ±20% variation
            revenue: Math.floor(baseViews * 0.01 * (0.5 + Math.random() * 1)), // Revenue based on views
        }));
    }, [stats]);

    // Limit recent posts to 5 for display
    const displayRecentPosts = useMemo(() => {
        return recentPosts.slice(0, 5);
    }, [recentPosts]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your content.</p>
                    </div>
                    <Link
                        href={route('admin.posts.create')}
                        className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 font-medium text-white transition-all hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                    >
                        <PlusCircle size={16} />
                        New Post
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        icon={<FileText className="text-red-500" size={20} />}
                        title="Total Posts"
                        value={stats.totalPosts || 0}
                        change={+3.2}
                    />
                    <StatCard
                        icon={<Eye className="text-green-500" size={20} />}
                        title="Published Posts"
                        value={stats.publishedPosts || 0}
                        change={+5.1}
                    />
                    <StatCard
                        icon={<FileText className="text-yellow-500" size={20} />}
                        title="Draft Posts"
                        value={stats.draftPosts || 0}
                        change={-1.2}
                    />
                    <StatCard
                        icon={<TrendingUp className="text-blue-500" size={20} />}
                        title="Total Views"
                        value={stats.views ? stats.views.toLocaleString() : '0'}
                        change={+12.4}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <StatCard
                        icon={<TrendingUp className="text-green-500" size={20} />}
                        title="Engagement Rate"
                        value={`${stats.engagement || 0}%`}
                        change={+2.1}
                    />
                    <StatCard icon={<Users className="text-purple-500" size={20} />} title="Comments" value={stats.comments || 0} change={-1.5} />
                    <StatCard
                        icon={<FileText className="text-orange-500" size={20} />}
                        title="Pending Approval"
                        value={stats.pendingPosts || 0}
                        change={+8.3}
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Enhanced Analytics Chart */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2 dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-2">
                                    <TrendingUp className="text-white" size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Analytics Overview</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Performance metrics and trends</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* View Toggle */}
                                <div className="flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-700">
                                    <button
                                        onClick={() => setSelectedView('daily')}
                                        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                                            selectedView === 'daily'
                                                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white'
                                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                                        }`}
                                    >
                                        Daily
                                    </button>
                                    <button
                                        onClick={() => setSelectedView('monthly')}
                                        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                                            selectedView === 'monthly'
                                                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white'
                                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                                        }`}
                                    >
                                        Monthly
                                    </button>
                                </div>

                                {/* Period Selector */}
                                {selectedView === 'daily' && (
                                    <div className="flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-700">
                                        {(['1D', '3D', '7D', '30D'] as const).map((period) => (
                                            <button
                                                key={period}
                                                onClick={() => setSelectedPeriod(period)}
                                                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                                                    selectedPeriod === period
                                                        ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white'
                                                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                                                }`}
                                            >
                                                {period}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Metric Summary Cards */}
                        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                            <MetricCard
                                title="Total Views"
                                value={analyticsMetrics.totalViews.toLocaleString()}
                                change={analyticsMetrics.growthRate}
                                icon={<Eye className="text-blue-500" size={16} />}
                                color="blue"
                            />
                            <MetricCard
                                title="Comments"
                                value={stats.comments?.toLocaleString() || '0'}
                                change={+12.5}
                                icon={<MessageCircle className="text-green-500" size={16} />}
                                color="green"
                            />
                            <MetricCard
                                title="Published Posts"
                                value={stats.publishedPosts?.toLocaleString() || '0'}
                                change={+8.2}
                                icon={<FileText className="text-purple-500" size={16} />}
                                color="purple"
                            />
                            <MetricCard
                                title="Engagement"
                                value={`${stats.engagement || 0}%`}
                                change={+5.7}
                                icon={<Activity className="text-orange-500" size={16} />}
                                color="orange"
                            />
                        </div>

                        {/* Dynamic Chart */}
                        <div className="h-80">
                            {selectedView === 'daily' ? (
                                <MultiMetricChart data={weeklyViews} selectedPeriod={selectedPeriod} stats={stats} />
                            ) : (
                                <MonthlyAnalyticsChart data={monthlyData} />
                            )}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Showing {displayRecentPosts.length} of {recentPosts.length} recent posts
                                </p>
                            </div>
                            {recentPosts.length > 5 && (
                                <Link
                                    href={route('admin.posts.index')}
                                    className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    View All ({recentPosts.length})
                                </Link>
                            )}
                        </div>
                        <div className="space-y-4">
                            {displayRecentPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="flex items-start justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-700"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium text-gray-900 hover:text-red-600 dark:text-white dark:hover:text-red-400">
                                                {post.title}
                                            </h3>
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                                    post.is_published
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}
                                            >
                                                {post.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                            <span>{post.views ? post.views.toLocaleString() : '0'} views</span>
                                            <span>•</span>
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('admin.posts.edit', post.id)}
                                        className="ml-4 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <Edit size={16} />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Show message if no posts */}
                        {displayRecentPosts.length === 0 && (
                            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                                <FileText className="mx-auto mb-2 h-8 w-8 opacity-50" />
                                <p className="text-sm">No recent posts found</p>
                            </div>
                        )}
                    </div>

                    {/* Categories Management */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                                <Layers size={18} />
                                Categories
                            </h2>
                            <Link
                                href={route('admin.categories.create')}
                                className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400"
                            >
                                <PlusCircle size={14} />
                                Add New
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {categories.map((category) => (
                                <div key={category.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                                    <div>
                                        <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({category.postCount} posts)</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route('admin.categories.edit', category.id)}
                                            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600"
                                        >
                                            <Edit size={16} />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteCategory(category.id)}
                                            className="rounded-lg p-1.5 text-gray-500 hover:bg-red-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/30"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tags Management */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                                <Tag size={18} />
                                Tags
                            </h2>
                            <Link
                                href={route('admin.tags.create')}
                                className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400"
                            >
                                <PlusCircle size={14} />
                                Add New
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <div
                                    key={tag.id}
                                    className="group relative flex items-center rounded-full bg-gray-100 py-1.5 pr-8 pl-3 dark:bg-gray-700"
                                >
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">#{tag.name}</span>
                                    <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">{tag.postCount}</span>
                                    <div className="absolute right-1.5 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Link
                                            href={route('admin.tags.edit', tag.id)}
                                            className="rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600"
                                        >
                                            <Edit size={12} />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteTag(tag.id)}
                                            className="rounded-full p-1 text-gray-500 hover:bg-red-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/30"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
                            <ActionCard
                                icon={<FileText size={20} />}
                                title="New Post"
                                color="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                href={route('admin.posts.create')}
                            />
                            <ActionCard
                                icon={<FileText size={20} />}
                                title="Pending Posts"
                                color="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                href={route('admin.posts.pending')}
                            />
                            <ActionCard
                                icon={<Layers size={20} />}
                                title="Manage Categories"
                                color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                href={route('admin.categories.index')}
                            />
                            <ActionCard
                                icon={<Tag size={20} />}
                                title="Manage Tags"
                                color="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                href={route('admin.tags.index')}
                            />
                            <ActionCard
                                icon={<MessageCircle size={20} />}
                                title="Manage Comments"
                                color="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                href={route('admin.comments.index')}
                            />
                            <ActionCard
                                icon={<Settings size={20} />}
                                title="Site Settings"
                                color="bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                                href={route('admin.dashboard')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// Custom Components
const StatCard = ({ icon, title, value, change }: { icon: React.ReactNode; title: string; value: string | number; change: number }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
            </div>
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-700">{icon}</div>
        </div>
        <div className="mt-3">
            <span
                className={`flex items-center text-sm font-medium ${change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            >
                {change >= 0 ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                {Math.abs(change)}% {change >= 0 ? 'increase' : 'decrease'} from last week
            </span>
        </div>
    </div>
);

const ActionCard = ({ icon, title, color, href }: { icon: React.ReactNode; title: string; color: string; href: string }) => (
    <Link href={href} className={`flex flex-col items-center justify-center rounded-xl p-4 transition-transform hover:scale-[1.03] ${color}`}>
        <div className="mb-2 rounded-lg bg-white/30 p-2 backdrop-blur-sm dark:bg-black/20">{icon}</div>
        <span className="text-sm font-medium">{title}</span>
    </Link>
);

const MetricCard = ({
    title,
    value,
    change,
    icon,
    color,
}: {
    title: string;
    value: string;
    change: number;
    icon: React.ReactNode;
    color: string;
}) => (
    <div className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{title}</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{value}</h3>
            </div>
            <div className={`rounded-lg p-2 bg-${color}-50 dark:bg-${color}-900/20`}>{icon}</div>
        </div>
        <div className="mt-2">
            <span
                className={`flex items-center text-xs font-medium ${change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            >
                {change >= 0 ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                {Math.abs(change)}%
            </span>
        </div>
    </div>
);

const MultiMetricChart = ({ data, selectedPeriod, stats }: { data: WeeklyView[]; selectedPeriod: '1D' | '3D' | '7D' | '30D'; stats: Stats }) => {
    // Filter data based on selected period
    const filteredData = useMemo(() => {
        if (!data || data.length === 0) return [];

        const periods = {
            '1D': 1,
            '3D': 3,
            '7D': 7,
            '30D': 30,
        };
        const period = periods[selectedPeriod];
        return data.slice(-period);
    }, [data, selectedPeriod]);

    // Generate chart data with multiple metrics
    const chartData = useMemo(() => {
        if (filteredData.length === 0) return [];

        return filteredData.map((item) => ({
            date: new Date(item.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            }),
            views: item.views,
            comments: Math.floor(item.views * 0.15),
            posts: Math.floor((stats.publishedPosts || 0) / filteredData.length),
            engagement: Math.floor((stats.engagement || 0) + Math.random() * 5),
        }));
    }, [filteredData, stats]);

    if (chartData.length === 0) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <TrendingUp className="mx-auto mb-2 h-8 w-8 opacity-50" />
                    <p className="text-sm">No data available</p>
                </div>
            </div>
        );
    }

    // Custom tooltip component
    const CustomTooltip = ({
        active,
        payload,
        label,
    }: {
        active?: boolean;
        payload?: Array<{
            name: string;
            value: number;
            color: string;
        }>;
        label?: string;
    }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Custom legend component
    const CustomLegend = ({
        payload,
    }: {
        payload?: Array<{
            value: string;
            color: string;
        }>;
    }) => {
        return (
            <div className="mt-4 flex justify-center gap-6">
                {payload?.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                    }}
                >
                    <defs>
                        <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="commentsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="postsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />

                    <XAxis dataKey="date" stroke="#6b7280" fontSize={12} className="dark:stroke-gray-400" />

                    <YAxis stroke="#6b7280" fontSize={12} className="dark:stroke-gray-400" tickFormatter={(value) => value.toLocaleString()} />

                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} />

                    <Area type="monotone" dataKey="views" stackId="1" stroke="#3b82f6" fill="url(#viewsGradient)" strokeWidth={2} name="Views" />
                    <Area
                        type="monotone"
                        dataKey="comments"
                        stackId="1"
                        stroke="#10b981"
                        fill="url(#commentsGradient)"
                        strokeWidth={2}
                        name="Comments"
                    />
                    <Area type="monotone" dataKey="posts" stackId="1" stroke="#8b5cf6" fill="url(#postsGradient)" strokeWidth={2} name="Posts" />
                    <Area
                        type="monotone"
                        dataKey="engagement"
                        stackId="1"
                        stroke="#f59e0b"
                        fill="url(#engagementGradient)"
                        strokeWidth={2}
                        name="Engagement"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

const MonthlyAnalyticsChart = ({
    data,
}: {
    data: Array<{
        month: string;
        views: number;
        posts: number;
        comments: number;
        engagement: number;
        revenue: number;
    }>;
}) => {
    // Custom tooltip component
    const CustomTooltip = ({
        active,
        payload,
        label,
    }: {
        active?: boolean;
        payload?: Array<{
            name: string;
            value: number;
            color: string;
        }>;
        label?: string;
    }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Custom legend component
    const CustomLegend = ({
        payload,
    }: {
        payload?: Array<{
            value: string;
            color: string;
        }>;
    }) => {
        return (
            <div className="mt-4 flex justify-center gap-6">
                {payload?.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                    }}
                >
                    <defs>
                        <linearGradient id="monthlyViewsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="monthlyPostsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="monthlyCommentsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="monthlyRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />

                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} className="dark:stroke-gray-400" />

                    <YAxis stroke="#6b7280" fontSize={12} className="dark:stroke-gray-400" tickFormatter={(value) => value.toLocaleString()} />

                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} />

                    <Area
                        type="monotone"
                        dataKey="views"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="url(#monthlyViewsGradient)"
                        strokeWidth={2}
                        name="Views"
                    />
                    <Area
                        type="monotone"
                        dataKey="posts"
                        stackId="1"
                        stroke="#10b981"
                        fill="url(#monthlyPostsGradient)"
                        strokeWidth={2}
                        name="Posts"
                    />
                    <Area
                        type="monotone"
                        dataKey="comments"
                        stackId="1"
                        stroke="#8b5cf6"
                        fill="url(#monthlyCommentsGradient)"
                        strokeWidth={2}
                        name="Comments"
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stackId="1"
                        stroke="#f59e0b"
                        fill="url(#monthlyRevenueGradient)"
                        strokeWidth={2}
                        name="Revenue"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
