document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("myAudio");
  
  // Habilitar el audio solo con interacción del usuario
  document.addEventListener("click", function enableAudio() {
    audio.play().catch((error) => {
      console.log(
        "Reproducción automática bloqueada. Esperando interacción del usuario."
      );
      console.log(error);
    });
    document.removeEventListener("click", enableAudio);
  });

  // Control de reproducción y pausa con botón
  const playPauseBtn = document.getElementById("playPauseBtn");
  playPauseBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      playPauseBtn.classList.remove("pause");
      playPauseBtn.classList.add("play");
    } else {
      audio.pause();
      playPauseBtn.classList.remove("play");
      playPauseBtn.classList.add("pause");
    }
  });

  // Pausar el audio cuando se cambia de pestaña o se minimiza
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      audio.pause();
      playPauseBtn.classList.remove("play");
      playPauseBtn.classList.add("pause");
    }
  });
});