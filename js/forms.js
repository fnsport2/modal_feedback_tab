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

    // Tab icon dimensions.
    var ICON_WIDTH = ICON_HEIGHT = '20px';

    // HTML Templates
    var TABCONTAINER ='<div id="$container-id$"><ul>$tab-icons$</ul>$tab-content$</div>';
    var TABICON ='<li><a href="#$tab-id$"><img src="$tab-img$" height="'+ICON_WIDTH+'" width="'+ICON_HEIGHT+'">$tab-title$</a></li>';
    var TABCONTENT ='<div id="$tab-id$">$embed-code$</div>';


    /*  Iframe embed for your tabs.
    *  You can use Zendesk, Google forms, etc.
    *  Example:
    *   Zendesk embed code: 
    *   '<iframe id="test_frame" src="https://YOURCOMPANY.zendesk.com/account/dropboxes/12345?&name='
    *     +user_name+'&email='+user_email+'" width="760" height="425" frameborder="0"></iframe>'
    *
    *   Google form embed code:
    *   '<iframe src="https://docs.google.com/spreadsheet/embeddedform?formkey=YORKEY&entry_0='
    *     +user_name+'&entry_1='+user_email+'&entry_2='+user_url+'" width="760" height="425" 
    *     frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>'
    */  

    //  I'm using images for demo purposes instead of the embed as mentioned above.
    var EMBEDCODE1 = '<img src="img/zdform_support.png" width="755px" height="425px">';
    var EMBEDCODE2 = '<img src="img/googleform_content_error.png" width="755px" height="425px">';
    var EMBEDCODE3 = '<img src="img/zdform_suggestion.png" width="755px" height="425px">';
    var EMBEDCODE4 = '<img src="img/googleform_testimonial.png" width="755px" height="425px">';

    var embedcode_list = [EMBEDCODE1,EMBEDCODE2,EMBEDCODE3,EMBEDCODE4];

    //  Icon source for each tab.
    var support_icon = "img/support_icon.png";
    var contenterror_icon = "img/cerror_icon.png";
    var suggestionbox_icon = "img/suggestion_icon.png";
    var testimonial_icon = "img/testimonial_icon.png";

    // Our list of icons for each tab. The order matters and will appear in the same order listed.
    var icons_list = [{title:"Support",source:support_icon},
                      {title:"Content Error", source:contenterror_icon},
                      {title:"Suggestion Box", source:suggestionbox_icon},
                      {title:"Testimonials", source:testimonial_icon}];

    var tabs = {};

    //  Tabs.update(user)
    //  user - An object of the following.
    //    name: user's name
    //    email: user's email
    //    url: current page of user
    //
    //  Returns a div made up of all the tabs.
    tabs.update = function(user) {
        var containerID = "support-tab";
        // Pre-populate fields with data if available
         var user_name = user.name || "";
         var user_email = user.email || "";
         var user_url = user.url || "";

        var ready_tabs = {icons:"", content:""};

        // Combine all tabs into a div 

        for (i in embedcode_list){
          /*
          * Replacing the user data in the embed codes to pre-fill
          * Commented out since I'm not using the acutal embed code.
          */
          //var new_embedcode = embedcode_list[i].replace("user_name",user_name)
          //.replace("user_email",user_email).replace("user_url",user_url);
  
            ready_tabs.icons = ready_tabs.icons.concat(_buildTabIcon("tab"+(Number(i+1)) , icons_list[i]));
            ready_tabs.content = ready_tabs.content.concat(_buildTabContent("tab"+(Number(i+1)) , embedcode_list[i]));
        }

        all_tabs = TABCONTAINER.replace("$container-id$",containerID).replace("$tab-icons$",ready_tabs.icons).replace("$tab-content$",ready_tabs.content);

        return all_tabs;
    };

    /**
    *  Creates the icon and title html for the tab.
    *  @param {string} tabID The id name to give the tab's div element.
    *  @param {string} tabIcon The path for the image icon.
    *  @return {string} The built HTML for tabs modal.
    */
    var _buildTabIcon = function(tabID, tabIcon){
      // Inject our data into the html template.
      return TABICON.replace("$tab-id$",tabID).replace("$tab-img$",tabIcon.source).replace("$tab-title$", tabIcon.title);
    };

    /**
    *  Creates the content for the tab body.
    *  @param {string} tabID The id name to give the tab's div element.
    *  @param {string} tabHTML The embed code for the form inside the tab body.
    *  @return {string} The built HTML for tabs modal.
    */
    var _buildTabContent = function(tabID, tabHTML){
      // Inject our data into the html template.
      return TABCONTENT.replace("$tab-id$",tabID).replace("$embed-code$",tabHTML);
    }
    return tabs;
});
