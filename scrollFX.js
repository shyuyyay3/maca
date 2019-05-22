
// Blocs Scroll FX 1.0.1
$(window).on('load', function(){scrollFX()});
$(window).scroll(function(){scrollFX();});

var lastScrollTop = 0;

function scrollFX()
{
	// Get Scroll Direction
	var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
	var scrollUp = (lastScrollTop>currentScrollTop);
   	lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
	   
	$('[class*="scroll-fx-up-"], [class*="scroll-fx-down-"], [class*="scroll-fx-left-"], [class*="scroll-fx-right-"], [class*="scroll-fx-in-fade"], [class*="scroll-fx-out-fade"], [class*="scroll-fx-zoom-"]').each(function(i)
	{
		var centerPoint = ($(window).height()/2)-($(this).outerHeight()/2);
		var exitPoint = ($(window).height()/2)-$(this).outerHeight();
		var scrollVal = $(window).scrollTop() - $(this).offset().top + ($(this).outerHeight()/100)+centerPoint;
		var scrollValFade = $(window).scrollTop() - $(this).offset().top - ($(this).outerHeight()/3);
		var scrollZoomIn = window.scrollY / ($(this).offset().top-centerPoint);
		var scrollZoomOut = ($(this).offset().top-centerPoint) / window.scrollY;

		var offSetVal = (scrollVal/10);		

		var leftVal = offSetVal+"%";
		var rightVal = - offSetVal+"%";
		var opacity = 3.5+(scrollValFade/250);
		var FXState = 'in';
			
		if (offSetVal > 0 || !$(this).is('[class*="-in"]')) // Prevent movement when in center of screen
		{
			leftVal = 0;
			rightVal = 0;
			
			if (offSetVal > 0) // Lock Zooms
			{
				scrollZoomIn = 1;
				scrollZoomOut = 1;
			}
			
			if ($(this).is('[class*="-in-fade"],[class*="-out-fade"]')){$(this).css({'opacity':'1.0'});} // Force 1.0 opacity
		}
		
		if (offSetVal > 30) // Exit Animation
		{
			if ($(this).is('[class*="-out"]'))
			{
				FXState = 'out';
				leftVal = - Math.abs(offSetVal-30)+"%";
				rightVal = Math.abs(offSetVal-30)+"%";
				opacity = 0.5-(scrollValFade/250);
			}
		}
	
		// Direction Animate
		var transform = "translate3d("+leftVal+",0,0)"; // Default Left
	
		if ($(this).is('[class*="scroll-fx-right-'+FXState+'"]')) // Right
		{
			transform = "translate3d("+rightVal+",0,0)";
		}
		else if ($(this).is('[class*="scroll-fx-up-'+FXState+'"]')) // Up
		{
			transform = "translate3d(0,"+rightVal+",0)";
		}
		else if ($(this).is('[class*="scroll-fx-down-'+FXState+'"]')) // Down
		{
			transform = "translate3d(0,"+leftVal+",0)";
		}
		
		
		// Scale Animate (Zoom - Push | Pull)
		if ($(this).is('[class*="scroll-fx-zoom-push"], [class*="scroll-fx-zoom-pull"]'))
		{	
			var scrollZoomVal = scrollZoomIn;
			
			if ($(this).is('[class*="scroll-fx-zoom-push"]')) // Zoom Out (Push)
			{
				scrollZoomVal = scrollZoomOut
				
				if (scrollZoomVal > 2) // Prevent Zoom Out Being larger than 2x
				{
					scrollZoomVal = 2;
				}
				else 
				{
					// Prevent Jerky Scale
					var lastScaleVal = $(this).attr('scroll-fx-last-scale');
					
				   	if (scrollUp) // Scroll Up
					{
						if (lastScaleVal > scrollZoomVal)
						{
							scrollZoomVal = lastScaleVal;
						}
				   	}
					else if (scrollZoomVal > lastScaleVal) // Scroll Down
					{
						scrollZoomVal = lastScaleVal;
					}
				}
				
				$(this).attr('scroll-fx-last-scale',scrollZoomVal);
			}
			
			if (!$(this).is('[class*="scroll-fx-up-"], [class*="scroll-fx-down-"], [class*="scroll-fx-left-"], [class*="scroll-fx-right-"]')) // Prevent X Value
			{
				transform = "scale("+scrollZoomVal+")";
			}
			else // Add Scale To X Value
			{
				transform += "scale("+scrollZoomVal+")";
			}
		}
		
		if (!$(this).hasClass('scroll-fx-'+FXState+'-fade') || $(this).is('[class*="scroll-fx-zoom-"]')){$(this).css({"-webkit-transform":transform});} // Add Transform
		if ($(this).is('[class*="-'+FXState+'-fade"]')){$(this).css({'opacity':opacity});} // Add fade
	});
}