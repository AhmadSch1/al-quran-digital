import Link from "next/link";
import { Surah } from "@/lib/types";

interface SurahCardProps {
    surah: Surah;
}

export function SurahCard({ surah }: SurahCardProps) {
    return (
        <Link href={`/surah/${surah.nomor}`} prefetch={true} className="group block h-full">
            <div className="relative overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/80 rounded-2xl transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-700/50 hover:shadow-lg hover:shadow-emerald-500/5 h-full p-4 md:p-5 flex items-center justify-between">

                <div className="flex items-center gap-4 md:gap-5">
                    {/* Circle Number */}
                    <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm md:text-base group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {surah.nomor}
                    </div>

                    {/* Surah Info */}
                    <div className="flex flex-col min-w-0">
                        <h3 className="text-base md:text-[17px] font-bold tracking-tight text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300 mb-0.5">
                            {surah.nama_latin}
                        </h3>
                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                            {surah.arti}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                            {surah.jumlah_ayat} Ayat
                        </p>
                    </div>
                </div>

                {/* Arabic Name */}
                <span className="arabic-text text-2xl md:text-3xl font-normal text-slate-800 dark:text-slate-200 shrink-0 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 ml-4" style={{ fontFamily: 'var(--font-amiri)' }}>
                    {surah.nama}
                </span>

            </div>
        </Link>
    );
}
