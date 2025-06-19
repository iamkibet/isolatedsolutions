import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import classnames from 'classnames';
import { useState } from 'react';
import BorderHover from './Hover/BorderHover';
import AppLogo from './app-logo';
import { ArrowRight } from 'lucide-react';

// ==================== Shared Components ====================
interface FooterSection {
    title: string;
    items: { label: string; href: string }[];
}

interface SocialLink {
    icon: React.ReactNode;
    href: string;
    label: string;
}

interface FooterProps {
    title: string;
    children: React.ReactNode;
}

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <li className="group mb-3 transition-colors duration-200">
        <BorderHover>
            <a href={href} className="text-gray-400 transition-colors duration-300 hover:text-white">
                <span className="flex items-center">
                    <svg className="mr-2 h-3 w-3 text-transparent transition-colors group-hover:text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                    {children}
                </span>
            </a>
        </BorderHover>
    </li>
);

const SocialIcon: React.FC<SocialLink> = ({ icon, href, label }) => (
    <a
        href={href}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-all duration-300 hover:scale-110 hover:bg-red-600"
        aria-label={label}
    >
        <span className="text-gray-300 hover:text-white">{icon}</span>
    </a>
);

// ==================== Footer Data Config ====================
const FOOTER_SECTIONS: FooterSection[] = [
    {
        title: 'Who we are',
        items: [
            { label: 'About Us', href: '/about-us' },
            { label: 'Leadership', href: '#' },
            { label: 'FAQs', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Contact Us', href: '#' },
        ],
    },
    {
        title: 'Resources',
        items: [
            { label: 'Blog', href: '/posts' },
            { label: 'Case Studies', href: '#' },
            { label: 'Portfolio', href: '#' },
            { label: 'Documentation', href: '#' },
            { label: 'Community', href: '#' },
        ],
    },
    {
        title: 'Services',
        items: [
            { label: 'Mobile App Development', href: '#' },
            { label: 'Web Development', href: '#' },
            { label: 'UI/UX Design', href: '#' },
            { label: 'QA & Testing', href: '#' },
            { label: 'DevOps & Cloud', href: '#' },
            { label: 'Digital Transformation', href: '#' },
        ],
    },
];

const SOCIAL_LINKS: SocialLink[] = [
    {
        label: 'Facebook',
        href: '#',
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
        ),
    },
    {
        label: 'Twitter',
        href: '#',
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: '#',
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        href: '#',
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        label: 'Dribbble',
        href: '#',
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z" />
            </svg>
        ),
    },
];

// ==================== Mobile Accordion ====================
const MobileFooterAccordion: React.FC<FooterProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 border-b border-gray-800 pb-4 last:border-0 last:pb-0">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between py-2 text-left"
                aria-expanded={isOpen}
            >
                <h2 className="text-base font-medium text-gray-200">{title}</h2>
                <span
                    className={classnames('text-xl text-gray-400 transition-transform duration-200', {
                        'rotate-180': isOpen,
                    })}
                >
                    {isOpen ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                        </svg>
                    ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    )}
                </span>
            </button>
            {isOpen && <ul className="space-y-3 pt-3 pl-2 text-base font-normal text-gray-400">{children}</ul>}
        </div>
    );
};

// ==================== Newsletter Subscription Component ====================
const NewsletterSubscription = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription here
        console.log('Newsletter subscription:', email);
        setEmail('');
    };

    return (
        <div className="space-y-4">
            <div>
                <h3 className="mb-2 text-lg font-semibold text-white">Stay in the loop</h3>
                <p className="mb-4 text-sm text-gray-400">Join our newsletter to get the latest updates and insights</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="Enter your email"
                    required
                />
                <button
                    type="submit"
                    className="rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-red-900/20"
                >
                    Subscribe
                </button>
            </form>
            <p className="mt-2 text-xs text-gray-500">
                We care about your data. Read our{' '}
                <a href="#" className="text-red-500 hover:underline">
                    Privacy Policy
                </a>
            </p>
        </div>
    );
};

// ==================== Main Footer Component ====================
const Footer = () => {
    const renderDesktopSection = (section: FooterSection) => (
        <div key={section.title} className="col-span-1">
            <h2 className="mb-6 text-base font-semibold text-white">{section.title}</h2>
            <ul className="space-y-3">
                {section.items.map((item, index) => (
                    <FooterLink key={index} href={item.href}>
                        {item.label}
                    </FooterLink>
                ))}
            </ul>
        </div>
    );

    const renderMobileSection = (section: FooterSection) => (
        <MobileFooterAccordion key={section.title} title={section.title}>
            {section.items.map((item, index) => (
                <li key={index}>
                    <a href={item.href} className="transition-colors duration-200 hover:text-white">
                        {item.label}
                    </a>
                </li>
            ))}
        </MobileFooterAccordion>
    );

    return (
        <footer className="border-t border-gray-800 bg-gray-900 text-gray-400">
            <div className="relative bg-gray-900 py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="from-gray-100 to-gray-50 relative isolate overflow-hidden rounded-3xl bg-gradient-to-r px-6 py-16 text-center shadow-2xl sm:px-16">
                        <h2 className="mx-auto max-w-2xl text-3xl font-bold text-gray-900">Ready to Digitise Your Business?</h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-700">
                            Discover how our industry-specific solutions can drive innovation, improve efficiency, and create competitive advantages
                            for your business. Schedule a consultation with our experts today.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href={route('work.case-studies')}
                                className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-gray-100 shadow-sm transition-all hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                View Case Studies
                                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <MaxWidthWrapper>
                {/* Desktop View */}
                <div className="hidden pt-16 pb-12 md:block">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <div className="mb-6 flex items-center">
                                <div className="ml-4">
                                    <AppLogo />
                                    <p className="mt-1 text-gray-500">Digital Innovation Studio</p>
                                </div>
                            </div>
                            <p className="mb-6 max-w-md text-gray-500">
                                We craft digital experiences that transform businesses and elevate brands to new heights.
                            </p>
                            <div className="flex space-x-4">
                                {SOCIAL_LINKS.map((props, index) => (
                                    <SocialIcon key={index} {...props} />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-8 lg:col-span-8">
                            {FOOTER_SECTIONS.map(renderDesktopSection)}

                            <div className="col-span-1 lg:col-span-3">
                                <h2 className="mb-6 text-base font-semibold text-white">Newsletter</h2>
                                <NewsletterSubscription />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile View */}
                <div className="py-8 md:hidden">
                    <div className="mb-8 flex justify-center">
                        <div className="text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="h-16 w-16 rounded-xl border-2 border-dashed bg-gray-200" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">IsolatedSolutions</h2>
                            <p className="mt-1 text-gray-500">Digital Innovation Studio</p>
                            <div className="mt-6 flex justify-center space-x-4">
                                {SOCIAL_LINKS.map((props, index) => (
                                    <SocialIcon key={index} {...props} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {FOOTER_SECTIONS.map(renderMobileSection)}

                    <MobileFooterAccordion title="Newsletter">
                        <NewsletterSubscription />
                    </MobileFooterAccordion>
                </div>

                {/* Legal Section (Common for both views) */}
                <div className="border-t border-gray-800 py-8">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <div className="mb-4 text-sm text-gray-500 md:mb-0">
                            © {new Date().getFullYear()} IsolatedSolutions. All rights reserved.
                        </div>

                        <div className="flex space-x-6">
                            {['Terms', 'Privacy', 'Cookies', 'Security'].map((text, index) => (
                                <a key={index} href="#" className="text-sm text-gray-500 transition-colors duration-300 hover:text-gray-300">
                                    {text}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    );
};

export default Footer;
