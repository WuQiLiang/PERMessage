/// <reference path="jquery-1.8.2.min.js" />
var tabs_i = 0;
$(function () {
    //重布局
    resize();
    //菜单隐藏展开            
    $('.vtitle').click(function () {
        var _self = $(this);
        var j = $('.vtitle').index(_self);
        if (tabs_i == j) return false;
        tabs_i = j;
        $('.vtitle').each(function (e) {
            if (e == tabs_i) {
                $(this).removeClass('hid');
            } else {
                $(this).addClass('hid');
            }
        });
        $('.vcon').slideUp(100).eq(tabs_i).slideDown(100);
    });
    //中间折叠
    $('.hidbutton').click(function () {
        hiddenleft();
    });
    //table渲染
    $(".table tbody tr:even").addClass("even");
    $(".table tbody tr").mouseover(function () { $(this).addClass("onmouse"); });
    $(".table tbody tr").mouseleave(function () { $(this).removeClass("onmouse"); });
    //隐藏按钮
    if (document.cookie == "hid") {
        $('#headimg').hide();
        $('#left').hide();
        $("#right").width($(window).width() - 20);
        $("#right").height($(window).height() - 10);
        $('.hidbutton').addClass("hidbuttonclick");
    }
    //按钮渲染
    $("input[type=submit]").button();
    $(".table tbody a").addClass("red");
    $(".table thead a").addClass("black");
    //tip提示渲染
    $(document).tooltip({
        track: true
    });
    //radio渲染
    $(".FormatRadio").buttonset();
    //下拉渲染
    $("select").combobox();
    //全选渲染
    $(".allcheck").click(function () {
        if ($(this).attr("checked")) {
            $("input[type=\"checkbox\"]").attr("checked", "checked");
        } else { $("input[type=\"checkbox\"]").removeAttr("checked"); }
    });
});
window.onresize = function () {
    resize();
}
function hiddenleft() {
    $('#headimg').toggle();
    $('#left').toggle();
    if ($('#headimg').css("display") != "block") {
        $("#right").width($(window).width() - 20);
        $("#right").height($(window).height() - 10);
        $('.hidbutton').addClass("hidbuttonclick");
        document.cookie = "hid";
    } else {
        $("#right").width($(window).width() - 230);
        $("#right").height($(window).height() - 85);
        $('.hidbutton').removeClass("hidbuttonclick");
        document.cookie = "show";
    }
}
function resize() {
    if ($('#headimg').css("display") != "block") {
        $("#right").width($(window).width() - 20);
        $("#right").height($(window).height() - 10);
    } else {
        $("#right").width($(window).width() - 230);
        $("#right").height($(window).height() - 85);
    }
    $("#middle").height($(window).height() - 95);
    $(".hidbutton").height($(window).height() - 95);
    if ($("#min").height() < $("#right").height()) {
        $("#min").height($(window).height() - 120);
        $(".vconlist").height($("#min").height() - ($(".vtitle").size() * 33));
    }
    else {
        $("#min").height($("#right").height() - 100);
    }
}
function listtab(name) {
    $('.vtitle').each(function (e) {
        if ($(this).hasClass(name)) {
            tabs_i = e;
        }
    });
    $('.vcon').slideUp(0).eq(tabs_i).slideDown(0);
    $('.vtitle').eq(tabs_i).removeClass('hid');
}
(function ($) {
    $.widget("ui.combobox", {
        _create: function () {
            var input,
                that = this,
                select = this.element.hide(),
                selected = select.children(":selected"),
                value = selected.val() ? selected.text() : "",
                wrapper = this.wrapper = $("<span>")
                    .addClass("ui-combobox")
                    .insertAfter(select);
            function removeIfInvalid(element) {
                var value = $(element).val(),
                    matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(value) + "$", "i"),
                    valid = false;
                select.children("option").each(function () {
                    if ($(this).text().match(matcher)) {
                        this.selected = valid = true;
                        return false;
                    }
                });
                if (!valid) {
                    // remove invalid value, as it didn't match anything
                    $(element)
                        .val("")
                        .attr("title", value + " 项不存在")
                        .tooltip("open");
                    select.val("");
                    setTimeout(function () {
                        input.tooltip("close").attr("title", "");
                    }, 2500);
                    input.data("autocomplete").term = "";
                    return false;
                }
            }
            input = $("<input>")
                .appendTo(wrapper)
                .val(value)
                .attr("title", "")
                .addClass("ui-state-default ui-combobox-input")
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: function (request, response) {
                        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                        response(select.children("option").map(function () {
                            var text = $(this).text();
                            if (this.value && (!request.term || matcher.test(text)))
                                return {
                                    label: text.replace(
                                        new RegExp(
                                            "(?![^&;]+;)(?!<[^<>]*)(" +
                                            $.ui.autocomplete.escapeRegex(request.term) +
                                            ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                        ), "<strong>$1</strong>"),
                                    value: text,
                                    option: this
                                };
                        }));
                    },
                    select: function (event, ui) {
                        ui.item.option.selected = true;
                        that._trigger("selected", event, {
                            item: ui.item.option
                        });
                        if (select.hasClass("postback")) {
                            theForm.submit();
                        }
                    },
                    change: function (event, ui) {
                        if (!ui.item)
                            return removeIfInvalid(this);
                    }
                })
                .addClass("ui-widget ui-widget-content ui-corner-left");

            input.data("autocomplete")._renderItem = function (ul, item) {
                return $("<li>")
                    .data("item.autocomplete", item)
                    .append("<a>" + item.label + "</a>")

                    .appendTo(ul);
            };
            $("<a>")
                .attr("tabIndex", -1)
                .attr("title", "请选择")
                .tooltip()
                .appendTo(wrapper)
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass("ui-corner-all")
                .addClass("ui-corner-right ui-combobox-toggle")
                .click(function () {
                    // close if already visible
                    if (input.autocomplete("widget").is(":visible")) {
                        input.autocomplete("close");
                        removeIfInvalid(input);
                        return;
                    }
                    // work around a bug (likely same cause as #5265)
                    $(this).blur();
                    // pass empty string as value to search for, displaying all results
                    input.autocomplete("search", "");
                    input.focus();
                });
            input
                .tooltip({
                    position: {
                        of: this.button
                    },
                    tooltipClass: "ui-state-highlight"
                });
        },
        destroy: function () {
            this.wrapper.remove();
            this.element.show();
            $.Widget.prototype.destroy.call(this);
        }
    });
})(jQuery);