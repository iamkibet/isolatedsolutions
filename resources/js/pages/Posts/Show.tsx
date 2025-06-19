import Comments from '@/components/Comments';
import PageLayout from '@/layouts/page-layout';
import { Link, router, usePage } from '@inertiajs/react';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';
import { Calendar, EditIcon, Eye, User } from 'lucide-react';
import MarkdownIt from 'markdown-it';
import React, { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import 'react-markdown-editor-lite/lib/index.css';

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);

// Configure markdown parser properly with proper typing
const mdParser: MarkdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    highlight: function (str: string, lang: string): string {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code class="hljs language-${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>`;
            } catch (e) {
                console.warn('Highlighting failed for language:', lang, e);
            }
        }
        return `<pre class="hljs"><code>${mdParser.utils.escapeHtml(str)}</code></pre>`;
    },
});

interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    created_at: string;
    views: number;
    featured_image: string | null;
    featured_image_url: string | null;
    user: {
        id: number;
        name: string;
    };
    category?: {
        id: number;
        name: string;
        slug: string;
    };
    tags: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
}

interface Comment {
    id: number;
    comment: string;
    created_at: string;
    formatted_date: string;
    user: {
        id: number;
        name: string;
    };
    replies: Comment[];
}

interface Props {
    post: Post;
    likes_count: number;
    dislikes_count: number;
    user_reaction: string;
    comments: Comment[];
}

