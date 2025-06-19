import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head } from '@inertiajs/react';
import { Activity, Brain, Calendar, Globe, Heart, LineChart, Settings, Shield, Sparkles, Users } from 'lucide-react';

export default function Wellness() {
    return (
        <PageLayout>
            <Head title="Wellness Solutions" />

            {/* Hero Section */}
            <section className="relative min-h-[700px] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <MaxWidthWrapper>
                    <div className="grid items-center gap-16 py-24 lg:grid-cols-2">
                        <div className="relative z-10 space-y-8">
                            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20">
                                <Heart className="h-5 w-5 animate-pulse" />
                                Wellness Technology
                            </div>
                            <h1 className="text-5xl leading-tight font-bold text-white">
                                Transform Health with{' '}
                                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Modern Wellness Tech</span>
                            </h1>
                            <p className="text-xl leading-relaxed text-gray-300">
                                Create comprehensive wellness solutions that empower individuals and organizations to achieve optimal health and
                                well-being
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10">
                                    <div className="mb-2 flex items-center gap-3">
                                        <Activity className="h-5 w-5 text-white" />
                                        <span className="font-medium text-white">Health Tracking</span>
                                    </div>
                                    <p className="text-sm text-gray-400">Monitor vital signs and wellness metrics</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10">
                                    <div className="mb-2 flex items-center gap-3">
                                        <Brain className="h-5 w-5 text-white" />
                                        <span className="font-medium text-white">Mental Wellness</span>
                                    </div>
                                    <p className="text-sm text-gray-400">Support mental health and mindfulness</p>
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
                                {[
                                    {
                                        icon: Activity,
                                        title: 'Physical Wellness',
                                        description: 'Track and improve physical health metrics',
                                    },
                                    {
                                        icon: Brain,
                                        title: 'Mental Health',
                                        description: 'Support emotional and psychological well-being',
                                    },
                                    {
                                        icon: Users,
                                        title: 'Community Support',
                                        description: 'Connect with wellness communities',
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                            <item.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                            <p className="text-gray-300">{item.description}</p>
                                        </div>
                                    </div>
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
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">Comprehensive Wellness Solutions</h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600">
                            Empowering individuals and organizations with innovative wellness technology
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: Activity,
                                title: 'Health Monitoring',
                                description: 'Comprehensive health tracking and monitoring solutions',
                                features: [
                                    { icon: Activity, text: 'Vital Signs Tracking' },
                                    { icon: Calendar, text: 'Health History' },
                                    { icon: LineChart, text: 'Progress Analytics' },
                                ],
                            },
                            {
                                icon: Brain,
                                title: 'Mental Wellness',
                                description: 'Tools and resources for mental health support',
                                features: [
                                    { icon: Brain, text: 'Stress Management' },
                                    { icon: Users, text: 'Support Groups' },
                                    { icon: Calendar, text: 'Wellness Planning' },
                                ],
                            },
                            {
                                icon: Settings,
                                title: 'Wellness Programs',
                                description: 'Customized wellness programs and initiatives',
                                features: [
                                    { icon: Settings, text: 'Program Management' },
                                    { icon: Shield, text: 'Health Compliance' },
                                    { icon: LineChart, text: 'Outcome Tracking' },
                                ],
                            },
                        ].map((card, index) => (
                            <div
                                key={index}
                                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-gray-200">
                                    <card.icon className="h-7 w-7 text-gray-900" />
                                </div>
                                <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
                                    {card.title}
                                </h3>
                                <p className="mb-6 text-gray-600">{card.description}</p>
                                <ul className="space-y-3 text-gray-600">
                                    {card.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <feature.icon className="h-5 w-5 text-gray-900" />
                                            {feature.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

           
        </PageLayout>
    );
}
