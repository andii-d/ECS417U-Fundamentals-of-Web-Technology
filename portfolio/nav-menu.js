// Hamburger menu behaviour for the top navigation cluster.
const siteNav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const primaryNavigation = document.getElementById("primary-navigation");

if (siteNav && navToggle && primaryNavigation) {
    const setMenuState = (isOpen) => {
        siteNav.classList.toggle("is-open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
    };

    siteNav.classList.add("is-collapsible");
    setMenuState(false);

    navToggle.addEventListener("click", () => {
        const shouldOpen = !siteNav.classList.contains("is-open");
        setMenuState(shouldOpen);
    });

    primaryNavigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            setMenuState(false);
        });
    });

    document.addEventListener("click", (event) => {
        if (!siteNav.contains(event.target)) {
            setMenuState(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuState(false);
            navToggle.focus();
        }
    });
}
