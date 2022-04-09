function include(file) {
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = file;
    document.body.appendChild(js);

}

include("js/webgl-helper.js");
include("Test01/main.js");


