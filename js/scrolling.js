const sliderTrack = document.querySelector('.slider-track');
const originalItems = document.getElementById('original-items');
const clone = originalItems.cloneNode(true);
clone.id = 'cloned-items';
sliderTrack.appendChild(clone);

sliderTrack.addEventListener('animationiteration', () => {
    sliderTrack.style.transform = 'translateX(0)';
    setTimeout(() => {
        sliderTrack.style.transform = '';
    }, 0);
});