// Studio CRM demo: tiny bits of behaviour so the pages feel alive. Nothing is saved.
(function () {
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add("on");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove("on"); }, 2600);
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-toast]");
    if (t) { e.preventDefault(); toast(t.getAttribute("data-toast") || "Demo only: nothing is saved."); return; }
    var m = e.target.closest("[data-menu]");
    if (m) { document.body.classList.toggle("menu"); return; }
    var row = e.target.closest("tr[data-href]");
    if (row && !e.target.closest("a,button")) { location.href = row.getAttribute("data-href"); return; }
    var seg = e.target.closest(".seg a");
    if (seg) {
      e.preventDefault();
      seg.parentNode.querySelectorAll("a").forEach(function (a) { a.classList.remove("on"); });
      seg.classList.add("on");
      var key = seg.getAttribute("data-k");
      if (key) document.querySelectorAll("[data-v]").forEach(function (el) { el.textContent = el.getAttribute("data-" + key) || el.textContent; });
      return;
    }
    var show = e.target.closest("[data-show]");
    if (show) {
      e.preventDefault();
      document.querySelectorAll("[data-panel]").forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== show.getAttribute("data-show"); });
      return;
    }
    var add = e.target.closest("[data-add-day]");
    if (add) {
      e.preventDefault();
      var wrap = document.getElementById("days");
      var first = wrap.querySelector("input");
      var n = first.cloneNode(); n.value = ""; n.required = false;
      wrap.appendChild(n);
    }
  });
  document.addEventListener("submit", function (e) {
    var f = e.target;
    e.preventDefault();
    if (f.hasAttribute("data-done")) {
      f.hidden = true;
      document.getElementById(f.getAttribute("data-done")).hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else toast("Demo only: nothing is saved.");
  });
})();
