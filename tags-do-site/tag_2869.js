<script>
/* TAG 2869 DA CONVERTR. CONTEUDO INTEIRO DESTA TAG.
   Codigo novo entra AQUI DENTRO, no fim, dentro deste mesmo bloco script.
   Nunca como segundo bloco script: o segundo vira texto e derruba tudo.
   Regras do injetor: nenhum sinal de menor-que no codigo, comentario so
   neste formato, sem acento, e ele achata tudo numa linha ao salvar. */

/* 1. F5 volta pro topo.
   O servidor manda a home quase vazia e banners e prateleiras chegam uns 2 segundos depois.
   O navegador tentava devolver a rolagem antiga nessa pagina curta, caia no rodape e ficava preso la.
   O tema liga essa devolucao na saida da pagina; esta tag desliga logo depois dele. */
(function(){
  if (window.__mvRolagemTopo) return;
  window.__mvRolagemTopo = true;
  if (!('scrollRestoration' in history)) return;
  function manual(){ try { history.scrollRestoration = 'manual'; } catch (e) {} }
  function ligar(){
    window.addEventListener('beforeunload', manual);
    window.addEventListener('pagehide', manual);
  }
  if (document.readyState === 'complete') ligar();
  else window.addEventListener('load', ligar);
})();

/* 2. Barra de carregamento comeca na hora do clique.
   A barra e a NATIVA do Nuxt, o .nuxt-progress, que sempre existiu. O tema
   segura ela uns 300ms antes de mostrar, pra nao piscar em navegacao rapida.
   So que aqui a navegacao leva 4 segundos, entao essa espera so faz o clique
   parecer morto. Chamando o start do proprio tema, ela aparece em 26ms.
   Quem fecha continua sendo o Nuxt, quando a pagina termina de trocar.
   A espessura e a cor dela ficam na tag de CSS, procure por nuxt-progress. */
(function(){
  if (window.__mvBarraJa) return;
  window.__mvBarraJa = true;
  function acharLink(alvo){
    while (alvo) {
      if (alvo.tagName === 'A' && alvo.getAttribute('href')) return alvo;
      alvo = alvo.parentElement;
    }
    return null;
  }
  document.addEventListener('click', function(ev){
    var link = acharLink(ev.target);
    if (!link) return;
    if (ev.defaultPrevented) return;
    if (ev.button > 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
    if (link.getAttribute('target') === '_blank') return;
    var destino = link.getAttribute('href');
    if (destino.charAt(0) !== '/') return;
    if (destino.charAt(1) === '/') return;
    if (destino === location.pathname + location.search) return;
    try {
      if (window.$nuxt && window.$nuxt.$loading && window.$nuxt.$loading.start) {
        window.$nuxt.$loading.start();
      }
    } catch (e) {}
  }, true);
})();
</script>
