window.addEventListener("load", function () {

            const iframe = document.createElement("iframe");
            iframe.id = "livepix-alert";
            iframe.src = "https://widget.livepix.gg/embed/47e1400a-fddf-43b3-ac88-ba0a902b814a?alerts=true";
            iframe.allow = "autoplay";
            iframe.style = `
        position:fixed;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        border:none;
        z-index:999999;
        pointer-events:none;
      `;
            document.body.appendChild(iframe);

            // libera som após primeiro clique
            document.addEventListener("click", () => iframe.src = iframe.src, { once: true });
            document.addEventListener("touchstart", () => iframe.src = iframe.src, { once: true });

        });