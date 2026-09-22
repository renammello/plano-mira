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
  window.addEventListener("popstate", function () {
    if (relogio) { fechar(); }
  });
})();
