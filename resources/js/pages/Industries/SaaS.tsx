import PageLayout from "@/layouts/page-layout";
import MaxWidthWrapper from "@/ui/MaxWidthWrapper";
import { Head } from "@inertiajs/react";
import {
    Cloud,
    Users,
    BarChart,
    Globe,
    Settings,
    Sparkles,
    Activity,
    Shield,
    LineChart,
    CreditCard,
} from "lucide-react";

export default function SaaS() {
    return (
        <PageLayout>
            <Head title="SaaS Solutions" />
  
                {/* Hero Section with Enhanced Content */}
                <section className="relative min-h-[700px] bg-gradient-to-br from-gray-900 to-black overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] animate-pulse-slow"></div>
                    <MaxWidthWrapper>
                        <div className="grid lg:grid-cols-2 gap-16 items-center py-24">
                            <div className="relative z-10 space-y-8">
                                <div className="inline-flex items-center gap-3 bg-white/10 px-5 py-2.5 rounded-full text-sm text-white font-medium hover:bg-white/20 transition-colors">
                                    <Cloud className="w-5 h-5 animate-pulse" />
                                    Software as a Service
                                </div>
                                <h1 className="text-5xl font-bold text-white leading-tight">
                                    Transform Business with{" "}
                                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        Modern SaaS
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-300 leading-relaxed">
                                    Create innovative SaaS solutions that
                                    empower businesses to scale and succeed in
                                    the digital age
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Cloud className="w-5 h-5 text-white" />
                                            <span className="text-white font-medium">
                                                Cloud Platform
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">
                                            Scalable cloud infrastructure
                                        </p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                                        <div className="flex items-center gap-3 mb-2">
                                            <BarChart className="w-5 h-5 text-white" />
                                            <span className="text-white font-medium">
                                                Smart Analytics
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">
                                            Data-driven insights
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                        <Sparkles className="w-5 h-5" />
                                        Start Your Journey
                                    </button>
                                    <button className="group relative flex items-center gap-3 border-2 border-red-500 text-red-500 hover:bg-red-500/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl">
                                        <Globe className="w-5 h-5" />
                                        Explore Solutions
                                    </button>
                                </div>
                            </div>
                            <div className="relative hidden lg:block">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm"></div>
                                <div className="relative p-8 space-y-6">
                                    <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">
                                                Multi-tenant Architecture
                                            </h3>
                                            <p className="text-gray-300">
                                                Scalable user management
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                            <CreditCard className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">
                                                Subscription Management
                                            </h3>
                                            <p className="text-gray-300">
                                                Flexible billing solutions
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                            <Shield className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">
                                                Security & Compliance
                                            </h3>
                                            <p className="text-gray-300">
                                                Enterprise-grade security
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Detailed Features Section */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                    <MaxWidthWrapper>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Comprehensive SaaS Solutions
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Empowering businesses with innovative cloud
                                technology
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Cloud Platform */}
                            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                                    <Cloud className="w-7 h-7 text-gray-900" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                                    Cloud Platform
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Scalable cloud infrastructure solutions
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Cloud className="w-5 h-5 text-gray-900" />
                                        Cloud Hosting
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-gray-900" />
                                        Auto Scaling
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-gray-900" />
                                        Global CDN
                                    </li>
                                </ul>
                            </div>

                            {/* User Management */}
                            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                                    <Users className="w-7 h-7 text-gray-900" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                                    User Management
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Advanced user and access control
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-gray-900" />
                                        Role Management
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-gray-900" />
                                        Access Control
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-gray-900" />
                                        User Settings
                                    </li>
                                </ul>
                            </div>

                            {/* Analytics & Insights */}
                            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                                    <LineChart className="w-7 h-7 text-gray-900" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                                    Analytics & Insights
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Data-driven business intelligence
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <LineChart className="w-5 h-5 text-gray-900" />
                                        Usage Analytics
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <BarChart className="w-5 h-5 text-gray-900" />
                                        Performance Metrics
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-gray-900" />
                                        Real-time Monitoring
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* CTA Section with Enhanced Design */}
                <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
                    <MaxWidthWrapper>
                        <div className="text-center space-y-8">
                            <h2 className="text-4xl font-bold text-white">
                                Ready to Transform Business?
                            </h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Let's create innovative SaaS solutions for your
                                business
                            </p>

                            <div className="mt-8 flex justify-center gap-6">
                                <button className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                    <Cloud className="w-5 h-5" />
                                    Start Your Project
                                </button>
                                <button className="group relative flex items-center gap-3 border-2 border-red-500 text-red-500 hover:bg-red-500/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl">
                                    <Globe className="w-5 h-5" />
                                    View Our Solutions
                                </button>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>
            </PageLayout>

    );
}
