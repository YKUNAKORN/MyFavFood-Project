export async function fetchEmployees() {
    try {
        const response = await fetch('/api/employees');
        if (!response.ok) {
            throw new Error('Failed to fetch employees data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching employees:', error);
        return [];
    }
}
