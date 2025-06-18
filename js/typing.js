const typingEffect = (() => {
    const texts = [
        "web developer",
        "frontend developer",
        "backend developer",
    ];
    
    const element = document.getElementById('typewriter-text');
    let index = 0;
    let textIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const deleteSpeed = 75;
    const pauseBetween = 1000;

    function type() {
        const currentText = texts[textIndex];
        const displayedText = currentText.substring(0, index);
        
        element.innerHTML = `${displayedText}<span class="cursor"></span>`;
        
        if (!isDeleting) {
            index++;
            if (index > currentText.length) {
                isDeleting = true;
                setTimeout(() => type(), pauseBetween);
                return;
            }
        } else {
            index--;
            if (index === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }

        const speed = isDeleting ? deleteSpeed : typingSpeed;
        setTimeout(() => type(), speed);
    }

    return { start: () => setTimeout(type, 500) };
})();

typingEffect.start();