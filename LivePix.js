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

  // 🔥 manter o LivePix vivo no celular (anti sleep / anti pause)
function manterAtivo() {
  const iframe = document.getElementById("livepix-alert");
  if (!iframe) return;

  // faz um "ping" invisível no iframe
  iframe.contentWindow?.postMessage("ping", "*");

  // micro refresh a cada 25s (mobile browsers pausam após ~30s)
  setTimeout(() => {
    iframe.src = iframe.src;
  }, 25000);
}

// roda sempre que a página estiver aberta
setInterval(manterAtivo, 20000);

// quando usuário volta pra aba
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) manterAtivo();
});

// =============================
// NOVOS WIDGETS TOPO (ESQ + DIR)
// =============================

function criarWidgetTopo(src, lado) {
  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.allow = "autoplay; fullscreen";
  iframe.style.position = "fixed";
  iframe.style.top = "10px";
  iframe.style.width = "320px";
  iframe.style.height = "120px";
  iframe.style.border = "none";
  iframe.style.zIndex = "999998";
  iframe.style.pointerEvents = "none";
  iframe.style.borderRadius = "14px";

  if (lado === "direita") {
    iframe.style.right = "10px";
  } else {
    iframe.style.left = "10px";
  }

  // mobile responsivo
  if (window.innerWidth < 768) {
    iframe.style.width = "45vw";
    iframe.style.height = "14vh";
  }

  document.body.appendChild(iframe);
}

window.addEventListener("load", () => {
  setTimeout(() => {

    // topo direita
    criarWidgetTopo(
      "https://widget.livepix.gg/embed/ba5ac8db-0f65-43ba-9d4f-e61cdfe51aa9",
      "direita"
    );

    // topo esquerda
    criarWidgetTopo(
      "https://widget.livepix.gg/embed/ec7dab89-48cf-4eba-928c-698938d777ed",
      "esquerda"
    );

  }, 2500);
});

})();