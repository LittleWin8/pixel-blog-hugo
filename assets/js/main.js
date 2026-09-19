(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_KEY = "theme";

  function currentTheme() {
    return root.classList.contains("theme-dark") ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add("theme-" + theme);
    root.style.colorScheme = theme;
    var meta = document.querySelector("meta[data-theme-color]");
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#1a1c2c" : "#f4f4f8");
    }
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    });
  }

  document.addEventListener("click", function (event) {
    var toggle = event.target.closest("[data-theme-toggle]");
    if (toggle) {
      var next = currentTheme() === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (err) {
        /* storage unavailable */
      }
      applyTheme(next);
      return;
    }

    var menu = event.target.closest("[data-menu-toggle]");
    if (menu) {
      var nav = document.getElementById("site-nav");
      if (nav) {
        var open = nav.classList.toggle("is-open");
        menu.setAttribute("aria-expanded", open ? "true" : "false");
      }
    }
  });

  // Code copy buttons
  document.querySelectorAll(".post-content pre").forEach(function (pre) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy";
    button.textContent = "复制";
    button.setAttribute("aria-label", "复制代码");

    button.addEventListener("click", function () {
      var code = pre.querySelector("code");
      var text = code ? code.innerText : pre.innerText;
      var done = function () {
        button.textContent = "已复制";
        setTimeout(function () { button.textContent = "复制"; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var area = document.createElement("textarea");
        area.value = text;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        try { document.execCommand("copy"); done(); } catch (err) { /* ignore */ }
        document.body.removeChild(area);
      }
    });

    pre.appendChild(button);
  });

  var backToTop = document.querySelector("[data-back-to-top]");
  if (backToTop) {
    var onScroll = function () {
      backToTop.classList.toggle("is-visible", window.scrollY > 420);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
