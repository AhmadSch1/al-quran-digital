import { notFound } from "next/navigation";
import { getSurahDetail } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AudioPlayer } from "@/components/audio-player";
import { AyahCard } from "@/components/ayah-card";
import { SurahNavigation } from "@/components/surah-navigation";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ nomor: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { nomor } = await params;
    const num = parseInt(nomor, 10);
    if (isNaN(num) || num < 1 || num > 114) {
        return { title: "Surah Tidak Ditemukan" };
    }

    try {
        const surah = await getSurahDetail(num);
        return {
            title: `${surah.nama_latin} (${surah.nama}) - ${surah.arti}`,
            description: `Baca Surah ${surah.nama_latin} (${surah.arti}) - ${surah.jumlah_ayat} ayat. Al-Quran Digital dengan terjemahan Bahasa Indonesia.`,
        };
    } catch {
        return { title: "Surah Tidak Ditemukan" };
    }
}

export default async function SurahDetailPage({ params }: PageProps) {
    const { nomor } = await params;
    const num = parseInt(nomor, 10);

    if (isNaN(num) || num < 1 || num > 114) {
        notFound();
    }

    const surah = await getSurahDetail(num);

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <section className="relative overflow-hidden border-b border-border/40">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5" />
                <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 h-80 w-80 rounded-full bg-gradient-to-b from-primary/8 to-transparent blur-3xl" />

                <div className="container relative mx-auto px-4 py-10 md:py-16">
                    {/* Back Button */}
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="mb-6 gap-1.5 text-muted-foreground hover:text-foreground -ml-2 cursor-pointer"
                    >
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>

                    <div className="mx-auto max-w-3xl text-center">
                        {/* Arabic Name */}
                        <h1 className="arabic-text text-5xl sm:text-6xl md:text-7xl font-bold text-primary mb-4">
                            {surah.nama}
                        </h1>

                        {/* Latin Name & Translation */}
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                            {surah.nama_latin}
                        </h2>
                        <p className="text-base text-muted-foreground">{surah.arti}</p>

                        {/* Meta Badges */}
                        <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
                            <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                                <MapPin className="h-3 w-3" />
                                {surah.tempat_turun === "mekah" ? "Makkiyah" : "Madaniyah"}
                            </Badge>
                            <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                                <BookOpen className="h-3 w-3" />
                                {surah.jumlah_ayat} Ayat
                            </Badge>
                        </div>

                        {/* Audio Player */}
                        <div className="mt-6">
                            <AudioPlayer
                                audioUrl={surah.audio}
                                surahName={surah.nama_latin}
                            />
                        </div>

                        {/* Description */}
                        {surah.deskripsi && (
                            <div
                                className="mt-8 mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed text-left bg-muted/30 rounded-xl p-5 border border-border/40 break-words overflow-hidden"
                                dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
                            />
                        )}
                    </div>
                </div>
            </section>

            {/* Bismillah */}
            {surah.nomor !== 1 && surah.nomor !== 9 && (
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl py-8 text-center">
                        <p className="arabic-text text-2xl sm:text-3xl text-foreground/80">
                            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                        </p>
                    </div>
                    <Separator className="mx-auto max-w-3xl bg-border/50" />
                </div>
            )}

            {/* Ayah List */}
            <section className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl">
                    {surah.ayat.map((ayah, index) => (
                        <AyahCard
                            key={ayah.id}
                            ayah={ayah}
                            isLast={index === surah.ayat.length - 1}
                        />
                    ))}
                </div>
            </section>

            {/* Navigation */}
            <section className="container mx-auto px-4 border-t border-border/40">
                <div className="mx-auto max-w-3xl">
                    <SurahNavigation
                        prev={surah.surat_sebelumnya}
                        next={surah.surat_selanjutnya}
                    />
                </div>
            </section>
        </div>
    );
}
