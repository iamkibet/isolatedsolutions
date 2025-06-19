import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head } from '@inertiajs/react';
import { BookOpen, Brain, Calendar, Globe, GraduationCap, LineChart, Settings, Sparkles, Users, Video } from 'lucide-react';

export default function EdTech() {
    return (
        <PageLayout>
            <Head title="EdTech Solutions" />
            <div className="min-h-screen">
                {/* Hero Section with Enhanced Content */}
                <section className="relative min-h-[700px] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                    <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                    <MaxWidthWrapper>
                        <div className="grid items-center gap-16 py-24 lg:grid-cols-2">
                            <div className="relative z-10 space-y-8">
                                <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20">
                                    <GraduationCap className="h-5 w-5 animate-pulse" />
                                    Education Technology
                                </div>
                                <h1 className="text-5xl leading-tight font-bold text-white">
                                    Transform Learning with{' '}
                                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Modern EdTech</span>
                                </h1>
                                <p className="text-xl leading-relaxed text-gray-300">
                                    Create innovative educational solutions that empower students and educators to achieve their full potential
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                        <div className="mb-2 flex items-center gap-3">
                                            <BookOpen className="h-5 w-5 text-white" />
                                            <span className="font-medium text-white">Digital Learning</span>
                                        </div>
                                        <p className="text-sm text-gray-400">Interactive and engaging learning experiences</p>
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                        <div className="mb-2 flex items-center gap-3">
                                            <Brain className="h-5 w-5 text-white" />
                                            <span className="font-medium text-white">Smart Analytics</span>
                                        </div>
                                        <p className="text-sm text-gray-400">Data-driven insights for better outcomes</p>
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
                                    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                            <Video className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Virtual Learning</h3>
                                            <p className="text-gray-300">Engaging online learning experiences</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                            <Users className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Collaborative Tools</h3>
                                            <p className="text-gray-300">Enhanced student-teacher interaction</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                            <LineChart className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Progress Tracking</h3>
                                            <p className="text-gray-300">Monitor and improve learning outcomes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>

                {/* Detailed Features Section */}
                <section className="bg-gradient-to-br from-gray-50 to-white py-20">
                    <MaxWidthWrapper>
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-gray-900">Comprehensive EdTech Solutions</h2>
                            <p className="mx-auto max-w-2xl text-xl text-gray-600">
                                Empowering educational institutions with innovative technology solutions
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {/* Learning Management */}
                            <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-gray-200">
                                    <BookOpen className="h-7 w-7 text-gray-900" />
                                </div>
                                <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
                                    Learning Management
                                </h3>
                                <p className="mb-6 text-gray-600">Comprehensive learning management solutions</p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-gray-900" />
                                        Course Management
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Video className="h-5 w-5 text-gray-900" />
                                        Content Delivery
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-gray-900" />
                                        Schedule Planning
                                    </li>
                                </ul>
                            </div>

                            {/* Student Engagement */}
                            <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-gray-200">
                                    <Users className="h-7 w-7 text-gray-900" />
                                </div>
                                <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
                                    Student Engagement
                                </h3>
                                <p className="mb-6 text-gray-600">Tools to enhance student participation and interaction</p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-gray-900" />
                                        Discussion Forums
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Video className="h-5 w-5 text-gray-900" />
                                        Live Sessions
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Brain className="h-5 w-5 text-gray-900" />
                                        Interactive Learning
                                    </li>
                                </ul>
                            </div>

                            {/* Analytics & Insights */}
                            <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 transition-colors group-hover:bg-gray-200">
                                    <LineChart className="h-7 w-7 text-gray-900" />
                                </div>
                                <h3 className="mb-4 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
                                    Analytics & Insights
                                </h3>
                                <p className="mb-6 text-gray-600">Data-driven insights for better learning outcomes</p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <LineChart className="h-5 w-5 text-gray-900" />
                                        Performance Tracking
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Brain className="h-5 w-5 text-gray-900" />
                                        Learning Analytics
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Settings className="h-5 w-5 text-gray-900" />
                                        Custom Reports
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>

                
            </div>
        </PageLayout>
    );
}
