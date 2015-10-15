/*
 * Global variables
 */
var plot = [], graph_options, score_graph_options;

$(function() {

	/*
	 * This variable provides common options for the data graph
	 */
	graph_options = {
		lines : {
			show : true
		},
		points : {
			show : true,
			radius : 4,
			fillColor : "#575756"
		},
		colors : [ "#000000" ],
		series : {
			points : {
				fillColor : "#000000"
			}
		},
		grid : {
			borderColor : "#cccccc",
			borderWidth : 1,
			hoverable : true

		},
		xaxis : {
			min : 0,
			max : 23,
			tickSize : 1,
			tickDecimals : 0,
			ticks : [ [ 0, "" ], [ 1, "" ], [ 2, "" ], [ 3, "" ], [ 4, "" ],
					[ 5, "" ], [ 6, "" ], [ 7, "" ], [ 8, "" ], [ 9, "" ],
					[ 10, "" ], [ 11, "" ], [ 12, "" ], [ 13, "" ], [ 14, "" ],
					[ 15, "" ], [ 16, "" ], [ 17, "" ], [ 18, "" ], [ 19, "" ],
					[ 20, "" ], [ 21, "" ], [ 22, "" ], [ 23, "" ] ]
		},
		yaxis : {
			tickDecimals : 0,
			font : {
				size : 12
			},
			tickColor : "#c6c6c6",
			color : "#000000"
		},
		series : {
			color : "#575756",
			shadowSize : 0
		}
	};

	/*
	 * This variable provides common options for the score graph
	 */
	score_graph_options = {
		xaxis : {
			min : 0,
			max : 1,
			tickSize : 1,
			tickDecimals : 0,
			ticks : [ [ 0, "" ] ]
		},
		grid : {
			borderColor : "#cccccc",
			borderWidth : 1,
		},
		yaxis : {
			tickDecimals : 0,
		}
	};

	/*
	 * Initialize and draw the graphs
	 */
	initializeRespirationGraph();

	initializeSpO2Graph();

	initializeTempGraph();

	initializeBPGraph();

	initializeHeartRateGraph();

	/*
	 *  Append a div to body for showing tooltip
	 */
	$("<div id='tooltip'></div>").appendTo("body");
	
	$("<div id='tooltip_arrow'></div>").appendTo("body");

	/*
	 * Handled the hover event on graph for showing tooltip 
	 */
	$(".respirationRate_chart").bind("plothover", function(event, pos, item){
		showTooltip(event, pos, item,"Breaths", 0,"");
	});
	$(".spO2_chart").bind("plothover", function(event, pos, item){
		showTooltip(event, pos, item,"SpO<sub>2</sub>", 0, "%");
	});
	$(".temp_chart").bind("plothover", function(event, pos, item){
		showTooltip(event, pos, item,"Temp", 1, "&#8451;");
	});
	$(".bp_chart").bind("plothover", function(event, pos, item){
		showTooltip(event, pos, item,"SysBP", 0, "mmHg");
	});
	$(".heartRate_chart").bind("plothover", function(event, pos, item){
		showTooltip(event, pos, item,"HR", 0, "bpm");
	});
});

/*
 * Function that calculates the  positions of first and second data points
 * Used the first point X co-ordinate to set the width of first child of header table.
 * Used the distance between the X co-ordinates of 2 adjacent data points to set as the width of remaining children of header table
 */
function setChartHeaders() {
	var first_point = plot[0].pointOffset({
		x : 0,
		y : 0
	});
	var second_point = plot[0].pointOffset({
		x : 1,
		y : 0
	});
	var header_td_width = second_point.left - first_point.left;
	
	$('.header_chart table tr td:first-child').css("width",
			(first_point.left + 30) + 'px');
	$('.header_chart table tr td:not(:first-child)').css("width",
			(header_td_width - 1) + 'px');
}

/*
 * This function sets graph options and plots the Respiration Graph
 */
