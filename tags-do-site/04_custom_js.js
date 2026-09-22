<script>
/* CUSTOM JS DA MIRA VEST. BLOCO UNICO.
   REGRA QUE NAO SE QUEBRA: a Convertr executa UM bloco script so nesta tag.
   Um segundo bloco vira texto, quebra a sintaxe e derruba TUDO, inclusive o
   que ja estava funcionando. Codigo novo entra DENTRO deste bloco, no fim,
   nunca como script separado e nunca como tag nova.
   Outras regras do injetor: nenhum sinal de menor-que no codigo, comentario
   so neste formato, e ele achata tudo numa linha ao salvar. */

/* 1. F5 volta pro topo.
   O servidor manda a home quase vazia e banners e prateleiras chegam uns 2 segundos depois.
   O navegador tentava devolver a rolagem antiga nessa pagina curta, caia no rodape e ficava preso la.
   O tema liga essa devolucao na saida da pagina; isto desliga logo depois dele. */
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

/* 2. Barra de carregamento no topo.
   Um clique interno leva de 3,8 a 5,9 segundos ate a URL mudar e nada muda na tela.
   O Nuxt tem barra nativa e ela nao esta no ar; a cliente acha que nao clicou.
   A demora e do servidor da Convertr e continua; isto so avisa que esta vindo.
   O CSS desta barra vive na tag de CSS, procure por mv-carregando. */
(function(){
  if (window.__mvBarra) return;
  window.__mvBarra = true;
  var barra = document.createElement('div');
  barra.id = 'mv-carregando';
  function plantar(){ if (document.body) document.body.appendChild(barra); }
  if (document.body) plantar();
  else document.addEventListener('DOMContentLoaded', plantar);
  var relogio = null;
  var quanto = 0;
  var urlAoClicar = '';
  function ondeEstou(){ return location.pathname + location.search; }
  function fechar(){
    if (relogio) { clearInterval(relogio); relogio = null; }
    barra.style.width = '100%';
    setTimeout(function(){
      barra.className = '';
      setTimeout(function(){ barra.style.width = '0%'; }, 320);
    }, 170);
  }
  function abrir(){
    if (relogio) return;
    urlAoClicar = ondeEstou();
    quanto = 8;
    barra.className = 'on';
    barra.style.width = '8%';
    relogio = setInterval(function(){
      quanto = quanto + (92 - quanto) * 0.12;
      barra.style.width = quanto.toFixed(1) + '%';
      if (ondeEstou() !== urlAoClicar) fechar();
    }, 110);
    setTimeout(function(){ if (relogio) fechar(); }, 20000);
  }
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
    if (destino === ondeEstou()) return;
    abrir();
  }, true);
  window.addEventListener('popstate', function(){ if (relogio) fechar(); });
})();
</script>
