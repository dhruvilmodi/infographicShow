/* jslint browser: true */
/* global $, TweenMax, window, Power2, Back, Sine */

// hides all screens except for screen 1
$("section:gt(0)").hide();
        
// set initial screen number
var screenNum = 1;
// transition duration
var duration = 1;
// delay for starting screen animations
// initially set to 3s to allow the preloader to show and then updated in loadScreen1
var delay = 2;

// hide/show navigation functions
function hideNav()
{
    TweenMax.to(".next", 0.25, {
        right: -100,
        ease: Power2.easeOut
    });
    
    TweenMax.to(".prev", 0.25, {
        left: -100,
        ease: Power2.easeOut
    });
}

function showNav()
{
    TweenMax.to(".next", 0.25, {
        right: 20,
        ease: Power2.easeOut
    });
    
    TweenMax.to(".prev", 0.25, {
        left: 20,
        ease: Power2.easeOut
    });
}

// next and previous navigation functions
function showNextScreen()
{
    // targets the current screen
    var currentScreen = "#screen" + screenNum;
    // sets next screen number
    screenNum++;
    // targets the next screen
    var nextScreen = "#screen" + screenNum;
    // transition out navigation
    hideNav();
    // transitions current screen out
    TweenMax.fromTo(currentScreen, duration, {
        y: 0,
        scale: 1,
        ease: Sine.easeIn,
    }, {
        y: -960,
        scale: 0,
        ease: Sine.easeOut
    });
    // shows next screen
    $(nextScreen).show();
    // transitions next screen in
    TweenMax.fromTo(nextScreen, duration, {
        y: 960,
        scale: 0,
        ease: Sine.easeOut,
    }, {
        y: 0,
        scale: 1,
        ease: Sine.easeOut,
        onComplete: function() {
            // hide current screen
            $(currentScreen).hide();
            // transition on navigation
            showNav();
        }
    });
    
    // load function to animate on contents of screen
    window["loadScreen" + screenNum]();
    
    // stop voiceover from playing
    $("#voiceover").trigger("pause");
}

function showPrevScreen()
{
    // targets the current screen
    var currentScreen = "#screen" + screenNum;
    // sets next screen number
    screenNum--;
    // targets the next screen
    var prevScreen = "#screen" + screenNum;
    // transition out navigation
    hideNav();
    // transitions current screen out
    TweenMax.fromTo(currentScreen, duration, {
        y: 0,
        scale: 1,
        ease: Sine.easeOut,
    }, {
        y: 960,
        scale: 0,
        ease: Sine.easeOut,
    });
    // shows previous screen
    $(prevScreen).show();
    // transitions next screen in
    TweenMax.fromTo(prevScreen, duration, {
        y: -960,
        scale: 0,
        ease: Sine.easeOut,
    }, {
        y: 0,
        scale: 1,
        ease: Sine.easeOut,
        onComplete: function() {
            // hide current screen
            $(currentScreen).hide();
            // transition on navigation
            showNav();
        }
    });
    
    // load function to animate on contents of screen
    window["loadScreen" + screenNum]();
    
    // stop voiceover from playing
    $("#voiceover").trigger("pause");
}

// next and previous button clicks
$(".next").click(showNextScreen);
$(".prev").click(showPrevScreen);

// LOAD SCREEN AUDIO ///////////////////////////////////////////
function loadScreenAudio()
{
    $("#voiceover").attr("src", "audio/screen" + screenNum + ".mp3").trigger("play");
}

// SET UP MAIN INTERFACE ///////////////////////////////////////
// fade on main div on page load and hide loading gif
TweenMax.from("main", duration, {
    delay: delay - 1,
    x: $(window).height(),
    ease: Back.easeOut,
    onComplete: function() {
        $("#loading").hide();
        // set volume of BG music to zero
        $("#background").trigger("play");
        // fade in BG music to 50% volume
        $("#background").animate({volume:0.2}, 2000);
    }
});

// CONTROL BACKGROUND AUDIO ////////////////////////////////////
$("#playPause").click(function(){
    
    if($(this).hasClass("pause"))
    {
        $("#background").trigger("pause");
        $(this).removeClass("pause").addClass("play");
    }
    else
    {
        $("#background").trigger("play");
        $(this).removeClass("play").addClass("pause");
    }
    
});