function plotRespirationGraph(data){
	
	var option = graph_options;
	var score_options = score_graph_options;

	score_options.grid.markings = option.grid.markings = [ {
		yaxis : {
			from : 0,
			to : 8
		},
		color : "#ff9999"
	}, {
		yaxis : {
			from : 8,
			to : 11
		},
		color : "#d9e8a9"
	}, {
		yaxis : {
			from : 20,
			to : 24
		},
		color : "#fcd4a5"
	}, {
		yaxis : {
			from : 24,
			to : 30
		},
		color : "#ff9999"
	} ];

	score_options.yaxis.min = option.yaxis.min = 0;
	score_options.yaxis.max = option.yaxis.max = 28;
	score_options.yaxis.tickSize = option.yaxis.tickSize = 2;
	option.yaxis.ticks = [ [ 0, "" ], [ 2, "2" ], [ 4, "4" ], [ 6, "6" ],
			[ 8, "8" ], [ 10, "10" ], [ 12, "12" ], [ 14, "14" ], [ 16, "16" ],
			[ 18, "18" ], [ 20, "20" ], [ 22, "22" ], [ 24, "24" ],
			[ 26, "26" ], [ 28, "" ] ];

	score_options.yaxis.ticks = [ [ 0, "" ], [ 2, "" ], [ 4, "" ], [ 6, "" ],
			[ 8, "" ], [ 10, "" ], [ 12, "" ], [ 14, "" ], [ 16, "" ],
			[ 18, "" ], [ 20, "" ], [ 22, "" ], [ 24, "" ], [ 26, "" ],
			[ 28, "" ] ];

	plot[0] = $.plot("#respirationRate_chart_container", [ {
		data : data
	} ], option);

	$.plot("#respiration_chart_score", [ {
		data : []
	} ], score_options);
}

/*
 * This function sets graph options and plots the spO2 Graph
 */
function plotSpO2Graph(data){
	var option = graph_options;
	var score_options = score_graph_options;

	score_options.grid.markings = option.grid.markings = [ {
		yaxis : {
			from : 86,
			to : 91
		},
		color : "#ff9999"
	}, {
		yaxis : {
			from : 91,
			to : 93
		},
		color : "#fcd4a5"
	}, {
		yaxis : {
			from : 93,
			to : 95
		},
		color : "#d9e8a9"
	} ];

	score_options.yaxis.min = option.yaxis.min = 86;
	score_options.yaxis.max = option.yaxis.max = 100;
	score_options.yaxis.tickSize = option.yaxis.tickSize = 1;
	option.yaxis.ticks = [ [ 86, "" ], [ 87, "87" ], [ 88, "" ], [ 89, "89" ],
			[ 90, "" ], [ 91, "91" ], [ 92, "" ], [ 93, "93" ], [ 94, "" ],
			[ 95, "95" ], [ 96, "" ], [ 97, "97" ], [ 98, "" ], [ 99, "99" ],
			[ 100, "" ] ];

	score_options.yaxis.ticks = [ [ 86, "" ], [ 87, "" ], [ 88, "" ],
			[ 89, "" ], [ 90, "" ], [ 91, "" ], [ 92, "" ], [ 93, "" ],
			[ 94, "" ], [ 95, "" ], [ 96, "" ], [ 97, "" ], [ 98, "" ],
			[ 99, "" ], [ 100, "" ] ];

	plot[1] = $.plot("#spO2_chart_container", [ {
		data : data
	} ], option);

	$.plot("#spO2_chart_score", [ {
		data : []
	} ], score_options);
}

/*
 * This function sets graph options and plots the Temperature Graph
 */
function plotTempGraph(data){
	var option = graph_options;
	var score_options = score_graph_options;

	score_options.grid.markings = option.grid.markings = [ {
		yaxis : {
			from : 33,
			to : 35
		},
		color : "#ff9999"
	}, {
		yaxis : {
			from : 35,
			to : 36
		},
		color : "#d9e8a9"
	}, {
		yaxis : {
			from : 38,
			to : 39
		},
		color : "#d9e8a9"
	}, {
		yaxis : {
			from : 39,
			to : 40
		},
		color : "#fcd4a5"
	} ];

	score_options.yaxis.min = option.yaxis.min = 33;
	score_options.yaxis.max = option.yaxis.max = 40;
	score_options.yaxis.tickSize = option.yaxis.tickSize = 1;
	option.yaxis.ticks = [ [ 33, "" ], [ 34, "34" ], [ 35, "35" ],
			[ 36, "36" ], [ 37, "37" ], [ 38, "38" ], [ 39, "39" ], [ 40, "" ] ];

	score_options.yaxis.ticks = [ [ 33, "" ], [ 34, "" ], [ 35, "" ],
			[ 36, "" ], [ 37, "" ], [ 38, "" ], [ 39, "" ], [ 40, "" ] ];

	plot[2] = $.plot("#temp_chart_container", [ {
		data : data
	} ], option);

	$.plot("#temp_chart_score", [ {
		data : []
	} ], score_options);
}

/*
 * This function sets graph options and plots the Blood Pressure Graph
 */
