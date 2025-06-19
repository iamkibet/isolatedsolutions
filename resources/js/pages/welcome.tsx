import Hero from '@/components/Hero';
import HoverCard from '@/components/HoverCard';
import MainLayout from '@/layouts/MainLayout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head, Link } from '@inertiajs/react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        image: '/images/box1.svg',
        title: 'Digital Transformation',
        description: 'Reimagine business processes, meet customer needs and enable data-driven decision making with agility and foresight',
        p: 'Drive Digital Change.',
        hoverTitle: 'Digital Transformation',
        hoverContent: [
            'Legacy Software Modernization',
            'Digital Consulting',
            'Code Reviews',
            'AI Integration',
            'Mpesa Integration',
            'Livechat Integration',
        ],
    },
    {
        image: '/images/settings.svg',
        title: 'Product Engineering',
        description:
            'Build digital products that stand out in a crowded market with a holistic approach, efficient resource management, and quality.',
        p: 'Innovate Your Product',
        hoverTitle: 'Product Engineering',
        hoverContent: ['Automated Testing', 'Performance Optimization', 'Code Reviews', 'Continuous Integration', 'UI/UX Design and Modernization'],
    },
    {
        image: '/images/ai.svg',
        title: 'AI & Automation',
        description: 'Empower your business with AI and automation solutions that drive efficiency, innovation, and growth.',
        p: 'Automate Your Business',
        hoverTitle: 'AI & Automation',
        hoverContent: ['AI Integration', 'Chatbot Development', 'Predictive Analytics', 'Process Automation', 'Data Visualization'],
    },
    {
        image: '/images/cloud.svg',
        title: 'Cloud Solutions',
        description: 'Leverage the power of the cloud to enhance scalability, security, and performance of your business.',
        p: 'Scale with Cloud',
        hoverTitle: 'Cloud Solutions',
        hoverContent: ['Cloud Migration', 'Cloud Optimization', 'Cloud Security', 'Multi-Cloud Strategy', 'Disaster Recovery Planning'],
    },
    {
        image: '/images/box1.svg',
        title: 'Data Engineering',
        description: 'Transform raw data into actionable insights with our data engineering solutions.',
        p: 'Harness Your Data',
        hoverTitle: 'Data Engineering',
        hoverContent: ['Data Integration', 'Data Warehousing', 'Data Governance', 'Real-time Analytics', 'Data Visualization'],
    },
    {
        image: '/images/settings.svg',
        title: 'Legacy Software Modernization',
        description: 'Upgrade your legacy systems to modern, scalable architectures with our modernization services.',
        p: 'Modernize Your Legacy',
        hoverTitle: 'Legacy Software Modernization',
        hoverContent: ['Code Refactoring', 'UI/UX Redesign', 'Database Migration', 'Cloud Integration', 'API Development'],
    },
];

