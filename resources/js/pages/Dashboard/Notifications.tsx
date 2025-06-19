import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Bell, CheckCircle, Eye, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Notifications',
        href: '/dashboard/notifications',
    },
];

interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
    data: Record<string, unknown>;
}

interface NotificationsProps {
    notifications: {
        data: Notification[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Notifications({ notifications }: NotificationsProps) {
    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'post_approved':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'post_rejected':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Bell className="h-5 w-5 text-blue-500" />;
        }
    };

    const getNotificationBadge = (type: string) => {
        switch (type) {
            case 'post_approved':
                return (
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Approved
                    </Badge>
                );
            case 'post_rejected':
                return (
                    <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        Rejected
                    </Badge>
                );
            default:
                return <Badge variant="secondary">Info</Badge>;
        }
    };

    const markAsRead = (notificationId: number) => {
        router.post(
            route('dashboard.notifications.mark-read'),
            {
                notification_id: notificationId,
            },
            {
                onSuccess: () => {
                    toast.success('Notification marked as read');
                },
                onError: () => {
                    toast.error('Failed to mark notification as read');
                },
            },
        );
    };

    const markAllAsRead = () => {
        router.post(
            route('dashboard.notifications.mark-all-read'),
            {},
            {
                onSuccess: () => {
                    toast.success('All notifications marked as read');
                },
                onError: () => {
                    toast.error('Failed to mark notifications as read');
                },
            },
        );
    };

    const unreadCount = notifications.data.filter((n) => !n.is_read).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                        <p className="text-muted-foreground">Stay updated with your post status and activity.</p>
                    </div>
                    {unreadCount > 0 && (
                        <Button onClick={markAllAsRead} variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            Mark all as read
                        </Button>
                    )}
                </div>

                {/* Notifications List */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Notifications</CardTitle>
                        <CardDescription>{unreadCount > 0 ? `${unreadCount} unread notifications` : 'All notifications read'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {notifications.data.length > 0 ? (
                                notifications.data.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`flex items-start space-x-4 rounded-lg border p-4 transition-colors ${
                                            notification.is_read
                                                ? 'bg-muted/50 hover:bg-muted/70'
                                                : 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30'
                                        }`}
                                    >
                                        <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <h3 className="font-medium">{notification.title}</h3>
                                                    {getNotificationBadge(notification.type)}
                                                    {!notification.is_read && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            New
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-muted-foreground text-sm">{notification.created_at}</span>
                                                    {!notification.is_read && (
                                                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground text-sm">{notification.message}</p>
                                            {notification.data?.post_slug && (
                                                <div className="pt-2">
                                                    <Button asChild variant="outline" size="sm">
                                                        <Link href={route('posts.show', notification.data.post_slug as string)}>View Post</Link>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-12 text-center">
                                    <Bell className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                    <h3 className="text-muted-foreground mb-2 text-lg font-medium">No notifications</h3>
                                    <p className="text-muted-foreground">You're all caught up! New notifications will appear here.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {notifications.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-muted-foreground text-sm">
                                    Showing {(notifications.current_page - 1) * notifications.per_page + 1} to{' '}
                                    {Math.min(notifications.current_page * notifications.per_page, notifications.total)} of {notifications.total}{' '}
                                    notifications
                                </div>
                                <div className="flex items-center space-x-2">
                                    {notifications.current_page > 1 && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => router.get(route('dashboard.notifications'), { page: notifications.current_page - 1 })}
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    {notifications.current_page < notifications.last_page && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => router.get(route('dashboard.notifications'), { page: notifications.current_page + 1 })}
                                        >
                                            Next
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
