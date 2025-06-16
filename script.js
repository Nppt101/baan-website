document.addEventListener('DOMContentLoaded', function () {
  // เลือกภาพตามหน้าเว็บ
  const images = window.location.href.includes('house1')
    ? [
        'images/house1.jpg',
        'images/house1_2.jpg',
        'images/house1_3.jpg'
      ]
    : [
        'images/house2.jpg',
        'images/house2_2.jpg',
        'images/house2_3.jpg'
      ];

  let currentIndex = 0;
  const carouselImg = document.getElementById('carousel-image');

  // แสดงภาพตาม index
  function updateCarousel() {
    if (carouselImg) {
      carouselImg.src = images[currentIndex];
      carouselImg.alt = `ภาพที่ ${currentIndex + 1}`;
    }
  }

  // ป้องกันการคลิกเร็วเกินไป
  let lastClickTime = 0;
  function throttleClick(callback) {
    const now = Date.now();
    if (now - lastClickTime > 300) {
      callback();
      lastClickTime = now;
    }
  }

  // ปุ่มเลื่อนซ้าย
  document.querySelector('.prev')?.addEventListener('click', () => {
    throttleClick(() => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    });
  });

  // ปุ่มเลื่อนขวา
  document.querySelector('.next')?.addEventListener('click', () => {
    throttleClick(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    });
  });

  // เปิด/ปิดภาพแบบเต็มหน้าจอ
  window.toggleFullScreen = function (image) {
    if (!document.fullscreenElement) {
      image.requestFullscreen().catch(err => {
        alert(`เกิดข้อผิดพลาด: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // เปิด/ปิดเมนูมือถือ
  window.toggleMenu = function () {
    const nav = document.querySelector('.navbar ul');
    nav.classList.toggle('show');
  };

  // เริ่มต้นภาพแรก
  updateCarousel();
});