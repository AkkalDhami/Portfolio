const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

function setTheme(isDark) {
    if (isDark) {
        html.classList.add("dark");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        html.classList.remove("dark");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem("darkMode", isDark);
}

const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
).matches;
const storedTheme = localStorage.getItem("darkMode");
setTheme(storedTheme === "true" || (storedTheme === null && prefersDark));

themeToggle.addEventListener("click", () => {
    setTheme(!html.classList.contains("dark"));
});

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileSidebar = document.getElementById("mobileSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

function openSidebar() {
    mobileSidebar.classList.remove("translate-x-full");
    sidebarOverlay.classList.remove("opacity-0", "pointer-events-none");
    document.body.classList.add("sidebar-open");
}

function closeSidebar() {
    mobileSidebar.classList.add("translate-x-full");
    sidebarOverlay.classList.add("opacity-0", "pointer-end-events-none");
    document.body.classList.remove("sidebar-open");
}

mobileMenuBtn.addEventListener("click", openSidebar);
closeSidebarBtn.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

// Close sidebar when clicking a link
mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeSidebar();

        // Remove active class from all links
        mobileNavLinks.forEach((l) => l.classList.remove("active"));
        // Add active class to clicked link
        link.classList.add("active");
    });
});

// Update active link based on scroll position
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            mobileNavLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
});

// Close sidebar on escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeSidebar();
    }
});

const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove("hidden");
        setTimeout(() => {
            backToTopButton.classList.add("visible");
        }, 50);
    } else {
        backToTopButton.classList.remove("visible");
        setTimeout(() => {
            backToTopButton.classList.add("hidden");
        }, 300);
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

const observerOptions = {
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fadeIn");
        }
    });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
});

// Contact Form Validation
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");

function showToast(message, type) {
    const toast = document.getElementById("toast");
    const messageEl = toast.querySelector(".toast-message");
    const iconEl = toast.querySelector(".toast-icon");
    const progressBar = toast.querySelector(".toast-progress-bar");

    // Reset animations
    toast.classList.remove("slide-in", "slide-out");
    progressBar.style.animation = "none";
    progressBar.offsetHeight; // Force reflow

    // Set message and icon
    messageEl.textContent = message;
    if (type === "success") {
        iconEl.innerHTML = '<i class="fas fa-check-circle"></i>';
        toast.className = "toast success";
    } else {
        iconEl.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        toast.className = "toast error";
    }

    // Start animations
    progressBar.style.animation = "progress 3s linear forwards";
    toast.classList.add("show", "slide-in");

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.add("slide-out");
        setTimeout(() => {
            toast.classList.remove("show", "slide-in", "slide-out");
        }, 300);
    }, 3000);
}

// Add close button functionality with animation
document.querySelector(".toast-close").addEventListener("click", () => {
    const toast = document.getElementById("toast");
    toast.classList.add("slide-out");
    setTimeout(() => {
        toast.classList.remove("show", "slide-in", "slide-out");
    }, 300);
});

// Updated form handling script
const submitBtn = contactForm.querySelector('button[type="submit"]');
const submitText = submitBtn.querySelector(".submit-text");
const loadingSpinner = submitBtn.querySelector(".loading-spinner");

function validateField(field) {
    const errorSpan = field.parentElement.querySelector(".text-red-500");
    const errorIcon = field.parentElement.querySelector(".error-icon");
    let isValid = true;
    const value = field.value.trim();

    switch (field.name) {
        case "name":
            if (value.length < 2) {
                errorSpan.innerHTML =
                    '<i class="fas fa-exclamation-circle"></i> Name must be at least 2 characters long';
                isValid = false;
            }
            break;
        case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorSpan.innerHTML =
                    '<i class="fas fa-exclamation-circle"></i> Please enter a valid email address';
                isValid = false;
            }
            break;
        case "subject":
            if (value.length < 3) {
                errorSpan.innerHTML =
                    '<i class="fas fa-exclamation-circle"></i> Subject must be at least 3 characters long';
                isValid = false;
            }
            break;
        case "message":
            if (value.length < 10) {
                errorSpan.innerHTML =
                    '<i class="fas fa-exclamation-circle"></i> Message must be at least 10 characters long';
                isValid = false;
            }
            break;
    }

    if (!isValid) {
        errorSpan?.classList.remove("hidden");
        field.classList.add("form-input-error");
        errorIcon?.classList.remove("hidden");
    } else {
        errorSpan?.classList.add("hidden");
        field.classList.remove("form-input-error");
        errorIcon?.classList.add("hidden");
    }

    return isValid;
}

// Real-time validation
contactForm.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
        if (field.classList.contains("form-input-error")) {
            validateField(field);
        }
    });

    field.addEventListener("blur", () => {
        validateField(field);
    });
});

// Form submission
contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    document
        .querySelectorAll(".text-red-500")
        .forEach((span) => span.classList.add("hidden"));
    document
        .querySelectorAll("input, textarea")
        .forEach((field) => field.classList.remove("form-input-error"));
    document
        .querySelectorAll(".error-icon")
        .forEach((icon) => icon.classList.add("hidden"));

    // Validate each field
    const fields = contactForm.querySelectorAll("input, textarea");
    fields.forEach((field) => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (isValid) {
        // Show loading state
        submitBtn.disabled = true;
        const submitText = submitBtn.querySelector(".submit-text");
        const loadingState = submitBtn.querySelector(".loading-state");

        // Animate the transition
        submitText.classList.add("hide");
        loadingState.classList.remove("hidden");
        loadingState.classList.add("flex");
        setTimeout(() => {
            loadingState.classList.add("show");
        }, 10);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Show success message
            showToast("Message sent successfully!", "success");

            // Reset form
            contactForm.reset();

            // Reset button state
            submitText.classList.remove("hide");
            loadingState.classList.remove("show");
            setTimeout(() => {
                loadingState.classList.add("hidden");
            }, 300);
            submitBtn.disabled = false;
        } catch (error) {
            // Show error message
            showToast("Failed to send message. Please try again.", "error");

            // Reset button state
            submitText.classList.remove("hide");
            loadingState.classList.remove("show");
            setTimeout(() => {
                loadingState.classList.add("hidden");
            }, 300);
            submitBtn.disabled = false;
        }
    } else {
        showToast("Please fix the errors in the form", "error");
    }
});

// Function to handle active navigation state
function handleNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Handle click events
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(link => link.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
}

// Call the function
handleNavigation();


document.addEventListener('DOMContentLoaded', function () {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => {
                b.classList.remove('tab-active');
                b.classList.add('text-gray-400');
                b.classList.remove('text-white');
            });

            // Add active class to clicked button
            btn.classList.add('tab-active');
            btn.classList.remove('text-gray-400');
            btn.classList.add('text-white');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });

            // Show selected tab content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
});



