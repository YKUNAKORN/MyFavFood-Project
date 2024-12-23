document.addEventListener('DOMContentLoaded', async () => {
    const currentDateElement = document.querySelector(".current-date");
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    currentDateElement.textContent = `Date : ${today.toLocaleDateString('en-US', options)}`;

    const itemsListDiv = document.getElementById('items-list');
    let itemsData = [];

    try {
        const response = await fetch('/api/new_waste');
        if (!response.ok) throw new Error('Failed to fetch items data');
        itemsData = await response.json();

        if (itemsData.length > 0) {
            let tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Item Name</th>
                            <th>QTY</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            itemsData.forEach((item, index) => {
                tableHTML += `
                    <tr>
                        <td>${item.item_id}</td>
                        <td>${item.name}</td>
                        <td><input type="number" id="qty-${index}" class="styled-input" min="0" value="0" /></td>
                    </tr>
                `;
            });
            tableHTML += '</tbody></table>';
            itemsListDiv.innerHTML = tableHTML;
        } else {
            itemsListDiv.innerHTML = '<p>No items found.</p>';
        }
    } catch (error) {
        console.error('Error fetching items:', error);
        itemsListDiv.innerHTML = '<p>Failed to load items.</p>';
    }

    document.querySelector('.add-button').addEventListener('click', async () => {
        const wasteIdInput = document.getElementById('waste_id');
        const waste_id = wasteIdInput?.value.trim();
        const token = localStorage.getItem('token');

        if (!waste_id) {
            alert('waste ID is required.');
            return;
        }

        if (!token) {
            alert('Token is missing. Please log in again.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/add_new_waste/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ waste_id }),
            });
            if (!response.ok) throw new Error('Failed to add waste_id');
            alert('Waste ID added successfully');
        } catch (error) {
            console.error('Error adding waste_id:', error);
            alert('Failed to add waste_id. Please try again.');
        }
    });

    document.querySelector('.save-button').addEventListener('click', async () => {
        const wasteIdInput = document.getElementById('waste_id');
        const wasteid = wasteIdInput?.value.trim();

        if (!wasteid) {
            alert('Please enter a waste ID');
            return;
        }

        const items = [];
        document.querySelectorAll('tbody tr').forEach((row, index) => {
            const qty = parseInt(document.getElementById(`qty-${index}`)?.value) || 0;
            const itemId = row.querySelector('td:first-child').textContent.trim();
            if (qty > 0) {
                items.push({ item_id: itemId, qty });
            }
        });

        if (items.length === 0) {
            alert('No items to save');
            return;
        }

        try {
            const response = await fetch('/api/add_new_waste/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ waste_id: wasteid, items }),
            });
            if (!response.ok) throw new Error('Failed to save items');
            alert('Items saved successfully!');
        } catch (error) {
            console.error('Error saving items:', error);
            alert('Failed to save items');
        }
    });
});
