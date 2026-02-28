import { Metadata } from "next";
import { getAsmaulHusna } from "@/lib/asmaul-husna-api";
import { AsmaulHusnaCard } from "@/components/asmaul-husna-card";

export const metadata: Metadata = {
    title: "Asmaul Husna - Al-Quran Digital",
    description: "99 Nama Allah beserta arti dan audionya. Pelajari dan hafalkan Asmaul Husna dengan mudah.",
};

export default async function AsmaulHusnaPage() {
    const { data: response, error } = await getAsmaulHusna();

    if (error || !response || !response.data) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Gagal memuat data Asmaul Husna</h1>
                <p className="text-muted-foreground mb-6">Silakan periksa koneksi internet Anda atau coba lagi nanti.</p>

                {/* Debugging block untuk Vercel */}
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-4 max-w-2xl mx-auto text-left overflow-x-auto">
                    <p className="text-sm font-semibold text-red-800 dark:text-red-400 mb-2">Pesan Error Detail:</p>
                    <code className="text-xs text-red-600 dark:text-red-300">
                        {error || "Data dari API kosong atau struktur tidak sesuai."}
                    </code>
                </div>
            </div>
        );
    }

    const { names, hadith, recitation_benefits } = response.data;

    if (!names || !Array.isArray(names)) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Gagal memuat daftar nama</h1>
                <p className="text-muted-foreground">Format data dari API tidak valid.</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen pb-16">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-emerald-950 py-16 text-center">
                {/* Decorative background vectors */}
                <div className="absolute inset-0 z-0 opacity-10 blur-xl">
                    <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-emerald-400" />
                    <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-teal-400" />
                </div>

                <div className="container relative z-10 mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                        Asmaul Husna
                    </h1>
                    <p className="mx-auto max-w-2xl md:text-lg text-sm text-emerald-100/90 leading-relaxed font-medium">
                        {hadith || recitation_benefits ||
                            "99 Nama Allah yang Maha Indah. Memahami dan menghafalnya merupakan jalan menuju ketenangan dan surga-Nya."}
                    </p>
                </div>
            </div>

            {/* Grid Content */}
            <div className="container mx-auto px-4 xl:px-14 sm:px-6 mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {names.map((item) => (
                        <AsmaulHusnaCard key={item.number} data={item} />
                    ))}
                </div>
            </div>
        </main>
    );
}
