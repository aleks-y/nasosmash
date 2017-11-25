$(window).on('load', function() {
  const List = require("./libs/List");
  const PageTransitions = require("./pageTrasitions/js/pagetransitions");
  const eventBus = require("./libs/EventEmitter").EventEmitter;

  let carouselState = new List();
  function carouselLoop () {
    PageTransitions.nextPage({animation: 17});
    setTimeout(carouselLoop, 2000);
  }
  // PageTransitions.nextPage({animation: 17});
  setTimeout(carouselLoop, 2000);


  // Toggles reactions

  let pages = $("#pt-main").children(".pt-page").length;
  let toggles = $(".page-toggler").children();

  function toggleInit () {
    toggles.eq(0).addClass("active");
  }

  function setToggle (index) {
    toggles.removeClass("active");
    toggles.eq(index).addClass("active");
  }
  toggleInit();

  eventBus.addListener("toggle", (current) => {
    setToggle(current)
  });
});
