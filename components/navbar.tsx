"use client";

import Link from "next/link";
import { BookOpen, User, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Al-Quran", href: "/" },
        { name: "Doa & Dzikir", href: "/doa" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 dark:bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="flex h-7 w-8 sm:h-8 sm:w-10 items-center justify-center rounded-full bg-linear-to-r from-emerald-400 to-teal-500 text-white shadow-sm transition-transform group-hover:scale-105 shrink-0">
                        <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <span className="text-base sm:text-lg font-bold tracking-tight text-emerald-700 dark:text-emerald-400 transition-colors whitespace-nowrap">
                        Al-Quran Digital
                    </span>
                </Link>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 mr-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400",
                                    pathname === link.href ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-300"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <ThemeToggle />
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                        <User className="h-4.5 w-4.5" />
                        <span className="sr-only">Profil Pengguna</span>
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-border/50 bg-white dark:bg-slate-950 px-4 py-4 space-y-3 shadow-lg absolute w-full left-0">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                                pathname === link.href
                                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                                    : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900/50"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
