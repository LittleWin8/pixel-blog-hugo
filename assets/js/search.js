(function () {
  "use strict";

  var root = document.querySelector("[data-search]");
  if (!root) return;

  var input = root.querySelector("input");
  var hint = root.querySelector("[data-search-hint]");
  var list = root.querySelector("[data-search-results]");
  var i18n = window.__SEARCH_I18N__ || { empty: "No results.", results: "%d results" };

  var index = [];
  var loaded = false;

  function load() {
    if (loaded) return Promise.resolve(index);
    return fetch(window.__SEARCH_INDEX__)
      .then(function (res) { return res.json(); })
      .then(function (data) { index = data; loaded = true; return index; })
      .catch(function () { loaded = true; return index; });
  }

  function render(items) {
    list.innerHTML = "";
    items.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.className = "search__item pixel-panel";
      a.href = item.permalink;

      var top = document.createElement("span");
      top.className = "search__item-top";

      var title = document.createElement("span");
      title.className = "search__item-title";
      title.textContent = item.title;
      top.appendChild(title);

      var label = (i18n.sections || {})[item.section];
      if (label) {
        var badge = document.createElement("span");
        badge.className = "search__item-type";
        badge.textContent = label;
        top.appendChild(badge);
      }

      var desc = document.createElement("span");
      desc.className = "search__item-desc";
      desc.textContent = item.summary || "";

      a.appendChild(top);
      a.appendChild(desc);
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function search(query) {
    query = (query || "").trim().toLowerCase();
    if (!query) {
      hint.textContent = "";
      render([]);
      return;
    }
    var terms = query.split(/\s+/);
    var results = index.filter(function (item) {
      var haystack = [
        item.title,
        (item.tags || []).join(" "),
        item.summary,
        item.content
      ].join(" ").toLowerCase();
      return terms.every(function (term) { return haystack.indexOf(term) !== -1; });
    });
    hint.textContent = results.length
      ? i18n.results.replace("%d", results.length)
      : i18n.empty;
    render(results.slice(0, 30));
  }

  input.addEventListener("input", function () {
    var value = input.value;
    load().then(function () { search(value); });
  });

  var initial = new URLSearchParams(location.search).get("q");
  if (initial) {
    input.value = initial;
    load().then(function () { search(initial); });
  }
})();
