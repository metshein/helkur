var stageWidth = 0;
var stageHeight = 0;
var isPortrait = false;
var moveLeft = 20;
var moveDown = -250;


//Vaikimisi suurused

var origSizes = new Array();
origSizes["pedestrian"] = "80x192";
/*
origSizes["dashboardImage"] = "1800x880";
origSizes["roadHighBeamImage"] = "1370x500";
origSizes["roadLowBeamImage"] = "1370x500";
origSizes["weatherImage"] = "1370x500";
origSizes["logo"] = "600x150";

*/

$('#trigger').hover(function (e) {
    $('#pop-up').show();
}, function () {
    $('#pop-up').hide();
});

$('#trigger').mousemove(function (e) {
    $("#pop-up").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});



//Kui dokument on valmis
$(document).ready(function () {
    detect_browser();
    $(window).resize(resizeHandler); //käivitub kui aknasuurust muudetakse
    resizeHandler();

    /*mees_paika();
     
	 $('#dashboardImage').attr('dragabble','false');
    */
    $('#content').hide();
    /*

        $("#beams").change(function () {
            if(this.value=="LowBeam"){
                $('#roadHighBeam>img').attr("src","img/road_lowbeam.jpg");
                    if($('#reflector').val()=="none"){
                        $('#soopilt>img').attr("src","low_man.png");
                    } else if($('#reflector').val()=="ripp"){
                        $('#soopilt>img').attr("src","low_man.png");
                    }else if($('#reflector').val()=="riba"){
                        $('#soopilt>img').attr("src","low_man.png");
                    }else{
                        $('#soopilt>img').attr("src","low_vest.png");
                    }

            } else if(this.value=="HighBeam"){
                $('#roadHighBeam>img').attr("src","img/road_highbeam.jpg");
              if($('#reflector').val()=="none"){
                        $('#soopilt>img').attr("src","high_man.png");
                    } else if($('#reflector').val()=="ripp"){
                        $('#soopilt>img').attr("src","low_man.png");
                    }else if($('#reflector').val()=="riba"){
                        $('#soopilt>img').attr("src","low_man.png");
                    }else{
                        $('#soopilt>img').attr("src","high_vest.png");
                    }

            }else{
                 $('#roadHighBeam>img').attr("src","img/road_nobeam.jpg");
                 $('#soopilt>img').attr("src","no_man.png");
            }


        });
    */

    /*
      if($('#reflector').val()=="LowBeam"){
                 $('#soopilt>img').attr("src","low_vest.png");
            } else if($('#beams').val()=="HighBeam"){
                $('#soopilt>img').attr("src","high_vest.png");
            } else{
                $('#soopilt>img').attr("src","no_man.png");
            }
    */


    /*

        $("#weather").change(function () {
            if(this.value=="dry"){
               $('#weatherLayer>img').attr("src","img/clear.png");
                 console.log(this.value);
            } else if(this.value=="rain"){
                $('#weatherLayer>img').attr("src","img/rain.png");
                 console.log(this.value);
            }else{
                 $('#weatherLayer>img').attr("src","img/mist.png");
                console.log(this.value);
            }

        });

        $("#reflector").change(function () {
            if(this.value=="none"){
               if($('#beams').val()=="LowBeam"){
                     $('#soopilt>img').attr("src","low_man.png");
                } else if($('#beams').val()=="HighBeam"){
                    $('#soopilt>img').attr("src","high_man.png");
                } else{
                    $('#soopilt>img').attr("src","no_man.png");
                }
                 console.log(this.value);
            } else if(this.value=="ripp"){
                //$('#weatherLayer>img').attr("src","img/rain.png");
                 console.log(this.value);
            } else if(this.value=="riba"){
                //$('#weatherLayer>img').attr("src","img/rain.png");
                 console.log(this.value);
            }else{
                if($('#beams').val()=="LowBeam"){
                     $('#soopilt>img').attr("src","low_vest.png");
                } else if($('#beams').val()=="HighBeam"){
                    $('#soopilt>img').attr("src","high_vest.png");
                } else{
                    $('#soopilt>img').attr("src","no_man.png");
                }

                console.log(this.value);
            }

        });

       //linn/alevik
        $("#settlement").click(function(){
    				if(!$(this).hasClass('city')){
    					$(this).attr('src', 'img/city.png');
    					$(this).addClass('city');
                        $(this).removeClass('borough');
    					console.log("Linn");
    				}else{
    					$(this).attr('src', 'img/borough.png');
    					$(this).removeClass('city');
                        $(this).addClass('borough');
    					//$('#tee>img').attr("src","road_lowbeam.jpg");
    					console.log("Alevik");
    				}
    	});*/

    //rolli valimine
    $(".roll").click(function () {
        if ($(this).val() == "woman") {
            $('.character>img').attr("src", "./img/kirstin_lowbeam.png");
        } else if ($(this).val() == "man") {
            $('.character>img').attr("src", "./img/jaak_lowbeam.png");
        }
        console.log($(this).val());
        $('#content').show();
        $('#intro').hide();

    });

    $(".back").click(function () {
        $('#content').hide();
        $('#intro').show();

    });

});

