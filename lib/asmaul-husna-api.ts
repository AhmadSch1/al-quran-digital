export interface AsmaulHusna {
    number: number;
    name: string;
    transliteration: string;
    translation: string;
    meaning: string;
    audio: string;
}

export interface AsmaulHusnaResponse {
    code: number;
    status: string;
    message?: string;
    data: {
        names: AsmaulHusna[];
        total: number;
        language: string;
        title: string;
        hadith?: string;
        recitation_benefits?: string;
    };
}

const BASE_URL = "https://islamicapi.com";
const API_URL = `${BASE_URL}/api/v1/asma-ul-husna`;

export async function getAsmaulHusna(): Promise<AsmaulHusnaResponse | null> {
    try {
        const apiKey = process.env.NEXT_PUBLIC_ISLAMIC_API_KEY;
        if (!apiKey) {
            console.error("Missing NEXT_PUBLIC_ISLAMIC_API_KEY");
            return null;
        }

        const res = await fetch(`${API_URL}/?language=id&api_key=${apiKey}`, {
            next: { revalidate: 86400 }, // Cache for 24 hours
        });

        if (!res.ok) {
            console.error("Failed to fetch Asmaul Husna:", res.statusText);
            return null;
        }

        const data: AsmaulHusnaResponse = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching Asmaul Husna:", error);
        return null;
    }
}

export function getAsmaulHusnaAudioUrl(audioPath: string): string {
    // The API returns a relative path like /audio/asma-ul-husna/rahman.mp3
    return `${BASE_URL}${audioPath}`;
}
