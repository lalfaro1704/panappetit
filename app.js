// scroll reveal animation
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealEls.forEach((el) => observer.observe(el));

// Scroll suave para botones con data-scroll-target
document.querySelectorAll("[data-scroll-target]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetSelector = btn.getAttribute("data-scroll-target");
    const targetEl = document.querySelector(targetSelector);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// "Hacer un pedido" header button
const navOrderBtn = document.getElementById("nav-order-btn");
if (navOrderBtn) {
  navOrderBtn.addEventListener("click", () => {
    // TODO: add link for delivery app (justo)
    alert("TBD");
  });
}

// "Comprar ahora" buttón
const buyBtn = document.getElementById("buy-btn");
const jamNote = document.getElementById("jam-note");

if (buyBtn && jamNote) {
  buyBtn.addEventListener("click", () => {
    jamNote.textContent =
      "Aquí podrías redirigir al e-commerce, link de pago o WhatsApp directo.";
  });
}
