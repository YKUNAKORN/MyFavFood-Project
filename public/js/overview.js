// date and time function
function updateClock() {
    const now = new Date();
    // Format time as HH : MM : SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours} : ${minutes} : ${seconds}`;
    // Format date as DD MMM YYYY
    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('default', { month: 'short' });
    const year = now.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    // Update the time and date elements
    document.getElementById('time').textContent = formattedTime;
    document.getElementById('date').textContent = formattedDate;
}
// Update the clock every second
setInterval(updateClock, 1000);
// Initial call to set the clock immediately when the page loads
updateClock();

import { fetchEmployees } from '../js/employees-data.js';

document.addEventListener('DOMContentLoaded', async () => {
    const employees = await fetchEmployees();
    const tbody = document.querySelector('.active-employees tbody');
    tbody.innerHTML = ''; // ล้างข้อมูลเก่า

    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.EMP_FNAME} ${employee.EMP_LNAME}</td>
            <td>${employee.EMP_POS}</td>
        `;
        tbody.appendChild(row);
    });
});

