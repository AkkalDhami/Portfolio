const sliderTrack = document.querySelector('.slider-track');
const originalItems = document.getElementById('original-items');
const clone = originalItems.cloneNode(true);
clone.id = 'cloned-items';
sliderTrack.appendChild(clone);

// Pause animation on hover
const techIcons = document.querySelectorAll('.tech-icon');

// techIcons.forEach(icon => {
//     icon.addEventListener('mouseenter', () => {
//         icon.style.transform = 'scale(1.2)';
//         icon.style.filter = 'grayscale(0%)';
//     });

//     icon.addEventListener('mouseleave', () => {
//         icon.style.transform = 'scale(1)';
//         icon.style.filter = 'grayscale(100%)';
//     });
// });

// Reset animation at the end of each cycle
sliderTrack.addEventListener('animationiteration', () => {
    sliderTrack.style.transform = 'translateX(0)';
    setTimeout(() => {
        sliderTrack.style.transform = '';
    }, 0);
});