/*document load*/

//slider


/*
$(document).on('input', '#range', function() {
   // console.log($(this).val() );
    var s = $(this).val();
    var hetke_vasak = $('#soopilt>img').css('left').replace(/[^-\d.]/g, '');

    var ss = 1100+parseInt(s)*3;
    console.log(s*3);

	$('#soopilt>img').css({'width':s+'%','height':-s+'%', 'left':ss+'px'});
	$('#soopilt').css({'left':ss+'px'});

});
*/
/*
function mees_paika(){

        var hetke_slider = $('#range').val();
        console.log(hetke_slider);
        var ss = 1100+parseInt(hetke_slider)/100;
        $('#soopilt>img').css({'width':hetke_slider+'%','height':hetke_slider+'%', 'left':ss+'px'});
}*/

/*************************/
function detect_browser() {
    var oldIE;
    if ($('html').is('.lt-ie7, .lt-ie8, .lt-ie9')) {
        oldIE = true;
    }
    if (oldIE) {
        console.log("IE8 või vanem");
        $('#content').hide();
        $('#intro').hide();
        $('#ieerror').show();

    } else {
        $('#ieerror').hide();
    }
}


function resizeHandler() {
    stageWidth = $("#widthCheck").width();
    stageHeight = $("#heightCheck").height();

    masterScale = 1;
    xOffset = 0;
    yOffset = 0;

    setSize("content", stageWidth, stageHeight);

    //arvutab välja suurendamise koefitsendi
    isPortrait = false;
    if (stageWidth < 0.9 * stageHeight) {
        isPortrait = true;
    }

    if (isPortrait) {
        if (stageWidth < 800) {
            masterScale = 2 * (stageWidth / 800);
        }
        yOffset = -60;
        xOffset = 100;
    } else {
        if (stageHeight < 540) {
            masterScale = stageHeight / 540;
        }

        if (stageWidth < 700 && (stageWidth / 700) < masterScale) {
            masterScale = stageWidth / 700;
        }

        if (stageHeight < 600) {
            yOffset = stageHeight - 600;
        }

        if (yOffset < -60) {
            yOffset = -60;
        }
        //console.log("MasterScale: "+masterScale);
    }


    //console.log(stageWidth+"x"+stageHeight);
    //	setScale("dashboardImage", masterScale);
    //	setPos("dashboard", 0.5*(stageWidth - $("#dashboard").width()) + masterScale * xOffset, masterScale * yOffset );

    //	setScale("roadHighBeamImage", masterScale+0.0);
    //	setScale("roadLowBeamImage", masterScale+0.0);
    //	setScale("weatherImage", masterScale+0.0);

    //	setPos("roadHighBeam", 0.5*(stageWidth - $("#roadHighBeam").width()), masterScale * (100 + yOffset) );
    //	setPos("roadLowBeam", 0.5*(stageWidth - $("#roadLowBeam").width()), masterScale * (100 + yOffset) );
    //	setPos("weatherLayer", 0.5*(stageWidth - $("#weatherLayer").width()), masterScale * (100 + yOffset) );
    setPos("soopilt", 0.6 * (stageWidth - $("#soopilt").width()), masterScale * (120 + yOffset));

    /////nupud
    //var x0 = $("#dashboard").position().left + 0.42*$("#dashboard").width();
    //var y0 = $("#dashboard").position().top + 0.535*$("#dashboard").height();
   /* var s0 = masterScale * 55;
    var m0 = stageWidth / 40;
    if (m0 < masterScale * 25) {
        m0 = masterScale * 25;
    } else if (m0 > masterScale * 40) {
        m0 = masterScale * 40;
    }
    var b0 = Math.round(masterScale * 8);
    if (b0 < 2) {
        b0 = 2;
    }
    if (isPortrait) {
        var p = 0.3;
        s0 = stageWidth / (6 + 9 * p);
        m0 = p * s0;
        x0 = m0;
        y0 = stageHeight - m0 - s0;
    }*/
    //setButton("HighBeam", x0 + 2*s0 + 3*m0, y0);
    //setButton("Weather", x0+250 + 2*s0 + 3*m0, y0);
    //setButton("Reflector", x0+450 + 2*s0 + 3*m0, y0);

}

