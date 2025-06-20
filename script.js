document.addEventListener('DOMContentLoaded', function () {
  const images = window.location.href.includes('house1')
    ? ['images/house1.jpg', 'images/house1_2.jpg', 'images/house1_3.jpg']
    : window.location.href.includes('house2')
    ? ['images/house2.jpg', 'images/house2_2.jpg', 'images/house2_3.jpg']
    : [];

  let currentIndex = 0;
  const carouselImg = document.getElementById('carousel-image');
  const counter = document.createElement('div');
  counter.className = 'carousel-counter';
  if (carouselImg?.parentNode) {
    carouselImg.parentNode.appendChild(counter);
  }

  function updateCarousel() {
    if (!carouselImg || images.length === 0) return;
    carouselImg.src = images[currentIndex];
    carouselImg.alt = `ภาพที่ ${currentIndex + 1}`;
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  let lastClickTime = 0;
  function throttleClick(callback) {
    const now = Date.now();
    if (now - lastClickTime > 300) {
      callback();
      lastClickTime = now;
    }
  }

  document.querySelector('.prev')?.addEventListener('click', () => {
    throttleClick(() => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    });
  });

  document.querySelector('.next')?.addEventListener('click', () => {
    throttleClick(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    });
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg && carouselImg) {
    carouselImg.addEventListener('dblclick', () => {
      lightboxImg.src = carouselImg.src;
      lightbox.classList.add('show');
    });
    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('show');
    });
  }

  window.toggleMenu = function () {
    document.querySelector('.navbar ul')?.classList.toggle('show');
  };

  if (carouselImg && images.length > 0) {
    updateCarousel();
  }

  if (typeof AOS !== 'undefined') {
    AOS.init();
  }
});