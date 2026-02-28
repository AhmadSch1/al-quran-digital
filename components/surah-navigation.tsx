import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SurahNav } from "@/lib/types";

interface SurahNavigationProps {
    prev: SurahNav | false;
    next: SurahNav | false;
}

export function SurahNavigation({ prev, next }: SurahNavigationProps) {
    return (
        <div className="flex items-center justify-between gap-1 sm:gap-4 py-8 px-1 sm:px-4 w-full overflow-hidden">
            {prev ? (
                <Button
                    asChild
                    variant="outline"
                    className="gap-1 sm:gap-2 rounded-full transition-all duration-300 hover:border-primary/30 cursor-pointer px-2.5 sm:px-4 shrink-0"
                >
                    <Link href={`/surah/${prev.nomor}`}>
                        <ChevronLeft className="h-4 w-4 shrink-0" />
                        <div className="text-left hidden sm:block">
                            <div className="text-[10px] text-muted-foreground leading-tight">
                                Sebelumnya
                            </div>
                            <div className="text-xs font-semibold leading-tight">
                                {prev.nama_latin}
                            </div>
                        </div>
                        <span className="sm:hidden text-[10px] sm:text-xs">Prev</span>
                    </Link>
                </Button>
            ) : (
                <div className="w-[60px] sm:w-[130px]" />
            )}

            <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-[10px] sm:text-sm text-muted-foreground cursor-pointer px-2 shrink"
            >
                <Link href="/">Daftar Surah</Link>
            </Button>

            {next ? (
                <Button
                    asChild
                    variant="outline"
                    className="gap-1 sm:gap-2 rounded-full transition-all duration-300 hover:border-primary/30 cursor-pointer px-2.5 sm:px-4 shrink-0"
                >
                    <Link href={`/surah/${next.nomor}`}>
                        <div className="text-right hidden sm:block">
                            <div className="text-[10px] text-muted-foreground leading-tight">
                                Selanjutnya
                            </div>
                            <div className="text-xs font-semibold leading-tight">
                                {next.nama_latin}
                            </div>
                        </div>
                        <span className="sm:hidden text-[10px] sm:text-xs">Next</span>
                        <ChevronRight className="h-4 w-4 shrink-0" />
                    </Link>
                </Button>
            ) : (
                <div className="w-[60px] sm:w-[130px]" />
            )}
        </div>
    );
}
