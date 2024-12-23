document.addEventListener('DOMContentLoaded', async () => {
    const itemsListDiv = document.getElementById('items-list');
    if (!itemsListDiv) {
        console.error("Element with id 'items-list' not found.");
        return;
    }

    let itemsData = [];
    try {
        const response = await fetch('/api/d_delivery');
        if (!response.ok) throw new Error('Failed to fetch items data');

        itemsData = await response.json();
        console.log("Fetched data:", itemsData);

        if (itemsData.length > 0) {
            let tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>DATE TIME</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            itemsData.forEach((item) => {
                const rawDate = item.delivery_date;
            
                // ตรวจสอบว่า delivery_date มีค่าหรือไม่
                const formattedDate = rawDate && rawDate !== 'N/A'
                    ? new Date(rawDate).toLocaleString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit', hour12: true
                    })
                    : 'No Date Provided';
            
                tableHTML += `
                    <tr>
                        <td>${formattedDate}</td>   <td><a href="../pages/edit-delivery.html"><button class="continue-btn">Continue <i class="bi bi-caret-right"></i></button></a></td>
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
});
