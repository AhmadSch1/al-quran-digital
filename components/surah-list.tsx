"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, Bookmark, LayoutList } from "lucide-react";
import { Surah } from "@/lib/types";
import { SurahCard } from "./surah-card";
import { Button } from "./ui/button";

interface SurahListProps {
    surahs: Surah[];
}

export function SurahList({ surahs }: SurahListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"quran" | "juz-amma">("quran");

    const filteredSurahs = useMemo(() => {
        let filtered = surahs;

        // Apply tab filter first
        if (activeTab === "juz-amma") {
            filtered = surahs.filter((surah) => surah.nomor >= 78 && surah.nomor <= 114);
        }

        if (!searchQuery.trim()) return filtered;

        const query = searchQuery.toLowerCase().trim();
        return filtered.filter(
            (surah) =>
                surah.nama_latin.toLowerCase().includes(query) ||
                surah.arti.toLowerCase().includes(query) ||
                surah.nama.includes(query) ||
                surah.nomor.toString() === query
        );
    }, [surahs, searchQuery, activeTab]);

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white dark:bg-slate-950 py-12 md:py-20 mb-8 border-b border-slate-100 dark:border-slate-900 w-full"
                style={{ backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}>

                <div className="container relative mx-auto px-4 lg:px-8 max-w-6xl">

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24 relative min-h-[300px]">

                        {/* Animated Quran Graphic Illustration */}
                        <div className="hidden md:flex shrink-0 relative w-[280px] h-[280px] z-10 justify-center items-center">
                            <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full scale-150 animate-pulse"></div>
                            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_20px_40px_rgba(4,120,87,0.2)] dark:drop-shadow-[0_20px_40px_rgba(4,120,87,0.4)]">
                                <style>
                                    {`
                                    @keyframes float-quran {
                                        0% { transform: translateY(0px); }
                                        50% { transform: translateY(-12px); }
                                        100% { transform: translateY(0px); }
                                    }
                                    .animate-float {
                                        animation: float-quran 6s ease-in-out infinite;
                                    }
                                    `}
                                </style>

                                {/* Background Soft Glow */}
                                <circle cx="200" cy="200" r="140" fill="#10B981" opacity="0.05" className="animate-pulse" />

                                <g className="animate-float">
                                    {/* Rehal (Wooden Stand) */}
                                    {/* Left Leg */}
                                    <path d="M130 300 L170 230 L190 240 L150 310 Z" fill="#8B4513" />
                                    <path d="M150 310 L190 240 L200 245 L160 315 Z" fill="#654321" />
                                    {/* Right Leg */}
                                    <path d="M270 300 L230 230 L210 240 L250 310 Z" fill="#8B4513" />
                                    <path d="M250 310 L210 240 L200 245 L240 315 Z" fill="#654321" />
                                    {/* Top Cross pieces */}
                                    <path d="M170 230 L230 230 L200 260 Z" fill="#5C4033" />
                                    <path d="M110 210 L170 230 L150 250 L90 230 Z" fill="#A0522D" />
                                    <path d="M290 210 L230 230 L250 250 L310 230 Z" fill="#A0522D" />

                                    {/* Quran Cover Bottom & Edges */}
                                    <path d="M90 220 C140 250 190 240 200 240 C210 240 260 250 310 220 L290 120 C240 140 210 130 200 130 C190 130 160 140 110 120 Z" fill="#064E3B" className="dark:fill-emerald-950" />
                                    <path d="M90 220 L95 228 C145 258 195 248 200 248 C205 248 255 258 305 228 L310 220 Z" fill="#F59E0B" />

                                    {/* Outer Gold Border details on cover */}
                                    <path d="M100 220 C145 245 190 235 200 235 C210 235 255 245 300 220" stroke="#F59E0B" strokeWidth="3" fill="none" opacity="0.8" />

                                    {/* Pages Stack Depth */}
                                    <path d="M95 210 C145 240 195 230 200 230 L200 240 C190 240 145 250 95 220 Z" fill="#E2E8F0" className="dark:fill-slate-400" />
                                    <path d="M305 210 C255 240 205 230 200 230 L200 240 C210 240 255 250 305 220 Z" fill="#CBD5E1" className="dark:fill-slate-500" />

                                    {/* Main Open Pages */}
                                    {/* Left Page */}
                                    <path d="M95 200 C145 230 195 220 200 220 L195 110 C160 125 130 115 110 100 Z" fill="#FFFFFF" className="dark:fill-slate-100" />
                                    {/* Right Page */}
                                    <path d="M305 200 C255 230 205 220 200 220 L205 110 C240 125 270 115 290 100 Z" fill="#F8FAFC" className="dark:fill-slate-200" />

                                    {/* Center Crease / Spine Binding */}
                                    <path d="M195 110 C195 150 200 220 200 220 C200 220 205 150 205 110 Z" fill="#94A3B8" className="dark:fill-slate-400" opacity="0.5" />

                                    {/* Red/Gold Bookmark Ribbon */}
                                    <path d="M200 115 L215 255 L200 270 L185 255 Z" fill="#DC2626" />
                                    <path d="M215 255 L200 270 L205 285 L220 265 Z" fill="#991B1B" />
                                    <path d="M198 260 L202 260 L200 270 Z" fill="#FBBF24" />

                                    {/* Ornate Page Borders (Left) */}
                                    <path d="M115 115 L180 145 M115 115 L105 190 M105 190 L185 215 M180 145 L185 215" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.6" strokeDasharray="4 2" />
                                    {/* Ornate Page Borders (Right) */}
                                    <path d="M285 115 L220 145 M285 115 L295 190 M295 190 L215 215 M220 145 L215 215" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.6" strokeDasharray="4 2" />

                                    {/* Text Lines simulating Arabic Calligraphy (Left Page) */}
                                    <path d="M125 135 Q150 150 170 150 M130 150 Q155 165 175 165 M125 165 Q150 180 170 180 M120 180 Q145 195 175 190 M115 195 Q135 205 165 200" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                                    {/* Text Lines simulating Arabic Calligraphy (Right Page) */}
                                    <path d="M275 135 Q250 150 230 150 M270 150 Q245 165 225 165 M275 165 Q250 180 230 180 M280 180 Q255 195 225 190 M285 195 Q265 205 235 200" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

                                    {/* Calligraphy Diacritics (Dots/Harakat) */}
                                    <circle cx="140" cy="125" r="2" fill="#F59E0B" />
                                    <circle cx="160" cy="140" r="1.5" fill="#F59E0B" />
                                    <circle cx="145" cy="170" r="2" fill="#F59E0B" />
                                    <circle cx="260" cy="125" r="2" fill="#F59E0B" />
                                    <circle cx="240" cy="140" r="1.5" fill="#F59E0B" />
                                    <circle cx="255" cy="170" r="2" fill="#F59E0B" />
                                </g>

                                {/* Decorative Stars & Particles surrounding the Quran */}
                                <path d="M60 60 L65 75 L80 75 L68 85 L72 100 L60 90 L48 100 L52 85 L40 75 L55 75 Z" fill="#FBBF24" className="animate-pulse" style={{ animationDuration: '3s', transformOrigin: 'center' }} />
                                <path d="M320 80 L323 90 L333 90 L325 96 L328 106 L320 100 L312 106 L315 96 L307 90 L317 90 Z" fill="#FBBF24" className="animate-pulse" style={{ animationDuration: '2s', transformOrigin: 'center' }} />
                                <path d="M340 220 L342 227 L349 227 L344 231 L346 238 L340 234 L334 238 L336 231 L331 227 L338 227 Z" fill="#FCD34D" className="animate-pulse" style={{ animationDuration: '4s', transformOrigin: 'center' }} />
                                <path d="M80 260 L82 267 L89 267 L84 271 L86 278 L80 274 L74 278 L76 271 L71 267 L78 267 Z" fill="#FCD34D" className="animate-pulse" style={{ animationDuration: '3.5s', transformOrigin: 'center' }} />

                                {/* Small glowing orbs */}
                                <circle cx="90" cy="150" r="4" fill="#34D399" className="animate-pulse" style={{ animationDuration: '2.5s' }} />
                                <circle cx="310" cy="160" r="3" fill="#10B981" className="animate-pulse" style={{ animationDuration: '3.5s' }} />
                                <circle cx="160" cy="50" r="5" fill="#6EE7B7" className="animate-pulse" style={{ animationDuration: '1.5s' }} />
                                <circle cx="260" cy="270" r="4" fill="#34D399" className="animate-pulse" style={{ animationDuration: '4.5s' }} />
                            </svg>
                        </div>

                        {/* Text and Search Content */}
                        <div className="flex-1 max-w-2xl flex flex-col items-center text-center z-20 mt-4 md:mt-0">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#115e59] dark:text-emerald-400 mb-4 font-serif">
                                Al-Quran Online 30 Juz
                            </h1>

                            <p className="text-sm md:text-[15px] text-slate-500 dark:text-slate-400 mb-8 max-w-md w-full font-medium">
                                Apa yang ingin Anda baca ?
                            </p>

                            {/* Search Bar */}
                            <div className="relative w-full max-w-xl mb-6 group">
                                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-600 dark:text-emerald-400 transition-colors" />
                                <Input
                                    type="text"
                                    placeholder="Cari Surat"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-[52px] pl-14 pr-6 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_4px_14px_rgba(0,0,0,0.03)] dark:shadow-none text-[15px] focus-visible:ring-emerald-500/20 focus-visible:border-emerald-400 focus-visible:ring-4 transition-all hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] w-full placeholder:text-slate-400"
                                    id="search-surah"
                                />
                            </div>

                            {/* Quick Links */}
                            <div className="flex flex-wrap justify-center gap-2.5 mb-10 w-full max-w-xl">
                                {['Yasin', 'Al-Kahf', 'Ar-Rahman', 'Al-Mulk'].map((surah) => (
                                    <button
                                        key={surah}
                                        onClick={() => setSearchQuery(surah)}
                                        className="text-[13px] font-medium px-5 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-400 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                                    >
                                        {surah}
                                    </button>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-center gap-4 w-full">
                                <Button variant="outline" className="rounded-full border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-teal-950/50 hover:border-emerald-200 hover:text-emerald-800 px-6 h-10 shadow-sm transition-all font-medium text-sm">
                                    <LayoutList className="w-[18px] h-[18px] mr-2" />
                                    Koleksi
                                </Button>
                                <Button variant="outline" className="rounded-full border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-teal-950/50 hover:border-emerald-200 hover:text-emerald-800 px-6 h-10 shadow-sm transition-all font-medium text-sm">
                                    <Bookmark className="w-[18px] h-[18px] mr-2" />
                                    Bookmark
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Surah List Area */}
            <section className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">

                {/* Section Divider: Daftar Surat */}
                <div className="flex items-center justify-center relative my-10">
                    <div className="absolute left-0 right-0 h-px bg-emerald-200 dark:bg-emerald-900/50"></div>
                    <div className="bg-emerald-800 dark:bg-emerald-900 text-white px-8 md:px-12 py-2.5 rounded-full z-10 font-medium tracking-wide shadow-md border-[3px] border-white dark:border-background relative overflow-hidden flex items-center justify-center">
                        <span className="relative z-10 text-sm md:text-base font-semibold">Daftar Surat</span>
                        {/* Decorative side cutouts (simulated with CSS shapes) */}
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-background rounded-full"></div>
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-background rounded-full"></div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-10">
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 p-1 rounded-full flex gap-1 border border-emerald-100 dark:border-emerald-900/50 shadow-inner overflow-x-auto w-full md:w-auto">
                        <button
                            onClick={() => setActiveTab("quran")}
                            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap ${activeTab === "quran"
                                ? "bg-white dark:bg-slate-900 shadow-sm text-emerald-800 dark:text-emerald-400"
                                : "text-slate-500 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-white/50 dark:hover:bg-slate-900/50"
                                }`}
                        >
                            Al-Quran <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-amiri)' }}>القرآن</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("juz-amma")}
                            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap ${activeTab === "juz-amma"
                                ? "bg-white dark:bg-slate-900 shadow-sm text-emerald-800 dark:text-emerald-400"
                                : "text-slate-500 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-white/50 dark:hover:bg-slate-900/50"
                                }`}
                        >
                            Juz Amma <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-amiri)' }}>جُزْء عَمَّ</span>
                        </button>
                    </div>
                </div>

                {filteredSurahs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
                        <h3 className="text-lg font-semibold">Surah tidak ditemukan</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Coba kata kunci lain
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredSurahs.map((surah) => (
                            <SurahCard key={surah.nomor} surah={surah} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
