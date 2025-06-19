import PageLayout from '@/layouts/page-layout';
import { Head } from '@inertiajs/react';

const products = [
    {
        id: 1,
        name: 'eCommerce Suite',
        description: 'All-in-one platform with inventory management, payment processing, and customer analytics.',
        features: ['Real-time analytics', 'AI product recommendations', 'Multi-channel integration'],
        category: 'eCommerce',
        icon: '🛒',
    },
    {
        id: 2,
        name: 'Enterprise CMS',
        description: 'Scalable content management system for large organizations with advanced workflow controls.',
        features: ['Headless architecture', 'Role-based permissions', 'Multi-language support'],
        category: 'Content Management',
        icon: '📝',
    },
    {
        id: 3,
        name: 'AI Resume Builder',
        description: 'Tailor resumes by pasting job descriptions into the platform and getting a tailored Resume and Cover Letter.',
        features: ['Custom dashboards', 'AI intergration', 'Subscription Management'],
        category: 'Analytics',
        icon: '📊',
    },
    {
        id: 4,
        name: 'SecurePay Gateway',
        description: 'Payment processing with M-Pesa and global currency support.',
        features: ['One-click checkout', 'Chargeback protection', 'Recurring billing'],
        category: 'Payments',
        icon: '💳',
    },
    {
        id: 5,
        name: 'CloudSync Platform',
        description: 'Seamless multi-cloud synchronization with enterprise-grade security and compliance.',
        features: ['Cross-cloud migration', 'Real-time sync', 'End-to-end encryption'],
        category: 'Cloud Services',
        icon: '☁️',
    },
    {
        id: 6,
        name: 'Workflow Automator',
        description: 'Intelligent process automation with drag-and-drop interface and AI optimization.',
        features: ['No-code builder', 'API integration', 'Performance analytics'],
        category: 'Automation',
        icon: '🤖',
    },
];

const techStack = [
    { name: 'React', color: 'from-cyan-400 to-cyan-500' },
    { name: 'Laravel', color: 'from-gray-300 to-gray-100' },
    { name: 'TypeScript', color: 'from-blue-500 to-blue-600' },
    { name: 'Node', color: 'from-green-500 to-green-600' },
    { name: 'Tailwind', color: 'from-cyan-400 to-blue-500' },
    { name: 'Figma', color: 'from-purple-500 to-pink-500' },
    { name: 'GraphQL', color: 'from-pink-500 to-purple-600' },
    { name: 'AWS', color: 'from-amber-400 to-orange-500' },
];

