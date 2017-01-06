function configureSVG() {
    $('html,body').animate({
                           scrollLeft: 52196
                           }, 181160, "linear", function () {
                           postMessageToApp("song_finished", "finished");
                           });
}
