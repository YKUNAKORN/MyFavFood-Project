document.querySelectorAll('.checkout button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('discount-btn')) {
            window.location.href = '#'; 
        } 
        else if (button.classList.contains('void-btn')) {
            window.location.href = '../pages/void.html'; 
        } 
        else if (button.classList.contains('finished-waste-btn')) {
            window.location.href = '../pages/finished-waste.html';
        } 
        else if (button.classList.contains('reprint-btn')) {
            window.location.href = '../pages/reprint.html';
        } 
        else if (button.classList.contains('waste-btn')) {
            window.location.href = '#'; 
        } 
        else if (button.classList.contains('save-order-btn')) {
            window.location.href = '#'; 
        } 
        else if (button.classList.contains('recall-btn')) {
            window.location.href = '../pages/recall-order.html'; 
        } 
        else if (button.classList.contains('home-btn')) {
            window.location.href = '../pages/overview.html'; 
        }
    });
});


let displayedItems = []; // ตัวแปรเก็บรายการเมนูทั้งหมดที่ถูกกด

async function fetchMenuData(menuId) {
    console.log(`Fetching data for menu: ${menuId}`);
    const itemList = document.getElementById('waste-list');

    try {
        const response = await fetch(`http://localhost:3000/api/menu/${menuId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const menuData = await response.json();
        console.log('Menu data received:', menuData);

        // เพิ่มข้อมูลใหม่เข้ามาในรายการทั้งหมด (สามารถซ้ำได้)
        displayedItems = [...displayedItems, ...menuData];

        // แสดงผลใน DOM
        renderMenuItems();
    } catch (error) {
        console.error('Error fetching menu data:', error);
        itemList.innerHTML = '<p>Error loading data. Please try again.</p>';
    }
}

// ฟังก์ชันสำหรับอัปเดต DOM
function renderMenuItems() {
    const itemList = document.getElementById('waste-list');
    itemList.innerHTML = `
    <div class="print-area">
        <div class="print-order">
            <table>
                <thead>
                    <tr>
                        <td class="tb-left">Name</td>
                        <td class="tb-right">Price</td>
                    </tr>
                </thead>
                <tbody>
                    ${displayedItems.map(item => `
                        <tr>
                            <td class="tb-left">${item.sand_name}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>
`;
}


async function wasteOrder() {
  if (displayedItems.length === 0) {
      alert('No items to save.');
      return;
  }

  try {
      const response = await fetch('http://localhost:3000/api/waste/waste-order', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',   
          },
          body: JSON.stringify({ items: displayedItems }),
      });

    //   const result = await response.json();

      if (response.ok) {  // **ตรวจสอบว่า response.ok เป็น true ก่อน**
        const result = await response.json();
        alert(result.message); // แจ้งเตือนว่าบันทึกสำเร็จ
        console.log('Saved order:', result);
        displayedItems = []; // ล้างข้อมูลที่แสดง
        renderMenuItems(); // อัปเดต DOM
      } else {
          console.error('Failed to save order:', result.error);
          alert('Failed to save order: ' + result.error);
      }
  } catch (error) {
      console.error('Error saving order:', error);
      alert('Error saving order. Please try again.');
  }
}