export default function Welcome() {
    const servicesRef = useRef<HTMLDivElement>(null);
    const capabilitiesRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

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

        // Services section animations
        const services = servicesRef.current?.querySelectorAll('.service-card');
        services?.forEach((service, index) => {
            gsap.from(service, {
                scrollTrigger: {
                    trigger: service,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power3.out',
            });
        });

        // Capabilities section animations
        const capabilitiesHeader = capabilitiesRef.current?.querySelector('header');
        if (capabilitiesHeader) {
            gsap.from(capabilitiesHeader, {
                scrollTrigger: {
                    trigger: capabilitiesHeader,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            // Animate the decorative elements
            gsap.from('.capabilities-decoration', {
                scrollTrigger: {
                    trigger: capabilitiesHeader,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse',
                },
                scale: 0,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
            });
        }

        // Technologies section animations
        const techs = techRef.current?.querySelectorAll('.tech-card');
        techs?.forEach((tech, index) => {
            gsap.from(tech, {
                scrollTrigger: {
                    trigger: tech,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power3.out',
            });
        });

        // CTA section animation
        gsap.from(ctaRef.current, {
            scrollTrigger: {
                trigger: ctaRef.current,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (
        <MainLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Hero Section */}
            <Hero />

            {/* Services Section */}
            <section ref={servicesRef} className="bg-white py-20 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-6">
                    <h2 className="mb-16 text-center text-4xl font-bold">Our Top Services</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="service-card group rounded-2xl bg-gray-50 p-8 transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-500 text-white">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-xl font-semibold">Website Development</h3>
                            <p className="text-gray-600 dark:text-gray-300">Web presence for your business.</p>
                        </div>
                        <div className="service-card group rounded-2xl bg-gray-50 p-8 transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-500 text-white">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-xl font-semibold">App Development</h3>
                            <p className="text-gray-600 dark:text-gray-300">Your business on Android and iOS.</p>
                        </div>
                        <div className="service-card group rounded-2xl bg-gray-50 p-8 transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-green-500 text-white">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-xl font-semibold">eCommerce</h3>
                            <p className="text-gray-600 dark:text-gray-300">Take your shop online.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities Section */}
            <section ref={capabilitiesRef} className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-2 lg:py-4">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-50 via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNHoiIGZpbGw9IiNGRjY2NjYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-5" />
                <MaxWidthWrapper>
                    <header className="relative text-center">
                        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-50 via-transparent to-transparent opacity-50" />
                        <div className="mx-auto max-w-4xl">
                            <span className="mb-6 inline-block rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">Our Services</span>
                            <h2 className="animate-fade-in mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
                                Transforming Business Through
                                <span className="mt-4 block bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text font-extrabold text-transparent">
                                    Innovative Technology
                                </span>
                            </h2>
                            <div className="mb-6 flex items-center justify-center gap-4 md:mb-8">
                                <div className="capabilities-decoration h-1 w-16 rounded-full bg-gradient-to-r from-red-500 to-red-600" />
                                <div className="capabilities-decoration h-3 w-3 rounded-full bg-red-500" />
                                <div className="capabilities-decoration h-1 w-16 rounded-full bg-gradient-to-r from-red-500 to-red-600" />
                            </div>
                            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
                                Empowering your digital journey with cutting-edge solutions and expert guidance
                            </p>
                        </div>
                    </header>
                    <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                        {SERVICES.map((service, index) => (
                            <div
                                key={index}
                                className="transform transition-all duration-500 hover:-translate-y-2"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <HoverCard
                                    {...service}
                                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-2xl"
                                    imageProps={{
                                        className: 'w-20 h-20 mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300',
                                        alt: `${service.title} icon`,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

            <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-24">
                {/* Decorative elements */}
                <div className="absolute inset-0">
                    <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 opacity-30 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 h-72 w-full bg-gradient-to-t from-white via-white/50 to-transparent"></div>
                    <div className="absolute top-1/3 left-3 h-40 w-0.5 bg-gradient-to-b from-red-400 to-purple-500 md:left-10"></div>
                </div>

                <div className="relative mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                        {/* Text content - rich for SEO */}
                        <div>
                            <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 font-medium text-blue-700">
                                <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                                Pioneering Digital Excellence
                            </div>

                            <h2 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
                                Crafting Digital Solutions That{' '}
                                <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                                    Transform Businesses
                                </span>
                            </h2>

                            <div className="prose prose-lg mb-8 max-w-none text-gray-700">
                                <p className="mb-4">
                                    Founded in 2015,{' '}
                                    <a href="/">
                                        <strong>Isolated Solutions Limited</strong>
                                    </a>{' '}
                                    has established itself as a premier digital innovation studio dedicated to transforming business visions into
                                    tangible digital success stories. With our headquarters in Nairobi, Kenya and a global team of 15+ experts, we've
                                    delivered over 300 successful projects to clients ranging from ambitious startups to big enterprises.
                                </p>

                                <p className="mb-4">
                                    Our multidisciplinary team combines deep technical expertise in modern web technologies like React, Next.js,
                                    Laravel and Node.js with award-winning design capabilities. We specialize in creating performant, accessible, and
                                    visually stunning digital experiences that drive measurable business results. Our human-centered approach ensures
                                    we solve real problems rather than just writing code.
                                </p>

                                <p className="mb-4">
                                    What truly sets us apart is our commitment to partnership. We don't just build what you ask for - we invest time
                                    to understand your business objectives, market challenges, and customer needs to deliver solutions that create
                                    sustainable competitive advantages. Our agile methodology ensures transparency and flexibility throughout the
                                    engagement, with continuous feedback loops that keep you in control.
                                </p>

                                <p className="mb-4">
                                    Over the past 8 years, we've helped clients achieve remarkable outcomes: 150% average increase in user engagement,
                                    40% reduction in operational costs, and 300% ROI on digital investments. Our work has been recognized by industry
                                    leaders cementing our reputation as a trusted digital transformation partner.
                                </p>

                                <p>
                                    As technology evolves, so do we. Our dedicated R&D team continuously explores emerging technologies like AI/ML,
                                    blockchain, and AR/VR to ensure our clients always benefit from cutting-edge solutions. We're not just developers
                                    - we're strategic partners invested in your long-term success.
                                </p>
                            </div>

                            {/* Creative floating button */}
                            <div className="group relative inline-block">
                                <Link
                                    href="/about"
                                    className="relative z-10 inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-500"
                                >
                                    Discover Our Journey
                                    <svg
                                        className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <div className="absolute -inset-2 -z-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 blur-md transition-all duration-500 group-hover:opacity-70"></div>
                            </div>
                        </div>

                        {/* Visual elements */}
                        <div className="relative">
                            {/* Team photo grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
                                    <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-6">
                                        <h3 className="font-bold text-white">Our Team</h3>
                                        <p className="text-sm text-blue-200">15+ specialists collaborating globally</p>
                                    </div>
                                </div>

                                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500"></div>
                                    <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-6">
                                        <h3 className="font-bold text-white">Our Process</h3>
                                        <p className="text-sm text-amber-200">Agile, transparent, results-driven</p>
                                    </div>
                                </div>

                                <div className="relative col-span-2 aspect-[16/7] overflow-hidden rounded-2xl shadow-xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600"></div>
                                    <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                        <h3 className="font-bold text-white">Our Impact</h3>
                                        <p className="text-sm text-emerald-200">300+ successful client projects delivered</p>
                                    </div>
                                </div>
                            </div>

                            {/* Achievement badges floating */}
                            <div className="absolute -top-6 -right-6 hidden rotate-6 transform rounded-xl border border-gray-200 bg-white p-4 shadow-lg md:block">
                                <div className="text-3xl font-bold text-gray-900">8+</div>
                                <div className="text-sm text-gray-600">Years Experience</div>
                            </div>

                            <div className="absolute -bottom-18 -left-6 -rotate-3 transform rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                                <div className="text-3xl font-bold text-gray-900">150%</div>
                                <div className="text-sm text-gray-600">Avg. Engagement Increase</div>
                            </div>
                        </div>
                    </div>

                    {/* Client logos */}
                    {/* <div className="mt-24">
                        <h3 className="mb-8 text-center font-medium text-gray-500">Trusted by innovative companies worldwide</h3>
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex h-20 items-center justify-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                                >
                                    <div className="h-8 w-16 rounded-xl border-2 border-dashed bg-gray-200" /> 
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            </section>
            <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
                <div className="relative z-10 mx-auto max-w-7xl">
                    <div className="mb-16 text-center lg:mb-24">
                        <span className="mb-6 inline-block rounded-full bg-red-50 px-5 py-2 text-sm font-bold tracking-wider text-black">
                            INDUSTRY EXPERTISE
                        </span>
                        <h1 className="animate-fade-in mb-6 text-4xl font-extrabold md:text-5xl lg:text-6xl">
                            <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                                {' '}
                                <span className="text-black">Industries</span> We Transform
                            </span>
                        </h1>
                        <p className="text-md mx-auto max-w-3xl leading-relaxed md:text-xl">
                            We deliver specialized digital solutions that drive innovation and growth across key sectors. With deep domain expertise,
                            we help businesses optimize operations, enhance customer experiences, and achieve measurable results through cutting-edge
                            technology.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-16">
                        <div className="animate-delay-200 overflow-hidden rounded-3xl bg-gray-50">
                            <div className="flex flex-col bg-gray-50 lg:flex-row">
                                <div className="px-3 py-8 md:p-12 lg:w-2/5">
                                    <h2 className="mb-6 text-3xl font-bold md:text-4xl">eCommerce Solutions</h2>
                                    <p className="mb-8 leading-relaxed">
                                        We build high-performance eCommerce platforms that drive conversions and customer loyalty. Our solutions
                                        include personalized shopping experiences, AI-driven recommendations, seamless payment integrations, and
                                        scalable inventory systems.
                                    </p>

                                    <div className="mb-8 flex flex-wrap gap-3">
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Omnichannel Retail</span>
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Marketplace Platforms</span>
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Headless Commerce</span>
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Payment Gateways</span>
                                    </div>

                                    <div className="mb-8 grid grid-cols-2 gap-2 md:gap-5">
                                        <div className="rounded-xl border-1 bg-gray-100 p-5 transition-all duration-300">
                                            <div className="mb-2 text-3xl font-bold text-sky-400">45%</div>
                                            <div className="text-sm">Avg. Conversion Increase</div>
                                        </div>
                                        <div className="rounded-xl border-1 bg-gray-100 p-5 transition-all duration-300">
                                            <div className="mb-2 text-3xl font-bold text-sky-400">30%</div>
                                            <div className="text-sm">Higher Order Value</div>
                                        </div>
                                    </div>

                                    <a
                                        href="#"
                                        className="group btn-gradient inline-flex items-center rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4"
                                    >
                                        Explore Solutions
                                        <i className="fas fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1 sm:ml-3"></i>
                                    </a>
                                </div>

                                <div className="flex flex-col lg:w-3/5">
                                    <div className="relative flex h-80 items-end bg-gray-100 p-8 transition-all duration-500 md:h-96">
                                        <div className="absolute inset-0 bg-[url('/images/eebabyshop.png')] bg-cover bg-center opacity-80"></div>
                                        <div className="visual-overlay absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent"></div>
                                        <div className="relative z-10">
                                            <h3 className="mb-3 text-2xl font-bold text-white drop-shadow-lg">Success Story: E & E Babyshop</h3>
                                            <p className="text-lg font-medium text-gray-100 drop-shadow-md">
                                                Increased mobile conversions by 62% with our progressive web app solution, resulting in $4.2M
                                                additional annual revenue.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 bg-gradient-to-br from-blue-500 to-purple-600">
                                        <div className="border-r border-gray-700 p-6">
                                            <div className="mb-2 text-2xl font-bold text-white">99.9%</div>
                                            <p className="text-sm text-white">Platform Uptime</p>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-2 text-2xl font-bold text-white">22%</div>
                                            <p className="text-sm text-white">Reduced Cart Abandonment</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="animate-fade-in animate-delay-300 overflow-hidden rounded-3xl bg-gray-50">
                            <div className="flex flex-col lg:flex-row">
                                <div className="flex flex-col bg-gray-100 lg:order-1 lg:w-3/5">
                                    <div className="relative flex h-80 items-end bg-gray-50 p-8 transition-all duration-500 md:h-96">
                                        <div className="absolute inset-0 bg-[url('/images/university.png')] bg-cover bg-center opacity-80"></div>
                                        <div className="visual-overlay absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent"></div>
                                        <div className="relative z-10">
                                            <h3 className="mb-3 text-2xl font-bold text-white drop-shadow-lg">Case Study: University Platform</h3>
                                            <p className="text-lg font-medium text-gray-100 drop-shadow-md">
                                                Created a unified learning platform serving 350,000+ students with 92% satisfaction rate and 40%
                                                reduction in administrative costs.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 bg-gradient-to-br from-amber-500 to-orange-500">
                                        <div className="border-r border-cyan-500 p-6">
                                            <div className="mb-2 text-2xl font-bold text-white">75%</div>
                                            <p className="text-sm text-white">Student Engagement</p>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-2 text-2xl font-bold text-white">2M+</div>
                                            <p className="text-sm text-white">Students Served</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-1 bg-gray-50 px-3 py-8 md:p-12 lg:order-2 lg:w-2/5">
                                    <h2 className="mb-6 text-3xl font-bold md:text-4xl">EdTech Innovation</h2>
                                    <p className="mb-8 leading-relaxed">
                                        We create transformative educational technologies that enhance learning outcomes. Our platforms include
                                        adaptive learning systems, virtual classNamerooms, gamified experiences, and comprehensive LMS solutions.
                                    </p>

                                    <div className="mb-8 flex flex-wrap gap-3">
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Learning Management</span>
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Virtual classNamerooms</span>
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Educational Apps</span>
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Gamification</span>
                                    </div>

                                    <div className="mb-8 grid grid-cols-2 gap-5">
                                        <div className="rounded-xl border-1 bg-gray-100 p-5 transition-all duration-300">
                                            <div className="mb-2 text-3xl font-bold text-sky-400">60%</div>
                                            <div className="text-sm">Knowledge Retention</div>
                                        </div>
                                        <div className="rounded-xl border-1 bg-gray-100 p-5 transition-all duration-300">
                                            <div className="mb-2 text-3xl font-bold text-sky-400">40%</div>
                                            <div className="text-sm">Admin Workload Reduction</div>
                                        </div>
                                    </div>

                                    <a
                                        href="#"
                                        className="group btn-gradient inline-flex items-center rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4"
                                    >
                                        Discover Solutions
                                        <i className="fas fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1 sm:ml-3"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="animate-fade-in animate-delay-200 overflow-hidden rounded-3xl bg-gray-50">
                            <div className="flex flex-col lg:flex-row">
                                <div className="px-3 py-8 md:p-12 lg:w-2/5">
                                    <h2 className="mb-6 text-3xl font-bold md:text-4xl">Healthcare Technology</h2>
                                    <p className="mb-8 leading-relaxed">
                                        We develop secure, compliant healthcare solutions that improve patient outcomes. Our expertise includes
                                        telemedicine platforms, EHR systems, patient portals, and healthcare analytics.
                                    </p>

                                    <div className="mb-8 flex flex-wrap gap-3">
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Telemedicine</span>
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">EHR Systems</span>
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Healthcare Analytics</span>
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Patient Portals</span>
                                    </div>

                                    <div className="mb-8 grid grid-cols-2 gap-5">
                                        <div className="rounded-xl border-1 bg-gray-100 p-5 transition-all duration-300">
                                            <div className="mb-2 text-3xl font-bold text-sky-400">35%</div>
                                            <div className="text-sm">Admin Cost Reduction</div>
                                        </div>
                                        <div className="rounded-xl border-1 bg-gray-100 p-5 transition-all duration-300">
                                            <div className="mb-2 text-xl font-bold text-sky-400">HIPAA</div>
                                            <div className="text-sm">Compliant Solutions</div>
                                        </div>
                                    </div>

                                    <a
                                        href="#"
                                        className="group btn-gradient inline-flex items-center rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4"
                                    >
                                        Explore Solutions
                                        <i className="fas fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1 sm:ml-3"></i>
                                    </a>
                                </div>

                                <div className="flex flex-col lg:w-3/5">
                                    <div className="relative flex h-80 items-end bg-gray-100 px-3 py-8 transition-all duration-500 md:h-96">
                                        <div className="absolute inset-0 rounded-t-xl bg-[url('/images/healthcare.png')] bg-cover bg-center opacity-80"></div>
                                        <div className="visual-overlay absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent"></div>
                                        <div className="relative z-10">
                                            <h3 className="mb-3 text-2xl font-bold text-white drop-shadow-lg">Implementation: Hospital Network</h3>
                                            <p className="text-lg font-medium text-gray-100 drop-shadow-md">
                                                Developed a unified patient portal for 12 hospitals, reducing appointment no-shows by 28% and
                                                improving patient satisfaction scores by 45%.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 bg-gradient-to-t from-emerald-500 to-teal-600">
                                        <div className="border-r border-cyan-500 p-6">
                                            <div className="mb-2 text-2xl font-bold text-white">99.99%</div>
                                            <p className="text-sm text-white">Security Compliance</p>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-2 text-2xl font-bold text-white">50%</div>
                                            <p className="text-sm text-white">Faster Patient Onboarding</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="animate-fade-in animate-delay-300 overflow-hidden rounded-3xl bg-gray-50">
                            <div className="flex flex-col lg:flex-row">
                                <div className="order-2 flex flex-col lg:order-1 lg:w-3/5">
                                    <div className="relative flex h-80 items-end bg-gray-100 p-8 transition-all duration-500 md:h-96">
                                        <div className="absolute inset-0 bg-[url('/images/sokomagari.png')] bg-cover bg-center opacity-80"></div>
                                        <div className="visual-overlay absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent"></div>
                                        <div className="relative z-10">
                                            <h3 className="mb-3 text-2xl font-bold text-white drop-shadow-lg">
                                                Enterprise Solution: Logistics Company
                                            </h3>
                                            <p className="text-lg font-medium text-gray-100 drop-shadow-md">
                                                Built a custom logistics platform that reduced shipment processing time by 65% and saved $1.8M
                                                annually in operational costs.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 bg-gradient-to-r from-rose-600 to-pink-500">
                                        <div className="border-r border-white/50 p-6">
                                            <div className="mb-2 text-2xl font-bold text-white">300+</div>
                                            <p className="text-sm text-white">Solutions Delivered</p>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-2 text-2xl font-bold text-white">150%</div>
                                            <p className="text-sm text-white">Average ROI</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-1 p-8 md:p-12 lg:order-2 lg:w-2/5">
                                    <h2 className="mb-6 text-3xl font-bold md:text-4xl">Custom Software Solutions</h2>
                                    <p className="mb-8 leading-relaxed">
                                        We create bespoke software tailored to your unique business challenges. Our services include enterprise
                                        applications, workflow automation, digital transformation, and proprietary systems.
                                    </p>

                                    <div className="mb-8 flex flex-wrap gap-3">
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Enterprise Software</span>
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Workflow Automation</span>
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Digital Transformation</span>
                                        <span className="tag-pill rounded-full px-4 py-2 text-sm">Proprietary Systems</span>
                                    </div>

                                    <div className="mb-8 grid grid-cols-2 gap-5">
                                        <div className="rounded-xl border-1 bg-gray-100 p-5 transition-all duration-300">
                                            <div className="mb-2 text-3xl font-bold text-sky-400">40%</div>
                                            <div className="text-sm">Efficiency Gain</div>
                                        </div>
                                        <div className="rounded-xl border-1 bg-gray-100 p-5 transition-all duration-300">
                                            <div className="mb-2 text-3xl font-bold text-sky-400">8+</div>
                                            <div className="text-sm">Years Experience</div>
                                        </div>
                                    </div>

                                    <a
                                        href="#"
                                        className="group btn-gradient inline-flex items-center rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4"
                                    >
                                        Discuss Solutions
                                        <i className="fas fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1 sm:ml-3"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                ref={ctaRef}
                className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black py-32"
            >
                {/* Particle Background */}
                <div className="absolute inset-0">
                    {/* Floating particles */}
                    <div className="animate-float animation-delay-0 absolute top-1/4 left-1/4 h-4 w-4 rounded-full bg-purple-500/30"></div>
                    <div className="animate-float animation-delay-2000 absolute top-1/3 right-1/3 h-3 w-3 rounded-full bg-cyan-400/40"></div>
                    <div className="animate-float animation-delay-3000 absolute bottom-1/4 left-2/5 h-2 w-2 rounded-full bg-amber-400/50"></div>

                    {/* Subtle grid */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]"></div>

                    {/* Animated gradient highlights */}
                    <div className="animate-pulse-slow absolute -top-20 -left-20 h-96 w-96 rounded-full bg-gradient-to-br from-purple-900/10 to-transparent blur-[100px]"></div>
                    <div className="animate-pulse-slow absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-tr from-cyan-900/10 to-transparent blur-[100px]"></div>

                    {/* Glowing center focus */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-ping-slow h-[300px] w-[300px] rounded-full bg-gradient-to-r from-purple-900/10 to-cyan-900/10 opacity-20"></div>
                    </div>
                </div>

                <div className="relative mx-auto max-w-4xl px-6 text-center">
                    {/* Animated Text */}
                    <div className="overflow-hidden">
                        <h2 className="mb-6 text-4xl font-bold text-white md:text-6xl">
                            <span className="mb-4 block bg-gradient-to-r from-gray-900 to-gray-300 bg-clip-text text-transparent">
                                Transform Vision Into
                            </span>
                            <span className="relative inline-block">
                                <span className="animate-text-gradient bg-gradient-to-r from-gray-400 via-gray-600 to-red-500 bg-[length:200%_auto] bg-clip-text text-4xl font-extrabold text-transparent">
                                    Digital Excellence
                                </span>
                                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transform bg-gradient-to-r from-cyan-400/0 via-blue-500 to-indigo-500/0 transition-transform duration-700 group-hover:scale-x-100"></span>
                            </span>
                        </h2>
                    </div>

                    <p className="mx-auto mb-16 max-w-2xl text-xl leading-relaxed font-light text-gray-500">
                        Where innovative ideas meet technical mastery to create exceptional digital experiences
                    </p>

                    {/* Sleek Buttons */}
                    <div className="flex flex-col justify-center gap-5 sm:flex-row">
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-4 font-medium text-white transition-all duration-500"
                        >
                            <span className="absolute top-0 right-0 inline-block h-4 w-4 rounded-full bg-cyan-500 transition-all duration-500 ease-in-out group-hover:-mt-4 group-hover:-mr-4 group-hover:h-64 group-hover:w-64 group-hover:bg-blue-600"></span>
                            <span className="absolute bottom-0 left-0 -mb-2 -ml-2 h-8 w-8 rounded-full bg-indigo-500 opacity-30 transition-all duration-500 ease-in-out group-hover:mb-0 group-hover:ml-0 group-hover:h-64 group-hover:w-64 group-hover:bg-indigo-600"></span>
                            <span className="relative z-10 flex items-center text-lg font-semibold text-gray-900">
                                Share Your Product Idea
                                <svg
                                    className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>

                        <Link
                            href="/products"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-gray-700 px-8 py-4 font-medium text-white transition-all duration-500 hover:border-gray-600"
                        >
                            <span className="absolute inset-0 bg-red-600/80 opacity-100 backdrop-blur-sm transition-opacity duration-500 hover:bg-red-600/60"></span>
                            <span className="relative z-10 flex items-center text-lg font-semibold">
                                View Our Work
                                <svg className="ml-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </Link>
                    </div>

                    {/* Premium Tech Stack Showcase */}
                    <div className="mt-20">
                        <div className="relative mb-10">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-gray-100 px-4 py-1 text-sm font-medium tracking-widest text-gray-500 uppercase">
                                    Our Technical Expertise
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-6 sm:grid-cols-8">
                            {[
                                { name: 'React', color: 'from-cyan-400 to-cyan-500' },
                                { name: 'Laravel', color: 'from-gray-300 to-gray-100' },
                                { name: 'TypeScript', color: 'from-blue-500 to-blue-600' },
                                { name: 'Node', color: 'from-green-500 to-green-600' },
                                { name: 'Tailwind', color: 'from-cyan-400 to-blue-500' },
                                { name: 'Figma', color: 'from-purple-500 to-pink-500' },
                                { name: 'GraphQL', color: 'from-pink-500 to-purple-600' },
                                { name: 'AWS', color: 'from-amber-400 to-orange-500' },
                            ].map((tech, index) => (
                                <div key={tech.name} className="group relative">
                                    <div className="flex flex-col items-center">
                                        {/* Animated tech icon */}
                                        <div className="relative mb-3 flex h-16 w-16 items-center justify-center">
                                            {/* Hover effect */}
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg transition-all duration-500 group-hover:scale-90"></div>

                                            {/* Glowing effect */}
                                            <div
                                                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tech.color} opacity-0 blur-md transition-all duration-500 group-hover:opacity-30`}
                                            ></div>

                                            {/* Main icon container */}
                                            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 backdrop-blur-sm">
                                                <div className={`h-10 w-10 rounded-md bg-gradient-to-br ${tech.color}`}></div>
                                            </div>
                                        </div>

                                        {/* Tech name with tooltip */}
                                        <div className="relative">
                                            <span className="text-sm font-medium text-gray-800 transition-colors duration-300 group-hover:text-gray-600">
                                                {tech.name}
                                            </span>
                                            <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform group-hover:block">
                                                <div className="rounded-md bg-gray-800 px-3 py-1 text-xs font-medium text-gray-200 shadow-lg">
                                                    Expert Level
                                                    <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 bg-gray-800"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
