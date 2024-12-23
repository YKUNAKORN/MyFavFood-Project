// document.getElementById('save-btn').addEventListener('click', async () => {
//     // ดึงค่าจาก Input Field
//     const cashInput = document.getElementById('cash1')?.value;
//     if (!cashInput || isNaN(cashInput)) {
//         alert('Please enter a valid cash amount'); // แจ้งเตือนถ้า Input ผิด
//         return;
//     }

//     const token = localStorage.getItem('token'); // ดึง Token จาก localStorage
//     if (!token) {
//         alert('You are not authorized. Please log in.');
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:3000/api/cash/update-drawer-cash', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify({ amount: parseFloat(cashInput) }),
//         });

//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//         const result = await response.json();
//         alert(`Cash updated successfully. New balance: ${result.newCash}`);
//     } catch (error) {
//         console.error('Error updating cash:', error);
//         alert('Error updating cash. Please try again.');
//     }
// });