// functions for loading on content of each screen
// LOAD SCREEN 1 ///////////////////////////////////////////////
function loadScreen1()
{
    // animate content on with delays
    TweenMax.from("#screen1 h1", duration, {
        opacity: 0
    });
    
    TweenMax.from("#screen1 img", duration, {
        delay: delay,
        opacity: 0
    });
    
    TweenMax.from("#screen1_career", duration, {
        delay: delay + 0.5,
        scale: 0,
        ease: Power2.easeOut
    });
    
    TweenMax.from("#screen1_life", duration, {
        delay: delay + 0.5,
        scale: 0,
        ease: Power2.easeOut
    });
    
    
    $(".next").hover(function() {
        
        TweenMax.to("#screenshot1", 0.25, {
            opacity: 1,
        });
        
    }, function(){
        
        TweenMax.to("#screenshot1", 0.25, {
            opacity: 0,
        });
    });
    
    
    // update delay to wait for screen transition including navigation
    delay = duration + 0.5;
    
    TweenMax.delayedCall(delay + 2, loadScreenAudio);
    
}
// animate on content of screen 1 on page load
loadScreen1();




// LOAD SCREEN 2 ///////////////////////////////////////////////
function loadScreen2()
{
    // animate content on with delays
    TweenMax.from("#screen2 h1", duration, {
        delay: delay,
        opacity: 0
    });
    
    $("#screen2_h1_1").hover(function() {
        
        TweenMax.to("#ele1 img", 0.25, {
            scale: 1.5
        });
        
    }, function(){
        
        TweenMax.to("#ele1 img", 0.25, {
            scale: 1
        });
    });
    
    TweenMax.from("#ele1", duration, {
        delay: delay + 0.5,
        scale: 0,
        ease: Power2.easeOut
    });
    
      // apply sound effect
    TweenMax.delayedCall(delay + 0.5, function(){
        $("#bubble1").trigger("play");
    });
    
    // ========= hover 1 ================
    
    // single-tween hover
    $("#ele1").hover(function() {
        
        TweenMax.to("#ele1hover_1", 0.25, {
            left: 30,
            bottom: 200
        });
        
        TweenMax.to("#ele1hover_2", 0.35, {
            left: 100,
            bottom: 140
        });
        
        TweenMax.to("#ele1hover_3", 0.45, {
            left: 215,
            bottom: 80
        });
        
        TweenMax.to("#ele1hover_4", 0.35, {
            left: 320,
            bottom: 140
        });
        
        TweenMax.to("#ele1hover_5", 0.25, {
            left: 410,
            bottom: 210
        });
        
        // apply sound effect
        $("#bubble1").trigger("play");
        
    }, function() {
        
        TweenMax.to("#ele1hover_1", 0.25, {
            bottom: -100
        });
        
        TweenMax.to("#ele1hover_2", 0.35, {
            bottom: -100
        });
        
        TweenMax.to("#ele1hover_3", 0.45, {
            bottom: -100
        });
        
        TweenMax.to("#ele1hover_4", 0.35, {
            bottom: -100
        });
        
        TweenMax.to("#ele1hover_5", 0.25, {
            bottom: -100
        });
        
        // apply sound effect
        $("#bubble2").trigger("play");
        
    });
    
    
    TweenMax.from("#screen2 h2", duration, {
        delay: delay + 1.5,
        scale: 0,
        ease: Power2.easeOut
    });
    
    $("#screen2_h2_1").hover(function() {
        
        TweenMax.to("#screen2_hand", 0.25, {
            opacity: 1,
        });
        
    }, function(){
        
        TweenMax.to("#screen2_hand", 0.25, {
            opacity: 0,
        });
    });
    
    $(".prev").hover(function() {
        
        TweenMax.to("#screenshot2", 0.25, {
            opacity: 1,
        });
        
    }, function(){
        
        TweenMax.to("#screenshot2", 0.25, {
            opacity: 0,
        });
    });
    
    // start voiceover
    TweenMax.delayedCall(delay + 2, loadScreenAudio);
    
}

