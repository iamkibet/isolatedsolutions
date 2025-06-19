import PageLayout from '@/layouts/page-layout';
import MaxWidthWrapper from '@/ui/MaxWidthWrapper';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Briefcase } from 'lucide-react';
import { useState } from 'react';

export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

    const handleImageLoad = (imagePath: string) => {
        setLoadedImages(prev => ({ ...prev, [imagePath]: true }));
    };

    const filters = [
        { id: 'all', label: 'All Projects' },
        { id: 'web', label: 'Web Development' },
        { id: 'mobile', label: 'Mobile Apps' },
        { id: 'design', label: 'UI/UX Design' },
        { id: 'ai', label: 'AI/ML Solutions' },
    ];

    const projects = [
        {
            id: 1,
            title: 'E-commerce Platform',
            description: 'A modern e-commerce solution with real-time inventory management',
            category: 'web',
            image: '/images/sokomagari.png',
            imageWidth: 800,
            imageHeight: 600,
            technologies: ['React', 'Laravel', 'MYSQL'],
            link: 'https://sokomagari.isolatedsolutions.org/',
        },
        {
            id: 2,
            title: 'Health & Wellness App',
            description: 'Mobile application for tracking fitness and wellness goals',
            category: 'mobile',
            image: '/images/work/wellness.jpg',
            imageWidth: 800,
            imageHeight: 600,
            technologies: ['React Native', 'Firebase', 'Redux'],
            link: '/work/case-studies/wellness',
        },
        {
            id: 3,
            title: 'E & E Babyshop',
            description: 'Business intelligence platform with machine learning capabilities',
            category: 'ai',
            image: '/images/eebabyshop.png',
            imageWidth: 800,
            imageHeight: 600,
            technologies: ['Python', 'TensorFlow', 'AWS'],
            link: '/work/case-studies/analytics',
        },
        {
            id: 4,
            title: 'Design System',
            description: 'Comprehensive design system for enterprise applications',
            category: 'design',
            image: '/images/work/design-system.jpg',
            imageWidth: 800,
            imageHeight: 600,
            technologies: ['Figma', 'Storybook', 'React'],
            link: '/work/case-studies/design-system',
        },
        {
            id: 5,
            title: 'Expense Tracker',
            description: 'Secure and user-friendly mobile banking application',
            category: 'mobile',
            image: '/images/work/banking.jpg',
            imageWidth: 800,
            imageHeight: 600,
            technologies: ['REact Native', 'Tailwind CSS', 'PostgreSQL'],
            link: '/work/case-studies/banking',
        },
        {
            id: 6,
            title: 'Learning Management System',
            description: 'Interactive learning management system',
            category: 'web',
            image: '/images/work/learning.jpg',
            imageWidth: 800,
            imageHeight: 600,
            technologies: ['Vue.js', 'Laravel', 'MySQL'],
            link: '/work/case-studies/learning',
        },
    ];

    const filteredProjects = activeFilter === 'all' ? projects : projects.filter((project) => project.category === activeFilter);

    return (
        <PageLayout>
            <Head title="Our Portfolio" />

            {/* Hero Section */}
            <section className="relative min-h-[400px] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <div className="animate-pulse-slow absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <MaxWidthWrapper>
                    <div className="relative z-10 pt-32 pb-20 text-center">
                        <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white">
                            <Briefcase className="h-5 w-5" />
                            Our Portfolio
                        </div>
                        <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
                            Explore Our{' '}
                            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Digital Creations</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-xl text-gray-300">
                            Discover our diverse range of projects showcasing innovation and technical excellence
                        </p>
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Filter Section */}
            <section className="border-b bg-white py-12">
                <MaxWidthWrapper>
                    <div className="flex flex-wrap justify-center gap-4">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
                                    activeFilter === filter.id ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Projects Grid */}
            <section className="bg-gray-50 py-20">
                <MaxWidthWrapper>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project) => (
                            <Link
                                key={project.id}
                                href={project.link}
                                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    {!loadedImages[project.image] && (
                                        <div className="absolute inset-0 animate-pulse bg-gray-200" />
                                    )}
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        width={project.imageWidth}
                                        height={project.imageHeight}
                                        loading="lazy"
                                        onLoad={() => handleImageLoad(project.image)}
                                        className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                                            loadedImages[project.image] ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>
                                <div className="p-6">
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-red-600">
                                        {project.title}
                                    </h3>
                                    <p className="mb-4 text-gray-600">{project.description}</p>
                                    <div className="flex items-center font-medium text-red-600">
                                        View Project
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>
        </PageLayout>
    );
}