//slider
$(function () {
    var vana;
    var hetkeVasak;
    var hetkeYlal;
    var uusVasak;
    var uusYlal;
    console.log((stageWidth - $("#soopilt").width())*0.6);
    $("#slider-5").slider({
        orientation: "vertical",
        value: 50,
        step: 2,
        slide: function (event, ui) {
            $("#minval").html(ui.value);
            $("#minval").append("m");

            //suuna leidmine
            if (vana > ui.value) {
                //väheneb
                uusVasak = parseInt(hetkeVasak) + ui.value;
                uusYlal = parseInt(hetkeYlal) - ui.value;
                $('#soopilt').css({'left': uusVasak + 'px','top': uusYlal + 'px'})
                console.log(uusVasak+"x"+uusYlal);
            } else {
                //suureneb
                uusVasak = parseInt(hetkeVasak) - ui.value;
                uusYlal = parseInt(hetkeYlal) + ui.value;
                $('#soopilt').css({'left': uusVasak + 'px','top': uusYlal + 'px'})
                console.log(uusVasak+"x"+uusYlal);
            }
            vana = ui.value;
            //pildi muutmine
            var s = ui.value;
            $('#soopilt>img').css({'width': s + '%'});
        }
    });

    vana = $("#slider-5").slider("value");
    hetkeVasak = $('#soopilt').css("left");
    hetkeYlal = $('#soopilt').css("top");
    console.log(hetkeVasak);
    console.log(hetkeYlal);
    
    $("#minval").html($("#slider-5").slider("value"));
    $("#minval").append("m");
});


//Arvutused
function setSize(_id, _w, _h) {
    if (_id != undefined) {
        $("#" + _id).css("width", _w + "px");
        if (_h != undefined) {
            $("#" + _id).css("height", _h + "px");
        }
    }
}

function setScale(_id, _s) {
    if (_id != undefined) {
        var _t = origSizes[_id].split("x");
        $("#" + _id).css("width", _s * _t[0] + "px");
        $("#" + _id).css("height", _s * _t[1] + "px");
        //console.log(_t[0]+" ja "+_t[1])
    }
}

function setPos(_id, _x, _y) {
    if (_id != undefined) {
        $("#" + _id).css("left", _x + "px");
        $("#" + _id).css("top", _y + "px");
    }
}


function setButton(_id, _x, _y) {
    if (_id != undefined) {
        $("#btn" + _id).css("left", _x + "px");
        $("#btn" + _id).css("bottom", _y + "px");
    }
}