(function () {

  function criarLivePix() {
    const iframe = document.createElement("iframe");
    iframe.id = "livepix-alert";
    iframe.src = "https://widget.livepix.gg/embed/47e1400a-fddf-43b3-ac88-ba0a902b814a?alerts=true";
    iframe.allow = "autoplay; fullscreen";
    iframe.style.border = "none";
    iframe.style.zIndex = "999999";
    iframe.style.pointerEvents = "none";

    // Detecta celular
    const mobile = window.innerWidth < 768;

    if (mobile) {
      // 📱 MODO CELULAR (barra inferior)
      iframe.style.position = "fixed";
      iframe.style.left = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "100%";
      iframe.style.height = "120px";
    } else {
      // 💻 MODO PC (tela cheia)
      iframe.style.position = "fixed";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
    }

    document.body.appendChild(iframe);

    // liberar áudio após interação (necessário)
    function liberarAudio() {
      iframe.src = iframe.src;
      document.removeEventListener("click", liberarAudio);
      document.removeEventListener("touchstart", liberarAudio);
    }

    document.addEventListener("click", liberarAudio, { passive:true });
    document.addEventListener("touchstart", liberarAudio, { passive:true });
  }

  // carrega depois que o site terminar
  window.addEventListener("load", () => setTimeout(criarLivePix, 2000));

})();