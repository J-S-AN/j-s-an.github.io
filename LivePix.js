(function () {

  function getRealViewportHeight() {
    // altura REAL visível do celular (corrige bug do 100vh)
    if (window.visualViewport) {
      return window.visualViewport.height;
    }
    return window.innerHeight;
  }

  function getRealViewportWidth() {
    if (window.visualViewport) {
      return window.visualViewport.width;
    }
    return window.innerWidth;
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

    const mobile = window.innerWidth < 768;

    if (mobile) {

  const vw = window.visualViewport ? window.visualViewport.width  : window.innerWidth;
  const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;

  // tamanho real do widget LivePix
  const widgetWidth  = 800;
  const widgetHeight = 600;

  // calcula escala necessária pra caber na tela
  const scaleX = (vw * 0.95) / widgetWidth;
  const scaleY = (vh * 0.95) / widgetHeight;
  const scale  = Math.min(scaleX, scaleY);

  iframe.style.width  = widgetWidth + "px";
  iframe.style.height = widgetHeight + "px";

  iframe.style.transform =
    "translate(-50%, -50%) scale(" + scale + ")";

} else {
      // Desktop fullscreen
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
    }

    document.body.appendChild(iframe);

    function liberarAudio() {
      iframe.src = iframe.src;
      document.removeEventListener("click", liberarAudio);
      document.removeEventListener("touchstart", liberarAudio);
    }

    document.addEventListener("click", liberarAudio, { passive:true });
    document.addEventListener("touchstart", liberarAudio, { passive:true });
  }

  window.addEventListener("load", () => setTimeout(criarLivePix, 2000));

})();