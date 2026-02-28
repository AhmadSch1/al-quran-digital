"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function SurahError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <div className="rounded-2xl bg-destructive/10 p-4 mb-6">
                <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Gagal Memuat Surah</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
                {error.message || "Maaf, terjadi kesalahan saat memuat surah ini. Periksa koneksi internet Anda dan coba lagi."}
            </p>
            <div className="flex gap-3">
                <Button onClick={reset} variant="outline" className="gap-2 cursor-pointer">
                    <RotateCcw className="h-4 w-4" />
                    Coba Lagi
                </Button>
                <Button asChild variant="ghost" className="gap-2 cursor-pointer">
                    <Link href="/">
                        <Home className="h-4 w-4" />
                        Beranda
                    </Link>
                </Button>
            </div>
        </div>
    );
}