const Show: React.FC<Props> = ({ post, likes_count, dislikes_count, user_reaction, comments }) => {
    const { auth } = usePage().props as unknown as { auth: { user: { id: number; role?: string } | null } };

    // Memoize the rendered content for performance
    const renderedContent = useMemo(() => {
        try {
            if (!post.content) {
                return '<p>No content available.</p>';
            }
            return mdParser.render(post.content);
        } catch (error) {
            console.error('Error rendering markdown:', error);
            return `<p>Error rendering content. Raw content:</p><pre>${post.content}</pre>`;
        }
    }, [post.content]);

    const handleReaction = (type: 'like' | 'dislike') => {
        router.post(
            route(`posts.${type === 'like' ? 'thumbsUp' : 'thumbsDown'}`, post.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`Post ${type === 'like' ? 'liked' : 'disliked'} successfully!`);
                },
                onError: () => {
                    toast.error('You must be logged in to react to posts.');
                },
            },
        );
    };

    const ReactionButton = ({ type, count, active, onClick }: { type: 'like' | 'dislike'; count: number; active: boolean; onClick: () => void }) => {
        const config = {
            like: { emoji: '👍', label: 'Like', activeClass: 'bg-green-50 text-green-700 ring-green-200' },
            dislike: { emoji: '👎', label: 'Dislike', activeClass: 'bg-red-50 text-red-700 ring-red-200' },
        };

        const { emoji, label, activeClass } = config[type];

        return (
            <button
                onClick={onClick}
                className={`flex items-center space-x-1.5 rounded-full px-3.5 py-2 text-sm font-medium ring-1 ring-gray-200 transition-all ${
                    active ? activeClass : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                aria-label={`${label} this post`}
            >
                <span className="text-base">{emoji}</span>
                <span className="font-sans">{count}</span>
            </button>
        );
    };

    return (
        <PageLayout>
            <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
                {/* Featured Image Section */}
                {post.featured_image_url && (
                    <div className="mb-6 overflow-hidden rounded-2xl shadow-lg">
                        <div className="relative aspect-[16/8] w-full">
                            <img src={post.featured_image_url} alt={post.title} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
                        </div>
                    </div>
                )}

                <div className="mx-auto max-w-3xl">
                    {/* Header Section */}
                    <header className="mb-10">
                        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <span className="font-medium text-gray-700">{post.user.name}</span>
                            </div>
                            <span className="hidden text-gray-300 sm:inline">•</span>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <time dateTime={post.created_at} className="font-medium">
                                    {new Date(post.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </div>
                            <span className="hidden text-gray-300 sm:inline">•</span>
                            <div className="flex items-center space-x-2">
                                <Eye className="h-4 w-4 text-gray-400" />
                                <span className="font-medium">{post.views.toLocaleString()} views</span>
                            </div>
                        </div>

                        <h1 className="mb-5 scroll-mt-24 text-4xl font-bold text-gray-900 sm:text-5xl md:text-[3.2rem] md:leading-[1.15]">
                                {post.title}
                                <span className="mt-4 block h-1.5 w-20 bg-gradient-to-r from-red-400 to-orange-300 sm:mt-5 sm:h-2 sm:w-24"></span>
                            </h1>

                            <div className="mb-8 flex flex-wrap items-center gap-4">
                                {post.category && (
                                    <div className="inline-flex items-center rounded-full bg-gradient-to-r from-red-50 to-orange-50 px-4 py-1.5 text-sm font-medium text-red-600 shadow-sm">
                                        {post.category.name}
                                    </div>
                                )}

                                {post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <div
                                                key={tag.id}
                                                className="rounded-full bg-gray-50 px-3.5 py-1.5 text-xs font-medium text-gray-600 transition-colors"
                                            >
                                                <span className="text-red-500">#</span>
                                                {tag.name}
                                            </div>
                                        ))}
                                    </div>
                            )}
                            </div>
                    </header>

                    {/* Content Section */}
                    <section className="mb-16">
                        <article
                            className="prose prose-lg prose-headings:font-bold prose-headings:text-[#242424] prose-headings:mb-4 prose-headings:no-underline prose-h1:text-4xl prose-h1:mb-6 prose-h1:leading-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5 prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-p:text-[20px] prose-p:leading-[1.8] prose-p:mb-6 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-a:font-normal prose-blockquote:border-l-4 prose-blockquote:border-red-300 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#242424cc] prose-blockquote:bg-[#fafafa] prose-blockquote:py-1 prose-blockquote:my-8 prose-pre:bg-[#f6f8fa] prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-200 prose-pre:shadow-sm prose-pre:p-5 prose-code:before:content-none prose-code:after:content-none prose-code:bg-[#f6f8fa] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8 prose-ul:list-none prose-ul:pl-0 prose-ul:my-6 prose-li:pl-7 prose-li:relative prose-li:mb-3 prose-li:text-[20px] prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-1 prose-li:before:top-3 prose-li:before:w-1.5 prose-li:before:h-1.5 prose-li:before:bg-red-400 prose-li:before:rounded-full prose-hr:my-10 prose-hr:border-t prose-hr:border-gray-200 max-w-none font-[Charter,Georgia,serif] text-[#242424]"
                            dangerouslySetInnerHTML={{ __html: renderedContent }}
                        />
                    </section>

                    {/* Footer Actions */}
                    <footer className="border-t border-gray-200 pt-8">
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
                            <div className="flex space-x-3">
                                <ReactionButton
                                    type="like"
                                    count={likes_count}
                                    active={user_reaction === 'like'}
                                    onClick={() => handleReaction('like')}
                                />

                                <ReactionButton
                                    type="dislike"
                                    count={dislikes_count}
                                    active={user_reaction === 'dislike'}
                                    onClick={() => handleReaction('dislike')}
                                />
                            </div>

                            {auth.user && auth.user.id === post.user.id && (
                                <Link
                                    href={route('admin.posts.edit', post.id)}
                                    className="inline-flex items-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-md hover:ring-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                >
                                    <EditIcon className="mr-2 -ml-0.5 h-4 w-4" />
                                    Edit Post
                                </Link>
                            )}
                        </div>
                    </footer>

                    {/* Comments Section */}
                    <Comments comments={comments} postId={post.id} isAdmin={auth.user?.role === 'A'} />
                </div>
            </article>
        </PageLayout>
    );
};

export default Show;
