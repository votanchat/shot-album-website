"use client";

import { JSX } from "react";

export default function LoadingScreen(): JSX.Element {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            {/* Beautiful Multi-Ring Spinner */}
            <div className="relative w-20 h-20">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-gray-200/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-gray-400 rounded-full animate-spin"></div>
                
                {/* Middle Ring */}
                <div className="absolute inset-2 border-4 border-gray-200/30 rounded-full"></div>
                <div className="absolute inset-2 border-4 border-transparent border-t-gray-600 rounded-full animate-spin [animation-duration:0.8s] [animation-direction:reverse]"></div>
                
                {/* Inner Ring */}
                <div className="absolute inset-4 border-4 border-gray-200/30 rounded-full"></div>
                <div className="absolute inset-4 border-4 border-transparent border-t-gray-800 rounded-full animate-spin [animation-duration:0.6s]"></div>
            </div>
        </div>
    );
}

