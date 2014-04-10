/**
 * This module pollyfills the CustomEvent functionality for Internet Explorer 9,10 and 11.
 */

(function () {

    "use strict";

    // Turn off jshint warnings about new Number() in borrowed code below
    /*jshint -W053 */

    // Taken from : http://stackoverflow.com/questions/17907445/how-to-detect-ie11
    function ie_ver(){
        var iev=0;
        var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
        var trident = !!navigator.userAgent.match(/Trident\/7.0/);
        var rv=navigator.userAgent.indexOf("rv:11.0");

        if (ieold) iev=new Number(RegExp.$1);
        if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
        if (trident&&rv!=-1) iev=11;

        return iev;
    }

    // Taken from: http://stackoverflow.com/questions/14358599/object-doesnt-support-this-action-ie9-with-customevent-initialization
    var ieVer = ie_ver();
    if(ieVer <= 11) {
        (function () {
            function CustomEvent ( event, params ) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                var evt = document.createEvent( 'CustomEvent' );
                evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                return evt;
            }

            CustomEvent.prototype = window.Event.prototype;

            window.CustomEvent = CustomEvent;
        })();
    }

}());
