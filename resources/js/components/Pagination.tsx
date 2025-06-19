import { Link } from "@inertiajs/react";
import React from "react";

interface Props {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export const Pagination: React.FC<Props> = ({ links }) => {
    return (
        <div className="flex justify-center">
            <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
            >
                {links.map((link, index) => {
                    if (!link.url && link.label === "...") {
                        return (
                            <span
                                key={index}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                            >
                                ...
                            </span>
                        );
                    }
                    return (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                ${
                    link.active
                        ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }
                ${index === 0 ? "rounded-l-md" : ""}
                ${index === links.length - 1 ? "rounded-r-md" : ""}
              `}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </nav>
        </div>
    );
};
