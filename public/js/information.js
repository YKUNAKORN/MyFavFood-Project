document.addEventListener('DOMContentLoaded', async () => {


    // ดึง emp_id จาก Query String
    const params = new URLSearchParams(window.location.search);
    const empId = params.get('emp_id');

    if (!empId) {
        document.body.innerHTML = '<p>Employee ID is missing!</p>';
        return;
    }

    try {
        // Fetch ข้อมูลพนักงานจาก API
        const response = await fetch(`/api/employees/${empId}`);
        if (!response.ok) throw new Error('Failed to fetch employee data');

        const employee = await response.json();

        // แสดงข้อมูลพนักงานที่ได้จากการ query
        // document.getElementById('emp-id').textContent = employee.EMP_ID || 'N/A';
        document.getElementById('emp-name').textContent = `${employee.EMP_FNAME} ${employee.EMP_LNAME}`;
        document.getElementById('emp-nickname').textContent = employee.EMP_UNAME || 'N/A';
        document.getElementById('emp-position').textContent = employee.EMP_POS || 'N/A';
        document.getElementById('emp-address').textContent = employee.ADDRESS || 'N/A';
        document.getElementById('emp-gender').textContent = employee.EMP_GENDER || 'N/A';
        document.getElementById('emp-email').textContent = employee.EMP_EMAIL || 'N/A';
        document.getElementById('emp-phone').textContent = employee.EMP_PHONE || 'N/A';
        document.getElementById('emp-contract').textContent = employee.CONTRACT_ID || 'N/A';
    } catch (error) {
        console.error('Error fetching employee data:', error);
        document.body.innerHTML = '<p>Failed to load employee information.</p>';
    }
});
