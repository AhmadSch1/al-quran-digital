"use client";

import { useState, useCallback, useMemo } from "react";
import { translations, Locale } from "@/lib/translations";
import {
    calculateZakatPenghasilan,
    calculateZakatTabungan,
    calculateZakatPerdagangan,
    calculateZakatEmas,
    formatRupiah,
    getNisab,
    DEFAULT_GOLD_PRICE,
    ZakatResult,
} from "@/lib/zakat-utils";
import { Calculator, Coins, Landmark, TrendingUp, Info, CheckCircle2, XCircle, ChevronRight, RotateCcw, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type ZakatType = "income" | "savings" | "trade" | "gold";

const TABS: { key: ZakatType; icon: React.ElementType; labelKey: "tabIncome" | "tabSavings" | "tabTrade" | "tabGold" }[] = [
    { key: "income", icon: Coins, labelKey: "tabIncome" },
    { key: "savings", icon: Landmark, labelKey: "tabSavings" },
    { key: "trade", icon: TrendingUp, labelKey: "tabTrade" },
    { key: "gold", icon: Calculator, labelKey: "tabGold" },
];

export function ZakatCalculator() {
    const [lang, setLang] = useState<Locale>("id");
    const [activeTab, setActiveTab] = useState<ZakatType>("income");
    const [result, setResult] = useState<ZakatResult | null>(null);

    // Form states
    const [income, setIncome] = useState("");
    const [goldPrice, setGoldPrice] = useState(DEFAULT_GOLD_PRICE.toString());

    const [savingsBalance, setSavingsBalance] = useState("");
    const [savingsDebt, setSavingsDebt] = useState("");

    const [tradeAssets, setTradeAssets] = useState("");
    const [tradeProfit, setTradeProfit] = useState("");
    const [tradeDebt, setTradeDebt] = useState("");

    const [goldWeight, setGoldWeight] = useState("");
    const [goldBuyback, setGoldBuyback] = useState(DEFAULT_GOLD_PRICE.toString());
    const [isJewelry, setIsJewelry] = useState(false);

    const t = useMemo(() => translations[lang], [lang]);
    const nisabValue = useMemo(() => getNisab(parseFloat(goldPrice) || DEFAULT_GOLD_PRICE), [goldPrice]);

    const handleCalculate = useCallback(() => {
        const gp = parseFloat(goldPrice) || DEFAULT_GOLD_PRICE;

        switch (activeTab) {
            case "income": {
                const monthlyIncome = parseFloat(income) || 0;
                setResult(calculateZakatPenghasilan(monthlyIncome, gp));
                break;
            }
            case "savings": {
                const balance = parseFloat(savingsBalance) || 0;
                const debt = parseFloat(savingsDebt) || 0;
                setResult(calculateZakatTabungan(balance, debt, gp));
                break;
            }
            case "trade": {
                const assets = parseFloat(tradeAssets) || 0;
                const profit = parseFloat(tradeProfit) || 0;
                const debt = parseFloat(tradeDebt) || 0;
                setResult(calculateZakatPerdagangan(assets, profit, debt, gp));
                break;
            }
            case "gold": {
                const weight = parseFloat(goldWeight) || 0;
                const buyback = parseFloat(goldBuyback) || DEFAULT_GOLD_PRICE;
                setResult(calculateZakatEmas(weight, buyback, isJewelry));
                break;
            }
        }
    }, [activeTab, income, goldPrice, savingsBalance, savingsDebt, tradeAssets, tradeProfit, tradeDebt, goldWeight, goldBuyback, isJewelry]);

    const handleReset = useCallback(() => {
        setResult(null);
        setIncome("");
        setSavingsBalance("");
        setSavingsDebt("");
        setTradeAssets("");
        setTradeProfit("");
        setTradeDebt("");
        setGoldWeight("");
        setGoldBuyback(DEFAULT_GOLD_PRICE.toString());
        setIsJewelry(false);
        setGoldPrice(DEFAULT_GOLD_PRICE.toString());
    }, []);

    const handleTabChange = useCallback((tab: ZakatType) => {
        setActiveTab(tab);
        setResult(null);
    }, []);

    return (
        <div className="space-y-8">
            {/* Language Toggle */}
            <div className="flex justify-end">
                <div className="inline-flex items-center gap-2 bg-muted/50 rounded-full p-1 border border-border/50">
                    <Globe className="h-4 w-4 text-muted-foreground ml-2" />
                    <button
                        onClick={() => setLang("id")}
                        className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300",
                            lang === "id"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        ID
                    </button>
                    <button
                        onClick={() => setLang("en")}
                        className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300",
                            lang === "en"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        EN
                    </button>
                </div>
            </div>

            {/* Nisab Info Banner & Global Gold Price Setting */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200/50 dark:border-emerald-800/30 p-5 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/50 mt-1 md:mt-0">
                            <Info className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">{t.nisabInfo}</h3>
                            <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80 mt-1">{t.nisabDesc}</p>
                            <p className="text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-300 mt-2">
                                Rp {formatRupiah(nisabValue)}
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-64 shrink-0 bg-white/60 dark:bg-slate-900/40 p-3.5 rounded-xl border border-emerald-200/60 dark:border-emerald-800/40">
                        <label className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-2 block">
                            {t.goldPriceLabel}
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">Rp</span>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={goldPrice ? new Intl.NumberFormat("id-ID").format(Number(goldPrice)) : ""}
                                onChange={(e) => setGoldPrice(e.target.value.replace(/\D/g, ""))}
                                placeholder={new Intl.NumberFormat("id-ID").format(DEFAULT_GOLD_PRICE)}
                                className="w-full rounded-lg border-0 bg-white dark:bg-slate-950 px-3 pl-8 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-mono"
                            />
                        </div>
                        <p className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 mt-2 leading-tight">
                            {t.goldPriceHint}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => handleTabChange(tab.key)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 border",
                                isActive
                                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                    : "bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted/60 hover:text-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {t[tab.labelKey]}
                        </button>
                    );
                })}
            </div>

            {/* Form Area */}
            <div className="bg-muted/20 rounded-2xl border border-border/50 p-6 space-y-6">
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeTab === "income" && t.incomeDesc}
                    {activeTab === "savings" && t.savingsDesc}
                    {activeTab === "trade" && t.tradeDesc}
                    {activeTab === "gold" && t.goldDesc}
                </p>

                {/* Income Form */}
                {activeTab === "income" && (
                    <div className="grid gap-5">
                        <InputField label={t.incomeLabel} value={income} onChange={setIncome} placeholder={t.incomePlaceholder} />
                    </div>
                )}

                {/* Savings Form */}
                {activeTab === "savings" && (
                    <div className="grid gap-5 sm:grid-cols-2">
                        <InputField label={t.savingsLabel} value={savingsBalance} onChange={setSavingsBalance} placeholder={t.savingsPlaceholder} />
                        <InputField label={t.debtLabel} value={savingsDebt} onChange={setSavingsDebt} placeholder={t.debtPlaceholder} />
                    </div>
                )}

                {/* Trade Form */}
                {activeTab === "trade" && (
                    <div className="grid gap-5 sm:grid-cols-2">
                        <InputField label={t.assetsLabel} value={tradeAssets} onChange={setTradeAssets} placeholder={t.assetsPlaceholder} />
                        <InputField label={t.profitLabel} value={tradeProfit} onChange={setTradeProfit} placeholder={t.profitPlaceholder} />
                        <div className="sm:col-span-2">
                            <InputField label={t.shortDebtLabel} value={tradeDebt} onChange={setTradeDebt} placeholder={t.shortDebtPlaceholder} />
                        </div>
                    </div>
                )}

                {/* Gold Form */}
                {activeTab === "gold" && (
                    <div className="grid gap-5 sm:grid-cols-2">
                        <InputField label={t.goldWeightLabel} value={goldWeight} onChange={setGoldWeight} placeholder={t.goldWeightPlaceholder} />
                        <InputField label={t.goldBuybackLabel} value={goldBuyback} onChange={setGoldBuyback} placeholder={t.goldBuybackPlaceholder} />
                        <div className="sm:col-span-2">
                            <label className="text-sm font-medium text-foreground mb-3 block">{t.isJewelryLabel}</label>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsJewelry(true)}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl text-sm font-medium border transition-all duration-300",
                                        isJewelry
                                            ? "bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400"
                                            : "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50"
                                    )}
                                >
                                    {t.jewelryYes}
                                </button>
                                <button
                                    onClick={() => setIsJewelry(false)}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl text-sm font-medium border transition-all duration-300",
                                        !isJewelry
                                            ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400"
                                            : "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50"
                                    )}
                                >
                                    {t.jewelryNo}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                    <button
                        onClick={handleCalculate}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 transition-all duration-300 active:scale-[0.98]"
                    >
                        <Calculator className="h-4 w-4" />
                        {t.calculateBtn}
                    </button>
                    <button
                        onClick={handleReset}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-border/50 bg-muted/30 text-muted-foreground font-medium text-sm hover:bg-muted/60 transition-all duration-300"
                    >
                        <RotateCcw className="h-4 w-4" />
                        {t.resetBtn}
                    </button>
                </div>
            </div>

            {/* Result Card */}
            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className={cn(
                        "rounded-2xl border-2 p-6 sm:p-8 space-y-6",
                        result.isWajib
                            ? "border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20"
                            : "border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20"
                    )}>
                        {/* Status Badge */}
                        <div className="flex items-center gap-3">
                            {result.isWajib ? (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
                                    <XCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                </div>
                            )}
                            <div>
                                <h3 className={cn(
                                    "font-bold text-lg",
                                    result.isWajib ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"
                                )}>
                                    {result.isWajib ? t.obligatory : t.notObligatory}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    {result.isWajib ? t.obligatoryDesc : t.notObligatoryDesc}
                                </p>
                            </div>
                        </div>

                        {/* Jewelry Note */}
                        {activeTab === "gold" && isJewelry && (
                            <div className="rounded-xl bg-amber-100/50 dark:bg-amber-900/20 p-4 border border-amber-200/50 dark:border-amber-800/30">
                                <p className="text-sm text-amber-700 dark:text-amber-400">{t.jewelryNote}</p>
                            </div>
                        )}

                        {/* Zakat Amount */}
                        {result.isWajib && (
                            <div className="text-center py-4 space-y-2">
                                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{t.zakatAmount}</p>
                                <p className="text-4xl sm:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
                                    Rp {formatRupiah(result.zakatAmount)}
                                </p>
                                {activeTab === "income" && result.details.monthlyZakat > 0 && (
                                    <p className="text-sm text-muted-foreground">
                                        (Rp {formatRupiah(result.details.monthlyZakat)} {t.perMonth})
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Breakdown */}
                        {result.isWajib && (
                            <div className="space-y-3 pt-4 border-t border-border/50">
                                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    {t.breakdown}
                                </h4>
                                <div className="space-y-2.5">
                                    {activeTab === "income" && (
                                        <>
                                            <BreakdownRow label={t.monthlyIncome} value={`Rp ${formatRupiah(result.details.monthlyIncome)}`} />
                                            <BreakdownRow label={t.annualIncome} value={`Rp ${formatRupiah(result.details.annualIncome)}`} />
                                            <BreakdownRow label={t.nisabInfo} value={`Rp ${formatRupiah(result.nisab)}`} />
                                            <BreakdownRow label={t.zakatRate} value="2,5%" />
                                            <BreakdownRow label={t.monthlyZakat} value={`Rp ${formatRupiah(result.details.monthlyZakat)}`} highlight />
                                            <BreakdownRow label={t.annualZakat} value={`Rp ${formatRupiah(result.details.annualZakat)}`} highlight />
                                        </>
                                    )}
                                    {activeTab === "savings" && (
                                        <>
                                            <BreakdownRow label={t.balance} value={`Rp ${formatRupiah(result.details.balance)}`} />
                                            <BreakdownRow label={t.totalDebt} value={`- Rp ${formatRupiah(result.details.debt)}`} subtract />
                                            <BreakdownRow label={t.netWealth} value={`Rp ${formatRupiah(result.details.netBalance)}`} />
                                            <BreakdownRow label={t.nisabInfo} value={`Rp ${formatRupiah(result.nisab)}`} />
                                            <BreakdownRow label={t.zakatRate} value="2,5%" />
                                            <BreakdownRow label={t.zakatAmount} value={`Rp ${formatRupiah(result.zakatAmount)}`} highlight />
                                        </>
                                    )}
                                    {activeTab === "trade" && (
                                        <>
                                            <BreakdownRow label={t.currentAssets} value={`Rp ${formatRupiah(result.details.currentAssets)}`} />
                                            <BreakdownRow label={t.profit} value={`+ Rp ${formatRupiah(result.details.profit)}`} />
                                            <BreakdownRow label={t.shortTermDebt} value={`- Rp ${formatRupiah(result.details.shortTermDebt)}`} subtract />
                                            <BreakdownRow label={t.netWealth} value={`Rp ${formatRupiah(result.details.netWealth)}`} />
                                            <BreakdownRow label={t.nisabInfo} value={`Rp ${formatRupiah(result.nisab)}`} />
                                            <BreakdownRow label={t.zakatRate} value="2,5%" />
                                            <BreakdownRow label={t.zakatAmount} value={`Rp ${formatRupiah(result.zakatAmount)}`} highlight />
                                        </>
                                    )}
                                    {activeTab === "gold" && (
                                        <>
                                            <BreakdownRow label={t.goldWeight} value={`${formatRupiah(result.details.weightGrams)} ${t.gram}`} />
                                            <BreakdownRow label={t.goldBuybackLabel} value={`Rp ${formatRupiah(result.details.buybackPrice)}`} />
                                            <BreakdownRow label={t.goldValue} value={`Rp ${formatRupiah(result.details.totalValue)}`} />
                                            <BreakdownRow label={t.nisabInfo} value={`85 ${t.gram}`} />
                                            <BreakdownRow label={t.zakatRate} value="2,5%" />
                                            <BreakdownRow label={t.zakatAmount} value={`Rp ${formatRupiah(result.zakatAmount)}`} highlight />
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Source */}
                        <p className="text-[11px] text-muted-foreground/60 pt-2 border-t border-border/30">{t.source}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Sub-components ──────────────────────────────────────────────

function InputField({
    label,
    value,
    onChange,
    placeholder,
    hint,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    hint?: string;
}) {
    // Format the display value with thousand separators
    const formatValue = (val: string) => {
        if (!val) return "";
        // Remove non-digit characters
        const numericValue = val.replace(/\D/g, "");
        // Format with Indonesian locale (dots for thousands)
        return new Intl.NumberFormat("id-ID").format(Number(numericValue));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, ""); // Keep only digits for state
        onChange(rawValue);
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{label}</label>
            <input
                type="text"
                inputMode="numeric"
                value={formatValue(value)}
                onChange={handleChange}
                placeholder={formatValue(placeholder)}
                className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
            />
            {hint && <p className="text-xs text-muted-foreground/60">{hint}</p>}
        </div>
    );
}

function BreakdownRow({
    label,
    value,
    highlight,
    subtract,
}: {
    label: string;
    value: string;
    highlight?: boolean;
    subtract?: boolean;
}) {
    return (
        <div className={cn(
            "flex items-center justify-between py-2 px-3 rounded-lg text-sm",
            highlight
                ? "bg-emerald-100/50 dark:bg-emerald-900/20 font-bold text-emerald-700 dark:text-emerald-400"
                : subtract
                    ? "text-red-600 dark:text-red-400"
                    : "text-muted-foreground"
        )}>
            <span>{label}</span>
            <span className="font-mono tabular-nums">{value}</span>
        </div>
    );
}
