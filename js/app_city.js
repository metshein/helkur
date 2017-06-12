/*  
    Mario Metshein, Kirstin Raudsepp, Jaak Rooden
    Haapsalu Kolledž, koolipraktika 06.2017
*/

var stageWidth = 0;
var stageHeight = 0;
var images = new Array("dashboardImage", "jaak", "roadLowBeamImage","cityLowBeamImage", "weatherImage");
var imageFiles = new Array("dashboard2.png", "jaak.png", "road_lowbeam.jpg", "city_lowbeam.jpg", "noweather.png");
var imageLoaded = new Array();
var cLoadImage = 0;
var aLoading = 0;
var masterScale = 1;
var piltVasakult = 0;
var moveLeft = 20;
var moveDown = -250;
var sliderDefaultValue = 0;
var beams = "";
$('#intro').show();
$('#content').hide();
$('#ieerror').hide();
var weather = "";



/****** Piltide vaikimisi suurused **********/
var origSizes = new Array();
origSizes["dashboardImage"] = "1800x880";
origSizes["pedestrian"] = "90x214";
origSizes["roadLowBeamImage"] = "1144x362";
origSizes["cityLowBeamImage"] = "1144x362";
origSizes["weatherImage"] = "1200x463";

/********** Piltide eellaadimine ***************/
function loadImage() {
    $("#" + images[cLoadImage]).attr("src", "img/" + imageFiles[cLoadImage]);
}

function checkLoadImage(_id) {
    if (imageLoaded[_id] != true) {
        cLoadImage++;
        imageLoaded[_id] = true;
        if (images[cLoadImage] != undefined) {
            loadImage();
        }
    }
    show("dashboard");
}

/********** Avalehe popup ***************/
$('#trigger').hover(function (e) {
    $('#pop-up').show();
}, function () {
    $('#pop-up').hide();
});

$('#trigger').mousemove(function (e) {
    $("#pop-up").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
});

/********** Kui dok on valmis ***************/
$(document).ready(function () {
    detect_browser();
    $(window).resize(resizeHandler);
    resizeHandler();
    $('#content').hide();
    loadImage();
});

/********** Rolli valimine ***************/
$(".roll").click(function () {
    $("#pedestrianRole").removeAttr('class');
    $("#pedestrianRole").addClass($(this).val());
    $('#pedestrianRole').attr("src", "./img/" + $(this).val() + "_lowbeam_city.png");
    $('#helkurImage').attr("src", "img/kid_lowbeam_puudub.png");
    $('#reflectorIcon').attr("src", "img/helkur_pole.svg");
    $('#beamIcon').attr("src", "img/tuled_lowbeam.svg");
    beams = "lowbeam";
    $("#lights").removeAttr('class');
    $('#cityLowBeamImage').attr("src", "img/city_lowbeam.jpg");
    $("#lights").addClass("background");
    $('#content').show();
    $('#intro').hide();
    $('#cityLowBeamImage').show();

    var s = -4;
    setPos("dashboard", 0.5 * (stageWidth - $("#dashboard").width()) + masterScale * xOffset, masterScale * yOffset);
    setPos("pedestrian", (0.55 * (stageWidth - masterScale * s * 90)) - sliderDefaultValue * 10, (masterScale * 167 + masterScale * yOffset - (1 - s) * masterScale * 162 + (1 - s) * masterScale * 192 + 50) + sliderDefaultValue*2);

    //piltVasakult = 0.45 * (stageWidth - masterScale * s * 90);
    show("pedestrian");
    setScale("roadLowBeamImage", masterScale * 1.3);
    setScale("cityLowBeamImage", masterScale * 1.3);
    setPos("lights", 0.5 * (stageWidth - $("#lights").width()), masterScale * (110 + yOffset));
    setPos("citylights", 0.5 * (stageWidth - $("#citylights").width()), masterScale * (110 + yOffset));
    setScale("weatherImage", masterScale * 1.2);
    setPos("weatherImage", 0.5 * (stageWidth - $("#weatherImage").width()), masterScale * (110 + yOffset));

    if (sliderDefaultValue > 39 && beams == "lowbeam") {
        $('#pedestrianRole').css({
            'opacity': '0'
        });
    } else if (sliderDefaultValue > 44 && beams == "highbeam") {
        $('#pedestrianRole').css({
            'opacity': '0'
        });
    } else {
        $('#pedestrianRole').css({
            'opacity': '1'
        });
    }
});

