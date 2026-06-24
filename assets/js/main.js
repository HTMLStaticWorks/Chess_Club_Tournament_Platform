document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. Theme Management (Light / Dark Mode)
    // -------------------------------------------------------------
    const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
    const currentTheme = localStorage.getItem("chess-theme") || "dark";

    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcons(currentTheme);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            let activeTheme = document.documentElement.getAttribute("data-theme");
            let newTheme = activeTheme === "dark" ? "light" : "dark";

            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("chess-theme", newTheme);
            updateThemeIcons(newTheme);
        });
    });

    function updateThemeIcons(theme) {
        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector("i");
            if (icon) {
                if (theme === "light") {
                    icon.className = "fas fa-moon";
                } else {
                    icon.className = "fas fa-sun";
                }
            }
        });
    }

    // -------------------------------------------------------------
    // 2. Direction Management (LTR / RTL Toggle)
    // -------------------------------------------------------------
    const rtlToggleBtns = document.querySelectorAll(".rtl-toggle-btn");
    const currentDir = localStorage.getItem("chess-dir") || "ltr";

    document.documentElement.setAttribute("dir", currentDir);
    updateRtlIcons(currentDir);

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            let activeDir = document.documentElement.getAttribute("dir") || "ltr";
            let newDir = activeDir === "rtl" ? "ltr" : "rtl";

            document.documentElement.setAttribute("dir", newDir);
            localStorage.setItem("chess-dir", newDir);
            updateRtlIcons(newDir);
        });
    });

    function updateRtlIcons(dir) {
        rtlToggleBtns.forEach(btn => {
            const icon = btn.querySelector("i");
            if (icon) {
                if (dir === "rtl") {
                    btn.setAttribute("title", "Switch to LTR");
                    icon.className = "fas fa-right-left"; /* Left-right arrow icon */
                    btn.style.color = "var(--accent-primary)"; /* Highlight when active */
                } else {
                    btn.setAttribute("title", "Switch to RTL");
                    icon.className = "fas fa-right-left"; /* Same icon both states */
                    btn.style.color = ""; /* Reset to default */
                }
            }
        });
    }

    // -------------------------------------------------------------
    // 3. Mobile Navigation Menu Toggle
    // -------------------------------------------------------------
    const menuToggle = document.getElementById("mobile-menu-btn");
    const navMenu = document.getElementById("primary-navigation");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");

            // Show/hide mobile Join Club button based on menu state
            const mobileJoinBtn = navMenu.querySelector(".nav-menu-join-btn");
            if (mobileJoinBtn) {
                mobileJoinBtn.style.display = navMenu.classList.contains("active") ? "flex" : "none";
            }
        });

        // Close menu on clicking nav items
        const navLinks = navMenu.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");
                // Hide mobile Join Club on close
                const mobileJoinBtn = navMenu.querySelector(".nav-menu-join-btn");
                if (mobileJoinBtn) mobileJoinBtn.style.display = "none";
            });
        });
    }

    // -------------------------------------------------------------
    // 4. Testimonials Slider/Carousel
    // -------------------------------------------------------------
    const slides = document.querySelectorAll(".testimonial-slide");
    const dotsContainer = document.querySelector(".carousel-dots");
    let currentSlide = 0;

    if (slides.length > 0) {
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.classList.add("carousel-dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                showSlide(index);
            });
            if (dotsContainer) {
                dotsContainer.appendChild(dot);
            }
        });

        const dots = document.querySelectorAll(".carousel-dot");

        function showSlide(index) {
            slides[currentSlide].classList.remove("active");
            if (dots.length > 0) dots[currentSlide].classList.remove("active");

            currentSlide = index;

            slides[currentSlide].classList.add("active");
            if (dots.length > 0) dots[currentSlide].classList.add("active");
        }

        // Auto slide change
        setInterval(() => {
            let nextSlide = (currentSlide + 1) % slides.length;
            showSlide(nextSlide);
        }, 6000);
    }

    // -------------------------------------------------------------
    // 5. Tabs (Tournaments / Coaching Category Switches)
    // -------------------------------------------------------------
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const container = btn.closest(".tab-container");
            const targetId = btn.getAttribute("data-target");

            if (container) {
                const siblingBtns = container.querySelectorAll(".tab-btn");
                siblingBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const tabContents = container.querySelectorAll(".tab-content");
                tabContents.forEach(content => {
                    if (content.id === targetId) {
                        content.classList.add("active");
                    } else {
                        content.classList.remove("active");
                    }
                });
            }
        });
    });

    // -------------------------------------------------------------
    // 6. Gallery Lightbox System
    // -------------------------------------------------------------
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox-modal");

    if (galleryItems.length > 0 && lightbox) {
        const lightboxImg = lightbox.querySelector(".lightbox-content");
        const lightboxCaption = lightbox.querySelector(".lightbox-caption");
        const lightboxClose = lightbox.querySelector(".lightbox-close");

        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                const img = item.querySelector("img");
                const title = item.querySelector(".gallery-item-title");
                const tag = item.querySelector(".gallery-item-tag");

                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt || "Chess Platform Image";
                    lightboxCaption.textContent = title ? `${title.textContent} - ${tag.textContent}` : "";
                    lightbox.style.display = "flex";
                }
            });
        });

        lightboxClose.addEventListener("click", () => {
            lightbox.style.display = "none";
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }

    // -------------------------------------------------------------
    // 7. FAQ Accordions
    // -------------------------------------------------------------
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const item = question.closest(".faq-item");
            if (item) {
                item.classList.toggle("active");
            }
        });
    });

    // -------------------------------------------------------------
    // 8. Modals (Registration, Booking, Membership forms)
    // -------------------------------------------------------------
    const modals = document.querySelectorAll(".modal");
    const modalTriggers = document.querySelectorAll("[data-open-modal]");
    const modalCloses = document.querySelectorAll(".modal-close");

    modalTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute("data-open-modal");
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.style.display = "flex";
            }
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener("click", () => {
            const modal = close.closest(".modal");
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    window.addEventListener("click", (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    });

    // Handle generic modal form submissions with a pleasant toast/alert
    const modalForms = document.querySelectorAll(".modal form");
    modalForms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const modal = form.closest(".modal");
            if (modal) {
                modal.style.display = "none";
            }
            alert("Thank you! Your submission has been received successfully. Our grandmaster team will contact you shortly.");
            form.reset();
        });
    });

    // -------------------------------------------------------------
    // 9. Stats Counter Simulation
    // -------------------------------------------------------------
    const statNumbers = document.querySelectorAll(".stat-number");
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endVal = parseInt(target.getAttribute("data-target"), 10);
                    let currentVal = 0;
                    const duration = 2000; // ms
                    const stepTime = Math.abs(Math.floor(duration / endVal));

                    const timer = setInterval(() => {
                        currentVal += 1;
                        target.textContent = currentVal + (target.getAttribute("data-suffix") || "");
                        if (currentVal >= endVal) {
                            target.textContent = endVal + (target.getAttribute("data-suffix") || "");
                            clearInterval(timer);
                        }
                    }, Math.max(stepTime, 10));

                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => observer.observe(num));
    }

    // -------------------------------------------------------------
    // 10. Scroll to Top Indicator
    // -------------------------------------------------------------
    const scrollTopBtn = document.getElementById("scroll-to-top-btn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
            }
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
