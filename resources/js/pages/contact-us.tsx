import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head, useForm } from '@inertiajs/react';
import axios, { AxiosError } from 'axios';
import { Clock, FacebookIcon, Instagram, LetterTextIcon, Linkedin, Map, PhoneIcon, X } from 'lucide-react';
import React, { useState } from 'react';

const ContactUs = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
        message: '',
    });

    const { data, setData, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await axios.post('/contact', data, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            setSubmitStatus({
                type: 'success',
                message: response.data.message,
            });
            reset();
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            console.error('Form submission error:', axiosError);

            setSubmitStatus({
                type: 'error',
                message: axiosError.response?.data?.message || 'An error occurred while sending your message.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: Map,
            title: 'Our Headquarters',
            details: 'Nairobi, Kenya',
            color: 'from-purple-500 to-indigo-600',
        },
        {
            icon: PhoneIcon,
            title: 'Phone',
            details: '+254 (720) 449012',
            color: 'from-cyan-500 to-blue-600',
        },
        {
            icon: LetterTextIcon,
            title: 'Email Us',
            details: 'info@isolatedsolutions.com\nsupport@isolatedsolutions.com',
            color: 'from-amber-500 to-orange-600',
        },
        {
            icon: Clock,
            title: 'Working Hours',
            details: 'Monday-Friday: 9AM - 6PM\nSaturday: 10AM - 2PM',
            color: 'from-emerald-500 to-teal-600',
        },
    ];

    return (
        <PageLayout>
            <Head title="Contact Us - Get in Touch" />

            {/* Enhanced Hero Section */}
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Particle Background */}
                <div className="absolute inset-0">
                    {/* Floating particles with varying sizes and colors */}
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="animate-float absolute rounded-full"
                            style={{
                                animationDelay: `${i * 2000}ms`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 10 + 2}px`,
                                height: `${Math.random() * 10 + 2}px`,
                                backgroundColor: `rgba(${Math.random() > 0.6 ? 91 : 6}, ${Math.random() > 0.6 ? 227 : 182}, ${
                                    Math.random() > 0.6 ? 255 : 212
                                }, ${Math.random() * 0.3 + 0.1})`,
                            }}
                        />
                    ))}

                    {/* Subtle grid */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]"></div>

                    {/* Animated gradient highlights */}
                    <div className="animate-pulse-slow absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-700/10 to-transparent blur-[100px]"></div>
                    <div className="animate-pulse-slow animation-delay-3000 absolute -right-20 -bottom-20 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-cyan-600/10 to-transparent blur-[100px]"></div>

                    {/* Glowing center focus */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-ping-slow h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-700/10 to-cyan-600/10 opacity-30"></div>
                    </div>

                    {/* Floating elements */}
                    <div className="animate-float animation-delay-1000 absolute top-1/4 left-1/4 h-24 w-24 rounded-full bg-gradient-to-br from-purple-600/10 to-cyan-500/10 blur-2xl"></div>
                    <div className="animate-float animation-delay-4000 absolute right-1/3 bottom-1/3 h-16 w-16 rounded-full bg-gradient-to-tr from-amber-400/20 to-orange-500/10 blur-xl"></div>
                </div>

                <MaxWidthWrapper>
                    <div className="relative z-10 px-4 py-24 text-center">
                        <div className="overflow-hidden">
                            {/* Enhanced heading with layered text effect */}
                            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
                                <span className="mb-4 block">
                                    <span className="relative inline-block">
                                        <span className="absolute -inset-4 z-0 bg-gradient-to-r from-gray-200 to-gray-100 blur-3xl"></span>
                                        <span className="relative z-10 bg-gradient-to-r from-gray-800 via-red-900 to-gray-900 bg-clip-text text-transparent">
                                            Let's Connect
                                        </span>
                                    </span>
                                </span>

                                <span className="relative mt-8 inline-block">
                                    <span className="absolute -inset-4 z-0 bg-gradient-to-r from-gray-200 to-gray-100 blur-3xl"></span>
                                    <span className="animate-text-gradient relative z-10 bg-gradient-to-r from-gray-200 via-gray-800 to-gray-100 bg-[length:200%_auto] bg-clip-text text-4xl font-extrabold text-transparent md:text-6xl lg:text-7xl">
                                        Contact Us
                                    </span>
                                    <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-gradient-to-r from-gray-400 via-cyan-500 to-gray-300 transition-transform duration-1000 group-hover:scale-x-100"></span>
                                </span>
                            </h1>
                        </div>

                        <p className="mx-auto mb-12 max-w-2xl rounded-xl bg-gray-100 px-6 py-4 text-xl leading-relaxed font-light text-gray-900 backdrop-blur-sm">
                            Have questions or ready to start your project? Reach out to our team - we're here to help.
                        </p>

                        {/* Animated CTA */}
                        <div className="mt-16 flex flex-col justify-center gap-6 sm:flex-row">
                            <a
                                href="#contact-form"
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-4 font-medium text-white transition-all duration-500"
                            >
                                <span className="absolute top-0 right-0 inline-block h-4 w-4 rounded-full bg-cyan-500 transition-all duration-500 ease-in-out group-hover:-mt-4 group-hover:-mr-4 group-hover:h-64 group-hover:w-64 group-hover:bg-blue-600"></span>
                                <span className="absolute bottom-0 left-0 -mb-2 -ml-2 h-8 w-8 rounded-full bg-purple-500 opacity-30 transition-all duration-500 ease-in-out group-hover:mb-0 group-hover:ml-0 group-hover:h-64 group-hover:w-64 group-hover:bg-purple-600"></span>
                                <span className="relative z-10 flex items-center text-lg font-semibold text-gray-900 group-hover:text-white">
                                    Get in Touch
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
                        </div>

                        {/* Animated scroll indicator */}
                        <div className="mt-24 animate-bounce">
                            <a href="#contact-section" className="group inline-flex flex-col items-center text-amber-900">
                                <span className="mb-2 text-sm">Scroll to explore</span>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </MaxWidthWrapper>

                {/* Floating elements */}
                <div className="animate-pulse-slow absolute bottom-20 left-10 h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-lg"></div>
                <div className="animate-pulse-slow animation-delay-2000 absolute top-20 right-10 h-16 w-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-lg"></div>
            </div>

            {/* Contact Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-black py-24">
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-900/10 to-transparent opacity-20 blur-3xl"></div>
                    <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-cyan-900/10 to-transparent opacity-20 blur-3xl"></div>
                </div>

                <MaxWidthWrapper>
                    <div className="relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-2">
                        {/* Contact Form */}
                        <div className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-800/30 to-gray-900/50 p-8 shadow-xl backdrop-blur-sm">
                            <h2 className="mb-2 text-3xl font-bold text-white">Send Us a Message</h2>
                            <p className="mb-8 text-gray-400">We'll get back to you within 24 hours</p>

                            {submitStatus.type && (
                                <div
                                    className={`mb-6 rounded-lg p-4 ${
                                        submitStatus.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                    }`}
                                >
                                    {submitStatus.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-400">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                <i className="fas fa-user"></i>
                                            </div>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pr-4 pl-10 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-400">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                                <i className="fas fa-envelope"></i>
                                            </div>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pr-4 pl-10 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                                placeholder="john@company.com"
                                                required
                                            />
                                        </div>
                                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-400">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                            <i className="fas fa-phone"></i>
                                        </div>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 pr-4 pl-10 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>
                                    {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-400">
                                        Subject
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                            <i className="fas fa-tag"></i>
                                        </div>
                                        <select
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="w-full appearance-none rounded-lg border border-gray-700 bg-gray-800 py-3 pr-4 pl-10 text-white transition-all focus:border-transparent focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="Project Inquiry">Project Inquiry</option>
                                            <option value="Partnership">Partnership</option>
                                            <option value="Technical Support">Technical Support</option>
                                            <option value="Career Opportunity">Career Opportunity</option>
                                            <option value="General Question">General Question</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                            <i className="fas fa-chevron-down"></i>
                                        </div>
                                    </div>
                                    {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
                                </div>

                                <div>
                                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-400">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={5}
                                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                        placeholder="How can we help you?"
                                        required
                                    ></textarea>
                                    {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl px-8 py-4 font-medium text-white transition-all duration-500 disabled:opacity-50"
                                    >
                                        <span className="absolute top-0 right-0 inline-block h-4 w-4 rounded-full bg-cyan-500 transition-all duration-500 ease-in-out group-hover:-mt-4 group-hover:-mr-4 group-hover:h-64 group-hover:w-64 group-hover:bg-blue-600"></span>
                                        <span className="absolute bottom-0 left-0 -mb-2 -ml-2 h-8 w-8 rounded-full bg-indigo-500 opacity-30 transition-all duration-500 ease-in-out group-hover:mb-0 group-hover:ml-0 group-hover:h-64 group-hover:w-64 group-hover:bg-indigo-600"></span>
                                        <span className="relative z-10 flex items-center text-lg font-semibold text-white">
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                            {!isSubmitting && (
                                                <svg
                                                    className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h2 className="mb-2 text-3xl font-bold text-white">Get in Touch</h2>
                            <p className="mb-10 text-gray-400">We'd love to hear from you. Here's how you can reach us.</p>

                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-start rounded-xl border border-gray-800 bg-gradient-to-b from-gray-800/30 to-gray-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30"
                                    >
                                        <div
                                            className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.color} mr-5 text-xl text-white`}
                                        >
                                            {React.createElement(item.icon)}
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                                            <p className="whitespace-pre-line text-gray-400">{item.details}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10">
                                <h3 className="mb-4 text-xl font-bold text-white">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://www.instagram.com/isolatedsolutions/"
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all duration-300 hover:bg-cyan-600 hover:text-white"
                                    >
                                        <Instagram />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/denniskibet/"
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all duration-300 hover:bg-blue-700 hover:text-white"
                                    >
                                        <Linkedin />
                                    </a>
                                    <a
                                        href="https://x.com/KibetBuilds"
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all duration-300 hover:bg-purple-600 hover:text-white"
                                    >
                                        <X />
                                    </a>
                                    <a
                                        href="https://www.facebook.com/IsolatedSolutionsLimited/"
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all duration-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        <FacebookIcon />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Map Section */}
            {/* <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 py-16">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-purple-900/10 to-transparent"></div>
                    <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-gradient-to-r from-cyan-900/10 to-transparent blur-3xl"></div>
                </div>

                <MaxWidthWrapper>
                    <div className="relative z-10 mb-16 text-center">
                        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                            Find Us on the <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Map</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-400">Visit our headquarters or schedule a meeting at our office</p>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-800/50 to-gray-900/50 shadow-xl backdrop-blur-sm">
                   
                        <div className="relative h-96 w-full bg-gray-800">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                                        <i className="fas fa-map-marker-alt text-2xl"></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Our Headquarters</h3>
                                    <p className="text-gray-400">San Francisco, CA</p>
                                </div>
                            </div>

                         
                            <div className="absolute top-8 left-8 h-8 w-8 animate-ping rounded-full bg-cyan-500 opacity-30"></div>
                            <div className="absolute right-16 bottom-16 h-6 w-6 animate-ping rounded-full bg-amber-500 opacity-30"></div>
                        </div>

                        <div className="border-t border-gray-800 p-6">
                            <div className="flex flex-col items-center justify-between md:flex-row">
                                <div className="mb-4 text-gray-300 md:mb-0">
                                    <i className="fas fa-car mr-2 text-cyan-400"></i> Parking available in the building
                                </div>
                                <div className="flex space-x-3">
                                    <button className="inline-flex items-center rounded-lg bg-gray-800 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-700">
                                        <i className="fas fa-directions mr-2 text-amber-400"></i>
                                        Get Directions
                                    </button>
                                    <button className="inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-600 to-blue-700 px-4 py-2 text-white transition-opacity hover:opacity-90">
                                        <i className="fas fa-calendar-alt mr-2"></i>
                                        Schedule Visit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section> */}

            {/* FAQ Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-black py-24">
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-900/10 to-transparent blur-3xl"></div>
                    <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-cyan-900/10 to-transparent blur-3xl"></div>
                    <div className="animate-pulse-slow absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
                </div>

                <MaxWidthWrapper>
                    <div className="relative z-10 mb-16 text-center">
                        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                            Frequently Asked{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Questions</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-400">Common questions about working with us</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {[
                            {
                                question: 'How quickly do you respond to inquiries?',
                                answer: 'We typically respond to all inquiries within 24 business hours. For urgent matters, please call our support line directly.',
                            },
                            {
                                question: 'What industries do you specialize in?',
                                answer: 'We have extensive experience in fintech, healthcare, e-commerce, SaaS platforms, and enterprise solutions across various sectors.',
                            },
                            {
                                question: 'What is your typical project timeline?',
                                answer: 'Project timelines vary based on complexity, but most projects range from 3-9 months. We provide detailed timelines after our initial consultation.',
                            },
                            {
                                question: 'Do you offer ongoing support after launch?',
                                answer: 'Yes, we offer comprehensive maintenance and support packages tailored to your specific needs and requirements.',
                            },
                            {
                                question: 'What is your pricing model?',
                                answer: 'We offer flexible engagement models including fixed-price, time & materials, and dedicated team options based on project requirements.',
                            },
                            {
                                question: 'How do you ensure data security?',
                                answer: 'We implement industry-standard security protocols including encryption, secure coding practices, and regular security audits to protect your data.',
                            },
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="group rounded-xl border border-gray-800 bg-gradient-to-b from-gray-800/30 to-gray-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30"
                            >
                                <h3 className="mb-3 flex items-center text-xl font-bold text-white">
                                    <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-xs">
                                        {index + 1}
                                    </span>
                                    {faq.question}
                                </h3>
                                <p className="text-gray-400">{faq.answer}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <a href="/faq" className="group inline-flex items-center text-cyan-400 hover:text-cyan-300">
                            View all FAQs
                            <svg
                                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Final CTA */}
            <section className="relative bg-gradient-to-r from-gray-900 to-black py-24">
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-900/10 to-transparent opacity-20 blur-3xl"></div>
                    <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-cyan-900/10 to-transparent opacity-20 blur-3xl"></div>
                </div>

                <MaxWidthWrapper>
                    <div className="relative z-10 text-center">
                        <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
                            Ready to <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Start</span> Your
                            Project?
                        </h2>
                        <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-300">Contact us today for a free consultation and project estimate</p>

                        <div className="flex flex-col justify-center gap-5 sm:flex-row">
                            <a
                                href="#"
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-4 font-medium text-white transition-all duration-500"
                            >
                                <span className="absolute top-0 right-0 inline-block h-4 w-4 rounded-full bg-cyan-500 transition-all duration-500 ease-in-out group-hover:-mt-4 group-hover:-mr-4 group-hover:h-64 group-hover:w-64 group-hover:bg-blue-600"></span>
                                <span className="absolute bottom-0 left-0 -mb-2 -ml-2 h-8 w-8 rounded-full bg-indigo-500 opacity-30 transition-all duration-500 ease-in-out group-hover:mb-0 group-hover:ml-0 group-hover:h-64 group-hover:w-64 group-hover:bg-indigo-600"></span>
                                <span className="relative z-10 flex items-center text-lg font-semibold text-gray-900">Schedule a Call</span>
                            </a>

                            <a
                                href="/contact"
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-gray-700 px-8 py-4 font-medium text-white transition-all duration-500 hover:border-gray-600"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 opacity-100 backdrop-blur-sm transition-opacity duration-500 hover:opacity-90"></span>
                                <span className="relative z-10 flex items-center text-lg font-semibold">
                                    <i className="fas fa-paper-plane mr-3"></i>
                                    Send Message
                                </span>
                            </a>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>
        </PageLayout>
    );
};

export default ContactUs;
