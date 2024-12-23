document.addEventListener('DOMContentLoaded', async () => {
    // 1. ฟังก์ชันแสดงวันที่ปัจจุบัน
    const currentDateElement = document.querySelector(".current-date");
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    currentDateElement.textContent = `Date : ${today.toLocaleDateString('en-US', options)}`;

    // 2. ดึงรายการ Items จาก API และสร้างตาราง
    const itemsListDiv = document.getElementById('items-list');
    let itemsData = [];
    try {
        const response = await fetch('/api/items');
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
                            <th>Total</th>
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
                    <td><input type="number" id="total-${index}" class="styled-input" min="0" value="0" /></td>
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

    // 3. ฟังก์ชันสำหรับปุ่ม Add
    document.querySelector('.add-button').addEventListener('click', async () => {
        const deliveryIdInput = document.getElementById('delivery-id');
        const delivery_id = deliveryIdInput?.value.trim();
        const token = localStorage.getItem('token');

        if (!delivery_id) {
            alert('Delivery ID is required.');
            return;
        }

        if (!token) {
            alert('Token is missing. Please log in again.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/inventory/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ delivery_id }),
            });
            if (!response.ok) throw new Error('Failed to add delivery ID');
            alert('Delivery ID added successfully');
        } catch (error) {
            console.error('Error adding delivery ID:', error);
            alert('Failed to add delivery ID. Please try again.');
        }
    });

    // 4. ฟังก์ชันสำหรับปุ่ม Save
    document.querySelector('.save-button').addEventListener('click', async () => {
        const deliveryIdInput = document.getElementById('delivery-id');
        const deliveryId = deliveryIdInput?.value.trim();

        if (!deliveryId) {
            alert('Please enter a Delivery ID');
            return;
        }

        const items = [];
        document.querySelectorAll('tbody tr').forEach((row, index) => {
            const qty = parseInt(document.getElementById(`qty-${index}`)?.value) || 0;
            const total = parseFloat(document.getElementById(`total-${index}`)?.value) || 0;
            const itemId = row.querySelector('td:first-child').textContent.trim();

            if (qty > 0) {
                items.push({ item_id: itemId, qty, total });
            }
        });

        if (items.length === 0) {
            alert('No items to save');
            return;
        }

        try {
            const response = await fetch('/api/inventory/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ delivery_id: deliveryId, items }),
            });
            if (!response.ok) throw new Error('Failed to save items');
            alert('Items saved successfully!');
        } catch (error) {
            console.error('Error saving items:', error);
            alert('Failed to save items');
        }
    });
});
