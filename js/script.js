const html = document.documentElement;

// Select the toggle input and body
const themeToggle = document.querySelector('#themeToggle input');
const body = document.body;
const closeSidebarBtn = document.getElementById("closeSidebarBtn");
// Check localStorage for theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  html.classList.toggle('dark', currentTheme === 'dark');
  themeToggle.checked = currentTheme === 'dark';
}

// Event listener for theme toggle
themeToggle.addEventListener('change', () => {
  const isChecked = themeToggle.checked;
  html.classList.toggle('dark', isChecked);
  localStorage.setItem('theme', isChecked ? 'dark' : 'light');
});


const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileSidebar = document.getElementById("mobileSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

// Function to open the sidebar
function openSidebar() {
  mobileSidebar.classList.remove("translate-x-full");
  sidebarOverlay.classList.remove("opacity-0", "pointer-events-none");
  document.body.classList.add("sidebar-open");

  // Add focus to the first link for accessibility
  if (mobileNavLinks.length > 0) {
    mobileNavLinks[0].focus();
  }
}

// Function to close the sidebar
function closeSidebar() {
  mobileSidebar.classList.add("translate-x-full");
  sidebarOverlay.classList.add("opacity-0", "pointer-events-none");
  document.body.classList.remove("sidebar-open");
}

// Event listeners for opening and closing the sidebar
mobileMenuBtn.addEventListener("click", openSidebar);
closeSidebarBtn.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

// Close sidebar when clicking a link
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeSidebar();

    mobileNavLinks.forEach((l) => l.classList.remove("active"));

    link.classList.add("active");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.body.classList.contains("sidebar-open")) {
    closeSidebar();
  }
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

document.addEventListener("DOMContentLoaded", function () {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => {
        b.classList.remove("tab-active");
        b.classList.add("text-gray-600", "dark:text-gray-400");
        b.classList.remove("text-gray-900", "dark:text-white");
      });

      btn.classList.add("tab-active");
      btn.classList.remove("text-gray-600", "dark:text-gray-400");
      btn.classList.add("text-gray-900", "dark:text-white");

      tabContents.forEach((content) => {
        content.classList.add("hidden");
      });

      const tabId = btn.getAttribute("data-tab");
      document.getElementById(tabId).classList.remove("hidden");
    });
  });
});



function removeToast(toast) {
  toast.classList.add("hide");
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 500);
}


function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = `toast ${type} bg-[#f5f5f5] dark:bg-[#201e1d]`;
  toast.innerHTML = `<div class="column ">
                     
          <i class="text-white ${type === 'success' ? 'ri-checkbox-circle-fill' : type === 'error' ? 'ri-error-warning-fill' : 'fa-solid fa-triangle-exclamation'}"></i>
                       <span>${message}</span>
                    </div>
                    <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
  document.querySelector("#toastContainer").appendChild(toast);
  toast.timeoutId = setTimeout(() => removeToast(toast), 4000);
}
// Contact Form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const contactEmail = document.getElementById("contactEmail");
  const username = document.getElementById("contactUserName");
  const message = document.getElementById("message");
  const submitButton = document.getElementById("contactbutton");

  const contactUserNameError = document.getElementById("contactUserNameError");
  const contactEmailError = document.getElementById("contactEmailError");
  const messageError = document.getElementById("messageError");

  // Original button text
  const originalButtonHtml = submitButton.innerHTML;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors and remove error classes
    [contactUserNameError, contactEmailError, messageError].forEach(error => {
      error.innerHTML = "";
      error.classList.remove("hidden");
    });
    [username, contactEmail, message].forEach(input => {
      input.classList.remove("borderError", "shake");
    });

    // Username validation - allow spaces in names
    const usernameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;

    if (username.value.trim() === "") {
      showInputError(username, contactUserNameError, "Please enter your name");
      isValid = false;
    } else if (!usernameRegex.test(username.value.trim())) {
      showInputError(username, contactUserNameError, "Please enter a valid name (letters only)");
      isValid = false;
    } else {
      contactUserNameError.classList.add("hidden");
    }


    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (contactEmail.value.trim() === "") {
      showInputError(contactEmail, contactEmailError, "Please enter an email");
      isValid = false;
    } else if (!emailPattern.test(contactEmail.value.trim())) {
      showInputError(contactEmail, contactEmailError, "Please enter a valid email");
      isValid = false;
    } else {
      contactEmailError.classList.add("hidden");
    }

    // Message validation - minimum 10 characters
    if (message.value.trim() === "") {
      showInputError(message, messageError, "Please enter a message");
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showInputError(message, messageError, "Message must be at least 10 characters long");
      isValid = false;
    } else {
      messageError.classList.add("hidden");
    }

    if (!isValid) {
      showToast("Please fill in all the required fields correctly.", "error");
      return;
    }

    // Show loading state
    setLoadingState(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      showToast(
        "Message sent successfully!",
        "success"
      );
      clearInput();
      setLoadingState(false);
    } catch (error) {
      showToast("Failed to send message. Please try again.", "error");
    }
  });

  function showInputError(input, errorElement, message) {
    input.classList.add("borderError", "shake");

    errorElement.innerHTML = `
            <div class="flex items-center gap-1 dark:text-red-400 text-red-500">
                <i class="ri-error-warning-line text-[18px]"></i>
                <span>${message}</span>
            </div>
        `;

    // Remove borderError class after 1 second
    setTimeout(() => {
      input.classList.remove("borderError");
    }, 1000);
  }

  function setLoadingState(isLoading) {
    submitButton.disabled = isLoading;
    submitButton.innerHTML = isLoading
      ? `<div class="flex items-center gap-4">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Message...
               </div>`
      : originalButtonHtml;
  }

  function clearInput() {
    contactEmail.value = "";
    username.value = "";
    message.value = "";

    // Clear error states immediately
    [username, contactEmail, message].forEach(input => {
      input.classList.remove("borderError", "shake");
    });
    [contactUserNameError, contactEmailError, messageError].forEach(error => {
      error.innerHTML = "";
    });
  }

  // Keep the animation end listener for shake effect only
  [username, contactEmail, message].forEach(input => {
    input.addEventListener("animationend", () => {
      input.classList.remove("shake");
    });
  });
});

// Replace the existing handleNavigation function with this updated version
function handleNavigation() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 100; // Add offset for better accuracy

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // Update the condition to be more precise
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href").slice(1); // Remove the # from href
      if (href === current) {
        link.classList.add("active");
      }
    });
  });

  // Update click handler to use smooth scroll and proper active state
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Remove active class from all links
        navLinks.forEach((link) => link.classList.remove("active"));
        // Add active class to clicked link
        link.classList.add("active");

        // Smooth scroll to target section
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

// Call the function
handleNavigation();

document.addEventListener("DOMContentLoaded", function () {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      tabBtns.forEach((b) => {
        b.classList.remove("tab-active");
        b.classList.add("text-gray-400");
        b.classList.remove("text-white");
      });

      // Add active class to clicked button
      btn.classList.add("tab-active");
      btn.classList.remove("text-gray-400");
      btn.classList.add("text-white");

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.classList.add("hidden");
      });

      // Show selected tab content
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(tabId).classList.remove("hidden");
    });
  });
});


// custom cursor
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  const { clientX: x, clientY: y } = e;

  // Move the custom cursor
  cursor.style.transform = `translate(${x - 25}px, ${y - 25}px)`;

  // Create a trail
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = `${x}px`;
  trail.style.top = `${y}px`;
  document.body.appendChild(trail);

  // Remove trail after animation
  setTimeout(() => {
    trail.remove();
  }, 500);
});



