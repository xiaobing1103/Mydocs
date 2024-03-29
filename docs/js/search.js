!(function () {
  var h = {},
    f = {
      EXPIRE_KEY: 'docsify.search.expires',
      INDEX_KEY: 'docsify.search.index',
    }
  function l(e) {
    var n = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return String(e).replace(/[&<>"']/g, function (e) {
      return n[e]
    })
  }
  function p(e) {
    return (
      e.text ||
        'table' !== e.type ||
        (e.cells.unshift(e.header),
        (e.text = e.cells
          .map(function (e) {
            return e.join(' | ')
          })
          .join(' |\n '))),
      e.text
    )
  }
  function u(r, e, i, o) {
    void 0 === e && (e = '')
    var s,
      n = window.marked.lexer(e),
      c = window.Docsify.slugify,
      d = {}
    return (
      n.forEach(function (e) {
        if ('heading' === e.type && e.depth <= o) {
          var n = (function (e) {
              void 0 === e && (e = '')
              var a = {}
              return {
                str: (e =
                  e &&
                  e
                    .replace(/^'/, '')
                    .replace(/'$/, '')
                    .replace(
                      /(?:^|\s):([\w-]+:?)=?([\w-%]+)?/g,
                      function (e, n, t) {
                        return -1 === n.indexOf(':')
                          ? ((a[n] = (t && t.replace(/&quot;/g, '')) || !0), '')
                          : e
                      }
                    )
                    .trim()),
                config: a,
              }
            })(e.text),
            t = n.str,
            a = n.config
          ;(s = a.id
            ? i.toURL(r, { id: c(a.id) })
            : i.toURL(r, { id: c(l(e.text)) })),
            (d[s] = { slug: s, title: t, body: '' })
        } else {
          if (!s) return
          d[s]
            ? d[s].body
              ? ((e.text = p(e)), (d[s].body += '\n' + (e.text || '')))
              : ((e.text = p(e)),
                (d[s].body = d[s].body ? d[s].body + e.text : e.text))
            : (d[s] = { slug: s, title: '', body: '' })
        }
      }),
      c.clear(),
      d
    )
  }
  function c(e) {
    var r = [],
      i = []
    Object.keys(h).forEach(function (n) {
      i = i.concat(
        Object.keys(h[n]).map(function (e) {
          return h[n][e]
        })
      )
    })
    var o = (e = e.trim()).split(/[\s\-，\\/]+/)
    1 !== o.length && (o = [].concat(e, o))
    function n(e) {
      var n = i[e],
        s = 0,
        c = '',
        d = n.title && n.title.trim(),
        p = n.body && n.body.trim(),
        t = n.slug || ''
      if (
        d &&
        (o.forEach(function (e) {
          var n,
            t = new RegExp(e.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'), 'gi'),
            a = -1
          if (
            ((n = d ? d.search(t) : -1),
            (a = p ? p.search(t) : -1),
            0 <= n || 0 <= a)
          ) {
            ;(s += 0 <= n ? 3 : 0 <= a ? 2 : 0), a < 0 && (a = 0)
            var r,
              i = 0
            ;(i = 0 == (r = a < 11 ? 0 : a - 10) ? 70 : a + e.length + 60),
              p && i > p.length && (i = p.length)
            var o =
              '...' +
              l(p)
                .substring(r, i)
                .replace(t, function (e) {
                  return '<em class="search-keyword">' + e + '</em>'
                }) +
              '...'
            c += o
          }
        }),
        0 < s)
      ) {
        var a = { title: l(d), content: p ? c : '', url: t, score: s }
        r.push(a)
      }
    }
    for (var t = 0; t < i.length; t++) n(t)
    return r.sort(function (e, n) {
      return n.score - e.score
    })
  }
  function i(t, a) {
    var e = 'auto' === t.paths,
      n = e
        ? (function (r) {
            var i = []
            return (
              Docsify.dom
                .findAll(
                  '.sidebar-nav a:not(.section-link):not([data-nosearch])'
                )
                .forEach(function (e) {
                  var n = e.href,
                    t = e.getAttribute('href'),
                    a = r.parse(n).path
                  a &&
                    -1 === i.indexOf(a) &&
                    !Docsify.util.isAbsolutePath(t) &&
                    i.push(a)
                }),
              i
            )
          })(a.router)
        : t.paths,
      r = ''
    if (e && t.pathNamespaces) {
      var i = n[0]
      if (Array.isArray(t.pathNamespaces))
        r =
          t.pathNamespaces.find(function (e) {
            return i.startsWith(e)
          }) || r
      else if (t.pathNamespaces instanceof RegExp) {
        var o = i.match(t.pathNamespaces)
        o && (r = o[0])
      }
    }
    var s =
        (function (e) {
          return e ? f.EXPIRE_KEY + '/' + e : f.EXPIRE_KEY
        })(t.namespace) + r,
      c =
        (function (e) {
          return e ? f.INDEX_KEY + '/' + e : f.INDEX_KEY
        })(t.namespace) + r,
      d = localStorage.getItem(s) < Date.now()
    if (((h = JSON.parse(localStorage.getItem(c))), d)) h = {}
    else if (!e) return
    var p = n.length,
      l = 0
    n.forEach(function (n) {
      if (h[n]) return l++
      Docsify.get(a.router.getFile(n), !1, a.config.requestHeaders).then(
        function (e) {
          ;(h[n] = u(n, e, a.router, t.depth)),
            p === ++l &&
              (function (e, n, t) {
                localStorage.setItem(n, Date.now() + e),
                  localStorage.setItem(t, JSON.stringify(h))
              })(t.maxAge, s, c)
        }
      )
    })
  }
  var d,
    m = ''
  function r(e) {
    var n = Docsify.dom.find('div.search'),
      t = Docsify.dom.find(n, '.results-panel'),
      a = Docsify.dom.find(n, '.clear-button'),
      r = Docsify.dom.find('.sidebar-nav'),
      i = Docsify.dom.find('.app-name')
    if (!e)
      return (
        t.classList.remove('show'),
        a.classList.remove('show'),
        (t.innerHTML = ''),
        void (
          d.hideOtherSidebarContent &&
          (r.classList.remove('hide'), i.classList.remove('hide'))
        )
      )
    var o = c(e),
      s = ''
    o.forEach(function (e) {
      s +=
        '<div class="matching-post">\n<a href="' +
        e.url +
        '">\n<h2>' +
        e.title +
        '</h2>\n<p>' +
        e.content +
        '</p>\n</a>\n</div>'
    }),
      t.classList.add('show'),
      a.classList.add('show'),
      (t.innerHTML = s || '<p class="empty">' + m + '</p>'),
      d.hideOtherSidebarContent &&
        (r.classList.add('hide'), i.classList.add('hide'))
  }
  function a(e) {
    d = e
  }
  function o(e, n) {
    var t = n.router.parse().query.s
    a(e),
      Docsify.dom.style(
        '\n.sidebar {\n  padding-top: 0;\n}\n\n.search {\n  margin-bottom: 20px;\n  padding: 6px;\n  border-bottom: 1px solid #eee;\n}\n\n.search .input-wrap {\n  display: flex;\n  align-items: center;\n}\n\n.search .results-panel {\n  display: none;\n}\n\n.search .results-panel.show {\n  display: block;\n}\n\n.search input {\n  outline: none;\n  border: none;\n  width: 100%;\n  padding: 0 7px;\n  line-height: 36px;\n  font-size: 14px;\n  border: 1px solid transparent;\n}\n\n.search input:focus {\n  box-shadow: 0 0 5px var(--theme-color, #42b983);\n  border: 1px solid var(--theme-color, #42b983);\n}\n\n.search input::-webkit-search-decoration,\n.search input::-webkit-search-cancel-button,\n.search input {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n.search .clear-button {\n  cursor: pointer;\n  width: 36px;\n  text-align: right;\n  display: none;\n}\n\n.search .clear-button.show {\n  display: block;\n}\n\n.search .clear-button svg {\n  transform: scale(.5);\n}\n\n.search h2 {\n  font-size: 17px;\n  margin: 10px 0;\n}\n\n.search a {\n  text-decoration: none;\n  color: inherit;\n}\n\n.search .matching-post {\n  border-bottom: 1px solid #eee;\n}\n\n.search .matching-post:last-child {\n  border-bottom: 0;\n}\n\n.search p {\n  font-size: 14px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n\n.search p.empty {\n  text-align: center;\n}\n\n.app-name.hide, .sidebar-nav.hide {\n  display: none;\n}'
      ),
      (function (e) {
        void 0 === e && (e = '')
        var n =
            '<div class="input-wrap">\n      <input type="search" value="' +
            e +
            '" aria-label="Search text" />\n      <div class="clear-button">\n        <svg width="26" height="24">\n          <circle cx="12" cy="12" r="11" fill="#ccc" />\n          <path stroke="white" stroke-width="2" d="M8.25,8.25,15.75,15.75" />\n          <path stroke="white" stroke-width="2"d="M8.25,15.75,15.75,8.25" />\n        </svg>\n      </div>\n    </div>\n    <div class="results-panel"></div>\n    </div>',
          t = Docsify.dom.create('div', n),
          a = Docsify.dom.find('aside')
        Docsify.dom.toggleClass(t, 'search'), Docsify.dom.before(a, t)
      })(t),
      (function () {
        var e,
          n = Docsify.dom.find('div.search'),
          t = Docsify.dom.find(n, 'input'),
          a = Docsify.dom.find(n, '.input-wrap')
        Docsify.dom.on(n, 'click', function (e) {
          return (
            -1 === ['A', 'H2', 'P', 'EM'].indexOf(e.target.tagName) &&
            e.stopPropagation()
          )
        }),
          Docsify.dom.on(t, 'input', function (n) {
            clearTimeout(e),
              (e = setTimeout(function (e) {
                return r(n.target.value.trim())
              }, 100))
          }),
          Docsify.dom.on(a, 'click', function (e) {
            'INPUT' !== e.target.tagName && ((t.value = ''), r())
          })
      })(),
      t &&
        setTimeout(function (e) {
          return r(t)
        }, 500)
  }
  function s(e, n) {
    a(e),
      (function (e, n) {
        var t = Docsify.dom.getNode('.search input[type="search"]')
        if (t)
          if ('string' == typeof e) t.placeholder = e
          else {
            var a = Object.keys(e).filter(function (e) {
              return -1 < n.indexOf(e)
            })[0]
            t.placeholder = e[a]
          }
      })(e.placeholder, n.route.path),
      (function (e, n) {
        if ('string' == typeof e) m = e
        else {
          var t = Object.keys(e).filter(function (e) {
            return -1 < n.indexOf(e)
          })[0]
          m = e[t]
        }
      })(e.noData, n.route.path)
  }
  var g = {
    placeholder: 'Type to search',
    noData: 'No Results!',
    paths: 'auto',
    depth: 2,
    maxAge: 864e5,
    hideOtherSidebarContent: !1,
    namespace: void 0,
    pathNamespaces: void 0,
  }
  $docsify.plugins = [].concat(function (e, n) {
    var t = Docsify.util,
      a = n.config.search || g
    Array.isArray(a)
      ? (g.paths = a)
      : 'object' == typeof a &&
        ((g.paths = Array.isArray(a.paths) ? a.paths : 'auto'),
        (g.maxAge = t.isPrimitive(a.maxAge) ? a.maxAge : g.maxAge),
        (g.placeholder = a.placeholder || g.placeholder),
        (g.noData = a.noData || g.noData),
        (g.depth = a.depth || g.depth),
        (g.hideOtherSidebarContent =
          a.hideOtherSidebarContent || g.hideOtherSidebarContent),
        (g.namespace = a.namespace || g.namespace),
        (g.pathNamespaces = a.pathNamespaces || g.pathNamespaces))
    var r = 'auto' === g.paths
    e.mounted(function (e) {
      o(g, n), r || i(g, n)
    }),
      e.doneEach(function (e) {
        s(g, n), r && i(g, n)
      })
  }, $docsify.plugins)
})()
