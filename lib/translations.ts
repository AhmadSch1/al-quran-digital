export type Locale = "id" | "en";

export const translations = {
    id: {
        // Page
        pageTitle: "Kalkulator Zakat",
        pageSubtitle: "Hitung kewajiban zakat Anda dengan mudah dan akurat sesuai ketentuan syariat Islam.",
        backToTools: "Tools",

        // Language
        langLabel: "Bahasa",

        // Tabs
        tabIncome: "Penghasilan",
        tabSavings: "Tabungan",
        tabTrade: "Perdagangan",
        tabGold: "Emas",

        // Common
        goldPriceLabel: "Harga Emas per Gram (Rp)",
        goldPriceHint: "Default: standar BAZNAS 2025",
        calculateBtn: "Hitung Zakat",
        resetBtn: "Reset",
        nisabInfo: "Nisab",
        nisabDesc: "Batas minimum harta yang wajib dizakati (setara 85 gram emas)",
        resultTitle: "Hasil Perhitungan",
        zakatAmount: "Jumlah Zakat",
        obligatory: "Wajib Zakat",
        notObligatory: "Belum Wajib Zakat",
        obligatoryDesc: "Harta Anda telah mencapai nisab. Anda wajib menunaikan zakat.",
        notObligatoryDesc: "Harta Anda belum mencapai nisab. Anda belum wajib zakat, namun tetap bisa bersedekah.",
        perMonth: "/ bulan",
        perYear: "/ tahun",
        breakdown: "Rincian Perhitungan",
        yourWealth: "Total Harta",
        deductions: "Pengurang",
        netWealth: "Harta Bersih (Wajib Zakat)",
        zakatRate: "Tarif Zakat",
        source: "Sumber: BAZNAS, PMA No. 52/2014, Fatwa MUI No. 3/2003",

        // Income
        incomeLabel: "Penghasilan per Bulan (Rp)",
        incomePlaceholder: "Contoh: 10000000",
        incomeDesc: "Zakat penghasilan dihitung 2,5% dari pendapatan bulanan jika total pendapatan tahunan melebihi nisab.",
        monthlyIncome: "Penghasilan Bulanan",
        annualIncome: "Penghasilan Tahunan",
        monthlyZakat: "Zakat per Bulan",
        annualZakat: "Zakat per Tahun",

        // Savings
        savingsLabel: "Saldo Tabungan (Rp)",
        savingsPlaceholder: "Contoh: 100000000",
        debtLabel: "Total Utang (Rp)",
        debtPlaceholder: "Contoh: 0",
        savingsDesc: "Zakat tabungan dihitung 2,5% dari saldo bersih (saldo − utang) setelah dimiliki selama 1 tahun (haul).",
        balance: "Saldo Tabungan",
        totalDebt: "Total Utang",

        // Trade
        assetsLabel: "Aset Lancar Usaha (Rp)",
        assetsPlaceholder: "Stok barang, piutang, kas, dll.",
        profitLabel: "Keuntungan (Rp)",
        profitPlaceholder: "Keuntungan bersih usaha",
        shortDebtLabel: "Utang Jangka Pendek (Rp)",
        shortDebtPlaceholder: "Utang jatuh tempo ≤ 1 tahun",
        tradeDesc: "Zakat perdagangan dihitung 2,5% dari (aset lancar + keuntungan − utang jangka pendek) setelah 1 tahun (haul).",
        currentAssets: "Aset Lancar",
        profit: "Keuntungan",
        shortTermDebt: "Utang Jangka Pendek",

        // Gold
        goldWeightLabel: "Berat Emas (gram)",
        goldWeightPlaceholder: "Contoh: 100",
        goldBuybackLabel: "Harga Buyback Emas per Gram (Rp)",
        goldBuybackPlaceholder: "Contoh: 1068919",
        isJewelryLabel: "Apakah ini perhiasan yang dipakai sehari-hari?",
        jewelryYes: "Ya, perhiasan",
        jewelryNo: "Bukan perhiasan",
        goldDesc: "Zakat emas dihitung 2,5% dari total nilai emas non-perhiasan yang dimiliki selama 1 tahun (haul) dan mencapai nisab 85 gram.",
        goldWeight: "Berat Emas",
        goldValue: "Total Nilai Emas",
        jewelryNote: "Emas perhiasan yang digunakan sehari-hari secara wajar tidak wajib dizakati (BAZNAS).",

        // Currency
        currency: "Rp",
        gram: "gram",
    },
    en: {
        // Page
        pageTitle: "Zakat Calculator",
        pageSubtitle: "Calculate your zakat obligation easily and accurately according to Islamic law.",
        backToTools: "Tools",

        // Language
        langLabel: "Language",

        // Tabs
        tabIncome: "Income",
        tabSavings: "Savings",
        tabTrade: "Trade",
        tabGold: "Gold",

        // Common
        goldPriceLabel: "Gold Price per Gram (IDR)",
        goldPriceHint: "Default: BAZNAS 2025 standard",
        calculateBtn: "Calculate Zakat",
        resetBtn: "Reset",
        nisabInfo: "Nisab",
        nisabDesc: "Minimum wealth threshold for zakat obligation (equivalent to 85 grams of gold)",
        resultTitle: "Calculation Result",
        zakatAmount: "Zakat Amount",
        obligatory: "Zakat Obligatory",
        notObligatory: "Not Yet Obligatory",
        obligatoryDesc: "Your wealth has reached the nisab threshold. You are obligated to pay zakat.",
        notObligatoryDesc: "Your wealth has not reached the nisab threshold. Zakat is not yet obligatory, but you may still give charity.",
        perMonth: "/ month",
        perYear: "/ year",
        breakdown: "Calculation Breakdown",
        yourWealth: "Total Wealth",
        deductions: "Deductions",
        netWealth: "Net Wealth (Zakatable)",
        zakatRate: "Zakat Rate",
        source: "Source: BAZNAS, PMA No. 52/2014, MUI Fatwa No. 3/2003",

        // Income
        incomeLabel: "Monthly Income (IDR)",
        incomePlaceholder: "e.g. 10000000",
        incomeDesc: "Income zakat is 2.5% of monthly income if annual income exceeds the nisab.",
        monthlyIncome: "Monthly Income",
        annualIncome: "Annual Income",
        monthlyZakat: "Zakat per Month",
        annualZakat: "Zakat per Year",

        // Savings
        savingsLabel: "Savings Balance (IDR)",
        savingsPlaceholder: "e.g. 100000000",
        debtLabel: "Total Debt (IDR)",
        debtPlaceholder: "e.g. 0",
        savingsDesc: "Savings zakat is 2.5% of net balance (balance − debt) after being held for 1 year (haul).",
        balance: "Savings Balance",
        totalDebt: "Total Debt",

        // Trade
        assetsLabel: "Current Business Assets (IDR)",
        assetsPlaceholder: "Stock, receivables, cash, etc.",
        profitLabel: "Profit (IDR)",
        profitPlaceholder: "Net business profit",
        shortDebtLabel: "Short-term Debt (IDR)",
        shortDebtPlaceholder: "Debt due within 1 year",
        tradeDesc: "Trade zakat is 2.5% of (current assets + profit − short-term debt) after 1 year (haul).",
        currentAssets: "Current Assets",
        profit: "Profit",
        shortTermDebt: "Short-term Debt",

        // Gold
        goldWeightLabel: "Gold Weight (grams)",
        goldWeightPlaceholder: "e.g. 100",
        goldBuybackLabel: "Gold Buyback Price per Gram (IDR)",
        goldBuybackPlaceholder: "e.g. 1068919",
        isJewelryLabel: "Is this everyday jewelry?",
        jewelryYes: "Yes, jewelry",
        jewelryNo: "Not jewelry",
        goldDesc: "Gold zakat is 2.5% of the total value of non-jewelry gold held for 1 year (haul) and reaching the 85g nisab.",
        goldWeight: "Gold Weight",
        goldValue: "Total Gold Value",
        jewelryNote: "Gold jewelry used moderately for daily wear is exempt from zakat (BAZNAS).",

        // Currency
        currency: "IDR",
        gram: "grams",
    },
} as const;

export type TranslationKey = keyof typeof translations.id;
