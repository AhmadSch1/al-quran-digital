export async function getAllDoa(): Promise<any[]> {
    try {
        const response = await fetch("https://equran.id/api/doa", {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Doa list: ${response.status}`);
        }

        const data = await response.json();
        return data.data || data; // Handle cases where data is wrapped in a 'data' property
    } catch (error) {
        console.error("Error fetching Doa list:", error);
        return [];
    }
}

export async function getDoaById(id: string): Promise<any | null> {
    try {
        const response = await fetch(`https://equran.id/api/doa/${id}`, {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            console.error(`Failed to fetch Doa details for id ${id}: ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("Error fetching Doa details:", error);
        return null;
    }
}