/********** IE<9 tuvastamine ***************/
function detect_browser() {
    var oldIE;
    if ($('html').is('.lt-ie7, .lt-ie8, .lt-ie9')) {
        oldIE = true;
    }
    if (oldIE) {
        $('#content').hide();
        $('#intro').hide();
        $('#ieerror').show();
    } else {
        $('#ieerror').hide();
    }
}

//Muudab suurusi
function resizeHandler() {
    console.log(sliderDefaultValue);
    stageWidth = $("#widthCheck").width();
    stageHeight = $("#heightCheck").height();

    masterScale = 1;
    xOffset = 0;
    yOffset = 0;

    setSize("content", stageWidth, stageHeight);

    //arvutab välja suurendamise koefitsendi
    /* if (stageHeight < 540) {
         masterScale = stageHeight / 540;
         // console.log("<540");
     }
     if (stageWidth < 700) {
         masterScale = stageWidth / 700;
         console.log("<700");
     } else {
         console.log(">700");
     }
     if (stageHeight < 600) {
         yOffset = stageHeight - 600;
         // console.log("<600");
     }
     if (yOffset < -60) {
         yOffset = -60;
     }*/

    setScale("dashboardImage", masterScale);
    setPos("dashboard", 0.5 * (stageWidth - $("#dashboard").width()) + masterScale * xOffset, masterScale * yOffset);

    var s = -4;

    setPos("pedestrian", (0.55 * (stageWidth - masterScale * s * 90)) - sliderDefaultValue *10, (masterScale * 167 + masterScale * yOffset - (1 - s) * masterScale * 162 + (1 - s) * masterScale * 192 + 50) + sliderDefaultValue*2);

    piltVasakult = 0.55 * (stageWidth - masterScale * s * 90);

    setScale("roadLowBeamImage", masterScale * 1.3);
    setScale("cityLowBeamImage", masterScale * 1.3);

    setPos("lights", 0.5 * (stageWidth - $("#lights").width()), masterScale * (110 + yOffset));
    setPos("citylights", 0.5 * (stageWidth - $("#citylights").width()), masterScale * (110 + yOffset));
    setScale("weatherImage", masterScale * 1.2);
    setPos("weatherImage", 0.5 * (stageWidth - $("#weatherImage").width()), masterScale * (110 + yOffset));
    
    
}

/********** Nupud ***************/

//Tagasi
$(".back").click(function () {
    $('#content').hide();
    $('#intro').show();
});

/********** Slider ***************/
$(function () {
    var s = -4;
    var pildiVasakult = 0.55 * (stageWidth - masterScale * s * 90);
    var piltYlevalt = masterScale * 167 + masterScale * yOffset - (1 - s) * masterScale * 162 + (1 - s) * masterScale * 192 + 50;
    var uusVasak = 0;
    var uusYlevalt = 0;

    $("#slider-5").slider({
        orientation: "vertical",
        value: 0,
        step: 1,
        slide: function (event, ui) {
            $("#minval").html(Math.round(ui.value*1.5));
            $("#minval").append("m");

            //pildi muutmine
            var s = 100 - ui.value * 3;
            if (s >= 90) {
                s = 90;
            }
            //console.log(ui.value);
            $('#pedestrianRole').css({
                'width': s + 'px',
                'height': 'auto'
            });
            
            $('#pedestrian').css({
                'top': piltYlevalt + (ui.value*2) + 'px',
                'left': piltVasakult - (ui.value*10) + 'px'
            });

            // console.log(beams);
            if (sliderDefaultValue > 39 && beams == "lowbeam") {
                $('#pedestrianRole').css({
                    'opacity': '0'
                });
            } else if (sliderDefaultValue > 44 && beams == "highbeam") {
                $('#pedestrianRole').css({
                    'opacity': '0'
                });
            } else {
                $('#pedestrianRole').css({
                    'opacity': '1'
                });
            }

            //helkurpildi muutmine
            $('#helkurImage').css({
                'width': s + 'px',
                'height': 'auto'
            });

            if (stageWidth < 700) {
                masterScale = stageWidth / 700;
                // console.log(masterScale);
            } else {}

            sliderDefaultValue = ui.value;
        }
    });

    $("#minval").html($("#slider-5").slider("value"));
    $("#minval").append("m");
});

