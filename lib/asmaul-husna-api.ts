import asmaulHusnaData from "../public/data/asmaul-husna.json";

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
        // Load data directly from JSON import instead of using 'fs'
        // This prevents the "Module not found: Can't resolve 'fs'" error in Client Components (e.g. AsmaulHusnaCard)
        const data = asmaulHusnaData as AsmaulHusnaResponse;

        if (!data || !data.data || !data.data.names) {
            return { data: null, error: "Local data file format is invalid" };
        }

        return { data, error: null };
    } catch (error: any) {
        console.error("Error loading Asmaul Husna locally:", error);
        return { data: null, error: `JSON Parse/Read Exception: ${error?.message || String(error)}` };
    }
}

export function getAsmaulHusnaAudioUrl(audioPath: string): string {
    // The API returns a relative path like /audio/asma-ul-husna/rahman.mp3
    return `${BASE_URL}${audioPath}`;
}