// LOAD SCREEN 3 ///////////////////////////////////////////////
function loadScreen3()
{
    // animate content on with delays
    TweenMax.from("#screen3 h1", duration, {
        delay: delay,
        opacity: 0
    });
    
    TweenMax.from("#ele6", duration, {
        delay: delay + 0.25,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    $("#ele6").hover(function() {
        
        TweenMax.to("#change_scream", 0.25, {
            opacity: 1,
            left: 100
        });
        
        TweenMax.to("#change_peace", 0.25, {
            opacity: 1,
            right: 100
        });
        
    }, function(){
        
        TweenMax.to("#change_scream", 0.25, {
            left: -100,
            opacity: 0
        });
        
        TweenMax.to("#change_peace", 0.25, {
            right: -100,
            opacity: 0
        });
    });
    
    TweenMax.from("#screen3_subheading", duration, {
        delay: delay + 1,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    TweenMax.from("#screen3_desc", duration, {
        delay: delay + 2,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    // start voiceover
    TweenMax.delayedCall(delay + 1.5, loadScreenAudio);
    
    
    // single-tween hover
    $("#ele8").hover(function() {
        
        TweenMax.to("#ele8hover", 0.5, {
            right: 100
        });
        
        // apply sound effect
        $("#bubble1").trigger("play");
        
    }, function() {
        
        TweenMax.to("#ele8hover", 0.5, {
            right: -100
        });
        
        // apply sound effect
        $("#bubble2").trigger("play");
        
    });
    
    // multi-tween hover
    $("#ele7").hover(function() {
        
        TweenMax.to(this, 0.5, {
            width: 200,
            height: 200
        });
        
        TweenMax.to("#ele7content", 0.5, {
            opacity: 1
        });
        
    }, function() {
        
        TweenMax.to("#ele7content", 0.5, {
            opacity: 0
        });
        
        TweenMax.to(this, 0.5, {
            width: 100,
            height: 100
        });
        
    });
    
}

// LOAD SCREEN 4 ///////////////////////////////////////////////
function loadScreen4()
{
    // animate content on with delays
    TweenMax.from("#screen4 h1", duration, {
        delay: delay,
        opacity: 0
    });
    
    TweenMax.from("#ele7", duration, {
        delay: delay + 0.25,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    $("#ele7").hover(function() {
        
        TweenMax.to("#addnew_puzzle1", 0.25, {
            opacity: 1,
            left: 300
        });
        
        TweenMax.to("#addnew_puzzle2", 0.25, {
            opacity: 1,
            right: 300
        });
        
    }, function(){
        
        TweenMax.to("#addnew_puzzle1", 0.25, {
            left: -100,
            opacity: 0
        });
        
        TweenMax.to("#addnew_puzzle2", 0.25, {
            right: -100,
            opacity: 0
        });
    });
    
    TweenMax.from("#screen4_subheading", duration, {
        delay: delay + 1,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    TweenMax.from("#screen4_desc", duration, {
        delay: delay + 2,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    // start voiceover
    TweenMax.delayedCall(delay + 0.25 + duration, loadScreenAudio);
    
}

// LOAD SCREEN 5 ///////////////////////////////////////////////
function loadScreen5()
{
    // animate content on with delays
    TweenMax.from("#screen5 h1", duration, {
        delay: delay,
        opacity: 0
    });
    
    TweenMax.from("#ele8", duration, {
        delay: delay + 0.25,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    $("#ele8").hover(function() {
        
        TweenMax.to("#learning_comp", 0.25, {
            opacity: 1,
            left: 100
        });
        
    }, function(){
        
        TweenMax.to("#learning_comp", 0.25, {
            left: 200,
            opacity: 0
        });
        
        TweenMax.to("#addnew_puzzle2", 0.25, {
            right: -100,
            opacity: 0
        });
    });
    
    TweenMax.from("#screen5_subheading", duration, {
        delay: delay + 1,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    TweenMax.from("#screen5_desc", duration, {
        delay: delay + 2,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    // start voiceover
    TweenMax.delayedCall(delay + 0.5, loadScreenAudio);
    
    // click/close to view overlay content
    $("#ele13").click(function() {
        
        $("#ele13content").show();
        
        TweenMax.fromTo("#ele13content", 0.5, {
            opacity: 0
        }, {
            opacity: 1
        });
        
    });
    
    $("#ele13content .close").click(function() {
        
        TweenMax.to("#ele13content", 0.5, {
            opacity: 0,
            onComplete: function() {
                $("#ele13content").hide();
            }
        });
        
    });
    
    // click/close to view overlay content
    $("#ele14").click(function() {
        
        $("#ele14content").show();
        
        TweenMax.fromTo("#ele14content", 0.5, {
            opacity: 0
        }, {
            opacity: 1
        });
        
    });
    
    $("#ele14content .close").click(function() {
        
        TweenMax.to("#ele14content", 0.5, {
            opacity: 0,
            onComplete: function() {
                $("#ele14content").hide();
            }
        });
        
    });
    
}

// LOAD SCREEN 6 ///////////////////////////////////////////////
function loadScreen6()
{
    // animate content on with delays
    TweenMax.from("#screen6 h1", duration, {
        delay: delay,
        opacity: 0
    });
    
    TweenMax.from("#screen6_image", duration, {
        delay: delay + 0.25,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    $("#screen6_image").hover(function() {
        
        TweenMax.to("#get_success1", 0.25, {
            opacity: 1,
            left: 150
        });
        
        TweenMax.to("#get_success2", 0.25, {
            opacity: 1,
            right: 150
        });
        
    }, function(){
        
        TweenMax.to("#get_success1", 0.25, {
            left: -100,
            opacity: 0
        });
        
        TweenMax.to("#get_success2", 0.25, {
            right: -100,
            opacity: 0
        });
    });
    
    TweenMax.from("#screen6_subheading", duration, {
        delay: delay + 1,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    TweenMax.from("#screen6_desc", duration, {
        delay: delay + 2,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    // looping animation using yoyo & repeat properties
    // start before it animates on
    TweenMax.fromTo("#ele15", 1, {
        rotation: -45
    }, {
        delay: delay,
        rotation: 45,
        yoyo: true,
        repeat: -1,
        ease: Power2.easeInOut
    });
    
    TweenMax.from("#ele15", duration, {
        delay: delay + 0.25,
        opacity: 0
    });
    
    // start voiceover
    TweenMax.delayedCall(delay + 0.25, loadScreenAudio);
    
}

// LOAD SCREEN 7 ///////////////////////////////////////////////
function loadScreen7()
{
    // animate content on with delays
    TweenMax.from("#screen7 h1", duration, {
        delay: delay,
        opacity: 0
    });
    
    TweenMax.from("#screen7_image", duration, {
        delay: delay + 0.25,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    TweenMax.from("#screen7_subheading", duration, {
        delay: delay + 1,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    TweenMax.from("#screen7_desc", duration, {
        delay: delay + 2,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    // looping animation using yoyo & repeat properties
    // start before it animates on
    TweenMax.fromTo("#ele15", 1, {
        rotation: -45
    }, {
        delay: delay,
        rotation: 45,
        yoyo: true,
        repeat: -1,
        ease: Power2.easeInOut
    });
    
    TweenMax.from("#ele15", duration, {
        delay: delay + 0.25,
        opacity: 0
    });
    
    // start voiceover
    TweenMax.delayedCall(delay + 0.25, loadScreenAudio);
    
}

// LOAD SCREEN 8 ///////////////////////////////////////////////
function loadScreen8()
{
    // animate content on with delays
    TweenMax.from("#screen8 h1", duration, {
        delay: delay,
        opacity: 0
    });
    
    TweenMax.from("#screen8_h3", duration, {
        delay: delay + 0.25,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    TweenMax.from("#screen8_desc", duration, {
        delay: delay + 1,
        opacity: 0,
        ease: Power2.easeOut
    });
    
    // looping animation using yoyo & repeat properties
    // start before it animates on
    TweenMax.fromTo("#ele15", 1, {
        rotation: -45
    }, {
        delay: delay,
        rotation: 45,
        yoyo: true,
        repeat: -1,
        ease: Power2.easeInOut
    });
    
    TweenMax.from("#ele15", duration, {
        delay: delay + 0.25,
        opacity: 0
    });
    
    // start voiceover
    TweenMax.delayedCall(delay + 0.25, loadScreenAudio);
    
}