export default function Products() {
    return (
        <PageLayout>
            <Head>
                <title>Enterprise Solutions | Our Product Suite</title>
                <meta
                    name="description"
                    content="Discover our award-winning business solutions designed to optimize operations, increase revenue, and drive digital transformation."
                />
                <link rel="canonical" href="/products" />
                <meta name="keywords" content="enterprise software, SaaS solutions, business technology, digital transformation, cloud platform" />
            </Head>

            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black py-32">
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

                <div className="relative mx-auto max-w-7xl px-6 text-center">
                    {/* Animated Text */}
                    <div className="overflow-hidden">
                        <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
                            <span className="mb-4 block bg-gradient-to-r from-gray-900 to-gray-300 bg-clip-text text-transparent">
                                Transform Your Business With
                            </span>
                            <span className="relative inline-block">
                                <span className="animate-text-gradient bg-gradient-to-r from-gray-400 via-gray-600 to-red-500 bg-[length:200%_auto] bg-clip-text text-4xl font-extrabold text-transparent md:text-6xl">
                                    Digital Excellence
                                </span>
                                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transform bg-gradient-to-r from-cyan-400/0 via-blue-500 to-indigo-500/0 transition-transform duration-700 group-hover:scale-x-100"></span>
                            </span>
                        </h1>
                    </div>

                    <p className="mx-auto mb-16 max-w-2xl text-xl leading-relaxed font-light text-gray-400">
                        Enterprise-grade solutions trusted by industry leaders to drive growth and innovation
                    </p>

                    {/* Sleek Buttons */}
                    <div className="flex flex-col justify-center gap-5 sm:flex-row">
                        <a
                            href="#solutions"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-4 font-medium text-white transition-all duration-500"
                        >
                            <span className="absolute top-0 right-0 inline-block h-4 w-4 rounded-full bg-cyan-500 transition-all duration-500 ease-in-out group-hover:-mt-4 group-hover:-mr-4 group-hover:h-64 group-hover:w-64 group-hover:bg-blue-600"></span>
                            <span className="absolute bottom-0 left-0 -mb-2 -ml-2 h-8 w-8 rounded-full bg-indigo-500 opacity-30 transition-all duration-500 ease-in-out group-hover:mb-0 group-hover:ml-0 group-hover:h-64 group-hover:w-64 group-hover:bg-indigo-600"></span>
                            <span className="relative z-10 flex items-center text-lg font-semibold text-gray-900">
                                Explore Solutions
                                <svg
                                    className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </a>

                        <a
                            href="/demo"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-gray-700 px-8 py-4 font-medium text-white transition-all duration-500 hover:border-gray-600"
                        >
                            <span className="absolute inset-0 bg-red-600/80 opacity-100 backdrop-blur-sm transition-opacity duration-500 hover:bg-red-600/60"></span>
                            <span className="relative z-10 flex items-center text-lg font-semibold">
                                <i className="fas fa-calendar mr-3"></i>
                                Schedule Demo
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Solutions Grid */}
            <section id="solutions" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 py-24">
                {/* Background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-100/50 to-transparent opacity-20 blur-3xl"></div>
                    <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-indigo-100/50 to-transparent opacity-20 blur-3xl"></div>
                    <div className="absolute top-1/4 right-1/3 h-2 w-2 animate-pulse rounded-full bg-blue-400/40"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="mx-auto mb-20 max-w-3xl text-center">
                        <span className="mb-6 inline-block rounded-full bg-red-100 px-4 py-1.5 text-xs  tracking-widest font-bold uppercase">
                            Our Product Suite
                        </span>
                        <h2 className="mb-6 text-3xl font-bold text-slate-800 md:text-4xl">
                            Solutions Designed for{' '}
                            <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">Business Excellence</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-slate-600">
                            Each product is engineered to solve critical business challenges while integrating seamlessly with your existing tech
                            stack
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-xl"
                            >
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-50 to-indigo-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                                <div className="relative z-10 p-6">
                                    <div className="mb-6 flex items-start">
                                        <div className="mr-4 text-4xl">{product.icon}</div>
                                        <div>
                                            <span className="mb-3 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium">
                                                {product.category}
                                            </span>
                                            <h3 className="mb-3 text-xl font-bold text-slate-800">{product.name}</h3>
                                        </div>
                                    </div>

                                    <p className="mb-6 text-slate-600">{product.description}</p>

                                    <ul className="mb-8 space-y-3">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="mt-1 mr-3 flex-shrink-0">
                                                    <div className="h-2 w-2 animate-pulse rounded-full bg-red-400"></div>
                                                </span>
                                                <span className="text-slate-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center justify-between">
                                        <a
                                            href='/shop'
                                            className="inline-flex items-center font-medium  transition-colors group-hover:underline hover:text-blue-700"
                                        >
                                            Learn more
                                            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>

                                        <div className="flex space-x-2">
                                            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200">
                                                <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                    />
                                                </svg>
                                            </button>
                                            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200">
                                                <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-red-50 via-slate-100 to-slate-50 py-20">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-blue-100/50 to-transparent"></div>
                    <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-gradient-to-r from-indigo-100/50 to-transparent blur-3xl"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <span className="mb-6 inline-block rounded-full bg-white px-4 py-1.5 text-xs tracking-widest font-bold uppercase">
                            Our Technical Expertise
                        </span>
                        <h2 className="mb-6 text-3xl font-bold text-slate-800 md:text-4xl">
                            Built With{' '}
                            <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
                                Cutting-Edge Technology
                            </span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-slate-600">
                            We leverage industry-leading technologies to deliver robust, scalable solutions
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
                        {techStack.map((tech) => (
                            <div key={tech.name} className="group relative">
                                <div className="flex flex-col items-center">
                                    {/* Animated tech icon */}
                                    <div className="relative mb-3 flex h-16 w-16 items-center justify-center">
                                        {/* Hover effect */}
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg transition-all duration-500 group-hover:scale-90"></div>

                                        {/* Glowing effect */}
                                        <div
                                            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tech.color} opacity-0 blur-md transition-all duration-500 group-hover:opacity-30`}
                                        ></div>

                                        {/* Main icon container */}
                                        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-lg bg-white shadow-sm">
                                            <div className={`h-10 w-10 rounded-md bg-gradient-to-br ${tech.color}`}></div>
                                        </div>
                                    </div>

                                    {/* Tech name with tooltip */}
                                    <div className="relative">
                                        <span className="text-sm font-medium text-slate-600 transition-colors duration-300 group-hover:text-slate-800">
                                            {tech.name}
                                        </span>
                                        <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform group-hover:block">
                                            <div className="rounded-md bg-slate-800 px-3 py-1 text-xs font-medium text-white shadow-lg">
                                                Expert Level
                                                <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 bg-slate-800"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
