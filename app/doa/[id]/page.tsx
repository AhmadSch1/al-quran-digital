import { getDoaById } from "@/lib/doa-api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DoaPageActions } from "@/components/doa-page-actions";

interface DoaDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata(props: DoaDetailPageProps): Promise<Metadata> {
    const params = await props.params;
    const doa = await getDoaById(params.id);
    if (!doa) return { title: "Doa Tidak Ditemukan" };

    return {
        title: `${doa.nama} - Kumpulan Doa & Dzikir`,
        description: doa.idn,
    };
}

export default async function DoaDetailPage(props: DoaDetailPageProps) {
    const params = await props.params;
    const doa = await getDoaById(params.id);

    if (!doa) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-16">
            {/* Header Area */}
            <div className="bg-linear-to-b from-primary/10 to-background border-b border-border/40 pt-16 pb-12 relative overflow-hidden">
                <div className="absolute inset-x-0 -top-24 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
                    <div className="aspect-[1108/632] w-[69.25rem] flex-none bg-linear-to-r from-emerald-400 to-teal-500 opacity-20 dark:opacity-10" />
                </div>

                <div className="container mx-auto px-4 max-w-4xl pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary transition-all duration-300 w-fit pl-0">
                            <Link href="/doa" className="flex items-center">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                        <div className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 self-start sm:self-auto">
                            {doa.grup}
                        </div>
                    </div>

                    <div className="text-left sm:text-center space-y-4">
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                            {doa.nama}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Doa Content List View (AyahCard Style) */}
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="py-8 px-2 sm:px-4" id={`doa-${doa.id}`}>
                    {/* Header Row: Badge & Actions */}
                    <div className="flex items-center justify-between mb-8 sm:mb-12 border-b border-border/50 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                {doa.id}
                            </div>
                        </div>
                        <DoaPageActions doa={doa} />
                    </div>

                    {/* Arabic Text */}
                    <p
                        className="arabic-text text-right text-[1.65rem] sm:text-3xl md:text-[2rem] font-normal leading-[2.5] sm:leading-[2.6] text-foreground mb-8 wrap-break-word w-full mt-4"
                        dir="rtl"
                    >
                        {doa.ar}
                    </p>

                    {/* Transliteration */}
                    <p
                        className="text-sm sm:text-[1rem] text-primary/80 leading-relaxed mb-4 italic"
                    >
                        {doa.tr}
                    </p>

                    {/* Translation & Hadith info block */}
                    <div className="space-y-4">
                        <p className="text-sm sm:text-[0.9rem] text-muted-foreground leading-relaxed">
                            {doa.idn}
                        </p>

                        {doa.tentang && (
                            <p className="text-xs sm:text-[0.8rem] text-muted-foreground/70 leading-relaxed font-medium mt-6 pt-4 border-t border-border/30">
                                {doa.tentang}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
