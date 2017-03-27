var stageWidth = 0;
var stageHeight = 0;
var at = 250;
var cView = 0;
var roll = "";
var s = 0;

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

    show("valiRoll", 250, 400);
    show("roadLowBeam", 250, 400);
   // hide("roadHighBeam", 250, 400);
 /*   $('#valiRoll').css('visibility','visible');
    $('#roadLowBeam').css('visibility','hidden');*/
    $('#roadHighBeam').css('visibility','hidden');
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

    if(isPortrait) {
		$("#titleStart").css("font-size", masterScale*25 + "px");
		setPos("titleStart", 0.5*( $("#valiRoll").width() - $("#titleStart").width() ), masterScale * 105 );


		setFont("txtStart", masterScale*18);
		setSize("txtStart", stageWidth - masterScale*58);
		setPos("txtStart", 0.5*( stageWidth - $("#txtStart").width() ), masterScale * 152 );
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
	setPos("titleStart", 0.5*( $("#valiRoll").width() - $("#titleStart").width()), masterScale * ( yOffset + 170 ) );


    setSize("txtStart", masterScale*520);
	setPos("txtStart", 0.5*( stageWidth - $("#txtStart").width() ), masterScale * ( 240 + yOffset ) );

    setPos("pedestrian", 0.5*(stageWidth - masterScale*s*80), masterScale*167 + masterScale*yOffset - (1-s)*masterScale*162 + (1-s)*masterScale*192);

}

function showView( _nView ) {
    if(_nView){
        $('#valiRoll').css('visibility','hidden');
    }
    if(_nView == 1){
        //console.log("mees");
        roll = "mees";
        show("mees", 250, 250);

    }
    if(_nView == 2){
        roll = "naine";
         show("naine", 250, 250);
    }
    if(_nView == 3){
        roll = "laps";
         show("laps", 250, 250);
    }

    if(roll){
         console.log(roll);
       // $('#roadLowBeam').css('visibility','hidden');
        show("roadLowBeam", 250, 300);
        show("pedestrian", 250, 250);
    }
}

//***************** Abistavad arvutused******************//
//Määrab laiuse ja kõrguse
function setSize(_id, _w, _h) {
	if(_id != undefined) {
		$("#"+_id).css("width", _w + "px");
		if(_h != undefined) {
			$("#"+_id).css("height", _h + "px");
}}}

//Skaleerib
function setScale(_id, _s) {
	if(_id != undefined) {
		var _t = origSizes[_id].split("x");
		$("#"+_id).css("width", _s * _t[0] + "px");
		$("#"+_id).css("height", _s * _t[1] + "px");
}}

//Määrab asukoha
function setPos(_id, _x, _y) {
	if(_id != undefined) {
		$("#"+_id).css("left", _x + "px");
		$("#"+_id).css("top", _y + "px");
}}

//Määrab teksti suuruse
function setFont( _id, _s) {
	$("#" + _id).css("font-size", _s + "px");
}

//Kuvab animeeritult
function show(_id, _t, _d, _o, _os) {
	if(_id != undefined) {
		$("#" + _id).stop();
		if(_t == undefined) {_t = 1;}
		if(_d == undefined) {_d = 0;}
		if(_o == undefined) {_o = 1;}
		if(_os == undefined) {_os = 0;}
		$("#" + _id).css("visibility", "visible");
		$("#" + _id).css("opacity", _os);
		$("#" + _id).delay(_d).animate( { opacity: _o }, _t );
	}
}

//Peidab animeeritult
function hide(_id, _t, _d, _o) {
	if(_id != undefined) {
		$("#" + _id).stop();
		if(_t == undefined) {_t = 1;}
		if(_d == undefined) {_d = 0;}
		if(_o == undefined) {_o = 0;}
		$("#" + _id).delay(_d).animate( { opacity: _o }, _t, function() { if( _o == 0) { $("#" + _id).css("visibility", "hidden"); } } );
	}
}
