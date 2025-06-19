import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    Bell,
    CheckCircle,
    Clock,
    FileText,
    FolderOpen,
    Heart,
    LayoutGrid,
    Plus,
    Settings,
    Shield,
    TrendingUp,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user?.role === 'A';

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Create Post',
            href: '/dashboard/posts/create',
            icon: Plus,
        },
        {
            title: 'My Posts',
            href: '/dashboard/posts',
            icon: FileText,
        },
        {
            title: 'Analytics',
            href: '/dashboard/analytics',
            icon: BarChart3,
        },
        {
            title: 'Liked Posts',
            href: '/dashboard/liked-posts',
            icon: Heart,
        },
        {
            title: 'Notifications',
            href: '/dashboard/notifications',
            icon: Bell,
        },
        {
            title: 'Profile',
            href: '/dashboard/profile',
            icon: Settings,
        },
    ];

    // Admin-specific navigation items
    const adminNavItems: NavItem[] = [
        {
            title: 'Admin Dashboard',
            href: '/admin/dashboard',
            icon: Shield,
        },
        {
            title: 'All Posts',
            href: '/admin/posts',
            icon: FileText,
        },
        {
            title: 'Pending Posts',
            href: '/admin/posts/pending',
            icon: Clock,
        },
        {
            title: 'Categories',
            href: '/admin/categories',
            icon: FolderOpen,
        },
        {
            title: 'Users',
            href: '/admin/users',
            icon: Users,
        },
        {
            title: 'Comments',
            href: '/admin/comments',
            icon: CheckCircle,
        },
        {
            title: 'Site Analytics',
            href: '/admin/analytics',
            icon: TrendingUp,
        },
    ];

    const navItems = isAdmin ? adminNavItems : mainNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={isAdmin ? '/admin/dashboard' : '/dashboard'} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
