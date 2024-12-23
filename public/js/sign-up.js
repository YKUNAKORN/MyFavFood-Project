document.getElementById('sign-upForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // ป้องกันการ reload หน้าเว็บ

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries()); // แปลง FormData เป็น Object

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.text(); // อ่านข้อความจากเซิร์ฟเวอร์
            alert('Sign up successfully!'); // แสดงข้อความแจ้งเตือน
            console.log(result); // แสดงข้อความใน console (ถ้าต้องการ)
        } else {
            const error = await response.text();
            alert(`Error: ${error}`); // แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาด
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An error occurred while signing up.');
    }
});
