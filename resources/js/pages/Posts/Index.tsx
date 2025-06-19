import { Pagination } from '@/components/Pagination';
import PageLayout from '@/layouts/page-layout';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRightIcon, PlusIcon, TagIcon } from 'lucide-react';
import React, { useState } from 'react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    created_at: string;
    views: number;
    likes_count: number;
    dislikes_count: number;
    featured_image: string | null;
    featured_image_url: string | null;
    user: {
        name: string;
    };
    category?: {
        id: number;
        name: string;
        slug: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    posts: {
        data: Post[];
        links: PaginationLink[];
    };
    categories: Category[];
}

const Index: React.FC<Props> = ({ posts, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categoryNames = ['All', ...categories.map((cat) => cat.name)];
    const { auth } = usePage().props as unknown as { auth: { user: { id: number } | null } };

    const filteredPosts = selectedCategory === 'All' ? posts.data : posts.data.filter((post) => post.category?.name === selectedCategory);

    return (
        <PageLayout>
            {/* Hero Section - More Elegant Design */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-20">
                {/* Subtle Animated Background */}
                <div className="absolute inset-0">
                    {/* Geometric Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]"></div>

                    {/* Animated Gradient Highlights */}
                    <div className="animate-pulse-slow absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-red-50 to-transparent blur-[100px]"></div>
                    <div className="animate-pulse-slow animation-delay-3000 absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-red-100/50 to-transparent blur-[100px]"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
                    <h1 className="mb-5 text-4xl font-bold text-gray-900 md:text-5xl">
                        <span className="block bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Latest Insights</span>
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-xl font-light text-gray-700">Thoughts, ideas, and industry perspectives</p>
                    <p className="mx-auto mb-10 max-w-2xl text-gray-600">
                        Explore our collection of articles covering the latest in technology, design, and business innovation
                    </p>

                    <div className="flex flex-col justify-center gap-3 sm:flex-row">
                        {auth.user && (
                            <Link
                                href={route('admin.posts.create')}
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-5 py-3 font-medium text-white shadow-md transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-lg"
                            >
                                <span className="relative z-10 flex items-center text-base font-semibold">
                                    <PlusIcon className="mr-2 h-5 w-5" />
                                    Create Post
                                </span>
                            </Link>
                        )}

                        <Link
                            href="#categories"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md"
                        >
                            <span className="relative z-10 flex items-center text-base font-semibold">
                                <TagIcon className="mr-2 h-5 w-5" />
                                View Categories
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Posts Section */}
            <div className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Categories Filter - More Refined */}
                    <div id="categories" className="mb-12">
                        <h2 className="mb-5 text-2xl font-bold text-gray-900">Browse Categories</h2>
                        <div
                            className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex gap-2 overflow-x-auto py-2"
                            style={{ maxWidth: '100%' }}
                        >
                            {categoryNames.map((category, idx) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                                        category === selectedCategory
                                            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                                            : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                    style={{ flex: '0 0 auto', display: idx < 6 ? 'block' : 'none' }}
                                >
                                    {category}
                                </button>
                            ))}
                            {categoryNames.length > 6 && <div className="flex items-center px-2 text-gray-400">Scroll &rarr;</div>}
                        </div>
                    </div>

                    {/* Featured Post - Balanced Layout */}
                    {filteredPosts.length > 0 && filteredPosts[0] && (
                        <div className="mb-16 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="flex flex-col justify-between p-6 sm:p-8">
                                    <div>
                                        <div className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-red-600 to-red-700 px-3 py-1 text-sm font-medium text-white">
                                            Featured Post
                                        </div>
                                        <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                                            <Link href={route('posts.show', filteredPosts[0].slug)} className="transition-colors hover:text-red-600">
                                                {filteredPosts[0].title}
                                            </Link>
                                        </h2>
                                        <p className="mb-6 text-gray-700">{filteredPosts[0].excerpt}</p>
                                    </div>

                                    <div>
                                        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white">
                                                    {filteredPosts[0].user.name.charAt(0)}
                                                </div>
                                                <span className="font-medium">{filteredPosts[0].user.name}</span>
                                            </div>
                                            <span>•</span>
                                            <span>{new Date(filteredPosts[0].created_at).toLocaleDateString()}</span>
                                            {filteredPosts[0].category && (
                                                <>
                                                    <span>•</span>
                                                    <Link
                                                        href={`/categories/${filteredPosts[0].category.slug}`}
                                                        className="rounded-full bg-red-50 px-3 py-1 text-red-600 transition-colors hover:bg-red-100"
                                                    >
                                                        {filteredPosts[0].category.name}
                                                    </Link>
                                                </>
                                            )}
                                        </div>

                                        <Link
                                            href={route('posts.show', filteredPosts[0].slug)}
                                            className="group inline-flex items-center font-medium text-red-600 hover:text-red-700"
                                        >
                                            Read full article
                                            <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Consistent Image Aspect Ratio */}
                                <div className="relative aspect-[5/3] bg-gray-100">
                                    {filteredPosts[0].featured_image_url ? (
                                        <img
                                            src={filteredPosts[0].featured_image_url}
                                            alt={filteredPosts[0].title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="h-16 w-16 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"></div>
                                                <div className="h-2 w-12 rounded-full bg-gray-200"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Posts Grid - Consistent Image Heights */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredPosts.slice(1).map((post) => (
                            <div
                                key={post.id}
                                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                            >
                                {/* Consistent Image Aspect Ratio */}
                                <div className="relative aspect-video overflow-hidden">
                                    {post.featured_image_url ? (
                                        <img
                                            src={post.featured_image_url}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="h-16 w-16 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"></div>
                                                <div className="h-2 w-12 rounded-full bg-gray-200"></div>
                                            </div>
                                        </div>
                                    )}
                                    {post.category && (
                                        <div className="absolute top-3 left-3">
                                            <Link
                                                href={`/categories/${post.category.slug}`}
                                                className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-red-600 backdrop-blur-sm transition-colors hover:bg-white"
                                            >
                                                {post.category.name}
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <div className="p-5">
                                    <h2 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-red-600">
                                        <Link href={route('posts.show', post.slug)}>{post.title}</Link>
                                    </h2>

                                    <p className="mb-5 line-clamp-3 text-gray-700">{post.excerpt}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white">
                                                {post.user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-800">{post.user.name}</div>
                                                <div>{new Date(post.created_at).toLocaleDateString()}</div>
                                            </div>
                                        </div>

                                        <Link href={route('posts.show', post.slug)} className="text-red-600 transition-colors hover:text-red-700">
                                            <ArrowRightIcon className="h-5 w-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12">
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                            <Pagination links={posts.links} />
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Index;
