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
    reverse = false,
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

	function prevPage() {
	  let targetPage;
	  reverse = true;
    (current - 1 < 0) ? targetPage = pagesCount - 1: targetPage = current - 1;
    console.log('>>>', current, targetPage);
	  nextPage({animation: 18, showPage: targetPage});
  }

	function nextPage(options) {
		let animation = (options.animation) ? options.animation : options;
    let targetPage = (options.showPage || options.showPage >= 0) ? options.showPage : current + 1;

		if( isAnimating ) {
			return false;
		}

		isAnimating = true;

		let $currPage = $pages.eq( current++ );

    if ( current > pagesCount - 1 && !reverse) {
      targetPage = 0;
    }

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
		current = targetPage;
    console.log('after', current, targetPage);
	}

	function onEndAnimation( $outpage, $inpage ) {
    endCurrPage = false;
    endNextPage = false;
		isAnimating = false;
		reverse = false;
		resetPage($outpage, $inpage);
	}

	function resetPage($outpage, $inpage) {
    $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
    $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
    eventBus.emit("toggle", current);
	}

	init();

	return {
		init,
		nextPage,
    prevPage
	};

})();
