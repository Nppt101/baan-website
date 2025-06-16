document.addEventListener('DOMContentLoaded', function () {
  // ✅ ตรวจชื่อไฟล์เพื่อตั้งรูป carousel ตามหน้า
  const images = window.location.href.includes('house1')
    ? ['images/house1.jpg', 'images/house1_2.jpg', 'images/house1_3.jpg']
    : window.location.href.includes('house2')
    ? ['images/house2.jpg', 'images/house2_2.jpg', 'images/house2_3.jpg']
    : [];

  let currentIndex = 0;
  const carouselImg = document.getElementById('carousel-image');
  const counter = document.createElement('div');

  // ✅ สร้างตัวนับรูป "1/3"
  counter.className = 'carousel-counter';
  if (carouselImg?.parentNode) {
    carouselImg.parentNode.appendChild(counter);
  }

  function updateCarousel() {
    if (!carouselImg || images.length === 0) return;
    carouselImg.src = images[currentIndex];
    carouselImg.alt = `ภาพที่ ${currentIndex + 1}`;
    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }
  }

  // ✅ ป้องกันการคลิกเร็วเกินไป
  let lastClickTime = 0;
  function throttleClick(callback) {
    const now = Date.now();
    if (now - lastClickTime > 300) {
      callback();
      lastClickTime = now;
    }
  }

  // ✅ ปุ่มก่อนหน้า
  document.querySelector('.prev')?.addEventListener('click', () => {
    throttleClick(() => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    });
  });

  // ✅ ปุ่มถัดไป
  document.querySelector('.next')?.addEventListener('click', () => {
    throttleClick(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    });
  });

  // ✅ เปิด/ปิด Fullscreen
  window.toggleFullScreen = function (image) {
    if (!document.fullscreenElement) {
      image.requestFullscreen().catch(err => {
        alert(`เกิดข้อผิดพลาด: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // ✅ Toggle ☰ เมนูมือถือ
  window.toggleMenu = function () {
    const nav = document.querySelector('.navbar ul');
    nav?.classList.toggle('show');
  };

  // ✅ แสดงภาพแรก
  if (carouselImg && images.length > 0) {
    updateCarousel();
  }
});