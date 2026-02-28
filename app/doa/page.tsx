import { getAllDoa } from "@/lib/doa-api";
import { DoaList } from "@/components/doa-list";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kumpulan Doa & Dzikir",
    description: "Kumpulan Doa dan Dzikir harian dengan teks Arab, Latin, Terjemahan, dan rujukan Hadis shahih.",
};

export default async function DoaPage() {
    const doas = await getAllDoa();

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-background">
            {/* Header Section */}
            <section className="bg-linear-to-b from-emerald-500/10 to-transparent pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-b border-border/40">
                <div className="container mx-auto max-w-7xl text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-400 mb-4 tracking-tight">
                        Kumpulan Doa & Dzikir
                    </h1>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Bacaan doa dan dzikir harian bersumber dari Al-Qur'an dan Hadis yang shahih. Dilengkapi teks Arab, transliterasi, dan terjemahan.
                    </p>
                </div>
            </section>

            {/* List Section */}
            <section className="py-8 px-4 sm:px-6 lg:px-14">
                <div className="container mx-auto max-w-7xl">
                    <DoaList initialDoas={doas} />
                </div>
            </section>
        </div>
    );
}
