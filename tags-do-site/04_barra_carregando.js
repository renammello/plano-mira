/* BARRA DE CARREGAMENTO   22/09/2026
   Medido no site: um clique interno leva de 3,8 a 5,9 segundos ate a URL
   mudar, e nesse tempo NADA acontece na tela. O Nuxt tem uma barra nativa
   e ela nao esta no ar (o .nuxt-progress nao existe na pagina). Resultado:
   a cliente clica, o site parece morto, ela clica de novo ou desiste.

   Isso nao conserta a lentidao, que e do servidor da Convertr. Conserta a
   sensacao de site quebrado, que e o que faz desistir.

   ATENCAO: este arquivo NAO PODE TER o sinal de menor-que em lugar nenhum.
   O injetor de JS da Convertr corta o codigo no primeiro que encontrar.
   Por isso toda comparacao aqui esta escrita ao contrario, com maior-que.

   Onde colar: tag de JS, posicao fim do body.
   O CSS da barra vive no 00_tag_geral.css, procure por mv-carregando. */

(function () {
  if (window.__mvBarra) { return; }
  window.__mvBarra = 1;

  var barra = document.createElement("div");
  barra.id = "mv-carregando";

  function plantar() {
    if (document.body) { document.body.appendChild(barra); }
  }
  if (document.body) { plantar(); }
  else { document.addEventListener("DOMContentLoaded", plantar); }

  var relogio = null;
  var quanto = 0;
  var urlAoClicar = "";

  function ondeEstou() {
    return location.pathname + location.search;
  }

  function andar() {
    /* corre depressa no comeco e vai freando, pra nunca chegar no fim
       sozinha: quem fecha a barra e a pagina que trocou */
    quanto = quanto + (92 - quanto) * 0.12;
    barra.style.width = quanto.toFixed(1) + "%";
  }

  function fechar() {
    if (relogio) { clearInterval(relogio); relogio = null; }
    barra.style.width = "100%";
    setTimeout(function () {
      barra.className = "";
      setTimeout(function () { barra.style.width = "0%"; }, 320);
    }, 170);
  }

  function abrir() {
    if (relogio) { return; }
    urlAoClicar = ondeEstou();
    quanto = 8;
    barra.className = "on";
    barra.style.width = "8%";
    relogio = setInterval(function () {
      andar();
      if (ondeEstou() !== urlAoClicar) { fechar(); }
    }, 110);
    /* rede de seguranca: se em 20s nada aconteceu, some sozinha */
    setTimeout(function () { if (relogio) { fechar(); } }, 20000);
  }

  document.addEventListener("click", function (ev) {
    var alvo = ev.target;
    var link = null;
    while (alvo) {
      if (alvo.tagName === "A" && alvo.getAttribute("href")) { link = alvo; break; }
      alvo = alvo.parentElement;
    }
    if (!link) { return; }
    if (ev.defaultPrevented) { return; }
    if (ev.button > 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey) { return; }
    if (link.getAttribute("target") === "_blank") { return; }

    var destino = link.getAttribute("href");
    if (destino.charAt(0) !== "/") { return; }
    if (destino.charAt(1) === "/") { return; }
    if (destino === ondeEstou()) { return; }

    abrir();
  }, true);

  /* volta e avanca do navegador tambem trocam pagina */
  window.addEventListener("popstate", function () {
    if (relogio) { fechar(); }
  });
})();
