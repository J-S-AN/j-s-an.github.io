from pathlib import Path
import re

src = Path("/mnt/data/Código colado(3).html")
out = Path("/mnt/data/Pedido_Anime_Final_Status.html")
html = src.read_text(encoding="utf-8")

# Remove o status automático "PROCESSANDO" aplicado a todos os cards.
old_auto = r'''
        /* CARDS - status visual */
        .anime-card {
            position: relative;
        }

        .anime-card::before {
            content: "PROCESSANDO";
            position: absolute;
            top: 12px;
            right: 12px;
            padding: 3px 7px;
            border-radius: 999px;
            background: #332d16;
            color: #ffd700;
            border: 1px solid #665a20;
            font-size: 0.62rem;
            font-weight: bold;
        }

        .anime-card h5 {
            padding-right: 90px;
        }
'''
new_status_css = r'''
        /* STATUS DOS ANIMES */
        .anime-card {
            position: relative;
        }

        .anime-status {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 5px 10px;
            margin-bottom: 12px;
            border-radius: 20px;
            font-size: 0.72rem;
            font-weight: bold;
            line-height: 1;
        }

        .anime-status.processando {
            background: rgba(255, 215, 0, 0.12);
            color: #ffd700;
            border: 1px solid #ffd700;
        }

        .anime-status.adicionado {
            background: rgba(0, 255, 136, 0.12);
            color: #00ff88;
            border: 1px solid #00ff88;
        }

        .anime-status.breve {
            background: rgba(79, 195, 255, 0.12);
            color: #4fc3ff;
            border: 1px solid #4fc3ff;
        }

        .anime-link {
            color: #ffd700;
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .anime-link:hover {
            color: #fff;
            text-decoration: underline;
        }

        .anime-card.status-adicionado {
            border-top: 3px solid #00ff88;
        }

        .anime-card.status-processando {
            border-top: 3px solid #ffd700;
        }

        .anime-card.status-breve {
            border-top: 3px solid #4fc3ff;
        }

        .legenda-status {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
            margin: 0 0 25px;
        }

        .legenda-status span {
            padding: 5px 9px;
            border-radius: 20px;
            background: #222;
            border: 1px solid #383838;
            color: #bbb;
            font-size: 0.72rem;
            font-weight: bold;
        }
'''
if old_auto not in html:
    raise RuntimeError("Bloco de status automático não encontrado.")
html = html.replace(old_auto, new_status_css, 1)

# Reorganiza somente a área de processamento em 3 seções:
# Adicionados recentemente, Em processamento e Próximos projetos.
start = html.index('    <div class="container" id="Anime">')
end_marker = '''        <div>
            <!-- Exemplo de inclusão do rodapé com JavaScript -->'''
end = html.index(end_marker, start)

new_area = r'''    <div class="container" id="Anime">
        <div class="regras">
            <h3 class="processamento-titulo">📺 Status dos Animes</h3>

            <p class="processamento-aviso">
                Acompanhe aqui o andamento dos animes do JSY ANIME.<br>
                <strong>Ambos</strong> significa <strong>Legendado + Dublado</strong>.
            </p>

            <div class="legenda-status">
                <span>🟢 Adicionado</span>
                <span>🟡 Processando</span>
                <span>🔵 Em breve</span>
            </div>

            <!-- ADICIONADOS RECENTEMENTE -->
            <div class="processamento-secao">
                <h4>🚀 Adicionados recentemente</h4>

                <div class="anime-cards">
                    <!-- Exemplo:
                    <div class="anime-card status-adicionado">
                        <div class="anime-status adicionado">🟢 Adicionado</div>
                        <h5><a href="Wakfu.html" class="anime-link">WAKFU</a></h5>
                        <ul class="anime-itens">
                            <li>
                                <span>WAKFU 3</span>
                                <span class="badge-tipo badge-legendado">Legendado</span>
                            </li>
                        </ul>
                    </div>
                    -->

                    <div class="anime-card status-adicionado">
                        <div class="anime-status adicionado">🟢 Adicionado</div>
                        <h5>
                            <a href="Wakfu.html" class="anime-link">WAKFU</a>
                        </h5>
                        <ul class="anime-itens">
                            <li>
                                <span>WAKFU 3</span>
                                <span class="badge-tipo badge-legendado">Legendado</span>
                            </li>
                            <li>
                                <span>Wakfu OVA</span>
                                <span class="badge-tipo badge-legendado">Legendado</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- EM PROCESSAMENTO -->
            <div class="processamento-secao">
                <h4>🟡 Em processamento</h4>

                <div class="anime-cards">
                    <div class="anime-card status-processando">
                        <div class="anime-status processando">🟡 Processando</div>
                        <h5>Shingeki no Kyojin</h5>
                        <ul class="anime-itens">
                            <li>
                                <span>Chronicle</span>
                                <span class="badge-tipo badge-ambos">Ambos</span>
                            </li>
                        </ul>
                    </div>

                    <div class="anime-card status-processando">
                        <div class="anime-status processando">🟡 Processando</div>
                        <h5>Blood</h5>
                        <ul class="anime-itens">
                            <li>
                                <span>Blood-C: None-None Gekijou</span>
                                <span class="badge-tipo badge-legendado">Legendado</span>
                            </li>
                            <li>
                                <span>Blood: The Last Vampire</span>
                                <span class="badge-tipo badge-legendado">Legendado</span>
                            </li>
                            <li>
                                <span>Blood+</span>
                                <span class="badge-tipo badge-legendado">Legendado</span>
                            </li>
                        </ul>
                    </div>

                    <div class="anime-card status-processando">
                        <div class="anime-status processando">🟡 Processando</div>
                        <h5>Lupin III</h5>
                        <ul class="anime-itens">
                            <li>
                                <span>Lupin III: Part III</span>
                                <span class="badge-tipo badge-legendado">Legendado</span>
                            </li>
                            <li>
                                <span>Lupin III: Part IV</span>
                                <span class="badge-tipo badge-ambos">Ambos</span>
                            </li>
                            <li>
                                <span>Lupin III: Part V</span>
                                <span class="badge-tipo badge-ambos">Ambos</span>
                            </li>
                            <li>
                                <span>Lupin III: Part VI – Jidai</span>
                                <span class="badge-tipo badge-ambos">Ambos</span>
                            </li>
                            <li>
                                <span>Lupin III: Part VI</span>
                                <span class="badge-tipo badge-ambos">Ambos</span>
                            </li>
                            <li>
                                <span>Lupin III: Part IV – Specials</span>
                                <span class="badge-tipo badge-ambos">Ambos</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- PRÓXIMOS PROJETOS -->
            <div class="processamento-secao">
                <h4>📅 Próximos projetos</h4>

                <div class="anime-cards">
                    <div class="anime-card status-breve">
                        <div class="anime-status breve">🔵 Em breve</div>
                        <h5>JoJo no Kimyou na Bouken</h5>
                        <ul class="anime-itens">
                            <li>
                                <span>Anime</span>
                                <span class="badge-tipo badge-breve">Em breve</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

'''
html = html[:start] + new_area + html[end:]

out.write_text(html, encoding="utf-8")
print(f"Arquivo criado: {out}")
print("Atualizado com 3 seções e status individuais.")
print("O nome WAKFU está como exemplo de link clicável para Wakfu.html; os demais permanecem sem link até você definir as páginas.")
