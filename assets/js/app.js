var isMobile;

// Identify if visitor on mobile with lame sniffing to remove parallaxing title
if( navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/BlackBerry/)
){
  isMobile = true;
}

$(document).ready(function() {

  // Global vars
  var $artHeaderInner = $('.art-header-inner');
  var $artHeader = $('.art-header');
  var $artTitle = $('.art-title');
  var $artSubtitle = $('.art-subtitle');
  var $nav = $('.nav');
  var windowScroll;

  // Apply Fittext to article titles to make it scale responsively in a smooth fashion
  $artTitle.fitText(1, { minFontSize: '34px' });

  // Identify if visitor has a large enough viewport for parallaxing title
  function isLargeViewport() {
    return ($nav.css('position') !== "relative");
  }

  // If large viewport and not mobile, parallax the title
  if(!isMobile) {
    $(window).scroll(function() {
      if(isLargeViewport()) {
        slidingTitle();
      }
    });
  }

  // Window gets large enough, need to recalc all parallaxing title values
  $(window).resize(function() {
    if(isLargeViewport()) {
      slidingTitle();
    }
  });

  // Functional parallaxing calculations
  function slidingTitle() {
    //Get scroll position of window
    windowScroll = $(this).scrollTop();

    //Slow scroll of .art-header-inner scroll and fade it out
    $artHeaderInner.css({
      'margin-top' : -(windowScroll/3)+"px",
      'opacity' : 1-(windowScroll/550)
    });

    //Slowly parallax the background of .art-header
    $artHeader.css({
      'background-position' : 'center ' + (+windowScroll/3)+"px"
    });

    //Fade the .nav out
    $nav.css({
      'opacity' : 1-(windowScroll/400)
    });
  }

	// Link to top of page without changing URL
	$('.back-to-top a').click(function(e) {
		e.preventDefault();
		$(window).scrollTop(0);
	})

	// Subtitles
	var $subtitle = $('span[id="subtitle"]');
	if ( $subtitle.length ) {
		var subtitleText = $('#subtitle').text();
		$('.art-subtitle').html(subtitleText);

	}
	$subtitle.remove();

	// Make punctuation smarter
	jQuery.fn.smarten = (function() {

	  function smartenNode(node) {
		if (node.nodeType === 3) {
		  node.data = node.data
			.replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018")      // Opening singles
			.replace(/'/g, "\u2019")                             // Closing singles & apostrophes
			.replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201c") // Opening doubles
			.replace(/"/g, "\u201d")                             // Closing doubles
			.replace(/--/g, "\u2013")                            // En dashes
			.replace(/---/g, "\u2014")                           // Em dashes
			.replace(/\.{3}/g, "\u2026");                        // Ellipsis
		} else if (node.nodeType === 1) {
		  if (node = node.firstChild) do {
			smartenNode(node);
		  } while (node = node.nextSibling);
		}
	  }

	  return function() {
		return this.each(function(){
		  smartenNode(this);
		});
	  };

	}());

	// Instantiation
	$('article').smarten();

});
