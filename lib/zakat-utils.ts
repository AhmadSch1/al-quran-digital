/**
 * Zakat Calculation Utilities
 * Based on BAZNAS 2025 rules, PMA No. 52/2014, and MUI Fatwa No. 3/2003
 *
 * Nisab = 85 gram emas
 * Kadar Zakat = 2.5%
 */

// Default gold price per gram (BAZNAS 2025 standard, emas 21 karat)
export const DEFAULT_GOLD_PRICE = 1068919;

// Nisab in grams of gold
export const NISAB_GOLD_GRAMS = 85;

// Zakat rate
export const ZAKAT_RATE = 0.025;

export interface ZakatResult {
    isWajib: boolean;
    nisab: number;
    zakatAmount: number;
    details: Record<string, number>;
}

/**
 * Get nisab value in Rupiah
 */
export function getNisab(goldPricePerGram: number): number {
    return NISAB_GOLD_GRAMS * goldPricePerGram;
}

/**
 * Zakat Penghasilan (Income Zakat)
 *
 * Rules:
 * - Nisab: 85g gold per year
 * - Rate: 2.5%
 * - If annual income >= nisab, zakat = monthly income × 2.5%
 *
 * @param monthlyIncome - Monthly gross income in Rupiah
 * @param goldPrice - Gold price per gram in Rupiah
 */
export function calculateZakatPenghasilan(
    monthlyIncome: number,
    goldPrice: number = DEFAULT_GOLD_PRICE
): ZakatResult {
    const nisab = getNisab(goldPrice);
    const annualIncome = monthlyIncome * 12;
    const isWajib = annualIncome >= nisab;
    const monthlyZakat = isWajib ? monthlyIncome * ZAKAT_RATE : 0;
    const annualZakat = monthlyZakat * 12;

    return {
        isWajib,
        nisab,
        zakatAmount: annualZakat,
        details: {
            monthlyIncome,
            annualIncome,
            monthlyZakat,
            annualZakat,
        },
    };
}

/**
 * Zakat Tabungan (Savings Zakat)
 *
 * Rules:
 * - Nisab: 85g gold
 * - Rate: 2.5%
 * - Must be held for 1 year (haul)
 * - Zakat = (balance - debt) × 2.5%
 *
 * @param balance - Total savings balance in Rupiah
 * @param debt - Total debt/liabilities in Rupiah
 * @param goldPrice - Gold price per gram in Rupiah
 */
export function calculateZakatTabungan(
    balance: number,
    debt: number,
    goldPrice: number = DEFAULT_GOLD_PRICE
): ZakatResult {
    const nisab = getNisab(goldPrice);
    const netBalance = Math.max(0, balance - debt);
    const isWajib = netBalance >= nisab;
    const zakatAmount = isWajib ? netBalance * ZAKAT_RATE : 0;

    return {
        isWajib,
        nisab,
        zakatAmount,
        details: {
            balance,
            debt,
            netBalance,
        },
    };
}

/**
 * Zakat Perdagangan (Trade Zakat)
 *
 * Rules:
 * - Nisab: 85g gold
 * - Rate: 2.5%
 * - Must be held for 1 year (haul)
 * - Zakat = (current assets + profit - short-term debt) × 2.5%
 *
 * @param currentAssets - Current business assets in Rupiah (stock, cash, receivables)
 * @param profit - Net profit in Rupiah
 * @param shortTermDebt - Short-term debt in Rupiah (due within 1 year)
 * @param goldPrice - Gold price per gram in Rupiah
 */
export function calculateZakatPerdagangan(
    currentAssets: number,
    profit: number,
    shortTermDebt: number,
    goldPrice: number = DEFAULT_GOLD_PRICE
): ZakatResult {
    const nisab = getNisab(goldPrice);
    const netWealth = Math.max(0, currentAssets + profit - shortTermDebt);
    const isWajib = netWealth >= nisab;
    const zakatAmount = isWajib ? netWealth * ZAKAT_RATE : 0;

    return {
        isWajib,
        nisab,
        zakatAmount,
        details: {
            currentAssets,
            profit,
            shortTermDebt,
            netWealth,
        },
    };
}

/**
 * Zakat Emas (Gold Zakat)
 *
 * Rules:
 * - Nisab: 85g gold
 * - Rate: 2.5%
 * - Must be held for 1 year (haul)
 * - Everyday jewelry (used moderately) is EXEMPT
 * - Zakat = weight × buyback price × 2.5%
 *
 * @param weightGrams - Weight of gold in grams
 * @param buybackPrice - Gold buyback price per gram in Rupiah
 * @param isJewelry - true if everyday jewelry (exempt from zakat)
 */
export function calculateZakatEmas(
    weightGrams: number,
    buybackPrice: number,
    isJewelry: boolean
): ZakatResult {
    const nisab = NISAB_GOLD_GRAMS; // nisab in grams for gold zakat
    const totalValue = weightGrams * buybackPrice;

    // Everyday jewelry is exempt
    if (isJewelry) {
        return {
            isWajib: false,
            nisab: nisab * buybackPrice,
            zakatAmount: 0,
            details: {
                weightGrams,
                buybackPrice,
                totalValue,
            },
        };
    }

    const isWajib = weightGrams >= nisab;
    const zakatAmount = isWajib ? totalValue * ZAKAT_RATE : 0;

    return {
        isWajib,
        nisab: nisab * buybackPrice,
        zakatAmount,
        details: {
            weightGrams,
            buybackPrice,
            totalValue,
        },
    };
}

/**
 * Format number to Indonesian currency format
 */
export function formatRupiah(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "decimal",
        maximumFractionDigits: 0,
    }).format(Math.round(amount));
}
