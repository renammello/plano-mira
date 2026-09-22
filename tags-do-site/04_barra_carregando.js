<script>
/* Barra de carregamento no topo.
   Um clique interno leva de 3,8 a 5,9 segundos ate a URL mudar, e nesse tempo nada muda na tela.
   O Nuxt tem barra nativa e ela nao esta no ar; a cliente acha que nao clicou e clica de novo.
   A demora e do servidor da Convertr e continua; esta tag so avisa que esta vindo.
   REGRA DO INJETOR: nenhum sinal de menor-que e comentario so neste formato.
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
