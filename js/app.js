/*
    A need  we ran into at the company I work for, was the ability
    to use mulitiple forms with Zendesk's feedback tab.
    https://support.zendesk.com/entries/20990726-Setting-up-your-Feedback-Tab-channel

    We wanted a way to be able to route different requests using the
    feedback tab's form in a centralized location, instead of having
    different links form each form/tab. 

    Here is an approach we took, using jquery-ui tabs, and requirejs.
    Once the app is loaded by require, the html is dynamically built
    and appended to the document.
  
    Support Modal : 
      Using jquery-ui tabs to manage seperate forms to submit requests to zendesk.

    RequireJS 2.1.2
    JQuery 1.8.3
    JQuery-ui 1.9.2
   
    Requirejs API: http://requirejs.org/docs/api.html 
*/

/* 
* Specify our paths for js files.
*/
requirejs.config({
    baseUrl: "./js/lib",
    paths: {
        forms: "../forms",
        jqueryui: "jquery-ui-1.9.2/jqueryui",
        jquery: "jquery-1.8.3"
    }
});

// HTML templates.
var HTMLmodal = '<div id="supportbox"></div>';
var HTMLcloseModal = '<a id ="zenDmodal-close" href="#"></a>';

/*
*   Define our jquery 
*/
requirejs([ "jquery", "forms" ], function($q2, forms) {

    //  jQuery is pretty popular on sites.
    //  The api has a no conflict option in case multiple
    //  versions of jQuery are loaded.
    //  ref: https://api.jquery.com/jQuery.noConflict/
    $q2.noConflict(true);

    /*
    *   Our module using 
    */
    requirejs([ "jqueryui/tabs" ], function() {

        //  Loads the css on demand when require is called 
        //  appending to head. Makes app set up easier
        //  with less html needed.
        function loadCss(url) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        }

        //  HTML we will inject into the document
        //  by appeding to the body.
        //  supportmodal - our container for the modal
        //  support_close - button to close the modal
        var _modal_element = $q2(HTMLmodal); //$q2.supportmodal = $q2(HTMLmodal);
        var _closeButton_element = $q2(HTMLCloseModal); //$q2.support_close = $q2(HTMLCloseModal);

        // Close function for
         
        //  This updates the tabs with an iframe
        function updatetabs(c) {
            $q2.support_close.click(function(e) {
                e.preventDefault();
                support_modal.close();
                $q2.supportmodal.empty();
            });

            // Get the HTML for the tabs, using
            // forms.update function passing in any
            // available user info as an object.
            $q2.support_tabs = $q2(forms.update(c));
        }

        // Stuff we want to do once the document is ready.
        // On ready, add the support modal to the HTML body.
        // Bind a function to the click event on the invocking link.
        $q2(function() {
            $q2("body").append($q2.supportmodal);
            $q2.support_close.click(function(e) {
                e.preventDefault();
                support_modal.close();
                $q2.supportmodal.empty();
            });
            loadCss("http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css");
            loadCss("./css/modal.css");
        });

        //  The following methods are Based off  
        //  Jack Moore's tutorial: 
        //  http://www.jacklmoore.com/notes/jquery-modal-tutorial
        var support_modal = function() {
            var method = {};
            method.isOpen = false;
            // Centers according to parent window height & width	
            method.center = function() {
                var top, left;
                top = Math.max($q2(window).height() - $q2.supportmodal.outerHeight(), 0) / 2;
                left = Math.max($q2(window).width() - $q2.supportmodal.outerWidth(), 0) / 2;
                $q2.supportmodal.css({
                    top: top + $q2(window).scrollTop(),
                    left: left + $q2(window).scrollLeft()
                });
            };
            //  Get the tab iframes and then append it to the dialog box before opening.
            method.open = function(config) {
                method.isOpen = true;
                method.center();
                $q2(window).resize();
                $q2(window).bind("resize.supportmodal", method.center);
                //  Pass user info if available. 
                updatetabs({
                    name: config.name || "",
                    email: config.email || "",
                    url: config.url
                });
                $q2.support_tabs.tabs({
                    active: config.activetab
                });
                $q2.supportmodal.append($q2.support_close, $q2.support_tabs);
                $q2.supportmodal.show();
            };
            // Close the modal, and set the isOpen flag back to false.
            method.close = function() {
                method.isOpen = false;
                $q2.supportmodal.hide();
                $q2(window).unbind("resize.supportmodal");
            };
            $q2.supportmodal.hide();
            return method;
        }();

        // Bind the modal action to the class
        $q2(".zenDmodal-open").click(function(e) {
            e.preventDefault();
            if (support_modal.isOpen === false) {
                support_modal.open({
                    name: $q2(".zenDmodal-open").data("feedback.name"),
                    email: $q2(".zenDmodal-open").data("feedback.email"),
                    url: document.URL,
                    activetab: $q2(this).data("default")
                });
            }
        });
        return support_modal;
    });
});
