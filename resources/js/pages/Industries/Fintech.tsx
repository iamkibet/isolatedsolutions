import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head } from '@inertiajs/react';
import { Activity, CreditCard, Globe, LineChart, LucideIcon, Settings, Shield, Sparkles, Users, Wallet } from 'lucide-react';

interface Feature {
    icon: LucideIcon;
    text: string;
}

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    features: Feature[];
}

interface StatCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

const FeatureCard = ({ icon: Icon, title, description, features }: FeatureCardProps) => (
    <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-gray-200">
            <Icon className="h-7 w-7 text-gray-900" />
        </div>
        <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700">{title}</h3>
        <p className="mb-6 text-gray-600">{description}</p>
        <ul className="space-y-3 text-gray-600">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                    {feature.icon && <feature.icon className="h-5 w-5 text-gray-900" />}
                    {feature.text}
                </li>
            ))}
        </ul>
    </div>
);

const StatCard = ({ icon: Icon, title, description }: StatCardProps) => (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    </div>
);

export default function FinTech() {
    const features = [
        {
            icon: Wallet,
            title: 'Digital Banking',
            description: 'Modern banking solutions for the digital age',
            features: [
                { icon: Wallet, text: 'Account Management' },
                { icon: CreditCard, text: 'Payment Processing' },
                { icon: Globe, text: 'Global Transactions' },
            ],
        },
        {
            icon: LineChart,
            title: 'Investment Platforms',
            description: 'Advanced investment and trading solutions',
            features: [
                { icon: LineChart, text: 'Portfolio Management' },
                { icon: Activity, text: 'Market Analysis' },
                { icon: Settings, text: 'Automated Trading' },
            ],
        },
        {
            icon: Shield,
            title: 'Security & Compliance',
            description: 'Comprehensive security and regulatory compliance',
            features: [
                { icon: Shield, text: 'Fraud Prevention' },
                { icon: Settings, text: 'Compliance Management' },
                { icon: Activity, text: 'Risk Assessment' },
            ],
        },
    ];

    const stats = [
        {
            icon: Shield,
            title: 'Secure Transactions',
            description: 'Advanced security and compliance',
        },
        {
            icon: Activity,
            title: 'Real-time Processing',
            description: 'Instant transaction processing',
        },
        {
            icon: Users,
            title: 'User Management',
            description: 'Comprehensive user controls',
        },
    ];

    return (
        <PageLayout>
            <Head title="FinTech Solutions" />

            {/* Hero Section */}
            <section className="relative min-h-[700px] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <MaxWidthWrapper>
                    <div className="grid items-center gap-16 py-24 lg:grid-cols-2">
                        <div className="relative z-10 space-y-8">
                            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20">
                                <Wallet className="h-5 w-5 animate-pulse" />
                                Financial Technology
                            </div>
                            <h1 className="text-5xl leading-tight font-bold text-white">
                                Transform Finance with{' '}
                                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Modern FinTech</span>
                            </h1>
                            <p className="text-xl leading-relaxed text-gray-300">
                                Create innovative financial solutions that empower businesses and individuals to achieve their financial goals
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                    <div className="mb-2 flex items-center gap-3">
                                        <CreditCard className="h-5 w-5 text-white" />
                                        <span className="font-medium text-white">Digital Payments</span>
                                    </div>
                                    <p className="text-sm text-gray-400">Secure and seamless payment solutions</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                    <div className="mb-2 flex items-center gap-3">
                                        <LineChart className="h-5 w-5 text-white" />
                                        <span className="font-medium text-white">Smart Analytics</span>
                                    </div>
                                    <p className="text-sm text-gray-400">Data-driven financial insights</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="group relative flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-2xl">
                                    <Sparkles className="h-5 w-5" />
                                    Start Your Journey
                                </button>
                                <button className="group relative flex items-center gap-3 rounded-xl border-2 border-red-500 px-8 py-4 font-semibold text-red-500 transition-all duration-300 hover:bg-red-500/10 hover:shadow-xl">
                                    <Globe className="h-5 w-5" />
                                    Explore Solutions
                                </button>
                            </div>
                        </div>
                        <div className="relative hidden lg:block">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm"></div>
                            <div className="relative space-y-6 p-8">
                                {stats.map((stat, index) => (
                                    <StatCard key={index} {...stat} />
                                ))}
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Features Section */}
            <section className="bg-gradient-to-br from-gray-50 to-white py-20">
                <MaxWidthWrapper>
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">Comprehensive FinTech Solutions</h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600">
                            Empowering financial institutions with innovative technology solutions
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

        </PageLayout>
    );
}
