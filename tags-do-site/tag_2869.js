<script>
/* F5 volta pro topo.
   O servidor manda a home quase vazia e banners e prateleiras chegam uns 2 segundos depois.
   O navegador tentava devolver a rolagem antiga nessa pagina curta, caia no rodape e ficava preso la.
   O tema liga essa devolucao na saida da pagina; esta tag desliga logo depois dele.
   REGRA DO INJETOR: nenhum sinal de menor-que e comentario so neste formato. */
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
</script>
