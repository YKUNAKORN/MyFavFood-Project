document.getElementById('save-btn').addEventListener('click', async () => {
    // ดึงค่าจากฟอร์ม
    const DRAWER_CASH = document.getElementById('DRAWER_CASH').value;
    const coin = document.getElementById('coin').value;
    const safe = document.getElementById('safe').value;
    const BREAD_IN = document.getElementById('BREAD_IN').value;

    // ดึง JWT token จาก LocalStorage
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not logged in');
        window.location.href = '../index.html';
        return;
    }

    try {
        // ส่งข้อมูลไปยัง Backend API
        const response = await fetch('/api/end-day', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token, // ส่ง JWT
            },
            body: JSON.stringify({
                DRAWER_CASH,
                coin,
                safe,
                BREAD_IN,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            // แสดงข้อความแจ้งเตือนเมื่อบันทึกสำเร็จ
            alert('บันทึกข้อมูลสำเร็จ!');
            window.location.href = '../pages/cash-control.html'; // ย้ายไปยังหน้าถัดไปึ
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
