modal_feedback_tab
==================

Custom feedback-tab example.

Live Demo: http://fnsport2.github.io/modal_feedback_tab/

Use mulitiple forms with Zendesk's feedback tab.
https://support.zendesk.com/entries/20990726-Setting-up-your-Feedback-Tab-channel

We wanted a way to be able to route different requests using the feedback tab's form in a centralized location, instead of having different links for each form/tab. Here is an approach we took using jquery-ui tabs, and requirejs. Once the app is loaded by require, the html is dynamically built and appended to the document.

&nbsp;
#### Dependecies:
---
* RequireJS v2.1.2
* JQuery v1.8.3
* JQuery-ui v1.9.2
   
Requirejs API: http://requirejs.org/docs/api.html 

----
&nbsp;
&nbsp;
## Usage:

### 1. Load Script

Include the following code. The data-main is the location of the app.js file, and src is the require.js file.


    
```
<script data-main="js/app" src="js/require.js"></script>
```

### 2. Bind a click event

The modal binds itself to the class "zendDModal-open". A class is used so you can associate more than one element ( see example below).

 EX: 
 ```
 <a class="zenDmodal-open">Help</a></span>
 ```

## Options:

&nbsp;
#### Set Default Tab
&nbsp; You can also set which tab you would like to display once opened by using data-defualt="<tab #>". List order [0,1,2,3] first tab is 0.
 
EX: 
```
<a class="zenDmodal-open" data-default="0">Help</a></span> # Open first tab
<a class="zenDmodal-open" data-default="1" heref="#"> Content Error</a> # Open second tab
```
     
#### Pre-Fill Data

&nbsp; If you have the user's name and email, include them as arguments to be passed to the modal. This will require an additional div element to be added but can be hidden.

EX: 
```
<div id="fnsport2-feedback-tab" data-feedback-name="Felix Nance" data-feedback-email="fnsport2@foo.com"><span> <a class="zenDmodal-open">Help</a></span></div>
```

