document.addEventListener('DOMContentLoaded', function () {
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

  document.querySelector('.prev')?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    carouselImg.src = images[currentIndex];
  });

  document.querySelector('.next')?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    carouselImg.src = images[currentIndex];
  });

  window.toggleFullScreen = function (image) {
    if (!document.fullscreenElement) {
      image.requestFullscreen().catch(err => {
        alert(`เกิดข้อผิดพลาด: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
});