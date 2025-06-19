import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

interface HoverCardProps {
    image: string;
    title: string;
    description: string;
    p: string;
    hoverTitle: string;
    hoverContent: string[];
    className?: string;
    imageProps?: {
        className?: string;
        alt?: string;
    };
}

const HoverCard = ({ image, title, description, p, hoverTitle, hoverContent, className = '', imageProps = {} }: HoverCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const hoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const content = contentRef.current;
        const hover = hoverRef.current;

        if (!card || !content || !hover) return;

        // Initial animation
        gsap.from(content, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse',
            },
        });

        // Hover animation
        const handleMouseEnter = () => {
            gsap.to(hover, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(hover, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
            });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={cardRef} className={`relative h-full ${className}`}>
            <div ref={contentRef} className="h-full p-6">
                <img src={image} alt={imageProps.alt || title} className={`${imageProps.className || ''}`} />
                <h3 className="mb-2 text-xl font-bold">{title}</h3>
                <p className="mb-4 text-gray-600">{description}</p>
                <p className="font-medium text-red-600">{p}</p>
            </div>
            <div ref={hoverRef} className="absolute inset-0 bg-white p-6 opacity-0">
                <h4 className="mb-4 text-xl font-bold text-red-600">{hoverTitle}</h4>
                <ul className="space-y-2">
                    {hoverContent.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HoverCard;
