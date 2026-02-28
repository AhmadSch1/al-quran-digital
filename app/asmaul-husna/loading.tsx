import { Skeleton } from "@/components/ui/skeleton";

export default function AsmaulHusnaLoading() {
    return (
        <main className="min-h-screen pb-16">
            {/* Hero Skeleton */}
            <div className="bg-emerald-950 py-16 flex flex-col items-center justify-center space-y-4">
                <Skeleton className="h-12 w-64 bg-emerald-800/50 rounded-lg" />
                <Skeleton className="h-6 w-full max-w-2xl bg-emerald-800/30 rounded-md" />
                <Skeleton className="h-6 w-3/4 max-w-xl bg-emerald-800/30 rounded-md" />
            </div>

            {/* Grid Skeleton */}
            <div className="container mx-auto px-4 sm:px-6 mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="relative overflow-hidden rounded-2xl border border-border/50 bg-white/50 dark:bg-slate-900/50 p-6 shadow-sm">
                            {/* Number & Play btn */}
                            <div className="flex justify-between items-start w-full">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>

                            {/* Text Items */}
                            <div className="mt-8 flex flex-col items-center justify-center space-y-4">
                                <Skeleton className="h-14 w-32 rounded-lg" />
                                <div className="space-y-2 w-full flex flex-col items-center">
                                    <Skeleton className="h-6 w-40 rounded-md" />
                                    <Skeleton className="h-4 w-48 rounded-md" />
                                </div>
                                <div className="pt-4 border-t border-border/40 w-full flex flex-col gap-1 items-center">
                                    <Skeleton className="h-3 w-full rounded-sm" />
                                    <Skeleton className="h-3 w-5/6 rounded-sm" />
                                    <Skeleton className="h-3 w-4/6 rounded-sm" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
