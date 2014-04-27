/*
*   Forms module
*   
*   Handles our forms data and initialization.
*   
*   - image paths
*   - form embed codes
*   - update method that builds a div with all the tabs
*   
*   Felix Nance 
*/

define([], function() {
    //  Icon source for each tab.
    var support_icon = "/img/support_icon.png";
    var contenterror_icon = "/img/cerror_icon.png";
    var suggestionbox_icon = "/img/suggestion_icon.png";
    var testimonial_icon = "/img/testimonial_icon.png";
    var tabs = {};

    //  Tabs.update(user)
    //  user - An object of the following.
    //    name: user's name
    //    email: user's email
    //    url: current page of user
    //
    //  Returns a div made up of all the tabs.
    tabs.update = function(user) {

        // Pre-populate fields with data if available
        user_name = user.name;
        user_email = user.email;
        user_url = user.url;

        //  Iframe embed for your tabs.
        //  You can use Zendesk, Google forms, etc.
        //  Example: 
        //   '<iframe id="test_frame" src="https://YOURCOMPANY.zendesk.com/account/dropboxes/12345?&name='+user_name+'&email='+user_email+'" width="760" height="425" frameborder="0"></iframe>'
        //   '<iframe src="https://docs.google.com/spreadsheet/embeddedform?formkey=YORKEY&entry_0='+user_name+'&entry_1='+user_email+'&entry_2='+user_url+'" width="760" height="425" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>'
        //  
        //  I'm using images for demo purposes.
        support_tab = '<img src="/img/zdform_support.png" width="755px" height="425px">';
        contenterror_tab = '<img src="/img/googleform_content_error.png" width="755px" height="425px">';
        suggestionbox_tab = '<img src="/img/zdform_suggestion.png" width="755px" height="425px">';
        testimonials_tab = '<img src="/img/googleform_testimonial.png" width="755px" height="425px">';

        // Combine all tabs into a div  
        all_tabs = '<div id="support-tab"> <ul> <li><a href="#tabs-1"><img src="' + support_icon + '" height="20px" width="20px">&nbsp;Support</a></li> <li><a href="#tabs-2"><img src="' + contenterror_icon + '" height="20px" width="20px">&nbsp;Content Error</a></li> <li><a href="#tabs-3"><img src="' + suggestionbox_icon + '" height="20px" width="20px">&nbsp;Suggestion Box</a></li> <li><a href="#tabs-4"><img src="' + testimonial_icon + '" height="20px" width="20px">&nbsp;Testimonials</a></li> </ul> <div id="tabs-1">' + support_tab + '</div> <div id="tabs-2">' + contenterror_tab + '</div> <div id="tabs-3">' + suggestionbox_tab + '</div> <div id="tabs-4">' + testimonials_tab + " </div> </div>";
        return all_tabs;
    };
    return tabs;
});
