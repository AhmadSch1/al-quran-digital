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

export async function getAsmaulHusna(): Promise<{ data: AsmaulHusnaResponse | null, error: string | null }> {
    try {
        const apiKey = process.env.NEXT_PUBLIC_ISLAMIC_API_KEY;
        if (!apiKey) {
            console.error("Missing NEXT_PUBLIC_ISLAMIC_API_KEY");
            return { data: null, error: "Missing NEXT_PUBLIC_ISLAMIC_API_KEY environment variable" };
        }

        const res = await fetch(`${API_URL}/?language=id&api_key=${apiKey}`, {
            next: { revalidate: 86400 }, // Cache for 24 hours
        });

        if (!res.ok) {
            const errText = await res.text().catch(() => "No error text provided");
            console.error("Failed to fetch Asmaul Husna:", res.statusText, errText);
            return { data: null, error: `API Error: ${res.status} ${res.statusText} - ${errText.substring(0, 150)}` };
        }

        const data: AsmaulHusnaResponse = await res.json();
        return { data, error: null };
    } catch (error: any) {
        console.error("Error fetching Asmaul Husna:", error);
        return { data: null, error: `Fetch Exception: ${error?.message || String(error)}` };
    }
}

export function getAsmaulHusnaAudioUrl(audioPath: string): string {
    // The API returns a relative path like /audio/asma-ul-husna/rahman.mp3
    return `${BASE_URL}${audioPath}`;
}
