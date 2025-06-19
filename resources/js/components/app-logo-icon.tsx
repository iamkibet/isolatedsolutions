export default function AppLogoIcon({ className = '', isScrolled = false }: { className?: string; isScrolled?: boolean }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke={isScrolled ? '#1F2937' : '#FFFFFF'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M2 17L12 22L22 17" stroke={isScrolled ? '#1F2937' : '#FFFFFF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke={isScrolled ? '#1F2937' : '#FFFFFF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2" fill={isScrolled ? '#1F2937' : '#FFFFFF'} stroke={isScrolled ? '#1F2937' : '#FFFFFF'} strokeWidth="1" />
            <path d="M12 2V12M12 12V22" stroke={isScrolled ? '#1F2937' : '#FFFFFF'} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
        </svg>
    );
}
