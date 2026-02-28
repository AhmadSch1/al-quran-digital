"use client";

import { Doa } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Copy, Check, Share2 } from "lucide-react";
import { useState } from "react";

interface DoaPageActionsProps {
    doa: Doa;
}

export function DoaPageActions({ doa }: DoaPageActionsProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        const textToCopy = `${doa.nama}\n\n${doa.ar}\n\n${doa.tr}\n\nArtinya:\n${doa.idn}\n\nSumber: ${doa.tentang}`;
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    const shareNative = async () => {
        const textToShare = `${doa.nama}\n${doa.idn}\n\nBaca selengkapnya di Al-Quran Digital.`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: doa.nama,
                    text: textToShare,
                    url: window.location.href,
                });
            } catch (err) {
                console.log("Error sharing:", err);
            }
        } else {
            // Fallback to copy link
            copyToClipboard();
        }
    };

    return (
        <div className="flex items-center gap-2 shrink-0">
            <Button
                onClick={shareNative}
                variant="outline"
                className="h-10 w-10 sm:w-auto px-0 sm:px-4 rounded-full sm:rounded-xl border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                title="Bagikan"
            >
                <Share2 className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline font-medium text-sm">Bagikan</span>
            </Button>

            <Button
                onClick={copyToClipboard}
                variant="default"
                className="h-10 px-4 sm:px-5 rounded-full sm:rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                title="Salin Teks"
            >
                {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                ) : (
                    <Copy className="h-4 w-4 mr-2" />
                )}
                <span className="font-medium text-sm">{copied ? "Tersalin" : "Salin Teks"}</span>
            </Button>
        </div>
    );
}
