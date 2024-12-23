 import { fetchEmployees } from '../js/employees-data.js';

 document.addEventListener('DOMContentLoaded', async () => {
    const employees = await fetchEmployees();
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // ล้างข้อมูลเก่า

    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.EMP_FNAME}</td>
            <td>${employee.EMP_LNAME}</td>
            <td><a href="../pages/time-punch.html"><button class="time-punch-btn">Time Punch</button></a></td>
            <td>
                <a href="../pages/information.html?emp_id=${employee.EMP_ID}">
                    <button class="information-btn">Information</button>
                </a>
            </td>
        `;
        tbody.appendChild(row);
    });
});


    // แก้ไขตรงนี้: เลือกปุ่มทั้งหมด แล้วเพิ่ม Event Listener
    // document.querySelectorAll('.information-btn').forEach(button => {
    //     button.addEventListener('click', async () => {
    //         const empId = button.getAttribute('data-emp-id'); // นิยาม button ที่ถูกต้อง
    //         try {
    //             const response = await fetch(`/api/employees/${empId}`);
    //             if (!response.ok) throw new Error('Failed to fetch employee data');

    //             const employee = await response.json();
    //             alert(`Employee ID: ${employee.EMP_ID}\nName: ${employee.EMP_FNAME} ${employee.EMP_LNAME}\nPosition: ${employee.EMP_POS}`);
    //         } catch (error) {
    //             console.error('Error fetching employee data:', error);
    //             alert('Failed to load employee information.');
    //         }
    //     });
    // });
