/**
 * IMPACTO DIGITAL — Scripts Oficiais de Conversão & UX
 * Padrão Severino & Ricardo (Inspirado no Modelo RGB)
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initWhatsAppWidget();
  initFaqAccordion();
  initContactForm();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* ==========================================================================
   2. BOTÃO INTELIGENTE DE WHATSAPP COM STATUS EM TEMPO REAL
   ========================================================================== */
function initWhatsAppWidget() {
  const config = {
    numero: "5511999999999", // Número comercial oficial
    diasSemana: [1, 2, 3, 4, 5], // Segunda a Sexta
    horaAbertura: 8.0, // 08:00
    horaFechamento: 18.0, // 18:00
    sabadoAbre: true,
    sabadoFechamento: 12.0 // 12:00
  };

  const agora = new Date();
  const diaSemana = agora.getDay();
  const horaDecimal = agora.getHours() + (agora.getMinutes() / 60);

  let isOnline = false;

  if (config.diasSemana.includes(diaSemana) && horaDecimal >= config.horaAbertura && horaDecimal < config.horaFechamento) {
    isOnline = true;
  } else if (config.sabadoAbre && diaSemana === 6 && horaDecimal >= config.horaAbertura && horaDecimal < config.sabadoFechamento) {
    isOnline = true;
  }

  const linkEl = document.getElementById("wa-link");
  const dotEl = document.getElementById("wa-status-dot");
  const textEl = document.getElementById("wa-status-text");

  if (!linkEl || !dotEl || !textEl) return;

  if (isOnline) {
    dotEl.className = "wa-status-dot online";
    textEl.textContent = "Online Agora";
    const msg = encodeURIComponent("Olá! Estou no site da Impacto Digital e gostaria de solicitar um diagnóstico estratégico para minha empresa.");
    linkEl.href = `https://wa.me/${config.numero}?text=${msg}`;
  } else {
    linkEl.classList.add("offline-mode");
    dotEl.className = "wa-status-dot offline";
    textEl.textContent = "Deixe sua Mensagem";
    const msg = encodeURIComponent("Olá! Acessei o site da Impacto Digital fora do expediente e gostaria de agendar uma reunião comercial.");
    linkEl.href = `https://wa.me/${config.numero}?text=${msg}`;
  }
}

/* ==========================================================================
   3. FAQ ACCORDION INTERATIVO
   ========================================================================== */
function initFaqAccordion() {
  const toggles = document.querySelectorAll(".faq-toggle");

  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const box = btn.parentElement;
      const content = box.querySelector(".faq-content");
      const isActive = box.classList.contains("active");

      document.querySelectorAll(".faq-box").forEach(b => {
        b.classList.remove("active");
        const c = b.querySelector(".faq-content");
        if (c) c.style.maxHeight = null;
      });

      if (!isActive) {
        box.classList.add("active");
        content.style.maxHeight = content.scrollHeight + 30 + "px";
      }
    });
  });
}

/* ==========================================================================
   4. FORMULÁRIO DE PROPOSTA RÁPIDA (ENCAMINHA PARA WHATSAPP)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("lead-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("form-nome").value.trim();
    const empresa = document.getElementById("form-empresa").value.trim();
    const servico = document.getElementById("form-servico").value;
    const whats = document.getElementById("form-whats").value.trim();

    const mensagem = `*Solicitação de Diagnóstico — Impacto Digital*\n\n` +
      `*Nome:* ${nome}\n` +
      `*Empresa:* ${empresa}\n` +
      `*Interesse:* ${servico}\n` +
      `*WhatsApp:* ${whats}`;

    const urlWa = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWa, "_blank");
  });
}
