import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <div className="rounded-2xl bg-muted p-4 mb-6">
                <FileQuestion className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Halaman Tidak Ditemukan</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
                Maaf, halaman yang Anda cari tidak tersedia. Kemungkinan surah tersebut tidak valid.
            </p>
            <Button asChild variant="outline" className="gap-2">
                <Link href="/">
                    <Home className="h-4 w-4" />
                    Kembali ke Beranda
                </Link>
            </Button>
        </div>
    );
}
