$(document).ready(function(){
  if ($(".about-carousel").length) {
    $(".about-carousel").owlCarousel({
      items: 1,
      margin: 0,
      loop: true,
      center: false,
      autoWidth: false,
      startPosition: 0,
      mouseDrag: false,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      smartSpeed: 1000,

      loadingClass: 'about-carousel__loading',
      loadedClass: 'about-carousel__loaded',
      stageOuterClass: 'about-carousel__stage-outer',
      stageClass: 'about-carousel__stage',
      navContainerClass: 'about-carousel__nav',
      navClass: ['about-carousel__toggler--prev', 'about-carousel__toggler--next']
    });
  }
});
