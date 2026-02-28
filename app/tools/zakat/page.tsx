import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Calculator } from "lucide-react";
import { ZakatCalculator } from "@/components/zakat-calculator";

export const metadata: Metadata = {
    title: "Kalkulator Zakat - Al-Quran Digital",
    description:
        "Hitung zakat penghasilan, tabungan, perdagangan, dan emas secara akurat sesuai ketentuan BAZNAS dan syariat Islam.",
};

export default function ZakatPage() {
    return (
        <div className="min-h-screen bg-background pb-16">
            {/* Header */}
            <div className="bg-linear-to-b from-primary/10 to-background border-b border-border/40 pt-16 pb-12 relative overflow-hidden">
                <div
                    className="absolute inset-x-0 -top-24 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                    aria-hidden="true"
                >
                    <div className="aspect-[1108/632] w-[69.25rem] flex-none bg-linear-to-r from-emerald-400 to-teal-500 opacity-20 dark:opacity-10" />
                </div>

                <div className="container mx-auto px-4 max-w-3xl pt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Kembali
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/20">
                            <Calculator className="h-7 w-7" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                Kalkulator Zakat
                            </h1>
                            <p className="text-muted-foreground text-sm mt-1">
                                Zakat Calculator
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calculator Content */}
            <div className="container mx-auto max-w-3xl px-4 py-8">
                <ZakatCalculator />
            </div>
        </div>
    );
}
