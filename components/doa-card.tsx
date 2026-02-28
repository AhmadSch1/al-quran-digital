"use client";

import { Doa } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, BookOpenText } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DoaCardProps {
    doa: Doa;
}

export function DoaCard({ doa }: DoaCardProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigating if wrapped in a link
        e.stopPropagation();
        const textToCopy = `${doa.nama}\n\n${doa.ar}\n\n${doa.tr}\n\nArtinya:\n${doa.idn}\n\nSumber: ${doa.tentang}`;
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <Card className="group relative flex flex-col h-full overflow-hidden border-transparent hover:border-emerald-300/50 dark:hover:border-emerald-700/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-none hover:-translate-y-1">
            {/* Elegant Top Decorative Bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <CardContent className="p-6 flex-1 flex flex-col pt-7">
                <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 drop-shadow-xs">
                        {doa.grup}
                    </div>
                </div>

                <h3 className="font-bold text-lg sm:text-xl leading-snug text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-3 mb-4">
                    {doa.nama}
                </h3>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {doa.tag && doa.tag.length > 0 && doa.tag.map((tagName, i) => (
                        <span key={i} className="inline-flex items-center text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 px-2 py-1 rounded-md">
                            #{tagName}
                        </span>
                    ))}
                </div>
            </CardContent>

            <div className="p-4 pt-0 mt-auto bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-3 mt-4">
                    <Button
                        asChild
                        variant="default"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 group-hover:shadow-lg group-hover:shadow-emerald-600/30 transition-all duration-300 h-10 rounded-xl"
                    >
                        <Link href={`/doa/${doa.id}`} className="group/btn">
                            <span className="font-semibold text-sm">Baca Doa</span>
                            <BookOpenText className="ml-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                        </Link>
                    </Button>

                    <Button
                        onClick={copyToClipboard}
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 shadow-xs transition-colors shrink-0 border"
                        title="Bagikan/Salin"
                    >
                        {copied ? (
                            <Check className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                            <Copy className="h-4.5 w-4.5" />
                        )}
                        <span className="sr-only">Bagikan</span>
                    </Button>
                </div>
            </div>
        </Card>
    );
}
