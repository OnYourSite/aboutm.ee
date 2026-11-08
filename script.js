(function () {
  var root = document.documentElement;
  var store = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
                set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

  document.getElementById("theme").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next); store.set("aboutm-theme", next);
  });

  var nav = document.getElementById("nav"), menu = document.getElementById("menu");
  menu.addEventListener("click", function () {
    var open = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); } });

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: .12 });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add("in"); });

  // Active nav link
  var links = [].slice.call(nav.querySelectorAll("a"));
  var secs = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  window.addEventListener("scroll", function () {
    var y = window.scrollY + 140, idx = 0;
    secs.forEach(function (s, i) { if (s && s.offsetTop <= y) idx = i; });
    links.forEach(function (a, i) { a.classList.toggle("active", i === idx); });
  }, { passive: true });

  // Newsletter (Demo – noch ohne Backend)
  document.getElementById("news").addEventListener("submit", function (e) {
    e.preventDefault();
    var v = document.getElementById("email").value.trim(), m = document.getElementById("msg");
    m.textContent = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? "Danke! Du bist auf der Liste. ✨" : "Bitte gib eine gültige E-Mail-Adresse ein.";
  });
  document.getElementById("y").textContent = new Date().getFullYear();
})();
