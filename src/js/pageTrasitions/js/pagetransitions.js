const animations = require("./animations");
const eventBus = require("../../libs/EventEmitter").EventEmitter;

module.exports = (function() {

	var $main = $( '#pt-main' ),
		$pages,
		pagesCount,
		current = 0,
		isAnimating = false,
    endCurrPage = false,
    endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;

	function init() {
    $pages = $main.children( '.pt-page' );
    pagesCount = $pages.length;

		$pages.each( function() {
			let $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		$pages.eq( current ).addClass( 'pt-page-current' );
	}

	function nextPage(options) {
		let animation = (options.animation) ? options.animation : options;
    let targetPage = (options.showPage) ? options.showPage : current + 1;
    console.log(isAnimating);
		if( isAnimating ) {
			return false;
		}
    console.log(isAnimating);
		isAnimating = true;

		let $currPage = $pages.eq( current++ );

    if ( current > pagesCount - 1) {
      current = 0;
      targetPage = 0;
    }

    console.log(current, targetPage);

		let $nextPage = $pages.eq( targetPage ).addClass( 'pt-page-current' );
    let [outClass, inClass] = animations(animation);

    $currPage.addClass( outClass ).on( animEndEventName, function() {
      $currPage.off( animEndEventName );
      endCurrPage = true;
      if( endNextPage ) {
        onEndAnimation( $currPage, $nextPage );
      }
    } );

    $nextPage.addClass( inClass ).on( animEndEventName, function() {
      $nextPage.off( animEndEventName );
      endNextPage = true;
      if( endCurrPage ) {
        onEndAnimation( $currPage, $nextPage );
      }
    } );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage ) {
    endCurrPage = false;
    endNextPage = false;
		isAnimating = false;
		resetPage($outpage, $inpage);
	}

	function resetPage($outpage, $inpage) {
    $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
    $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
    eventBus.emit("toggle", current);
	}

	init();

	return {
		init : init,
		nextPage : nextPage,
	};

})();
