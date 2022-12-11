!(function (n) {
    n.fn.multislider = function (e, t) {
        var i,
            s,
            o,
            a,
            r,
            l,
            u,
            c,
            m,
            d,
            f,
            p = n(this),
            v = p.find(".MS-content"),
            g = p.find("button.MS-right"),
            h = p.find("button.MS-left"),
            A = v.find(".item:first");
        if ("string" == typeof e) return (i = e), void 0 !== p.data(i) ? p.data(i)() : console.error("Multislider currently only accepts the following methods: next, prev, pause, play"), p;
        function w(n) {
            p.hasClass("ms-PAUSE") ? (p.removeClass("ms-PAUSE"), n(), p.addClass("ms-PAUSE")) : n(), E();
        }
        function S() {
            P(), (r = A.width());
            var n = parseInt(v.find(".item:first").css("padding-left")),
                e = parseInt(v.find(".item:first").css("padding-right"));
            0 !== n && (r += n), 0 !== e && (r += e);
        }
        function C() {
            f = setInterval(function () {
                p.hasClass("ms-PAUSE") || u();
            }, m.interval);
        }
        function E() {
            0 !== m.interval && !1 !== m.interval && !0 !== m.continuous && (clearInterval(f), C());
        }
        function P() {
            (A = v.find(".item:first")), (s = v.find(".item:last"));
        }
        function U(n) {
            p.hasClass("ms-animating") || p.hasClass("ms-HOVER") || p.hasClass("ms-PAUSE") || (p.trigger("ms.before.animate"), p.addClass("ms-animating"), n());
        }
        function y() {
            p.hasClass("ms-animating") && (p.removeClass("ms-animating"), p.trigger("ms.after.animate"));
        }
        function b() {
            (o = v.width()), (a = Math.floor(o / r));
        }
        function M() {
            U(function () {
                P(),
                    (function () {
                        d = m.duration;
                        var n = parseFloat(v.find(".item:first").css("margin-left"));
                        d *= 1 - n / -(r - 1);
                    })(),
                    A.animate(
                        { marginLeft: -(r + 1) },
                        {
                            duration: d,
                            easing: "linear",
                            complete: function () {
                                A.insertAfter(s).removeAttr("style"), y(), M();
                            },
                        }
                    );
            });
        }
        function x() {
            U(function () {
                P(), b();
                var e = v.children(".item").clone().splice(0, a);
                v.append(e),
                    A.animate(
                        { marginLeft: -o },
                        {
                            duration: d,
                            easing: "swing",
                            complete: function () {
                                n(v.children(".item").splice(0, a)).remove(), y();
                            },
                        }
                    );
            });
        }
        function B() {
            U(function () {
                P(), b();
                var e = v.children(".item").length,
                    t = v
                        .children(".item")
                        .clone()
                        .splice(e - a, e);
                n(n(t)[0]).css("margin-left", -o),
                    v.prepend(t),
                    P(),
                    A.animate(
                        { marginLeft: 0 },
                        {
                            duration: d,
                            easing: "swing",
                            complete: function () {
                                (e = v.find(".item").length), n(v.find(".item").splice(e - a, e)).remove(), A.removeAttr("style"), y();
                            },
                        }
                    );
            });
        }
        function L() {
            U(function () {
                P(),
                    A.animate(
                        { marginLeft: -r },
                        {
                            duration: d,
                            easing: "swing",
                            complete: function () {
                                A.detach().removeAttr("style").appendTo(v), y();
                            },
                        }
                    );
            });
        }
        function I() {
            U(function () {
                P(),
                    s.css("margin-left", -r).prependTo(v),
                    s.animate(
                        { marginLeft: 0 },
                        {
                            duration: d,
                            easing: "swing",
                            complete: function () {
                                s.removeAttr("style"), y();
                            },
                        }
                    );
            });
        }
        return (
            ("object" != typeof e && void 0 !== e) ||
            (v
                .contents()
                .filter(function () {
                    return 3 == this.nodeType && !/\S/.test(this.nodeValue);
                })
                .remove(),
                (c = m || { continuous: !1, slideAll: !1, interval: 2e3, duration: 500, hoverPause: !0, pauseAbove: null, pauseBelow: null }),
                (m = n.extend({}, c, e)),
                S(),
                (d = m.duration),
                m.hoverPause &&
                (m.continuous
                    ? (v.on("mouseover", function () {
                        y(), v.children(".item:first").stop();
                    }),
                        v.on("mouseout", function () {
                            M();
                        }))
                    : (v.on("mouseover", function () {
                        p.addClass("ms-HOVER");
                    }),
                        v.on("mouseout", function () {
                            p.removeClass("ms-HOVER");
                        }))),
                !0 !== m.continuous && 0 !== m.interval && !1 !== m.interval && !1 !== m.autoSlide && C(),
                null !== m.pauseAbove &&
                "number" == typeof m.pauseAbove &&
                (window.innerWidth > m.pauseAbove && p.addClass("ms-PAUSE"),
                    n(window).on("resize", function () {
                        window.innerWidth > m.pauseAbove ? p.addClass("ms-PAUSE") : p.removeClass("ms-PAUSE");
                    })),
                null !== m.pauseBelow &&
                "number" == typeof m.pauseBelow &&
                (window.innerWidth < m.pauseBelow && p.addClass("ms-PAUSE"),
                    n(window).on("resize", function () {
                        window.innerWidth < m.pauseBelow ? p.addClass("ms-PAUSE") : p.removeClass("ms-PAUSE");
                    })),
                p.data({
                    pause: function () {
                        p.addClass("ms-PAUSE");
                    },
                    unPause: function () {
                        p.removeClass("ms-PAUSE");
                    },
                    continuous: function () {
                        p.removeClass("ms-PAUSE"), M();
                    },
                    next: function () {
                        w(L);
                    },
                    nextAll: function () {
                        w(x);
                    },
                    prev: function () {
                        w(I);
                    },
                    prevAll: function () {
                        w(B);
                    },
                    settings: m,
                }),
                m.continuous ? ((m.autoSlide = !1), M()) : m.slideAll ? ((l = p.data("prevAll")), (u = p.data("nextAll"))) : ((l = p.data("prev")), (u = p.data("next")))),
            g.on("click", u),
            h.on("click", l),
            p.on("click", ".MS-right, .MS-left", E),
            n(window).on("resize", S),
            p
        );
    };
})(jQuery);