/********** Ilmaolud ***************/
$('#ilm li').on('click', function () {
    // console.log($(this).text());
    weather = $(this).text();
    if ($(this).text() == "Udu" || $(this).text() == "Mist" || $(this).text() == "Туман") {
        $('#weatherImage').attr("src", "img/mist.png");
        $('#weatherIcon').attr("src", "img/ilm_udu.svg");
        $('#pedestrianRole').css({'filter': 'brightness(60%)'});
        $('#lights img').css({'filter': 'brightness(50%)'});
    } else if ($(this).text() == "Vihm" || $(this).text() == "Rain" || $(this).text() == "Дождь") {
        $('#weatherImage').attr("src", "img/rain.png");
        $('#weatherIcon').attr("src", "img/ilm_sademed.svg");
        $('#pedestrianRole').css({'filter': 'brightness(50%)'});
        $('#lights img').css({'filter': 'brightness(50%)'});
    } else if ($(this).text() == "Selge"  || $(this).text() == "Clear" || $(this).text() == "Ясно") {
        $('#weatherImage').attr("src", "img/noweather.png");
        $('#weatherIcon').attr("src", "img/ilm_kuiv.svg");
        $('#pedestrianRole').css({'filter': 'brightness(100%)'});
        $('#lights img').css({'filter': 'brightness(100%)'});
    }
    console.log(weather);
});
/********** Tuled ***************/
$('#tuled li').on('click', function () {

    $(".background").removeClass("nobeam");
    // console.log("Tuled: "+$(this).text());
    // console.log("Tuled: " + $(this).attr("class"));
    $('.background>img').attr("src", "img/city_" + $(this).attr("class") + ".jpg");
    $('#beamIcon').attr("src", "img/tuled_" + $(this).attr("class") + ".svg");
    beams = $(this).attr("class");
    if ($("#pedestrianRole").hasClass("woman")) {
        $('#pedestrianRole').attr("src", "img/woman_" + $(this).attr("class") + "_city.png");
    }
    if ($("#pedestrianRole").hasClass("man")) {
        $('#pedestrianRole').attr("src", "img/man_" + $(this).attr("class") + "_city.png");
    }
    if ($("#pedestrianRole").hasClass("kid")) {
        $('#pedestrianRole').attr("src", "img/kid_" + $(this).attr("class") + "_city.png");
    }

    if ($(this).attr("class") == "nobeam") {
        //$('#helkurImage').attr("src", "img/man_lowbeam_puudub.png");
        $(".background").addClass($(this).attr("class"));
        $('#beamIcon').attr("src", "img/tuled_nobeam.svg");
        beams = "nobeam";
    }

    console.log(sliderDefaultValue + " - " + beams);
    if (sliderDefaultValue > 39 && beams == "lowbeam") {
        $('#pedestrianRole').css({
            'opacity': '0'
        });
    } else if (sliderDefaultValue > 44 && beams == "highbeam") {
        $('#pedestrianRole').css({
            'opacity': '0'
        });
    } else {
        $('#pedestrianRole').css({
            'opacity': '1'
        });
    }
});

/********** Helkur ***************/
$('#helkur li').on('click', function () {
    //console.log($(this).attr("class"));
    if ($("#lights").hasClass("nobeam")) {
        $('#reflectorIcon').attr("src", "img/helkur_pole.svg");
    } else {
        if ($("#pedestrianRole").hasClass("kid")) {
            $('#helkurImage').attr("src", "img/kid_lowbeam_" + $(this).attr("class") + ".png");
        }
        if ($("#pedestrianRole").hasClass("man")) {
            $('#helkurImage').attr("src", "img/man_lowbeam_" + $(this).attr("class") + ".png");
        }
        if ($("#pedestrianRole").hasClass("woman")) {
            $('#helkurImage').attr("src", "img/woman_lowbeam_" + $(this).attr("class") + ".png");
        }
        $('#reflectorIcon').attr("src", "img/helkur_" + $(this).attr("class") + ".svg");
    }
});



/********** Arvutused ***************/
function show(_id) {
    if (_id != undefined) {
        $("#" + _id).css("visibility", "visible");
    }
}

function hide(_id) {
    if (_id != undefined) {
        $("#" + _id).css("visibility", "hidden");
    }
}

function setPos(_id, _x, _y) {
    if (_id != undefined) {
        $("#" + _id).css("left", _x + "px");
        $("#" + _id).css("top", _y + "px");
    }
}

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
    }
}