import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function SurahDetailLoading() {
    return (
        <div className="min-h-screen">
            {/* Header Skeleton */}
            <section className="border-b border-border/40">
                <div className="container mx-auto px-4 py-10 md:py-16">
                    <Skeleton className="h-8 w-24 mb-6" />

                    <div className="mx-auto max-w-3xl text-center">
                        <Skeleton className="mx-auto h-16 w-48 rounded-lg mb-4" />
                        <Skeleton className="mx-auto h-8 w-56 rounded-lg mb-1" />
                        <Skeleton className="mx-auto h-5 w-32 rounded-lg mt-2" />

                        <div className="flex items-center justify-center gap-3 mt-5">
                            <Skeleton className="h-7 w-24 rounded-full" />
                            <Skeleton className="h-7 w-20 rounded-full" />
                        </div>

                        <Skeleton className="mx-auto h-10 w-36 rounded-full mt-6" />

                        <Skeleton className="mx-auto h-24 w-full max-w-2xl rounded-xl mt-8" />
                    </div>
                </div>
            </section>

            {/* Bismillah Skeleton */}
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl py-8 text-center">
                    <Skeleton className="mx-auto h-8 w-64" />
                </div>
                <Separator className="mx-auto max-w-3xl bg-border/50" />
            </div>

            {/* Ayah Skeletons */}
            <section className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i}>
                            <div className="py-8 px-2 sm:px-4">
                                <Skeleton className="h-8 w-8 rounded-full mb-5" />
                                <Skeleton className="h-10 w-full mb-3 ml-auto" />
                                <Skeleton className="h-8 w-3/4 mb-6 ml-auto" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-5/6 mb-3" />
                                <Skeleton className="h-4 w-full mb-1" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                            {i < 4 && <Separator className="bg-border/50" />}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
