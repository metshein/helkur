var stageWidth = 0;
var stageHeight = 0;

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
});


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
