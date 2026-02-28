"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";

interface AudioPlayerProps {
    audioUrl: string;
    surahName: string;
}

export function AudioPlayer({ audioUrl, surahName }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio(audioUrl);
            audioRef.current.addEventListener("ended", () => setIsPlaying(false));
        }

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <Button
            onClick={togglePlay}
            variant={isPlaying ? "default" : "outline"}
            className="gap-2 rounded-full px-5 transition-all duration-300 cursor-pointer"
            aria-label={isPlaying ? `Pause ${surahName}` : `Play ${surahName}`}
        >
            {isPlaying ? (
                <>
                    <Pause className="h-4 w-4" />
                    <span className="hidden sm:inline">Pause Audio</span>
                    <Volume2 className="h-3.5 w-3.5 animate-pulse" />
                </>
            ) : (
                <>
                    <Play className="h-4 w-4" />
                    <span className="hidden sm:inline">Putar Audio</span>
                </>
            )}
        </Button>
    );
}
