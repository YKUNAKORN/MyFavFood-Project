document.addEventListener('DOMContentLoaded', async () => {
    // 1. ฟังก์ชันแสดงวันที่ปัจจุบัน
    const currentDateElement = document.querySelector(".current-date");
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    currentDateElement.textContent = `Date : ${today.toLocaleDateString('en-US', options)}`;

    // // 2. ดึงรายการ Items จาก API และสร้างตาราง
    // const itemsListDiv = document.getElementById('items-list');
    // let itemsData = [];
    // try {
    //     const response = await fetch('/api/stock');
    //     if (!response.ok) throw new Error('Failed to fetch items data');
    //     itemsData = await response.json();

    //     if (itemsData.length > 0) {
    //         let tableHTML = `
    //             <table>
    //                 <thead>
    //                     <tr>
    //                         <th>DATE TIME/th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //         `;
    //         itemsData.forEach((item, index) => {
    //             tableHTML += `
    //                 <tr>
    //                     <td>${item.delivery_date}</td>
                        
    //                 </tr>
    //             `;
    //         });
    //         tableHTML += '</tbody></table>';
    //         itemsListDiv.innerHTML = tableHTML;
    //     } else {
    //         itemsListDiv.innerHTML = '<p>No items found.</p>';
    //     }
    // } catch (error) {
    //     console.error('Error fetching items:', error);
    //     itemsListDiv.innerHTML = '<p>Failed to load items.</p>';
    // }
});