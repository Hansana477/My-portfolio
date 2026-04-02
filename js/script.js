const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function initializeHeader() {
    const header = document.getElementById("header");

    if (!header) {
        return;
    }

    const syncHeader = () => {
        header.classList.toggle("scrolled", window.scrollY > 18);
    };

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
}

function initializeMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    if (!menuToggle || !nav) {
        return;
    }

    const setMenuState = (isOpen) => {
        nav.classList.toggle("active", isOpen);
        document.body.classList.toggle("nav-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-xmark"></i>'
            : '<i class="fas fa-bars"></i>';
    };

    menuToggle.addEventListener("click", () => {
        setMenuState(!nav.classList.contains("active"));
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
    });
}

function initializeReveal() {
    const revealItems = document.querySelectorAll("[data-reveal]");

    if (!revealItems.length) {
        return;
    }

    if (reducedMotionQuery.matches) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            });
        },
        { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => {
        if (!item.classList.contains("is-visible")) {
            observer.observe(item);
        }
    });
}

function resetTilt(card) {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--glow-x", "50%");
    card.style.setProperty("--glow-y", "50%");
}

function initializeTiltCards() {
    const cards = document.querySelectorAll("[data-tilt]");

    if (!cards.length) {
        return;
    }

    const shouldDisableTilt =
        reducedMotionQuery.matches || window.matchMedia("(pointer: coarse)").matches;

    cards.forEach((card) => {
        if (shouldDisableTilt) {
            resetTilt(card);
            return;
        }

        if (card.dataset.tiltReady === "true") {
            return;
        }

        const strength = Number(card.dataset.tiltStrength || 12);

        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            const relativeX = (event.clientX - rect.left) / rect.width;
            const relativeY = (event.clientY - rect.top) / rect.height;
            const rotateY = (relativeX - 0.5) * strength;
            const rotateX = (0.5 - relativeY) * strength;

            card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
            card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
            card.style.setProperty("--glow-x", `${(relativeX * 100).toFixed(1)}%`);
            card.style.setProperty("--glow-y", `${(relativeY * 100).toFixed(1)}%`);
        });

        card.addEventListener("pointerleave", () => resetTilt(card));
        card.addEventListener("blur", () => resetTilt(card), true);
        card.dataset.tiltReady = "true";
    });
}

function initializeTyping() {
    const typingElement = document.querySelector(".typing-text[data-roles]");

    if (!typingElement) {
        return;
    }

    const roles = typingElement.dataset.roles
        .split("|")
        .map((role) => role.trim())
        .filter(Boolean);

    if (!roles.length) {
        return;
    }

    if (reducedMotionQuery.matches) {
        typingElement.textContent = roles[0];
        return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const tick = () => {
        const currentRole = roles[roleIndex];
        const nextLength = isDeleting ? charIndex - 1 : charIndex + 1;
        typingElement.textContent = currentRole.slice(0, nextLength);
        charIndex = nextLength;

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            window.setTimeout(tick, 1600);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            window.setTimeout(tick, 420);
            return;
        }

        window.setTimeout(tick, isDeleting ? 55 : 90);
    };

    typingElement.textContent = "";
    window.setTimeout(tick, 700);
}

function initializeYear() {
    document.querySelectorAll("[data-year]").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initializeHeader();
    initializeMenu();
    initializeReveal();
    initializeTiltCards();
    initializeTyping();
    initializeYear();
});

window.initializeReveal = initializeReveal;
window.initializeTiltCards = initializeTiltCards;
