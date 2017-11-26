$(window).on('load', function() {
  const List = require("./libs/List");
  const PageTransitions = require("./pageTrasitions/js/pagetransitions");
  const eventBus = require("./libs/EventEmitter").EventEmitter;
  const delay = 7000;
  let timer;

  function carouselLoop (index) {
    PageTransitions.nextPage({animation: 17, showPage: index});
    timer = setTimeout(carouselLoop, delay);
  }
  // PageTransitions.nextPage({animation: 17});
  timer = setTimeout(carouselLoop, delay);


  // Toggles reactions

  let pages = $("#pt-main").children(".pt-page").length;
  let toggles = $(".page-toggler").children();

  toggles.on("click", function() {
    let index = toggles.index(this);
    clearTimeout(timer);
    carouselLoop(index);
  });

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


  $(window).bind('mousewheel', function(e){
    if(e.originalEvent.wheelDelta > 0) {
      clearTimeout(timer);
      PageTransitions.prevPage();
      timer = setTimeout(carouselLoop, delay);
    } else {
      clearTimeout(timer);
      carouselLoop();
    }
  });
});
