export async function fetchItems() {
    try {
        const response = await fetch('/api/items');
        if (!response.ok) {
            throw new Error('Failed to fetch items data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
}
