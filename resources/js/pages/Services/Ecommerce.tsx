import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head } from '@inertiajs/react';
import { ArrowRight, BarChart, CreditCard, Globe, Package, Shield, ShoppingCart, Smartphone, Zap } from 'lucide-react';

export default function Ecommerce() {
    return (
        <PageLayout>
            <Head title="eCommerce Solutions" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-32">
                <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <MaxWidthWrapper>
                    <div className="relative z-10 space-y-8 text-center">
                        <div className="group inline-flex items-center gap-3 rounded-full bg-gray-800/50 px-6 py-3 text-sm font-medium text-red-400 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50">
                            <ShoppingCart className="h-5 w-5 animate-pulse transition-transform group-hover:scale-110" />
                            Digital Commerce Solutions
                        </div>
                        <h1 className="animate-gradient bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-6xl font-bold text-transparent">
                            eCommerce Development
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-2xl leading-relaxed text-gray-300">
                            Build powerful online stores that drive sales and deliver exceptional shopping experiences
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <button className="group relative flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-2xl">
                                Get Started
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Features Section */}
            <section className="bg-gradient-to-br from-gray-50 to-white py-24">
                <MaxWidthWrapper>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 transition-transform group-hover:scale-110">
                                <ShoppingCart className="h-7 w-7 text-red-600" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Web Store Development</h3>
                            <p className="leading-relaxed text-gray-600">
                                Custom eCommerce websites with advanced features and seamless user experience.
                            </p>
                        </div>

                        <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 transition-transform group-hover:scale-110">
                                <Smartphone className="h-7 w-7 text-red-600" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Mobile Commerce</h3>
                            <p className="leading-relaxed text-gray-600">Native mobile apps for iOS and Android with integrated shopping features.</p>
                        </div>

                        <div className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 transition-transform group-hover:scale-110">
                                <BarChart className="h-7 w-7 text-red-600" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Analytics & Insights</h3>
                            <p className="leading-relaxed text-gray-600">Advanced analytics and reporting tools to track performance and growth.</p>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Services Grid */}
            <section className="bg-white py-24">
                <MaxWidthWrapper>
                    <div className="mb-20 text-center">
                        <h2 className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl lg:font-extrabold xl:text-6xl">
                            Comprehensive eCommerce Solutions
                        </h2>
                        <p className="mx-auto max-w-2xl py-6 text-lg text-slate-600 lg:text-xl">
                            End-to-end eCommerce development services for modern businesses
                        </p>
                    </div>

                    <div className="grid gap-10 md:grid-cols-2">
                        <div className="group rounded-2xl bg-gray-50 p-10 transition-all duration-300 hover:shadow-xl">
                            <h3 className="mb-6 text-2xl font-semibold text-gray-900">Web Store Features</h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-center gap-3 transition-transform group-hover:translate-x-2">
                                    <CreditCard className="h-6 w-6 text-red-600" />
                                    <span className="text-lg">Secure payment gateways</span>
                                </li>
                                <li className="flex items-center gap-3 transition-transform group-hover:translate-x-2">
                                    <Package className="h-6 w-6 text-red-600" />
                                    <span className="text-lg">Inventory management</span>
                                </li>
                                <li className="flex items-center gap-3 transition-transform group-hover:translate-x-2">
                                    <Globe className="h-6 w-6 text-red-600" />
                                    <span className="text-lg">Multi-language support</span>
                                </li>
                            </ul>
                        </div>

                        <div className="group rounded-2xl bg-gray-50 p-10 transition-all duration-300 hover:shadow-xl">
                            <h3 className="mb-6 text-2xl font-semibold text-gray-900">Mobile App Features</h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-center gap-3 transition-transform group-hover:translate-x-2">
                                    <Zap className="h-6 w-6 text-red-600" />
                                    <span className="text-lg">Push notifications</span>
                                </li>
                                <li className="flex items-center gap-3 transition-transform group-hover:translate-x-2">
                                    <Shield className="h-6 w-6 text-red-600" />
                                    <span className="text-lg">Secure authentication</span>
                                </li>
                                <li className="flex items-center gap-3 transition-transform group-hover:translate-x-2">
                                    <BarChart className="h-6 w-6 text-red-600" />
                                    <span className="text-lg">Real-time analytics</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

           
        </PageLayout>
    );
}
