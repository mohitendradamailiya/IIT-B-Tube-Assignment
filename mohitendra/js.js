function makeDraggable(evt) {
	var svg = evt.target;
	svg.addEventListener('mousedown', startDrag);
	svg.addEventListener('mousemove', drag);
	svg.addEventListener('mouseup', endDrag);
	svg.addEventListener('mouseleave', endDrag);
	var selectedElement = false;
	var offset;
	var bx1 = 30;
	var bx2 = 550;
	var by1 = 30;
	var by2 = 270;
	var tb1 = {
		isEmpty : false
	};
	var tb2 = {
		isEmpty : false
	};
	var tb3 = {
		isEmpty : false
	};
	var startX;
	var startY;
	
	function startDrag(evt) {
		if (evt.target.classList.contains('draggable')) {
			selectedElement = evt.target;
			offset = getMousePosition(evt);
			offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
			offset.y -= parseFloat(selectedElement.getAttributeNS(null, "y"));
			startX = parseFloat(selectedElement.getAttributeNS(null, "x"));
			startY = parseFloat(selectedElement.getAttributeNS(null, "x"));
		}
	}
	
	function drag(evt) {
		if (selectedElement) {
			evt.preventDefault();
			var coord = getMousePosition(evt);
			var dx = parseFloat(selectedElement.getAttributeNS(null, "x"));
			var dy = parseFloat(selectedElement.getAttributeNS(null, "y"));
			if((coord.x - offset.x)>bx1 && (coord.x - offset.x)<bx2 ){
				dx = coord.x - offset.x;
			}
			if((coord.y - offset.y)>by1 && (coord.y - offset.y)<by2 ){
				dy = coord.y - offset.y;
			}
			selectedElement.setAttributeNS(null, "x", dx);
    		selectedElement.setAttributeNS(null, "y", dy);
		}
	}
	
	function endDrag(evt) {
		if(evt.target.classList.contains('draggable')){
			selectedElement.classList.remove("draggable");
			
			var dx = parseFloat(selectedElement.getAttributeNS(null, "x"));
			
			if(dx>370 && dx<=460){
				fillweaker(evt);
			}else{
				falldown(evt);
			}
		   }
		selectedElement = null;
	}
	
	function falldown(evt){
		var sl = evt.target;
		var box = sl.getBBox();
		var flag = -1;
		
		var ang = 0;
		var t = setInterval(function(){
			
			var cx = box.x+box.width/2;
			var cy = box.y+box.height/2;
			
			
			var dx = parseFloat(sl.getAttributeNS(null, "x"));
			var dy = parseFloat(sl.getAttributeNS(null, "y"));
			var brokentube1=false;
			var brokentube1fill=false;
			var brokentube2=false;
			if(sl.getAttributeNS(null, "id")=="tb1"){
			   brokentube1 = document.getElementById("brokentube11");
				brokentube2 =document.getElementById("brokentube12");
			}
			else if(sl.getAttributeNS(null, "id")=="tb2"){
			   brokentube1 = document.getElementById("brokentube21");
				brokentube2 =document.getElementById("brokentube22");
			}
			else if(sl.getAttributeNS(null, "id")=="tb3"){
			   brokentube1 = document.getElementById("brokentube31");
				brokentube2 =document.getElementById("brokentube32");
			}

			if(flag==-1){
				ang=ang+.5;
				if(ang>=20){
				   flag = 1;
				   }
			}
			if(flag==1){
				ang=ang-.5;
				if(ang<=-20){
				   flag = -1;
				}
			}
			if(dy<=230){
			   sl.setAttributeNS(null, "y", dy+1);
				
			}else{
				flag=0;
				sl.style.display="none";
				brokentube1.setAttributeNS(null,"x",dx);
				brokentube1.setAttributeNS(null,"y",dy);
				
				brokentube1.style.display = "block";
				var bb = brokentube1.getBBox();
				
				brokentube1.setAttributeNS(null, "transform", "rotate("+ang+" "+(bb.x+bb.width)+" "+(bb.y+bb.height)+")");
				if(ang<0 && ang >-80){
					ang--;
				}else if(ang>0 && ang <80){
					ang++;
				}else{
					dx = parseFloat(brokentube1.getAttributeNS(null, "x"));
					dy = parseFloat(brokentube1.getAttributeNS(null, "y"));
					
					brokentube2.setAttributeNS(null,"x",dx);
					brokentube2.setAttributeNS(null,"y",dy);
					
					brokentube2.style.display = "block";
					brokentube1.style.display="none";
					var bb = brokentube2.getBBox();

					brokentube2.setAttributeNS(null, "transform", "rotate("+ang+" "+(bb.x+bb.width)+" "+(bb.y+bb.height)+")");
					clearInterval(t);
				}
			}
			
			sl.setAttributeNS(null, "transform", "rotate("+ang+" "+cx+" "+cy+")");
			
		},0.01);
		
	}
	
	function fillweaker(evt){
		var sl = evt.target;
		var box = sl.getBBox();
		var inih = -1;
		var ang=0;
		var flag = true;
		var drp1 = document.getElementById("drp1");
		var drp2 = document.getElementById("drp2");
		
		drp1.setAttributeNS(null,"x",box.x+48);
		drp1.setAttributeNS(null,"y",box.y+45);
		drp2.setAttributeNS(null,"x",box.x+48);
		drp2.setAttributeNS(null,"y",box.y+45);
		
		var t = setInterval(function(){
			var cx = box.x+box.width/2;
			var cy = box.y+box.height/2;
			if(ang<=107){
				ang++;
				sl.setAttributeNS(null, "transform", "rotate("+ang+" "+cx+" "+cy+")");
			}else{
				var ele = document.getElementById("weaker_Fill");
				var y = ele.getAttributeNS(null,"y");
				var h = ele.getAttributeNS(null,"height");
				if(inih==-1){
					inih = h;
					if(sl.getAttributeNS(null,"id")=="tb1" && h==0){
						tb1.isEmpty = true;
						color = "red";
					}else if(sl.getAttributeNS(null,"id")=="tb2" && h==0){
						tb2.isEmpty = true;
					   	color = "green";
					}else if(sl.getAttributeNS(null,"id")=="tb3" && h==0){
						tb3.isEmpty = true;
					   	color = "blue";
					}else if(tb1.isEmpty && !tb2.isEmpty && !tb3.isEmpty){
						if(sl.getAttributeNS(null,"id")=="tb2" ){
							tb2.isEmpty = true;
							color = "#FF33D3";
						   }
						else if(sl.getAttributeNS(null,"id")=="tb3" ){
							tb3.isEmpty = true;
							color = "#33FFCF";
						}
					   	
					}else if(tb2.isEmpty && !tb1.isEmpty && !tb3.isEmpty){
					   	if(sl.getAttributeNS(null,"id")=="tb1"){
							tb1.isEmpty = true;
							color = "#FF33D3";
						   }
						else if(sl.getAttributeNS(null,"id")=="tb3"){
							tb3.isEmpty = true;
							color = "#33FF35";
						}
					}else if(tb3.isEmpty && !tb1.isEmpty && !tb2.isEmpty){
					   	if(sl.getAttributeNS(null,"id")=="tb2"){
							tb2.isEmpty = true;
							color = "#33FF35";
						   }
						else if(sl.getAttributeNS(null,"id")=="tb1"){
							tb1.isEmpty = true;
							color = "#33FFCF";
						}
					}else{
					   	color = "#bbb";
					}
					ele.setAttributeNS(null,"style","opacity:1;fill:"+color+";fill-opacity:.8");
				}
				if(h-inih<30){
					if(sl.getAttributeNS(null,"id")=="tb1"){
						document.getElementById("path833").style.fill="red";
						var fillrect = document.getElementById("tube_1_Fill");
						var fy = fillrect.getAttributeNS(null,"y");
						fillrect.setAttributeNS(null,"y",fy-=8);
						if(fy<70){
							drp1.style.display="block";
							
							var derp1x = parseFloat(drp1.getAttributeNS(null,"x"));
							var derp1y = parseFloat(drp1.getAttributeNS(null,"y"));
							
							//var derp2x = parseFloat(drp2.getAttributeNS(null,"x"));
							//var derp2y = parseFloat(drp2.getAttributeNS(null,"y"));
							
							//drp1.setAttributeNS(null,"x",drp1+10);
						
							drp1.setAttributeNS(null,"y",derp1y+4.5);
							if(derp1y>264){
								drp1.style.display="none";
								ele.setAttributeNS(null,"y",--y);
								ele.setAttributeNS(null,"height",++h);
							}
						}
						//fillrect.setAttribute(null,"","");
					}
					else if(sl.getAttributeNS(null,"id")=="tb2"){
						document.getElementById("path833").style.fill="green";
						var fillrect = document.getElementById("tube_2_Fill");
						var fy = fillrect.getAttributeNS(null,"y");
						fillrect.setAttributeNS(null,"y",fy-=8);
						if(fy<70){
							drp1.style.display="block";
							
							var derp1x = parseFloat(drp1.getAttributeNS(null,"x"));
							var derp1y = parseFloat(drp1.getAttributeNS(null,"y"));
							
							//var derp2x = parseFloat(drp2.getAttributeNS(null,"x"));
							//var derp2y = parseFloat(drp2.getAttributeNS(null,"y"));
							
							//drp1.setAttributeNS(null,"x",drp1+10);
						
							drp1.setAttributeNS(null,"y",derp1y+4.5);
							if(derp1y>264){
								drp1.style.display="none";
								ele.setAttributeNS(null,"y",--y);
								ele.setAttributeNS(null,"height",++h);
							}
						}
						//fillrect.setAttribute(null,"","");
					}
					else if(sl.getAttributeNS(null,"id")=="tb3"){
						document.getElementById("path833").style.fill="blue";
						var fillrect = document.getElementById("tube_3_Fill");
						var fy = fillrect.getAttributeNS(null,"y");
						fillrect.setAttributeNS(null,"y",fy-=8);
						if(fy<70){
							drp1.style.display="block";
							
							var derp1x = parseFloat(drp1.getAttributeNS(null,"x"));
							var derp1y = parseFloat(drp1.getAttributeNS(null,"y"));
							
							//var derp2x = parseFloat(drp2.getAttributeNS(null,"x"));
							//var derp2y = parseFloat(drp2.getAttributeNS(null,"y"));
							
							//drp1.setAttributeNS(null,"x",drp1+10);
						
							drp1.setAttributeNS(null,"y",derp1y+4.5);
							if(derp1y>264){
								drp1.style.display="none";
								ele.setAttributeNS(null,"y",--y);
								ele.setAttributeNS(null,"height",++h);
							}
						}
						//fillrect.setAttribute(null,"","");
					}
				}else{
					//sl.style.display="none";
					sl.setAttributeNS(null, "transform", "rotate(0 "+cx+" "+cy+")");
					returnback(evt);
					clearInterval(t);
				}
			}
			
		},0.01);
	}
	
	
	function returnback(evt){
		var sl = evt.target;
		
		if(sl.getAttributeNS(null,"id")=="tb1"){
			sl.setAttributeNS(null,"x",60);
			sl.setAttributeNS(null,"y",200);
		}else if(sl.getAttributeNS(null,"id")=="tb2"){
			sl.setAttributeNS(null,"x",100);
			sl.setAttributeNS(null,"y",200);
		}else if(sl.getAttributeNS(null,"id")=="tb3"){
			sl.setAttributeNS(null,"x",140);
			sl.setAttributeNS(null,"y",200);
		}
		
	}
	
	function getMousePosition(evt) {
		var CTM = svg.getScreenCTM();
		return {
			x: (evt.clientX - CTM.e) / CTM.a,
			y: (evt.clientY - CTM.f) / CTM.d
		};
	}
}	
