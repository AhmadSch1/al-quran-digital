import fs from 'fs';
import path from 'path';

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
        // We now load from local static JSON to avoid Cloudflare 403 blocks on Vercel
        const filePath = path.join(process.cwd(), 'public', 'data', 'asmaul-husna.json');

        if (!fs.existsSync(filePath)) {
            return { data: null, error: "Local data file not found at " + filePath };
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const data: AsmaulHusnaResponse = JSON.parse(fileContents);

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
