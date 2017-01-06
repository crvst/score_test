/**
 * Created by rumata on 12/30/16.
 */

"use strict";

var cursor;
var svg;

function configureSVG() {
    postMessageToApp("log", "start loading");
    
    
    $('html,body').animate({
                           scrollLeft: 52196
                           }, 181160, "linear", function () {
                           postMessageToApp("song_finished", "finished");
                           });
    
    // svg = $("svg")[0];
    // postMessageToApp("log", svg.getBoundingClientRect().left);
    // svg.setAttribute('height', '550');
    // postMessageToApp("log", "ok");
    //  svg.preserveAspectRatio = "xMinYMin meet";

//    createCursor();
//    markAsLoaded();
//    scheduleCursorStart(0);
}

function createCursor() {
    var height = svg.clientHeight;
    var size = "width: 4px; height: " + height + "px;";

    var leftOffset = findInitialOffset();
    postMessageToApp("log", "offset: " + leftOffset);
    var left = "left:" + leftOffset + "px;";
    var style = "style='" + size + "position: absolute; top: 140px;" + left + "z-index: 2; background-color: rgb(234, 107, 36);'"
    $('body').append("<div id='cursor'" + style + "></div>");
    cursor = $('#cursor');
    postMessageToApp("log", cursor);
}

function findInitialOffset() {
    var firstMeasure = svg.getElementsByClassName("measure")[0];
    var firstStaff = firstMeasure.getElementsByClassName("staff")[0];
    var firstLayer = firstStaff.getElementsByClassName("layer")[0];
    var firstNoteGroup = firstLayer.getElementsByTagName("g")[0];
    postMessageToApp("log", "child " + firstNoteGroup.id);

  return firstNoteGroup.getBoundingClientRect().left;
}

function scheduleCursorStart(scheduledTime) {
  // let now = new Date()
  // var intervalTillStart = scheduledTime - now.getTime() / 1000
  // postMessageToApp("log", scheduledTime);
    
  //   postMessageToApp("log", "move to: " + svg.clientWidth);
  //   postMessageToApp("log", "duration: " + getPlaybackTime());
    
  //            $('html,body').animate({
  //                                   scrollLeft: svg.clientWidth
  //                                   }, getPlaybackTime() - 5000, "linear", function () {
  //                                   postMessageToApp("song_finished", "finished");
  //                                   });
  //            cursor.animate({
  //                           left: svg.clientWidth
  //                           }, getPlaybackTime() - 5000, "linear", function () {
  //                           postMessageToApp("song_finished", "finished cursor");
  //                           });
    
}

function getPlaybackTime() {
    var minute = 60000;
    var bitsPerMinute = 100;
    var measureTime = minute / bitsPerMinute * 4;
    var measureCount = 10;

    return 181160 //measureTime * measureCount;
}

function markAsLoaded() {
    postMessageToApp("page_loaded", "html_loaded");
}

function postMessageToApp(type, message) {
    var kit = window.webkit;
    if (kit) {
        var code = "window.webkit.messageHandlers." + type + ".postMessage(\"" + message + "\")";
        window.eval(code);
    } else {
        console.log(type + " " + message);
    }
}
