const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', { // URL ต้องชี้ไปยัง backend
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message || 'Login failed');
            return;
        }

        const data = await response.json();

        if (data.token) {
            localStorage.setItem('token', data.token); // เก็บ JWT
            alert(data.message); // แสดงข้อความจาก Backend เช่น "Login successful! Token created."
            window.location.href = './pages/overview.html'; // ย้ายไปยังหน้าอื่น
        } else {
            alert('Failed to receive token.');
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert('An error occurred. Please try again.');
    }
});
