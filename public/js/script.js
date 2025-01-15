// Establecer la fecha de destino (puedes ajustarla según tus necesidades)
const fechaDestino = new Date("2025-02-21T23:59:59");

function actualizarContador() {
  const ahora = new Date();
  const diferencia = fechaDestino - ahora;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;
}

// Actualizar cada segundo
setInterval(actualizarContador, 1000);

// Actualizar al cargar la página
actualizarContador();

document.addEventListener("DOMContentLoaded", function () {
  const envelopeContainer = document.getElementById("envelope-container");
  const envelope = document.getElementById("envelope");
  const content = document.getElementById("content");

  const isEnvelopeOpened = localStorage.getItem("envelopeOpened");

  if (isEnvelopeOpened) {
    envelopeContainer.style.display = "none";
    content.style.display = "block";
  } else {
    envelopeContainer.style.display = "flex";

    envelope.addEventListener("click", function () {
      envelope.classList.add("open-envelope");

      setTimeout(() => {
        envelopeContainer.style.display = "none";
        content.style.display = "block";
        content.classList.add("show-content");
        localStorage.setItem("envelopeOpened", "true");
      }, 1500);
    });
  }
});

// Obtener referencias
const timeline = document.getElementById("timeline");
const lineBack = document.getElementById("line-back");
const lineProgress = document.getElementById("line-progress");
const steps = document.querySelectorAll(".step");
const circles = document.querySelectorAll(".circle");
const infos = document.querySelectorAll(".info");

// Escuchamos evento scroll
window.addEventListener("scroll", trackScroll);

function trackScroll() {
  const timelineRect = timeline.getBoundingClientRect();
  const scrollTop = window.scrollY || window.pageYOffset;
  const timelineStart = scrollTop + timelineRect.top;
  const timelineEnd = timelineStart + timelineRect.height;
  const distance = scrollTop + window.innerHeight / 2 - timelineStart;
  const total = timelineEnd - timelineStart;

  // Progreso (de 0 a 1) de la línea de relleno
  let progress = distance / total;
  // Limitamos entre 0 y 1 para no pasarnos
  if (progress < 0) progress = 0;
  if (progress > 1) progress = 1;

  // Ajustamos la altura de la línea de progreso
  const lineHeight = lineBack.offsetHeight; // altura total del line-back
  lineProgress.style.height = progress * lineHeight + "px";

  // Ahora, activamos o desactivamos cada círculo si el relleno ya "llega"
  // a la posición de ese círculo
  steps.forEach((step, index) => {
    const circleTop = step.getBoundingClientRect().top + scrollTop;
    // la mitad de la ventana:
    const triggerLine = scrollTop + window.innerHeight / 2;

    // Si la "línea de relleno" (triggerLine) está por debajo de la posición del círculo,
    // entonces lo marcamos como activo
    if (triggerLine >= circleTop) {
      circles[index].classList.add("active");
      infos[index].classList.add("active");
    } else {
      circles[index].classList.remove("active");
      infos[index].classList.remove("active");
    }
  });
}
