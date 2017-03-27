var stageWidth = 0;
var stageHeight = 0;
var at = 250;
var cView = 0;

//Vaikimisi suurused
var origSizes = new Array();
origSizes["dashboardImage"] = "1800x880";
origSizes["roadHighBeamImage"] = "1144x362";
origSizes["roadLowBeamImage"] = "1144x362";
origSizes["logo"] = "600x150";
origSizes["pedestrian"] = "80x192";

//Kui dokument on valmis
$(document).ready(function() {
	$(window).resize(resizeHandler);	//käivitub kui aknasuurust muudetakse
	resizeHandler();
	 $('#dashboardImage').attr('dragabble','false');
    init();
});

function init() {
    $('#valiRoll').css('visibility','visible');
};


function resizeHandler() {
	stageWidth = $("#widthCheck").width();
	stageHeight = $("#heightCheck").height();

	masterScale = 1;
	xOffset = 0;
	yOffset = 0;

	setSize("content", stageWidth, stageHeight);

	//arvutab välja suurendamise koefitsendi
	isPortrait = false;
	if( stageWidth < 0.9*stageHeight ) {
		isPortrait = true;
	}

	if(isPortrait) {
		if(stageWidth < 800) {
			masterScale = 2 * (stageWidth / 800);
		}
		yOffset = -60;
		xOffset = 100;
	} else {
		if(stageHeight < 540) {
			masterScale = stageHeight / 540;
		}

		if(stageWidth < 700 && (stageWidth / 700) < masterScale) {
			masterScale = stageWidth / 700;
		}

		if(stageHeight < 600) {
			yOffset = stageHeight - 600;
		}

		if(yOffset < -60) {
			yOffset = -60;
		}
		//console.log("MasterScale: "+masterScale);
	}


	//console.log(stageWidth+"x"+stageHeight);
	setScale("dashboardImage", masterScale);
	setPos("dashboard", 0.5*(stageWidth - $("#dashboard").width()) + masterScale * xOffset, masterScale * yOffset );

	setScale("roadHighBeamImage", masterScale+0.2);
	setScale("roadLowBeamImage", masterScale+0.2);

	setPos("roadHighBeam", 0.7*(stageWidth - $("#roadHighBeam").width()), masterScale * (200 + yOffset) );
	setPos("roadLowBeam", 0.7*(stageWidth - $("#roadLowBeam").width()), masterScale * (200 + yOffset) );


    //tekstid
    setSize("valiRoll", stageWidth, stageHeight);
	setPos("valiRoll", 0, 0 );
    	$("#titleStart").css("font-size", masterScale*30 + "px");
	setPos("titleStart", 0.5*( $("#valiRoll").width() - $("#titleStart").width() ), masterScale * ( yOffset + 170 ) );

}

function showView( _nView ) {
	if( _nView == 2 && cView == 2 ) {
		_nView = 3;
	}
	if( _nView != cView ) {
		if(cView == 1) {
			hide("viewStart", 250);
			hide("btnStart", 250);

		} else if(cView == 2) {
			hide("viewInfo", 250);
			hide("btnCloseInfo", 250);

			$("#btnSlider").delay(150).animate( { top: -masterScale*10 + ( (240 - distance) / 220 ) * ( $("#bgSlider").height() - masterScale*20 ) }, 250);
			$("#btnSliderShadow").delay(150).animate( { top: -masterScale*10 + ( (240 - distance) / 220 ) * ( $("#bgSlider").height() - masterScale*20 ) }, 250);
			$("#txtDistance").delay(150).animate( { top: -masterScale*10 + ( (240 - distance) / 220 ) * ( $("#bgSlider").height() - masterScale*20 ) + masterScale*6 }, 250);


		} else if(cView == 3) {
			if(beamType == 1) {
				hide("roadLowBeam", 250, 0, 0.3);
			} else {
				hide("roadHighBeam", 250, 0, 0.3);
			}
			hide("pedestrian", 250, 0);
		}

		if(_nView == 2) {
			show("viewInfo", 250, 250);
			show("btnCloseInfo", 250, 250);
			show("iconInfoW", 250);

			$("#drag").draggable("disable");

			if(distance != 20) {
				$("#btnSlider").animate( { top: -masterScale*10 + ( (240 - 20) / 220 ) * ( $("#bgSlider").height() - masterScale*20 ) }, 250);
				$("#btnSliderShadow").animate( { top: -masterScale*10 + ( (240 - 20) / 220 ) * ( $("#bgSlider").height() - masterScale*20 ) }, 250);
				$("#txtDistance").animate( { top: -masterScale*10 + ( (240 - 20) / 220 ) * ( $("#bgSlider").height() - masterScale*20 ) + masterScale*6 }, 250);
			}

			if(cView == 1) {
				show("slider", 250, 250);
				show("btnSlider", 250, 250);
				show("btnInfo", 250, 275);
				show("btnLowBeam", 250, 300);
				show("btnHighBeam", 250, 325);
				show("btnPlain", 250, 350);
				show("btnBands", 250, 375);
				show("btnVest", 250, 400);
			}
		}
		if(_nView == 3) {
			if(!isHints) {
				isHints = true;
				setTimeout(showNextHint, 5000);
			}
			cView = _nView;
			setBeam(beamType);
			setReflector(reflectorType);

			hide("iconInfoW", 250);
			//show("iconInfo", 250);

			$("#drag").draggable("enable");

			if(beamType == 1) {
				show("roadLowBeam", 250, 150, 1, 0.3);
			} else {
				show("roadHighBeam", 250, 150, 1, 0.3);
			}
			updatePedestrian();
			show("pedestrian", 250, 250);
		}
		cView = _nView;
	}
}

//Arvutused
function setSize(_id, _w, _h) {
	if(_id != undefined) {
		$("#"+_id).css("width", _w + "px");
		if(_h != undefined) {
			$("#"+_id).css("height", _h + "px");
		}
	}
}

function setScale(_id, _s) {
	if(_id != undefined) {
		var _t = origSizes[_id].split("x");
		$("#"+_id).css("width", _s * _t[0] + "px");
		$("#"+_id).css("height", _s * _t[1] + "px");
		//console.log(_t[0]+" ja "+_t[1])
	}
}

function setPos(_id, _x, _y) {
	if(_id != undefined) {
		$("#"+_id).css("left", _x + "px");
		$("#"+_id).css("top", _y + "px");
	}
}
