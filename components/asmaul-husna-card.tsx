"use client";

import { useState, useRef } from "react";
import { Play, Square, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { AsmaulHusna, getAsmaulHusnaAudioUrl } from "@/lib/asmaul-husna-api";

interface AsmaulHusnaCardProps {
    data: AsmaulHusna;
}

export function AsmaulHusnaCard({ data }: AsmaulHusnaCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio(getAsmaulHusnaAudioUrl(data.audio));
            audioRef.current.onended = () => setIsPlaying(false);
        }

        if (isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        } else {
            // Stop any other playing audio globally if possible, or just play this one
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-white/50 dark:bg-slate-900/50 p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800/50">
            {/* Number Badge */}
            <div className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {data.number}
            </div>

            {/* Audio Button */}
            <button
                onClick={togglePlay}
                className={cn(
                    "absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                    isPlaying
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25 animate-pulse"
                        : "bg-slate-100 text-slate-500 hover:bg-emerald-100 hover:text-emerald-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-emerald-900/50 dark:hover:text-emerald-400"
                )}
                aria-label={isPlaying ? "Stop Audio" : "Play Audio"}
            >
                {isPlaying ? <Square className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 ml-0.5 fill-current" />}
            </button>

            {/* Content Area */}
            <div className="mt-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="min-h-[80px] flex items-center justify-center">
                    <h2 className="font-arabic text-4xl leading-tight text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {data.name}
                    </h2>
                </div>

                <div className="space-y-1 w-full">
                    <h3 className="font-bold text-lg text-emerald-700 dark:text-emerald-400 tracking-tight">
                        {data.transliteration}
                    </h3>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {data.translation}
                    </p>
                </div>

                <div className="pt-4 border-t border-border/40 w-full">
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        {data.meaning}
                    </p>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12 group-hover:opacity-10 dark:opacity-10 dark:group-hover:opacity-20">
                <BookOpen className="h-32 w-32 text-emerald-600 dark:text-emerald-400" />
            </div>
        </div>
    );
}
