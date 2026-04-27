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
      // 📱 ALERTA CENTRAL MOBILE (popup)
      iframe.style.position = "fixed";
      iframe.style.top = "50%";
      iframe.style.left = "50%";
      iframe.style.transform = "translate(-50%, -50%)";
      iframe.style.width = "95vw";
      iframe.style.height = "160px";   // altura ideal do alerta
      iframe.style.maxWidth = "500px";
      iframe.style.borderRadius = "16px";
    } else {
      // 💻 PC continua fullscreen
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