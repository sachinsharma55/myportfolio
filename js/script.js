// =============================================================
// PRELOADER
// The old version drove a percentage counter with setInterval,
// targeting #loadingNumber / .loading-circle / .loading-box —
// elements that were commented out of the HTML. That meant every
// 30ms tick threw a TypeError and the loader never actually
// hid itself. This version just fades the loader out once the
// page has fully loaded, and every lookup is null-checked.
// =============================================================
(function initPreloader() {
    const loaderBox = document.querySelector(".loading-box");
    if (!loaderBox) return;

    function hideLoader() {
        loaderBox.classList.add("is-hidden");
    }

    window.addEventListener("load", hideLoader);
    // Safety net in case a slow third-party resource never fires
    // the window `load` event.
    setTimeout(hideLoader, 4000);
})();

// =============================================================
// AOS (scroll reveal) — loaded from the CDN in index.html
// =============================================================
if (window.AOS) {
    AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        offset: 80,
        once: true,
    });
}

// =============================================================
// HERO TYPING EFFECT
// Cycles through role titles in the hero heading.
// =============================================================
const textArray = [
    "Frontend Developer.",
    "Web Designer.",
    "HTML Developer.",
    "UI Developer.",
];

const typeJsText = document.querySelector(".animatedText");

if (typeJsText) {
    let stringIndex = 0;
    let charIndex = 0;
    let isTyping = true;

    function typeJs() {
        const currentString = textArray[stringIndex];

        if (isTyping) {
            if (charIndex < currentString.length) {
                typeJsText.textContent += currentString.charAt(charIndex);
                charIndex++;
            } else {
                isTyping = false;
            }
            return;
        }

        setTimeout(() => {
            if (charIndex > 0) {
                typeJsText.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
            } else {
                isTyping = true;
                stringIndex = (stringIndex + 1) % textArray.length;
                typeJsText.textContent = "";
            }
        }, 1000);
    }

    setInterval(typeJs, 150);
}

// =============================================================
// STICKY NAV — frosted background once the page scrolls, and a
// scroll-spy that highlights whichever section is in view across
// the header nav, the mobile sidebar nav, and the footer nav.
// =============================================================
(function initNavBehaviour() {
    const siteNav = document.querySelector(".site-nav");
    const sections = document.querySelectorAll("main [id], header[id], section[id]");

    if (siteNav) {
        const onScroll = () => {
            siteNav.classList.toggle("is-scrolled", window.scrollY > 40);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (!sections.length || !("IntersectionObserver" in window)) return;

    function setActiveNav(sectionId) {
        document.querySelectorAll("nav.main-nav a").forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${sectionId}`);
        });

        document.querySelectorAll(".footer-nav li").forEach((li) => {
            const link = li.querySelector("a");
            li.classList.toggle("active", !!link && link.getAttribute("href") === `#${sectionId}`);
        });
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveNav(entry.target.id);
                }
            });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
})();

// =============================================================
// PORTFOLIO THUMBNAILS — fall back to the gradient placeholder
// (see components/_portfolio-cards.scss) instead of a broken-
// image icon if a screenshot hasn't been added back yet.
// =============================================================
document.querySelectorAll("img.thumbnail").forEach((img) => {
    img.addEventListener(
        "error",
        () => {
            img.style.display = "none";
        },
        { once: true }
    );
});

// =============================================================
// jQuery-dependent widgets (hamburger menu + Owl Carousel)
// =============================================================
$(function () {
    // Hamburger / mobile sidebar. Kept deliberately independent of
    // Bootstrap's collapse plugin (the markup used Bootstrap 4's
    // data-toggle/data-target attributes, but this project ships
    // Bootstrap 5, which listens for data-bs-toggle instead — so
    // the old attributes were never actually doing anything).
    const $hamburger = $(".hamburger-icon");
    const $sidebar = $("#sidebarNav");

    $hamburger.on("click", function () {
        const isOpen = $sidebar.toggleClass("show").hasClass("show");
        $hamburger.attr("aria-expanded", isOpen);
        $sidebar.attr("aria-hidden", !isOpen);
    });

    // Close the mobile menu after tapping a link in it.
    $sidebar.on("click", "a", function () {
        $sidebar.removeClass("show");
        $hamburger.attr("aria-expanded", false);
        $sidebar.attr("aria-hidden", true);
    });

    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 24,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        dots: false,
        responsiveClass: true,
        navText: [
            "<span aria-label='Previous slide'></span>",
            "<span aria-label='Next slide'></span>",
        ],
        responsive: {
            0: { items: 1, nav: true },
            600: { items: 2, nav: true },
            1000: { items: 3, nav: true, loop: true },
        },
    });
});
