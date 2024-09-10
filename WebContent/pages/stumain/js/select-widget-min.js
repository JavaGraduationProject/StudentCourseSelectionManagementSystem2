/*
 *
 * www.198zone.com*/

"use strict";
$.widget("ui.selectWidget", {
    options: {
        change: function (e) {
            return e
        }, effect: "slide", keyControl: true, speed: 200, scrollHeight: 250
    }, _create: function () {
        this._selectFunctional()
    }, _selectFunctional: function () {
        function v(t) {
            $("li.active", s).removeClass("active");
            $("li", s).eq(t).addClass("active");
            $("option[selected]", e).removeAttr("selected");
            u.eq(t).prop("selected", true);
            e.val(u.eq(t).val());
            n.text(u.eq(t).text());
            a = t;
            if (p) {
                e.change(u.eq(t).val());
                p(e.val())
            }
            return t
        }

        function m() {
            var e = 0, t = $(".select-items", s);
            for (var n = 0, r = t.length; n < r; n++) {
                if ($(t[n]).hasClass("active")) {
                    break
                }
                e += $(t[n]).outerHeight()
            }
            s.stop().animate({scrollTop: e}, l)
        }

        if (this.element.is(":hidden")) {
            return false
        }
        var e = this.element, t = $("<div>").addClass("select-main"), n = $("<div>").addClass("select-set"), r = $("<div>").addClass("select-arrow"), i = $("<div>").addClass("select-block"), s = $("<ul>").addClass("select-list"), o = e.find("option[selected]").length, u = $("option", e), a = 0, f = $("input[type=reset]", e.parents("form")), l = this.options.speed, c = this.options.keyControl, h = this.options.effect, p = this.options.change, d = this.options.scrollHeight;
        t.append(r);
        t.append(n);
        i.append(s);
        t.append(i);
        e.after(t);
        e.hide();
        i.hide();
        u.each(function (e, t) {
            s.append($("<li>").addClass("select-items").text($(t).text()))
        });
        f.click(function () {
            $(u, $(this).parents("form")).each(function (e, t) {
                if ($(t).val() == "" && !$(t).is(":selected")) {
                    $(".select-items:first", s).click();
                    return false
                }
            })
        });
        if (e.attr("disabled")) {
            t.addClass("disabled")
        }
        if (!o) {
            e.val(u.first().val());
            $("li:first", s).addClass("active");
            n.text(u.first().text())
        } else {
            e.val(e.find("option[selected]").val());
            $("li", s).eq(e.find("option[selected]").index()).addClass("active");
            n.text(e.find("option[selected]").text())
        }
        a = $("option[selected]", e).index();
        $("li", s).click(function () {
            var e = $(this).index();
            a = e;
            v(e)
        });
        if (d) {
            if (i.height() > d) {
                s.css("height", d).css("overflow", "auto")
            }
        }
        r.click(function () {
            n.click()
        });
        n.click(function () {
            var e = $(this);
            if (e.parent(t).hasClass("disabled")) {
                return false
            }
            if (!e.prev().hasClass("reverse")) {
                $(".select-arrow").removeClass("reverse");
                e.prev().addClass("reverse");
                e.parent().addClass("z-index")
            } else {
                e.parent().removeClass("z-index");
                e.prev().removeClass("reverse")
            }
            if (i.is(":hidden")) {
                if ($(".select-block").is(":visible")) {
                    if (h == "slide") {
                        $(".select-block").slideUp(l / 2);
                        $(".select-main").removeClass("z-index")
                    } else if (h == "fade") {
                        $(".select-block").fadeOut(l / 2);
                        $(".select-main").removeClass("z-index")
                    }
                    $(document).unbind("keydown")
                }
                $(document).bind("click", function (e) {
                    if (!$(e.target).is(".select-set") && !$(e.target).is(".select-arrow")) {
                        if ($(".select-block").is(":visible")) {
                            if (h == "slide") {
                                i.slideUp(l / 2, function () {
                                    $(".select-main").removeClass("z-index")
                                });
                                $(".select-arrow").removeClass("reverse")
                            } else if (h == "fade") {
                                i.fadeOut(l / 2, function () {
                                    $(".select-main").removeClass("z-index")
                                });
                                $(".select-arrow").removeClass("reverse")
                            }
                            $(document).unbind("click keydown")
                        }
                    }
                });
                if (h == "slide") {
                    i.slideDown(l);
                    e.parent().addClass("z-index");
                    m()
                } else if (h == "fade") {
                    i.fadeIn(l);
                    e.parent().addClass("z-index");
                    m()
                }
                if (c) {
                    $(document).bind("keydown", function (e) {
                        var t = e.keyCode;
                        if (t == 40) {
                            if (a < u.length - 1) {
                                a = a == -1 ? 0 : a;
                                v(a += 1);
                                m()
                            }
                            e.preventDefault()
                        }
                        if (t == 38) {
                            if (a > 0) {
                                v(a -= 1);
                                m()
                            }
                            e.preventDefault()
                        }
                        if (t == 13) {
                            if (h == "slide") {
                                i.slideUp(l / 2, function () {
                                    $(".select-main").removeClass("z-index")
                                })
                            } else if (h == "fade") {
                                i.fadeOut(l / 2, function () {
                                    $(".select-main").removeClass("z-index")
                                })
                            }
                            $(".select-arrow").removeClass("reverse");
                            $(document).unbind("keydown");
                            e.preventDefault()
                        }
                    })
                }
            } else {
                if (h == "slide") {
                    i.slideUp(l / 2, function () {
                        $(".select-main").removeClass("z-index")
                    });
                    $(".select-arrow").removeClass("reverse")
                } else if (h == "fade") {
                    i.fadeOut(l / 2, function () {
                        $(".select-main").removeClass("z-index")
                    });
                    $(".select-arrow").removeClass("reverse")
                }
                $(document).unbind("keydown")
            }
        })
    }
});