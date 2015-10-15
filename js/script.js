var resizeDelay, windowWidth, $container;

function buildMasonry() {

    $container.isotope({
        itemSelector: '.dashelement',
        //sortBy: 'srtord',
        //sortAscending : true,
        masonry: {
            columnWidth: 140
        }
        //getSortData : {
        //    srtord : function ( $elem ) {
        //        return parseInt($elem.attr('data-srtord'));
        //    },
        //    subsrt : function ( $elem ) {
        //        return parseInt($elem.attr('data-subsrt'));
        //    }
        //}
    });

}

$(function(){
	  var $container = $('.packery').packery({
  columnWidth: 0,
  rowHeight: 0, 
  
});

// get item elements, jQuery-ify them
var $itemElems = $container.find('.item');
	if ( $('#dashboardelements').length > 0 ) {
		
		$container = $('#dashboardelements');

       // buildMasonry();
		
	}
	
	$('#myTab a').click(function (e) {
		e.preventDefault();
		$(this).blur().tab('show');
	});
	$('#myTab a:first').tab('show');
	
	
	$('.archive').on('click', 'a', function(e){
		e.preventDefault();
		$(this).blur();
		if ($(this).next('ul').length > 0) {
			$(this).parent().toggleClass('open');
			$(this).next('ul').slideToggle(400);
		}
	});
	
	try {
	
		$('.diarypopup, .textpopup, .configpopup').on('click', '.closelink', function(e){
			e.preventDefault();
			$('#' + $(this).parent().attr("id")).popup('hide');
			/*$('#articlepopup').popup('hide');*/
			
		});
		
		$('#popup, #configwidget').popup({
			//color: '#009ee2',
            color: '#575756',
			opacity: 0.6,
			transition: '0.3s',
			scrolllock: true,
			beforeopen: function () {
	
			}
		});
		
		$('.diaryitem').click(function(e){
			e.preventDefault();
            $(this).blur();
			$('#popup').popup('show');
		});

        $('.helpbtn').click(function(e){
            e.preventDefault();
            $(this).blur();
            $('#popup').popup('show');
        });
var a;
        $('.headerbtn.configurebtn').click(function(e){
            e.preventDefault();
         
          $(".item").hover(function() {
    $(this).css('cursor','move');
}, function() {
    $(this).css('cursor','auto');
});
// make item elements draggable

// bind Draggable events to Packery
 var pack=$container.packery( 'bindUIDraggableEvents', $itemElems );


            $(this).toggleClass('active').blur();
            $('#dashboardconfigform').slideToggle(300);

            if ($(this).hasClass('active')) {
              $itemElems.draggable().bind();
               
                
                $('.elementoptions').fadeIn();
        
                   
            } else {
              
                $itemElems.draggable().unbind();
                $('.elementoptions').fadeOut();
         $(".item").hover(function() {
    $(this).css('cursor','auto');});
             
            }

        });

        $('.elementoptions').on('click','.configurebtn', function(e){
            e.preventDefault();
            
            $('#configwidget').popup('show');
        });
        $container.on( 'click', '.item', function( event ) {
  // remove clicked element
  $container.packery( 'remove',$(this).closest() );
  // layout remaining item elements
  $container.packery();
});
       
        
        
	} catch(ex) {}
	
//	$(window).resize(function(){
//		
//		clearTimeout(resizeDelay);
//		
//		if (windowWidth != $(window).width()) {
//		
//			resizeDelay = setTimeout(winResize, 300);
//		
//		}
		
//	});
	
	//winResize();
	
	function winResize(){
		
		windowWidth = $(window).width();
		
		if ($(window).width() <= 768) {
            $('.leftpanel .statuslist').css( {'height': 'auto'} );
		} else {

            setTimeout(function() {
                var p = $('.leftpanel .statuslist:last').offset();
                var p2 = $('.pageborder').offset();
                $('.leftpanel .statuslist:last').height( (p2.top + $('.pageborder').outerHeight(true)) - p.top );
            }, 1000);
		}

	}
          
	
});