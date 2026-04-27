(function() {

  function iniciarLivePix() {
    const iframe = document.createElement("iframe");
    iframe.id = "livepix-alert";
    iframe.src = "https://widget.livepix.gg/embed/47e1400a-fddf-43b3-ac88-ba0a902b814a?alerts=true";
    iframe.allow = "autoplay; fullscreen";

    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.zIndex = "999999";
    iframe.style.pointerEvents = "none";

    document.body.appendChild(iframe);

    // liberar som após interação (OBRIGATÓRIO mobile)
    function liberarAudio() {
      iframe.src = iframe.src;
      document.removeEventListener("touchstart", liberarAudio);
      document.removeEventListener("click", liberarAudio);
    }

    document.addEventListener("touchstart", liberarAudio, { passive:true });
    document.addEventListener("click", liberarAudio, { passive:true });
  }

  // Espera o site terminar de carregar (importante no mobile)
  if (document.readyState === "complete") {
    setTimeout(iniciarLivePix, 2000);
  } else {
    window.addEventListener("load", () => setTimeout(iniciarLivePix, 2000));
  }

})();