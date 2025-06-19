import { PropsWithChildren } from 'react';

export default function BorderHover({ children }: PropsWithChildren) {
    return (
        <div className="group relative">
            {children}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
        </div>
    );
}
