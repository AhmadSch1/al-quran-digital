"use client";

import { useState, useMemo } from "react";
import { Doa } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DoaCard } from "./doa-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DoaListProps {
    initialDoas: Doa[];
}

export function DoaList({ initialDoas }: DoaListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeGroup, setActiveGroup] = useState<string>("Semua");

    // Extract unique groups for the category filter
    const groups = useMemo(() => {
        const uniqueGroups = Array.from(new Set(initialDoas.map(doa => doa.grup)));
        return ["Semua", ...uniqueGroups];
    }, [initialDoas]);

    // Client-side filtering logic
    const filteredDoas = useMemo(() => {
        return initialDoas.filter((doa) => {
            const matchesGroup = activeGroup === "Semua" || doa.grup === activeGroup;

            if (!searchQuery.trim()) return matchesGroup;

            const query = searchQuery.toLowerCase().trim();
            const matchesSearch =
                doa.nama.toLowerCase().includes(query) ||
                doa.idn.toLowerCase().includes(query) ||
                (doa.tag && doa.tag.some(tag => tag.toLowerCase().includes(query)));

            return matchesGroup && matchesSearch;
        });
    }, [initialDoas, searchQuery, activeGroup]);

    return (
        <div className="space-y-8">
            {/* Search and Filter Section */}
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-emerald-500" />
                    <Input
                        type="text"
                        placeholder="Cari doa, terjemahan, atau ketik kata kunci (misal: tidur)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs border-emerald-100 dark:border-emerald-900/50 rounded-2xl shadow-xs transition-all focus-visible:ring-emerald-500 text-base"
                    />
                </div>

                <ScrollArea className="w-full whitespace-nowrap pb-4">
                    <div className="flex w-max space-x-2 px-1">
                        {groups.map((group) => (
                            <button
                                key={group}
                                onClick={() => setActiveGroup(group)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeGroup === group
                                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-105"
                                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-border/60 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                                    }`}
                            >
                                {group}
                            </button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="h-1.5" />
                </ScrollArea>
            </div>

            {/* Doa Grid */}
            {filteredDoas.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredDoas.map((doa) => (
                        <DoaCard
                            key={doa.id}
                            doa={doa}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 px-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-4">
                        <Search className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
                        Doa Tidak Ditemukan
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                        Coba gunakan kata kunci lain atau pilih kategori yang berbeda.
                    </p>
                </div>
            )}
        </div>
    );
}
