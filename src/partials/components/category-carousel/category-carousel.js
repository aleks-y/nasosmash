$(document).ready(function(){
  $(".category-carousel").owlCarousel({
    items: 3,
    margin: 30,
    loop: true,
    center: true,
    autoWidth: false,
    startPosition: 0,
    mouseDrag: false,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 1000,

    loadingClass: 'category-carousel__loading',
    loadedClass: 'category-carousel__loaded',
    stageOuterClass: 'category-carousel__stage-outer',
    stageClass: 'category-carousel__stage',
    navContainerClass: 'category-carousel__nav',
    navClass: ['category-carousel__toggler--prev', 'category-carousel__toggler--next']
  });
});
