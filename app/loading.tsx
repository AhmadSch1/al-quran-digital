import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
    return (
        <>
            {/* Hero Skeleton */}
            <section className="border-b border-border/40">
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <Skeleton className="mx-auto h-16 w-16 rounded-2xl mb-6" />
                        <Skeleton className="mx-auto h-12 w-80 rounded-lg" />
                        <Skeleton className="mx-auto h-5 w-64 rounded-lg mt-4" />
                        <Skeleton className="mx-auto h-12 w-full max-w-md rounded-xl mt-8" />
                    </div>
                </div>
            </section>

            {/* Grid Skeleton */}
            <section className="container mx-auto px-4 py-10 md:py-14">
                <Skeleton className="h-4 w-40 mb-6" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-xl border border-border/50 bg-card/80 p-5"
                        >
                            <div className="flex items-start gap-4">
                                <Skeleton className="h-11 w-11 rounded-lg rotate-45" />
                                <div className="flex-1 space-y-2.5">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1.5">
                                            <Skeleton className="h-4 w-28" />
                                            <Skeleton className="h-3 w-20" />
                                        </div>
                                        <Skeleton className="h-6 w-16" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-5 w-20 rounded-full" />
                                        <Skeleton className="h-3 w-14" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
