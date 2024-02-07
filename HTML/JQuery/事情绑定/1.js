$(document).ready(function () {
    /*
    $("#clickme").click(function(event) {
        sayhello();
    });
    */

    $("#clickme")[0].addEventListener("click", sayhello, true);
    /*
             $("#clickme").click(function(event) {
                sayhello();
            });
    */

    function sayhello() {
        log("hello 1");
    }

    log("<br />start...");
    log("end...");
    function log(msg) {
        $("#info").append(msg + "</br>");
    }

});