function plotBPGraph(data){
	var option = graph_options;
	var score_options = score_graph_options;

	score_options.grid.markings = option.grid.markings = [ {
		yaxis : {
			from : 40,
			to : 90
		},
		color : "#ff9999"
	}, {
		yaxis : {
			from : 90,
			to : 100
		},
		color : "#fcd4a5"
	}, {
		yaxis : {
			from : 100,
			to : 110
		},
		color : "#d9e8a9"
	}, {
		yaxis : {
			from : 220,
			to : 230
		},
		color : "#ff9999"
	} ];

	score_options.yaxis.min = option.yaxis.min = 40;
	score_options.yaxis.max = option.yaxis.max = 230;
	score_options.yaxis.tickSize = option.yaxis.tickSize = 1;
	option.yaxis.ticks = [ [ 40, "" ], [ 50, "50" ], [ 60, "60" ],
			[ 70, "70" ], [ 80, "80" ], [ 90, "90" ], [ 100, "100" ],
			[ 110, "110" ], [ 120, "120" ], [ 130, "130" ], [ 140, "140" ],
			[ 150, "150" ], [ 160, "160" ], [ 170, "170" ], [ 180, "180" ],
			[ 190, "190" ], [ 200, "200" ], [ 210, "210" ], [ 220, "220" ],
			[ 230, "230" ] ];

	score_options.yaxis.ticks = [ [ 40, "" ], [ 50, "" ], [ 60, "" ],
			[ 70, "" ], [ 80, "" ], [ 90, "" ], [ 100, "" ], [ 110, "" ],
			[ 120, "" ], [ 130, "" ], [ 140, "" ], [ 150, "" ], [ 160, "" ],
			[ 170, "" ], [ 180, "" ], [ 190, "" ], [ 200, "" ], [ 210, "" ],
			[ 220, "" ], [ 230, "" ] ];

	plot[3] = $.plot("#bp_chart_container", [ {
		data : data
	} ], option);

	$.plot("#bp_chart_score", [ {
		data : []
	} ], score_options);
}

/*
 * This function sets graph options and plots the Heart Rate Graph
 */
function plotHeartRateGraph(data){
	var option = graph_options;
	var score_options = score_graph_options;

	score_options.grid.markings = option.grid.markings = [ {
		yaxis : {
			from : 20,
			to : 40
		},
		color : "#ff9999"
	}, {
		yaxis : {
			from : 40,
			to : 50
		},
		color : "#d9e8a9"
	}, {
		yaxis : {
			from : 90,
			to : 110
		},
		color : "#d9e8a9"
	}, {
		yaxis : {
			from : 110,
			to : 130
		},
		color : "#fcd4a5"
	}, {
		yaxis : {
			from : 130,
			to : 140
		},
		color : "#ff9999"
	} ];

	score_options.yaxis.min = option.yaxis.min = 20;
	score_options.yaxis.max = option.yaxis.max = 140;
	score_options.yaxis.tickSize = option.yaxis.tickSize = 1;
	option.yaxis.ticks = [ [ 20, "" ], [ 30, "30" ], [ 40, "40" ],
			[ 50, "50" ], [ 60, "60" ], [ 70, "70" ], [ 80, "80" ],
			[ 90, "90" ], [ 100, "100" ], [ 110, "110" ], [ 120, "120" ],
			[ 130, "130" ], [ 140, "140" ] ];

	score_options.yaxis.ticks = [ [ 20, "" ], [ 30, "" ], [ 40, "" ],
			[ 50, "" ], [ 60, "" ], [ 70, "" ], [ 80, "" ], [ 90, "" ],
			[ 100, "" ], [ 110, "" ], [ 120, "" ], [ 130, "" ], [ 140, "" ] ];

	plot[4] = $.plot("#heartRate_chart_container", [ {
		data : data
	} ], option);

	$.plot("#heartRate_chart_score", [ {
		data : []
	} ], score_options);
}

/*
 * This function takes Y data and creates an array of x,y data points
 * We subtract 0.5 from x value to plot the data point in the middle of x axis scale
 */
function initializeGraphData(yAxisData){
	var data = [];	
	for(var i=0; i<yAxisData.length; i++){
		data.push([((i+1)-0.5) ,yAxisData[i]]);
	}	
	return data;
}


function showTooltip(event, pos, item, label, decimalPoints, unit){
	if (item) {
		var y = item.datapoint[1].toFixed(decimalPoints);

		$("#tooltip").html(label+" = " + y + unit).css({
			top : item.pageY - 42,
			left : (item.pageX) - 10
		}).fadeIn(200);
		
		$("#tooltip_arrow").css({
			top : item.pageY - 18,
			left : (item.pageX) - 7
		}).fadeIn(200);
	} else {
		$("#tooltip").hide();
		$("#tooltip_arrow").hide();
	}
}

/*
 * Redraw the graphs on window resize
 */
function redrawGraphs(){
	if (plot.length > 0) {
		  for(var i=0;i < plot.length;i++){
			  plot[i].resize();
		      plot[i].setupGrid();
		      plot[i].draw();
		  }     
	    }
}