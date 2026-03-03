document.addEventListener('DOMContentLoaded', () => {
    
    // เปลี่ยนสี Navbar เมื่อ Scroll ลงมา
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('nav-active');
        } else {
            nav.classList.remove('nav-active');
        }
    });

    // เพิ่มการ Highlight เมนูตาม Section ที่อยู่ (Scrollspy แบบง่าย)
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active', 'text-lime');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('text-lime');
            }
        });
    });
});
// ฟังก์ชันสำหรับจัดการการคลิกที่งาน (Work Card)
function openProject(projectName) {
    // ในที่นี้สมมติให้แสดง Alert ก่อน คุณสามารถเปลี่ยนเป็น window.location.href = 'page.html' ได้
    alert("You clicked on: " + projectName + "\nThis could open a detailed project page or a modal.");
    
    /* ตัวอย่างถ้าต้องการให้ลิงก์ไปหน้าอื่น:
    window.location.href = 'project-detail.html?name=' + encodeURIComponent(projectName); 
    */
}

// โค้ดเดิมเรื่อง Navbar และ Scrollspy...

function toggleService(element, serviceName) {
    // เอฟเฟกต์การสั่นเล็กน้อยหรือแสดงข้อมูลเพิ่มเติม
    console.log("Service Selected: " + serviceName);
    
    // ตัวอย่างการทำ Modal หรือนำทางไปหน้าจ้างงาน
    alert("Interested in " + serviceName + "? \nLet's discuss your project!");
    
    /* หากต้องการให้กดแล้วเลื่อนไปหน้า Contact:
    window.location.href = '#contact'; 
    */
}