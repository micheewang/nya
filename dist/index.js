!(function (t) {
  var e = {};
  function n(r) {
    if (e[r]) return e[r].exports;
    var o = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (n.r = function (t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
        2 & e && 'string' != typeof t)
      )
        for (var o in t)
          n.d(
            r,
            o,
            function (e) {
              return t[e];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, 'a', e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ''),
    n((n.s = 0));
})([
  function (t, e, n) {
    'use strict';
    n.r(e);
    var r = function t(e, n, r) {
      !(function (t, e) {
        if (!(t instanceof e))
          throw new TypeError('Cannot call a class as a function');
      })(this, t),
        'string' == typeof n || o(n)
          ? ((r = [n]), (n = {}))
          : Array.isArray(n) && ((r = n), (n = {})),
        (n = n || {}),
        (r = r ? (Array.isArray(r) ? r : [r]) : []),
        (this.tagName = e),
        (this.ref = null),
        (this.mark = []),
        (this.attrs = n),
        (this.children = r);
    };
    function o(t) {
      return t instanceof r;
    }
    var u,
      i = Proxy
        ? new Proxy(
            {},
            {
              get: function (t, e) {
                return (
                  t.hasOwnProperty(e) ||
                    (t[e] = function (t, n) {
                      return new r(e, t, n);
                    }),
                  t[e]
                );
              },
            }
          )
        : ((u = {}),
          'html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,let,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot'
            .split(',')
            .forEach(function (t) {
              u[t.slice(0, 1).toUpperCase() + t.slice(1)] = function (e, n) {
                return new r(t, e, n);
              };
            }),
          u);
    var a,
      c,
      f = ['warn', 'error', 'info', 'log'].map(function (t) {
        return function () {
          var e;
          return (e = console)[t].apply(e, arguments);
        };
      }),
      l =
        ((c = 3),
        (function (t) {
          if (Array.isArray(t)) return t;
        })((a = f)) ||
          (function (t, e) {
            var n = [],
              r = !0,
              o = !1,
              u = void 0;
            try {
              for (
                var i, a = t[Symbol.iterator]();
                !(r = (i = a.next()).done) &&
                (n.push(i.value), !e || n.length !== e);
                r = !0
              );
            } catch (t) {
              (o = !0), (u = t);
            } finally {
              try {
                r || null == a.return || a.return();
              } finally {
                if (o) throw u;
              }
            }
            return n;
          })(a, c) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance'
            );
          })()),
      s = l[0];
    l[1], l[2];
    function p() {
      for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
        e[n] = arguments[n];
      return function () {
        for (
          var t = this, n = arguments.length, r = new Array(n), o = 0;
          o < n;
          o++
        )
          r[o] = arguments[o];
        e.forEach(function (e) {
          return e.call.apply(e, [t].concat(r));
        });
      };
    }
    function y() {}
    function d(t, e) {
      if (!h(t)) throw new TypeError(e || 'Parameter must be a function.');
    }
    function h(t) {
      return 'function' == typeof t;
    }
    function m(t) {
      return (m =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            })(t);
    }
    function v(t, e, n) {
      return (v = (function () {
        if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ('function' == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })()
        ? Reflect.construct
        : function (t, e, n) {
            var r = [null];
            r.push.apply(r, e);
            var o = new (Function.bind.apply(t, r))();
            return n && g(o, n.prototype), o;
          }).apply(null, arguments);
    }
    function b(t, e) {
      return !e || ('object' !== m(e) && 'function' != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function w(t) {
      return (w = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function g(t, e) {
      return (g =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    var S = (function (t) {
      function e(t, n, r, o) {
        var u;
        return (
          (function (t, e) {
            if (!(t instanceof e))
              throw new TypeError('Cannot call a class as a function');
          })(this, e),
          ((u = b(this, w(e).call(this, t, n, r))).const = o),
          (u.templet = null),
          (u.vNode = null),
          (u.parentNode = null),
          (u.getter = null),
          (u.mouted = null),
          (u.update = null),
          (u.unMouted = null),
          u
        );
      }
      return (
        (function (t, e) {
          if ('function' != typeof e && null !== e)
            throw new TypeError(
              'Super expression must either be null or a function'
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && g(t, e);
        })(e, r),
        e
      );
    })();
    function O(t) {
      return t instanceof S;
    }
    function A(t, e, n) {
      return (A = (function () {
        if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ('function' == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })()
        ? Reflect.construct
        : function (t, e, n) {
            var r = [null];
            r.push.apply(r, e);
            var o = new (Function.bind.apply(t, r))();
            return n && j(o, n.prototype), o;
          }).apply(null, arguments);
    }
    function j(t, e) {
      return (j =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    function P(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          'value' in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var _ = (function () {
      function t(e, n) {
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError('Cannot call a class as a function');
        })(this, t),
          d(e),
          (this.responder = e),
          (this.recipient = n || y),
          (this.wants = new Set());
      }
      var e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: 'emit',
            value: function () {
              this.wants.forEach(function (t) {
                return t();
              });
            },
          },
          {
            key: 'unbind',
            value: function (t) {
              this.wants.has(t) && this.wants.delete(t);
            },
          },
          {
            key: 'createTruck',
            value: function (t) {
              var e = this;
              d(t);
              var n = function () {
                for (
                  var n = arguments.length, r = new Array(n), o = 0;
                  o < n;
                  o++
                )
                  r[o] = arguments[o];
                e.responder.apply(
                  e,
                  [
                    function (e) {
                      t(e);
                    },
                  ].concat(r)
                );
              };
              return (
                this.wants.add(n),
                [
                  n,
                  function (t) {
                    return e.recipient(t);
                  },
                ]
              );
            },
          },
        ]) && P(e.prototype, n),
        r && P(e, r),
        t
      );
    })();
    function E(t) {
      return (E =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            })(t);
    }
    function x(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n = [],
            r = !0,
            o = !1,
            u = void 0;
          try {
            for (
              var i, a = t[Symbol.iterator]();
              !(r = (i = a.next()).done) &&
              (n.push(i.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (o = !0), (u = t);
          } finally {
            try {
              r || null == a.return || a.return();
            } finally {
              if (o) throw u;
            }
          }
          return n;
        })(t, e) ||
        (function () {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance'
          );
        })()
      );
    }
    var T = new Map();
    T.set(/[a-zA-Z]+/, {
      ref: function (t, e) {
        d(e, 'The ref parameter must be a function'), e(t.ref);
      },
      on: function (t, e) {
        var n = t.ref;
        for (var r in e) n.addEventListener(r, e[r]);
      },
      class: function (t, e) {
        var n = t.ref;
        if ('string' === E(e)) n.classList = e;
        else {
          var r = [];
          if (Array.isArray(e)) r = e;
          else for (var o in e) e[o] && r.push(o);
          n.classList = r.join(' ');
        }
      },
    });
    var C = (function (t) {
        var e = function e() {
          for (
            var n = e.cache, r = arguments.length, o = new Array(r), u = 0;
            u < r;
            u++
          )
            o[u] = arguments[u];
          var i = o.join(',');
          return (
            Object.hasOwnProperty.call(n, i) || (n[i] = t.apply(this, o)), n[i]
          );
        };
        return (e.cache = {}), e;
      })(function (t, e) {
        var n = !0,
          r = !1,
          o = void 0;
        try {
          for (
            var u, i = T.entries()[Symbol.iterator]();
            !(n = (u = i.next()).done);
            n = !0
          ) {
            var a = x(u.value, 2),
              c = a[0],
              f = a[1];
            if (c.test(t) && f[e]) return f[e];
          }
        } catch (t) {
          (r = !0), (o = t);
        } finally {
          try {
            n || null == i.return || i.return();
          } finally {
            if (r) throw o;
          }
        }
        return !1;
      }),
      M = function (t, e, n) {
        var r = t.tagName,
          o = C(r, e);
        return !!o && (o(t, n), !0);
      },
      k = { current: null };
    function N(t) {
      var e = k.current;
      if (!e) throw new Error(t || 'hooks must be called inside Component');
      return e;
    }
    var R = [];
    function D(t) {
      t.timestamp;
      var e = t.component,
        n = e.vNode,
        r = Z(e),
        o = F.call(r);
      (e.vNode = r),
        e.parentNode.replaceChild(o, e.ref),
        (e.ref = o),
        L(n, 'unMouted'),
        q(e, 'update'),
        L(r, 'mouted');
    }
    function L(t, e) {
      var n = null;
      O(t) ? ((n = [t.vNode]), h(t[e]) && t[e]()) : (n = t.children),
        n.forEach(function (t) {
          o(t) && L(t, e);
        });
    }
    function q(t, e) {
      O(t) && h(t[e]) && t[e]();
    }
    function F(t) {
      var e = this.tagName,
        n = this.attrs,
        r = this.children,
        u = (this.ref = document.createElement(e));
      for (var i in n) {
        var a = n[i];
        M(this, i, a) ||
          ('boolean' == typeof a
            ? (u[i] = a)
            : /on[A-Z][a-zA-Z]+/.test(i)
            ? (d(a), (u[i.toLowerCase()] = n[i]))
            : u.setAttribute(i, a));
      }
      var c = !0,
        f = !1,
        l = void 0;
      try {
        for (
          var s, p = r[Symbol.iterator]();
          !(c = (s = p.next()).done);
          c = !0
        ) {
          var y = s.value;
          if (('function' == typeof y && (y = y()), null != y && '' !== y))
            if (o(y)) O(y) ? U.call(y, u) : F.call(y, u);
            else {
              var h = document.createTextNode(String(y));
              u.appendChild(h);
            }
        }
      } catch (t) {
        (f = !0), (l = t);
      } finally {
        try {
          c || null == p.return || p.return();
        } finally {
          if (f) throw l;
        }
      }
      return t && t.appendChild(u), u;
    }
    function U(t) {
      if (((this.parentNode = t), null === this.templet)) {
        k.current = this;
        var e = { props: this.attrs, slot: this.children };
        d(
          (this.templet = this.const(e)),
          'Creating a component must return a function that returns the virtual node'
        ),
          (k.current = null);
      }
      var n = (this.vNode = Z(this));
      (this.ref = F.call(n, t)), q(this, 'mouted');
    }
    function Z(t) {
      if (t.templet) return t.getter ? t.templet(t.getter()) : t.templet();
    }
    var z = {
        useChapter: function (t) {
          var e = N(),
            n = t;
          function r() {
            return n;
          }
          return (
            e.getter &&
              s(
                'This component has registered the useChapter method, which will cause the previous method to be invalid.'
              ),
            (e.getter = r),
            [
              r,
              function (t) {
                var r;
                (n = t),
                  (r = e),
                  1 === R.push({ timestamp: +new Date(), component: r }) &&
                    requestAnimationFrame(function () {
                      for (; R.length; ) D(R.shift());
                    });
              },
            ]
          );
        },
        useMouted: function (t) {
          d(t);
          var e = N();
          e.mouted = e.mouted ? p(e.mouted, t) : t;
        },
        useUpdate: function (t) {
          d(t);
          var e = N();
          e.update = e.update ? p(e.update, t) : t;
        },
        useUnMouted: function (t) {
          d(t);
          var e = N();
          e.unMouted = e.unMouted ? p(e.unMouted, t) : t;
        },
      },
      I = Object.assign(
        {
          renderDOM: function (t, e) {
            if (O(t)) U.call(t, e);
            else {
              if (!o(t))
                throw new Error('The root element must mount the component.');
              F.call(t, e);
            }
          },
          createRef: function () {
            return function t(e) {
              t.current = e;
            };
          },
          createElement: function (t, e, n) {
            return new r(t, e, n);
          },
          createComponent: function (t) {
            return (
              d(t),
              (function () {
                for (
                  var t = arguments.length, e = new Array(t), n = 0;
                  n < t;
                  n++
                )
                  e[n] = arguments[n];
                var r = Symbol('Component');
                return function (t, n) {
                  return v(S, [r, t, n].concat(e));
                };
              })(t)
            );
          },
          createStore: function () {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
              e[n] = arguments[n];
            return A(_, e);
          },
          TAG: i,
        },
        z
      );
    window && (window.nya = I);
    e.default = I;
  },
]);
