var owl = $('.owl-carousel');

owl.owlCarousel({
  items: 1,
  loop: true,
  margin: 0,
  nav: true,
  animateOut: 'slideOutUp',
  animateIn: 'zoomIn',
  autoplay: true,
  autoplayTimeout: 8000,
  dotsContainer: '.page-toggler',
  nav: false,
  mouseDrag: false
});

owl.on('mousewheel', '.owl-stage', function (e) {
  if (event.deltaY > 0) {
    owl.trigger('next.owl.carousel');
  }
  else {
    owl.trigger('prev.owl.carousel');
  }
  e.preventDefault();
});
