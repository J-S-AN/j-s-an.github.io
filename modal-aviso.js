/* =========================================================
   JSY ANIME — SISTEMA DE AVISOS
   Fecha o aviso por 1 hora
   ========================================================= */

(function () {

    const agora = new Date();

    const modais = document.querySelectorAll(
        '.jsy-modal-overlay[data-start][data-end]'
    );

    // Tempo que o aviso ficará escondido após fechar
    const TEMPO_SUPRIMIDO = 60 * 60 * 1000; // 1 hora


    modais.forEach(function (modal) {

        const inicioTexto = modal.dataset.start;
        const fimTexto = modal.dataset.end;
        const chave = modal.dataset.key;
        const ativo = modal.dataset.ativo !== 'false';


        // Aviso desativado
        if (!ativo) {
            return;
        }


        // Configuração incompleta
        if (!inicioTexto || !fimTexto || !chave) {
            return;
        }


        const inicio = new Date(inicioTexto);
        const fim = new Date(fimTexto);


        // Data inválida
        if (
            isNaN(inicio.getTime()) ||
            isNaN(fim.getTime())
        ) {
            console.warn(
                'JSY ANIME: data inválida no aviso:',
                chave
            );

            return;
        }


        // Verifica se o aviso está dentro do período
        const dentroDoPeriodo =
            agora >= inicio &&
            agora <= fim;


        if (!dentroDoPeriodo) {
            return;
        }


        // =================================================
        // VERIFICA SE FOI FECHADO NAS ÚLTIMAS 1 HORA
        // =================================================

        const ultimaOcultacao =
            localStorage.getItem(chave);


        if (ultimaOcultacao) {

            const tempoPassado =
                agora.getTime() -
                parseInt(ultimaOcultacao, 10);


            if (tempoPassado < TEMPO_SUPRIMIDO) {
                return;
            }

        }


        // =================================================
        // MOSTRA O AVISO
        // =================================================

        setTimeout(function () {

            modal.classList.add('active');

        }, 500);


        // =================================================
        // FUNÇÃO PARA FECHAR POR 1 HORA
        // =================================================

        function fecharPorUmaHora() {

            localStorage.setItem(
                chave,
                Date.now().toString()
            );

            modal.classList.remove('active');

        }


        // =================================================
        // BOTÃO FECHAR
        // =================================================

        const closeBtn =
            modal.querySelector('.jsyCloseBtn');


        if (closeBtn) {

            closeBtn.addEventListener(
                'click',
                fecharPorUmaHora
            );

        }


        // =================================================
        // CLICAR FORA DO MODAL
        // =================================================

        modal.addEventListener(
            'click',
            function (e) {

                if (e.target === modal) {

                    fecharPorUmaHora();

                }

            }
        );


        // =================================================
        // ESC
        // =================================================

        document.addEventListener(
            'keydown',
            function (e) {

                if (e.key === 'Escape') {

                    if (
                        modal.classList.contains('active')
                    ) {

                        fecharPorUmaHora();

                    }

                }

            }
        );

    });

})();