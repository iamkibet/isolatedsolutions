import AppLogo from '@/components/app-logo';
import BorderHover from '@/components/Hover/BorderHover';
import Footer from '@/components/main-footer';
import AboutLinks from '@/components/Nav/NavAboutUsLinks';
import IndustriesLinks from '@/components/Nav/NavIndustriesLinks';
import ServicesLinks from '@/components/Nav/NavServicesLinks';
import NavTechnologiesLinks from '@/components/Nav/NavTechnologiesLinks';
import NavWorkLinks from '@/components/Nav/NavWorkLinks';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head, Link } from '@inertiajs/react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface DropdownMenuItemProps {
    title: string;
    children: React.ReactNode;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    show: boolean;
}

interface MobileMenuSectionProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const MobileMenuSection: React.FC<MobileMenuSectionProps> = ({ title, children, isOpen, onToggle }) => (
    <div className="border-b border-gray-100">
        <button onClick={onToggle} className="flex w-full items-center justify-between px-6 py-4 text-gray-700 hover:bg-gray-50">
            <span className="font-medium">{title}</span>
            <ArrowRight className={`h-5 w-5 text-red-600 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
        </button>
        {isOpen && <div className="bg-gray-50">{children}</div>}
    </div>
);

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ title, children, onMouseEnter, onMouseLeave, show }) => (
    <div className="group relative hover:cursor-pointer" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <BorderHover>
            <span className="transition-colors duration-200 hover:text-red-600">{title}</span>
        </BorderHover>
        <div
            className={`${
                show ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            } pointer-events-none absolute -right-40 min-w-max rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ease-out group-hover:pointer-events-auto`}
        >
            <div className="grid gap-4">{children}</div>
        </div>
    </div>
);

gsap.registerPlugin(ScrollTrigger);

const PageLayout = ({ children }: { children: React.ReactNode }) => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [openSections, setOpenSections] = useState<{
        [key: string]: boolean;
    }>({});
    const [isScrolled, setIsScrolled] = useState(false);
    const navbarRef = useRef<HTMLElement>(null);
    const mobileNavRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        // Integrate Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Navbar scroll animation
        const handleScroll = () => {
            if (navbarRef.current) {
                const scrollPosition = window.scrollY;
                const opacity = Math.min(scrollPosition / 100, 1);
                setIsScrolled(scrollPosition > 0);

                gsap.to(navbarRef.current, {
                    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                    backdropFilter: `blur(${opacity * 10}px)`,
                    boxShadow: opacity > 0 ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                    duration: 0.3,
                });
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Mobile menu animation
        if (mobileNavRef.current) {
            gsap.set(mobileNavRef.current, {
                x: '100%',
            });
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    useEffect(() => {
        if (mobileNavRef.current) {
            gsap.to(mobileNavRef.current, {
                x: showMobileNav ? '0%' : '100%',
                duration: 0.5,
                ease: 'power3.inOut',
            });
        }
    }, [showMobileNav]);

    const toggleSection = (section: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const menuItems = [
        { title: 'Services', Component: ServicesLinks },
        { title: 'Technologies', Component: NavTechnologiesLinks },
        { title: 'Industries', Component: IndustriesLinks },
        { title: 'Work', Component: NavWorkLinks },
        { title: 'About', Component: AboutLinks },
    ];

    const mobileMenuSections = [
        {
            title: 'Services',
            items: [
                { title: 'Web Development', route: 'services.web-development' },
                { title: 'App Development', route: 'services.app-development' },
                { title: 'E-commerce', route: 'services.ecommerce' },
                { title: 'Consulting', route: 'services.consulting' },
                { title: 'Software Testing', route: 'services.software-testing' },
                { title: 'DevOps', route: 'services.devops' },
                { title: 'Cloud Integration', route: 'services.cloud-integration' },
            ],
        },
        {
            title: 'Technologies',
            items: [
                { title: 'Mobile', route: 'technologies.mobile' },
                { title: 'Cloud', route: 'technologies.cloud' },
                { title: 'CMS', route: 'technologies.cms' },
                { title: 'Frontend', route: 'technologies.frontend' },
                { title: 'Backend', route: 'technologies.backend' },
                { title: 'Full Stack', route: 'technologies.fullstack' },
            ],
        },
        {
            title: 'Industries',
            items: [
                { title: 'eCommerce', route: 'industries.ecommerce' },
                { title: 'SaaS', route: 'industries.saas' },
                { title: 'FinTech', route: 'industries.fintech' },
                { title: 'EdTech', route: 'industries.edtech' },
                { title: 'Wellness', route: 'industries.wellness' },
                { title: 'AgriTech', route: 'industries.agritech' },
                { title: 'Insurance', route: 'industries.insurance' },
                { title: 'Government', route: 'industries.government' },
            ],
        },
        {
            title: 'Other',
            items: [
                { title: 'Our Work', route: 'work.index' },
                { title: 'Portfolio', route: 'work.portfolio' },
                { title: 'Case Studies', route: 'work.case-studies' },
                { title: 'About Us', route: 'about-us' },
                { title: 'Products', route: 'products.index' },
            ],
        },
    ];

    return (
        <>
            <Head>
                <meta name="csrf-token" content={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
            </Head>
            <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
                <div className="relative flex flex-col">
                    <nav
                        ref={navbarRef}
                        className="fixed top-0 z-[100] w-full transition-all duration-300"
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <MaxWidthWrapper>
                            <div className="flex h-20 items-center justify-between">
                                <Link href="/" className="flex-shrink-0">
                                    <AppLogo isScrolled={isScrolled} />
                                </Link>

                                {/* Desktop Navigation */}
                                <div className={`hidden items-center space-x-8 text-lg font-bold md:flex ${isScrolled ? 'text-gray-900' : ''}`}>
                                    {menuItems.map(({ title, Component }) => (
                                        <DropdownMenuItem
                                            key={title}
                                            title={title}
                                            onMouseEnter={() => setActiveDropdown(title)}
                                            onMouseLeave={() => setActiveDropdown(null)}
                                            show={activeDropdown === title}
                                        >
                                            <Component />
                                        </DropdownMenuItem>
                                    ))}
                                    <Link
                                        href={route('products.index')}
                                        className="group relative animate-pulse overflow-hidden rounded-xl px-4 py-2 hover:animate-none"
                                    >
                                        Products
                                        <span className="absolute top-0 left-0 h-full w-0.5 origin-top scale-y-100 transform bg-gradient-to-r from-red-500 to-purple-600 transition-transform duration-300"></span>
                                        <span className="absolute top-0 right-0 h-full w-0.5 origin-bottom scale-y-100 transform bg-gradient-to-r from-red-500 to-purple-600 transition-transform duration-300"></span>
                                    </Link>

                                    <Link
                                        href={route('contact')}
                                        className="rounded-md bg-red-600 px-5 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-red-700"
                                    >
                                        Contact Us
                                    </Link>
                                </div>

                                
                                {/* Mobile Navigation Toggle */}
                                <button
                                    onClick={() => setShowMobileNav(!showMobileNav)}
                                    className={`p-2 transition-colors hover:text-red-700 md:hidden ${isScrolled ? 'text-red-600' : 'text-white'}`}
                                >
                                    {showMobileNav ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </button>
                            </div>
                        </MaxWidthWrapper>
                    </nav>

                    {/* Mobile Navigation */}
                    <div
                        ref={mobileNavRef}
                        className="fixed inset-x-0 top-20 z-40 h-[calc(100vh-5rem)] overflow-y-auto bg-white/95 backdrop-blur-md md:hidden"
                    >
                        <div className="divide-y divide-gray-100">
                            {mobileMenuSections.map((section) => (
                                <MobileMenuSection
                                    key={section.title}
                                    title={section.title}
                                    isOpen={openSections[section.title] || false}
                                    onToggle={() => toggleSection(section.title)}
                                >
                                    {section.items.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={route(item.route)}
                                            className="flex items-center justify-between px-8 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        >
                                            <span className="font-medium">{item.title}</span>
                                            <ArrowRight className="h-4 w-4 text-red-600" />
                                        </Link>
                                    ))}
                                </MobileMenuSection>
                            ))}
                            <div className="px-6 py-4">
                                <Link
                                    href={route('contact')}
                                    className="block w-full rounded-md bg-red-600 px-4 py-2.5 text-center font-medium text-white transition-colors hover:bg-red-700"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Page Content */}
                    <main className="pt-20">{children}</main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default PageLayout;
