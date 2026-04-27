(function () {

  function criarLivePix() {
    const iframe = document.createElement("iframe");
    iframe.id = "livepix-alert";
    iframe.src = "https://widget.livepix.gg/embed/47e1400a-fddf-43b3-ac88-ba0a902b814a?alerts=true";
    iframe.allow = "autoplay; fullscreen";
    iframe.style.border = "none";
    iframe.style.zIndex = "999999";
    iframe.style.pointerEvents = "none";

    const mobile = window.innerWidth < 768;

if (mobile) {
  // 📱 ALERTA CENTRAL RESPONSIVO REAL (funciona em qualquer celular)

  iframe.style.position = "fixed";
  iframe.style.top = "50%";
  iframe.style.left = "50%";
  iframe.style.transform = "translate(-50%, -50%)";

  // pega o menor lado da tela (truque profissional)
  const menorLado = Math.min(window.innerWidth, window.innerHeight);

  // largura baseada no tamanho real da tela
  const largura = menorLado * 0.92;   // ocupa 92% da tela
  const altura = largura * 0.75;      // proporção 4:3 (800x600)

  iframe.style.width = largura + "px";
  iframe.style.height = altura + "px";

  iframe.style.maxWidth = "500px";   // limite pra não ficar gigante
  iframe.style.borderRadius = "18px";
}
else {
  // 💻 PC fullscreen
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
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