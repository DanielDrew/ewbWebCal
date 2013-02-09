$(function(){
	var mySheet = document.styleSheets[0];
		if (mySheet.rules) {
	    	theRules = mySheet.rules; // Internet Explorer
	   } else {
	   	 theRules = mySheet.cssRules; // Just about everything else
	   }

    function findCSSRule(selector) {
	  ruleIndex = -1;				// Default to 'not found'
	  theRules = mySheet.cssRules ? mySheet.cssRules : mySheet.rules;
	   for (i=0; i<theRules.length; i++) {
	     if (theRules[i].selectorText == selector.toLocaleLowerCase()) {
	      ruleIndex = i;
	      break;
	     } // endif theRules[i]
	   } // end for i
	  return ruleIndex;
	 } // end findCSSRule()	
 	function changeRule(selector, property, setting) {
	  theRule = mySheet.cssRules ? mySheet.cssRules[findCSSRule(selector)] : mySheet.rules[findCSSRule(selector)];
	  eval('theRule.style.' + property + '="' + setting + '"');
	  return false;
	 } // end changeRule()

	function toggleDisplay(id) {
		theElement = document.getElementById(id);
	    if (theElement.style.display == 'none') {
	    	theElement.style.display = 'block';
	      	} else {
	       	theElement.style.display = 'none';
	     	} // endif display
	   	return false;
	   } // 
  	
  	var options ={
  		el_colCount: $('#calColCount'),
  		el_areaHeaders: $("#calAreaHeaders"),
  		colCount: function(){return(el_colCount.value)},
  		areaHeaders:function(){return(Boolean(el_areaHeaders.value))}
  	};
  	$('#calColCount').change(function(){
  		calendar.changeCol($(this).val());
  	});
  	$('#calAreaHeaders').change(function(){
  		calendar.showColHeaders($(this).val());
  	});
  	$('.headerNote').resize(function(e){
  		var height =$(this).height();
  		height+='px';
  		changeRule('.headerNote', 'height', height)
  	});
$('.headerNote').change(function(){
            console.log('resized');
});


	calendar = {
		columns: 0,
		id: "",
		colWidth: "",
		init: function(id, numCols){
			var insert = '' ;
			this.id = id;
			this.columns = numCols;
			for(var cols=1; cols <= numCols; cols++){
				insert+='<div class="calRow" id="rowid'+cols+'"><div id="rowHeader'+cols+'" class="header">rowid'+cols+'</div><div id="headerNate'+cols+'" class="headerNote"></div></div>';
			}
			
			$('#'+id).html(insert);
			this.adjustCols();
		},
		changeCol: function(val){
			if (val > this.columns)
			{
				var text= ''; 
				for (this.columns; this.columns < val; this.columns++){
					text+='<div class="calRow" id="rowid'+(this.columns+1)+'"><div class="header">rowid'+(this.columns+1)+'</div><div id="headerNate'+(this.columns+1)+'" class="headerNote"></div></div>'
				}
				$('#'+this.id).append(text);
			}else{
				if ((val <= this.columns))
					for(this.columns; this.columns> val; this.columns--){
						$('#rowid'+this.columns).remove();
					}
			}
			this.adjustCols();
			
		},
		adjustCols: function(){
			console.log	('num Cols' +this.columns);
			var avaiRoom = (1195-(this.columns*2));
			console.log('Avai Rooms: ' + avaiRoom);
			var size =  avaiRoom / (this.columns);
			console.log('avg Room Area Size: '+size);
			// var size = Math.floor(size)+"px";
			size+="px";
			console.log('Normalized Size: ' + size );
			colWidth=size;
			changeRule('.calRow', 'width', size);
		},
		showColHeaders: function(toggle){
			if (toggle==="true"){
				$(".calRow > .header").show();
			}else{
				$(".calRow > .header").hide();
			}
		}
	},

	calendar.init('calHolder2',5);

	colCollection= {
		collection: $('.calRow'),
		count: $(this.collection).length,
		width: ""
	};

	

});

	
