"use strict";

var mainMenu = $(".main-menu");

$(".main-nav__toggler").click(function () {
  mainMenu.addClass("main-menu--open");
});

$(".main-nav__close").click(function () {
  mainMenu.removeClass("main-menu--open");
});
