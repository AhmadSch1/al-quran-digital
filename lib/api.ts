import { Surah, SurahDetail } from "./types";

const BASE_URL = "https://quran-api.santrikoding.com/api";

export async function getAllSurah(): Promise<Surah[]> {
    const res = await fetch(`${BASE_URL}/surah`, {
        next: { revalidate: 86400 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch surah list");
    }

    return res.json();
}

export async function getSurahDetail(nomor: number): Promise<SurahDetail> {
    const res = await fetch(`${BASE_URL}/surah/${nomor}`, {
        next: { revalidate: 86400 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch surah ${nomor}`);
    }

    return res.json();
}
