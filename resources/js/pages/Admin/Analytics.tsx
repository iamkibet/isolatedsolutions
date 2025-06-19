import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    CheckCircle,
    Clock,
    Crown,
    Eye,
    FileText,
    MessageCircle,
    TrendingUp,
    User,
    Users,
} from 'lucide-react';
import { useMemo } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Stats {
    totalUsers: number;
    activeUsers: number;
    adminUsers: number;
    newUsersThisMonth: number;
    totalPosts: number;
    publishedPosts: number;
    pendingPosts: number;
    postsThisMonth: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    engagementRate: number;
}

interface MonthlyStat {
    month: number;
    year: number;
    posts_count: number;
    total_views: number;
}

interface TopPost {
    id: number;
    title: string;
    slug: string;
    views: number;
    reactions_count: number;
    comments_count: number;
    created_at: string;
    user: {
        name: string;
    };
    category: {
        name: string;
    } | null;
}

interface CategoryPerformance {
    id: number;
    name: string;
    posts_count: number;
    posts_views_sum: number;
}

interface ActiveUser {
    id: number;
    name: string;
    posts_count: number;
    posts_views_sum: number;
}

interface Props {
    stats: Stats;
    monthlyStats: MonthlyStat[];
    topPosts: TopPost[];
    categoryPerformance: CategoryPerformance[];
    activeUsersList: ActiveUser[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Analytics',
        href: '/admin/analytics',
    },
];

export default function Analytics({ stats, monthlyStats, topPosts, categoryPerformance, activeUsersList }: Props) {
    // Format monthly stats for charts
    const chartData = useMemo(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return months.map((month, index) => {
            const monthData = monthlyStats.find((stat) => stat.month === index + 1);
            return {
                month,
                posts: monthData?.posts_count || 0,
                views: monthData?.total_views || 0,
            };
        });
    }, [monthlyStats]);

    // Format category performance for chart
    const categoryChartData = useMemo(() => {
        return categoryPerformance.slice(0, 8).map((category) => ({
            name: category.name,
            posts: category.posts_count,
            views: category.posts_views_sum || 0,
        }));
    }, [categoryPerformance]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Analytics" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Site Analytics</h1>
                        <p className="text-gray-600 dark:text-gray-400">Comprehensive overview of your platform's performance.</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard icon={<Users className="text-blue-500" size={20} />} title="Total Users" value={stats.totalUsers} change={+12.5} />
                    <StatCard icon={<User className="text-green-500" size={20} />} title="Active Users" value={stats.activeUsers} change={+8.2} />
                    <StatCard icon={<Crown className="text-purple-500" size={20} />} title="Admin Users" value={stats.adminUsers} change={+2.1} />
                    <StatCard
                        icon={<Clock className="text-orange-500" size={20} />}
                        title="New This Month"
                        value={stats.newUsersThisMonth}
                        change={+15.3}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard icon={<FileText className="text-indigo-500" size={20} />} title="Total Posts" value={stats.totalPosts} change={+5.7} />
                    <StatCard
                        icon={<CheckCircle className="text-green-500" size={20} />}
                        title="Published Posts"
                        value={stats.publishedPosts}
                        change={+3.2}
                    />
                    <StatCard icon={<Clock className="text-yellow-500" size={20} />} title="Pending Posts" value={stats.pendingPosts} change={-1.8} />
                    <StatCard
                        icon={<TrendingUp className="text-blue-500" size={20} />}
                        title="Posts This Month"
                        value={stats.postsThisMonth}
                        change={+7.4}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <StatCard
                        icon={<Eye className="text-green-500" size={20} />}
                        title="Total Views"
                        value={stats.totalViews.toLocaleString()}
                        change={+12.4}
                    />
                    <StatCard
                        icon={<MessageCircle className="text-blue-500" size={20} />}
                        title="Total Comments"
                        value={stats.totalComments}
                        change={+6.8}
                    />
                    <StatCard
                        icon={<BarChart3 className="text-purple-500" size={20} />}
                        title="Engagement Rate"
                        value={`${stats.engagementRate}%`}
                        change={+2.1}
                    />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Monthly Posts & Views Chart */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Monthly Activity</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="posts" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                                <Area type="monotone" dataKey="views" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Category Performance Chart */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Category Performance</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={categoryChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="posts" fill="#3B82F6" />
                                <Bar dataKey="views" fill="#10B981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Posts and Active Users */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Top Performing Posts */}
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Performing Posts</h3>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {topPosts.slice(0, 5).map((post, index) => (
                                <div key={post.id} className="px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <Link
                                                    href={route('posts.show', post.slug)}
                                                    className="text-sm font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                                                >
                                                    {post.title}
                                                </Link>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">by {post.user.name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {post.views.toLocaleString()} views
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {post.reactions_count} likes • {post.comments_count} comments
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Most Active Users */}
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Most Active Users</h3>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {activeUsersList.slice(0, 5).map((user, index) => (
                                <div key={user.id} className="px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{user.posts_count} posts</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {user.posts_views_sum?.toLocaleString() || 0} views
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

const StatCard = ({ icon, title, value, change }: { icon: React.ReactNode; title: string; value: string | number; change: number }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
            </div>
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-700">{icon}</div>
        </div>
        <div className="mt-4 flex items-center">
            {change >= 0 ? <ArrowUpRight className="h-4 w-4 text-green-500" /> : <ArrowDownRight className="h-4 w-4 text-red-500" />}
            <span className={`ml-1 text-sm font-medium ${change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {Math.abs(change)}%
            </span>
            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">from last month</span>
        </div>
    </div>
);
