(function () {

  function ajustarTamanho(iframe) {

    const mobile = window.innerWidth < 768;

    if (!mobile) {
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
      return;
    }

    // 🔥 usa altura REAL da tela (corrige barra do navegador)
    const vh = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight;

    const vw = window.visualViewport
      ? window.visualViewport.width
      : window.innerWidth;

    // proporção real do widget 800x600
    let largura = vw * 0.95;
    let altura = largura * (600 / 800);

    // limita pela altura real da tela
    if (altura > vh * 0.9) {
      altura = vh * 0.9;
      largura = altura * (800 / 600);
    }

    iframe.style.width = largura + "px";
    iframe.style.height = altura + "px";
  }

  function criarLivePix() {
    const iframe = document.createElement("iframe");
    iframe.id = "livepix-alert";
    iframe.src = "https://widget.livepix.gg/embed/47e1400a-fddf-43b3-ac88-ba0a902b814a?alerts=true";
    iframe.allow = "autoplay; fullscreen";
    iframe.style.border = "none";
    iframe.style.zIndex = "999999";
    iframe.style.pointerEvents = "none";
    iframe.style.position = "fixed";
    iframe.style.top = "50%";
    iframe.style.left = "50%";
    iframe.style.transform = "translate(-50%, -50%)";
    iframe.style.borderRadius = "18px";

    document.body.appendChild(iframe);

    // 🔥 calcula tamanho após carregar
    setTimeout(() => ajustarTamanho(iframe), 300);

    // 🔥 recalcula se girar tela ou barra sumir/aparecer
    window.addEventListener("resize", () => ajustarTamanho(iframe));
    window.addEventListener("orientationchange", () => ajustarTamanho(iframe));

    // liberar áudio
    function liberarAudio() {
      iframe.src = iframe.src;
      document.removeEventListener("click", liberarAudio);
      document.removeEventListener("touchstart", liberarAudio);
    }

    document.addEventListener("click", liberarAudio, { passive:true });
    document.addEventListener("touchstart", liberarAudio, { passive:true });
  }

  window.addEventListener("load", () => setTimeout(criarLivePix, 1500));

})();