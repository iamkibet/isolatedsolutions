import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head } from '@inertiajs/react';


const AboutUs = () => {
    const teamMembers = [
        {
            id: 1,
            name: 'Dennis Kibet',
            role: 'CEO & Co-Founder',
            bio: 'Tech visionary with 8+ years in enterprise software solutions',
            social: {
                twitter: '#',
                linkedin: '#',
            },
        },
        {
            id: 2,
            name: 'Francis Mwangi',
            role: 'Lead Backend Engineer',
            bio: 'Cloud infrastructure expert and systems architect',
            social: {
                twitter: '#',
                linkedin: '#',
            },
        }
        
    ];

    const stats = [
        { value: '8+', label: 'Years Experience' },
        { value: '100+', label: 'Projects Delivered' },
        { value: '98%', label: 'Client Retention' },
        { value: '15+', label: 'Team Members' },
    ];

    const values = [
        {
            title: 'Innovation Driven',
            description: 'We push boundaries with cutting-edge technology solutions',
            icon: '🚀',
        },
        {
            title: 'Client Centric',
            description: 'Your success is our ultimate metric for achievement',
            icon: '💼',
        },
        {
            title: 'Excellence Focused',
            description: 'Relentless pursuit of quality in every deliverable',
            icon: '🏆',
        },
        {
            title: 'Future Ready',
            description: 'Building solutions that evolve with technological shifts',
            icon: '🔮',
        },
    ];

    return (
        <PageLayout>
            <Head title="About Us - Pioneering Digital Transformation" />

            {/* Hero Section */}
            <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black">
                {/* Particle Background */}
                <div className="absolute inset-0">
                    {/* Floating particles */}
                    <div className="animate-float animation-delay-0 absolute top-1/4 left-1/4 h-4 w-4 rounded-full bg-purple-500/30"></div>
                    <div className="animate-float animation-delay-2000 absolute top-1/3 right-1/3 h-3 w-3 rounded-full bg-cyan-400/40"></div>
                    <div className="animate-float animation-delay-3000 absolute bottom-1/4 left-2/5 h-2 w-2 rounded-full bg-amber-400/50"></div>

                
                    {/* Animated gradient highlights */}
                    <div className="animate-pulse-slow absolute -top-20 -left-20 h-96 w-96 rounded-full bg-gradient-to-br from-purple-900/10 to-transparent blur-[100px]"></div>
                    <div className="animate-pulse-slow absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-tr from-cyan-900/10 to-transparent blur-[100px]"></div>

                    {/* Glowing center focus */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-ping-slow h-[300px] w-[300px] rounded-full bg-gradient-to-r from-purple-900/10 to-cyan-900/10 opacity-20"></div>
                    </div>
                </div>

                <MaxWidthWrapper>
                    <div className="relative z-10 px-4 py-32 text-center">
                        <div className="overflow-hidden">
                            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
                                <span className="mb-4 block bg-gradient-to-r from-gray-900 to-gray-300 bg-clip-text text-transparent">
                                    Pioneering Digital
                                </span>
                                <span className="relative inline-block">
                                    <span className="animate-text-gradient bg-gradient-to-r from-gray-400 via-gray-600 to-red-500 bg-[length:200%_auto] bg-clip-text text-4xl font-extrabold text-transparent md:text-6xl">
                                        Transformation
                                    </span>
                                    <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transform bg-gradient-to-r from-cyan-400/0 via-blue-500 to-indigo-500/0 transition-transform duration-700 group-hover:scale-x-100"></span>
                                </span>
                            </h1>
                        </div>

                        <p className="mx-auto mb-16 max-w-2xl text-xl leading-relaxed font-light text-gray-400">
                            Isolated Solutions LTD is a provider with 10+ years of experience building enterprise-grade applications
                        </p>

                        <div className="flex flex-col justify-center gap-5 sm:flex-row">
                            <a
                                href="#mission"
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-4 font-medium text-white transition-all duration-500"
                            >
                                <span className="absolute top-0 right-0 inline-block h-4 w-4 rounded-full bg-cyan-500 transition-all duration-500 ease-in-out group-hover:-mt-4 group-hover:-mr-4 group-hover:h-64 group-hover:w-64 group-hover:bg-blue-600"></span>
                                <span className="absolute bottom-0 left-0 -mb-2 -ml-2 h-8 w-8 rounded-full bg-indigo-500 opacity-30 transition-all duration-500 ease-in-out group-hover:mb-0 group-hover:ml-0 group-hover:h-64 group-hover:w-64 group-hover:bg-indigo-600"></span>
                                <span className="relative z-10 flex items-center text-lg font-semibold text-gray-900">
                                    Our Mission
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
                                href="#"
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-gray-700 px-8 py-4 font-medium text-white transition-all duration-500 hover:border-gray-600"
                            >
                                <span className="absolute inset-0 bg-red-600/80 opacity-100 backdrop-blur-sm transition-opacity duration-500 hover:bg-red-600/60"></span>
                                <span className="relative z-10 flex items-center text-lg font-semibold">
                               
                                    Contact Us
                                </span>
                            </a>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>

            {/* Mission Section */}
            <section id="mission" className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-black py-24">
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-900/10 to-transparent opacity-20 blur-3xl"></div>
                    <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-cyan-900/10 to-transparent opacity-20 blur-3xl"></div>
                </div>

                <MaxWidthWrapper>
                    <div className="relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                        <div>
                            <span className="mb-6 inline-block rounded-full bg-red-900/30 px-4 py-1.5 text-xs font-medium tracking-widest text-cyan-300 uppercase">
                                Our Story
                            </span>
                            <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
                                Building{' '}
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Future-Ready</span>{' '}
                                Solutions
                            </h2>

                            <p className="mb-8 text-lg text-gray-300">
                                We are Isolated Solutions Limited, a certified digital solutions provider with over 10 years of experience.
                                Our wide range of services includes mobile and web app development using the latest technologies.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                {values.map((value, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-gray-800 bg-gradient-to-b from-gray-800/30 to-gray-900/50 p-6 backdrop-blur-sm"
                                    >
                                        <div className="mb-4 text-3xl">{value.icon}</div>
                                        <h3 className="mb-2 text-xl font-bold text-white">{value.title}</h3>
                                        <p className="text-gray-400">{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-1 backdrop-blur-sm">
                                <div className="overflow-hidden rounded-xl bg-gray-900">
                                    <img
                                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
                                        alt="Our team collaborating"
                                        className="h-auto w-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="absolute -right-6 -bottom-6 w-2/3 rounded-xl border border-gray-700 bg-gradient-to-r from-cyan-600 to-blue-700 p-6 shadow-2xl backdrop-blur-sm">
                                <h3 className="mb-2 text-xl font-bold text-white">Our Work Approach</h3>
                                <p className="mb-4 text-gray-200">
                                    Strategic planning of our technology stack enables us to maximize productivity and deliver exceptional results.
                                </p>
                                <a href="/work/case-studies" className="group inline-flex items-center text-cyan-300 transition-colors hover:text-cyan-100">
                                    Read Our Case Study
                                    <svg
                                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-5xl font-bold text-transparent">
                                    {stat.value}
                                </div>
                                <div className="font-medium text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Team Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 py-24">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-purple-900/10 to-transparent"></div>
                    <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-gradient-to-r from-cyan-900/10 to-transparent blur-3xl"></div>
                </div>

                <MaxWidthWrapper>
                    <div className="relative z-10 mb-16 text-center">
                        <span className="mb-6 inline-block rounded-full bg-amber-900/30 px-4 py-1.5 text-xs font-medium tracking-widest text-amber-300 uppercase">
                            Leadership Team
                        </span>
                        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                            Meet Our <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Visionaries</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-400">The brilliant minds driving innovation and excellence</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-800/30 to-gray-900/50 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl"
                            >
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                                <div className="relative z-10 p-6">
                                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 text-2xl">
                                            {member.name.charAt(0)}
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <h3 className="mb-1 text-xl font-bold text-white">{member.name}</h3>
                                        <div className="mb-4 text-cyan-400">{member.role}</div>
                                        <p className="mb-6 text-gray-400">{member.bio}</p>

                                        <div className="flex justify-center space-x-4">
                                            <a href={member.social.twitter} className="text-gray-400 transition-colors hover:text-cyan-400">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                            <a href={member.social.linkedin} className="text-gray-400 transition-colors hover:text-cyan-400">
                                                <i className="fab fa-linkedin-in"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Quote Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-black py-24">
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-900/10 to-transparent blur-3xl"></div>
                    <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-cyan-900/10 to-transparent blur-3xl"></div>
                    <div className="animate-pulse-slow absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
                </div>

                <MaxWidthWrapper>
                    <div className="relative z-10 mx-auto max-w-4xl rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-800/30 to-gray-900/50 p-12 backdrop-blur-sm">
                        <div className="mb-8 flex justify-center">
                            <svg
                                className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-2 text-white"
                                viewBox="0 0 24 27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>

                        <blockquote className="mb-10 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 bg-clip-text text-center text-2xl font-bold text-transparent md:text-3xl">
                            "To cope with technological tide, we must keep sailing, sometimes conventionally or sometimes with a new approach, but we
                            must not lose the continuity of the hustle for achieving more."
                        </blockquote>

                        <div className="text-center">
                            <div className="mb-2 text-xl font-medium text-white">Dennis Kibet</div>
                            <div className="font-light text-cyan-400">CEO & Co-Founder</div>
                        </div>
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
                            Ready to <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Transform</span> Your
                            Business?
                        </h2>
                        <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-300">
                            Partner with us to create innovative digital solutions that drive growth
                        </p>

                        <div className="flex flex-col justify-center gap-5 sm:flex-row">
                            <a
                                href="/contact"
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-4 font-medium text-white transition-all duration-500"
                            >
                                <span className="absolute top-0 right-0 inline-block h-4 w-4 rounded-full bg-cyan-500 transition-all duration-500 ease-in-out group-hover:-mt-4 group-hover:-mr-4 group-hover:h-64 group-hover:w-64 group-hover:bg-blue-600"></span>
                                <span className="absolute bottom-0 left-0 -mb-2 -ml-2 h-8 w-8 rounded-full bg-indigo-500 opacity-30 transition-all duration-500 ease-in-out group-hover:mb-0 group-hover:ml-0 group-hover:h-64 group-hover:w-64 group-hover:bg-indigo-600"></span>
                                <span className="relative z-10 flex items-center text-lg font-semibold text-gray-100">Start a Project</span>
                            </a>

                            <a
                                href="#"
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-gray-700 px-8 py-4 font-medium text-white transition-all duration-500 hover:border-gray-600"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 opacity-100 backdrop-blur-sm transition-opacity duration-500 hover:opacity-90"></span>
                                <span className="relative z-10 flex items-center text-lg font-semibold">Join Our Team</span>
                            </a>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>
        </PageLayout>
    );
};

export default AboutUs;
