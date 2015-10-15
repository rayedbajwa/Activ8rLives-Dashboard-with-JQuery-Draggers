$(function(){

	try {

		/*
		 * Handled close icon click on news popup.
		 * Hide the pop up on click of close button
		 */
		$('.newspopup').on('click', '.closelink', function(e){
			e.preventDefault();
			$('#' + $(this).parent().attr("id")).popup('hide');
		});

		/*
		 * Handled click on About News on health.html to show the NEWS popup
		 */
		$('.about_news').click(function(e){
			e.preventDefault();
			$('#popup').popup('show');
			setDisplayableNewsTableArea();
		});
                $('.spherepop').click(function(e){
			e.preventDefault();
                      
			$('#popup').popup('show');
			setDisplayableNewsTableArea();
		});
                

	} catch(ex) {
            alert(ex.toString());
            
        }
            
            
        

	/*
	 * Handled window resize event for responsive UI
	 */	
	$(window).off("resize").on("resize", onWindowResize); 

	/*
	 * Handled click on My Account -> Your targets tab to place the info icon
	 */
	$('#myTab a[href="#targets"]').click(function (e) {
		placeInfoIconOnAcctTargets();
	});

	/*
	 * Handled click on My Account -> Privacy & Emails tab to toggle tick / untick image for Receive emails.
	 */
	$("#action_receivemail").click(function(e){
		if($("#action_receivemail").find("#imgTick").length > 0) {
			$("#action_receivemail").find("#imgTick").attr("id", "imgUnTick");
		} else {
			$("#action_receivemail").find("#imgUnTick").attr("id", "imgTick");
		}

	});

	/* 
	 * If current page is health.html initialize the Graph UI as per the current width
	 * of the screen and handled click on 'Printer friendly version'.
	 */
	if($('#respirationRate_chart_container').length > 0){
		/*
		 * Handled click on 'Printer friendly version'.
		 * Open the default print pop up
		 */
		$('.healthData_print').click(function(e){
			window.print();
		});
		
		initializeGraphUI();
	}
});


/*
 * Event Handler for window resize event
 */
function onWindowResize(){
	/*
	 * On news pop up page set the width of NEWS table.
	 */
	if($('.newspopup').length > 0){
		setDisplayableNewsTableArea();
	}
	/*
	 * Place the info icon on My Account -> Your targets tab close to the text when window size changes.
	 */
	if($('#input-suffix-text').length > 0){
		placeInfoIconOnAcctTargets();
	}

	/* 
	 * If current page is health.html initialize the Graph UI as per the current width
	 * of the screen
	 */
	if($('#respirationRate_chart_container').length > 0){
		redrawGraphs();
		initializeGraphUI();
	}

}

/*
 * Function to set the width of NEWS table on newsPopup.
 * If width of popup < 670, keep the width of table fixed and add a horizontal scroll bar
 */
function setDisplayableNewsTableArea(){

	var pop_width=$('.newspopup').innerWidth();
	if(pop_width < 670){
		$('#news_table').css("min-width", (pop_width-120)+'px');
	}
}

/*
 * Function to set the info icon close to the text on My Account -> Your targets tab.
 * Calculate the width of text and its container and accordingly set margin left to the icon.
 */
function placeInfoIconOnAcctTargets(){
	var text_width = $('#input-suffix-text').innerWidth();
	var div_width = $('.input-suffix').innerWidth();
	var infoLeftMargin = Number(div_width-(text_width + 20));
	if(infoLeftMargin > 0) {
		$('.info_icon_div').css("margin-left",'-'+(div_width-(text_width + 20)+'px'));
	}
}

/*
 * This function sets the position and width for graphs headers
 */
function initializeGraphUI(){
	setChartHeaders();
}

/*
 * Initialize and plot Respiration Graph
 */
function initializeRespirationGraph() {
		
	var yData = [ 16 , 19 , 14 , 16 , 16 , 17 , 18 , 18 , 19 , 20 , 21 , 22 , 25 , 26 , 26 , 22 , 20 , 20 , 19 , 21 , 20 , 22 , 19 ];

	var data = initializeGraphData (yData);
	
	plotRespirationGraph(data);
}

/*
 * Initialize and plot spO2 Graph
 */

function  initializeSpO2Graph() {

	var yData = [ 94 , 93.7 , 95 , 94 , 94, 94 , 93.2 , 93 , 92.7 , 92.2 , 91.5 , 90.5, 89.5 , 89 , 89 , 91.2, 92 , 92 , 92.5 , 92 , 92.7 , 91.5 , 92.7 ];
	
	var data = initializeGraphData (yData);
	
	plotSpO2Graph(data);
}

/*
 * Initialize and plot Temperature Graph
 */

function  initializeTempGraph() {

	var yData = [  36.9 , 37 , 36.5 , 38.3 , 36.5 , 37.8 , 37 , 38.7 , 39, 39.5 , 38.7 , 39.2 , 39.5 , 39.7 , 39.6 , 38.6 , 37.9 , 37.7, 37.9 , 38.2 , 37.9, 38.2, 37.7 ];
	
	var data = initializeGraphData (yData);
	
	plotTempGraph(data);
}

/*
 * Initialize and plot Blood Pressure Graph
 */

function  initializeBPGraph() {

	var yData = [ 165 , 164 , 168 , 167 , 165 , 163 , 162 , 162 , 160 , 158 , 155 , 150 , 148 , 145 , 145 , 154, 158 , 158 , 159 , 156 , 158 , 154 , 160 ];
	
	var data = initializeGraphData (yData);
	
	plotBPGraph(data);
}

/*
 * Initialize and plot Heart rate Graph
 */

function  initializeHeartRateGraph() {
	
	var yData = [92 , 93 , 90 , 100 , 90 , 99 , 92 , 107 , 110 , 112 , 107 , 110 , 119 , 119 , 117 , 104 , 100 , 108 , 109 , 104 , 100 , 103 , 98 ];
	
	var data = initializeGraphData (yData);
	
	plotHeartRateGraph(data);
}