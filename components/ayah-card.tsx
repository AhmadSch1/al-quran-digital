import { Separator } from "@/components/ui/separator";
import { Ayah } from "@/lib/types";

interface AyahCardProps {
    ayah: Ayah;
    isLast: boolean;
}

export function AyahCard({ ayah, isLast }: AyahCardProps) {
    return (
        <>
            <div className="py-8 px-2 sm:px-4" id={`ayah-${ayah.nomor}`}>
                {/* Ayah Number Badge */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {ayah.nomor}
                    </div>
                </div>

                {/* Arabic Text */}
                <p
                    className="arabic-text text-right text-[1.65rem] sm:text-3xl md:text-[2rem] font-normal leading-[2.5] sm:leading-[2.6] text-foreground mb-6 wrap-break-word w-full"
                    dir="rtl"
                >
                    {ayah.ar}
                </p>

                {/* Transliteration */}
                <p
                    className="text-sm sm:text-[0.9rem] text-primary/80 leading-relaxed mb-3 italic"
                    dangerouslySetInnerHTML={{ __html: ayah.tr }}
                />

                {/* Translation */}
                <p className="text-sm sm:text-[0.9rem] text-muted-foreground leading-relaxed">
                    {ayah.idn}
                </p>
            </div>

            {!isLast && <Separator className="bg-border/50" />}
        </>
    );
}
