/**
 * IMPACTO DIGITAL — Scripts Oficiais de Conversão & UX
 * Padrão Severino & Ricardo
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initWhatsAppWidget();
  initFaqAccordion();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
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
    // Número oficial para conversão (exemplo internacional Brasil)
    numero: "5511999999999", 
    diasSemana: [1, 2, 3, 4, 5], // Segunda a Sexta
    horaAbertura: 8.5, // 08:30
    horaFechamento: 18.5, // 18:30
    sabadoAbre: true,
    sabadoFechamento: 13.0 // 13:00
  };

  const agora = new Date();
  const diaSemana = agora.getDay(); // 0 = Domingo, 1 = Segunda ... 6 = Sábado
  const horaDecimal = agora.getHours() + (agora.getMinutes() / 60);

  let isOnline = false;

  // Verificação de horário de expediente
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
    const msg = encodeURIComponent("Olá! Vim pelo site da Impacto Digital e gostaria de um diagnóstico gratuito para meu negócio.");
    linkEl.href = `https://wa.me/${config.numero}?text=${msg}`;
  } else {
    linkEl.classList.add("offline-mode");
    dotEl.className = "wa-status-dot offline";
    textEl.textContent = "Deixe sua Mensagem";
    const msg = encodeURIComponent("Olá! Acessei o site da Impacto Digital fora do horário de atendimento e gostaria de solicitar um contato.");
    linkEl.href = `https://wa.me/${config.numero}?text=${msg}`;
  }
}

/* ==========================================================================
   3. FAQ ACCORDION (INTERATIVO)
   ========================================================================== */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const answer = item.querySelector(".faq-answer");
      const isOpen = item.classList.contains("active");

      // Fecha todos os outros itens
      document.querySelectorAll(".faq-item").forEach(other => {
        other.classList.remove("active");
        const otherAnswer = other.querySelector(".faq-answer");
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // Abre ou fecha o atual
      if (!isOpen) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + 30 + "px";
      }
    });
  });
}
