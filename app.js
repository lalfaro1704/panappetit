// Animación reveal on scroll
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

// Botón "Hacer un pedido" del header
const navOrderBtn = document.getElementById("nav-order-btn");
if (navOrderBtn) {
  navOrderBtn.addEventListener("click", () => {
    // Aquí podrías poner tu link de Justo, Rappi, Uber, etc.
    alert("Aquí iría el link para hacer un pedido (Justo, Rappi, web propia, etc.)");
  });
}

// Botón "Comprar ahora" (Pan de Jamón)
const buyBtn = document.getElementById("buy-btn");
const jamonNote = document.getElementById("jamon-note");

if (buyBtn && jamonNote) {
  buyBtn.addEventListener("click", () => {
    jamonNote.textContent =
      "Aquí podrías redirigir al e-commerce, link de pago o WhatsApp directo.";
  });
}

// Botón "Reservar" → link de pago directo (no se abre en otra pestaña)
// No hace falta JS aquí: el <a href="https://mpago.la/2djJanG"> ya maneja el flujo.
// Si quisieras controlar algo extra antes de ir al pago, podríamos hacerlo aquí.
