import { Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-muted/30">
            <div className="container mx-auto flex flex-col items-center gap-2 px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    Built with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> for the Ummah
                </p>
            </div>
        </footer>
    );
}
