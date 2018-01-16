// ==UserScript==
// @name         Better Google Task 
// @namespace    http://tampermonkey.net/ytumagargtasks
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mail.google.com/tasks/canvas*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //var iframe=document.querySelector('iframe');
    //iframe.contentWindow.document.querySelector('textarea[id*="notes-editor"]').style.height='500px';

    // Change favicon
    var linkTags = document.getElementsByTagName('link');
    linkTags[0].href = 'https://ytumagar.github.io/bettergoogletasks/img/icon-16.png';
    linkTags[0].type = 'image/png';
    linkTags[0].setAttribute('sizes','16x16');
    linkTags[1].href = 'bettergoogletasks/img/favicon.ico';
    var highResFavicon = document.createElement('link');
    highResFavicon.rel = 'icon';
    highResFavicon.type = 'image/png';
    highResFavicon.setAttribute('sizes','32x32');
    highResFavicon.href = 'https://ytumagar.github.io/bettergoogletasks/img/icon-32.png';
    document.head.appendChild(highResFavicon);

    // Add styles to tasks iframe
    var link = document.createElement('link');
    link.href= 'https://ytumagar.github.io/bettergoogletasks/css/styles.css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    var iframe = document.getElementsByTagName('iframe')[0];
    iframe.contentDocument.head.appendChild(link);

    // Function to add and remove important class
    function markImportant(row){
        var r = $(row);
        var text = r.find('div.d').html();
        if(text.match(/^!!/)){
            r.addClass('important');
        } else {
            r.removeClass('important');
        }
    }

    function markAllImportant(doc){
        doc.find('table.z tr.r').each(function(idx,row){
            markImportant(row);
        });
    }

    var initialisedIframe = false;

    function initIframe(){
        if(initialisedIframe){
            return;
        }
        // Change help link destination
        var doc = $(iframe).contents();
        var helpLink = doc.find('#\\:1\\.he');
        var nav = helpLink.parent();
        helpLink.remove();
        var newHelpLink = "<a href='http://richwells.me/better-google-tasks/' target='_blank' class='goog-flat-button w goog-inline-block' role='button' aria-hidden='true' style='text-decoration:none'>Help</a>";
        nav.prepend(newHelpLink);
        // Mark important
        markAllImportant(doc);
        doc.on('input', 'table.z tr.r div.d', function(){
            markImportant($(this).parents('tr.r'));
        });
        doc.on('DOMNodeInserted', function(e) {
            if(e.target.tagName == 'TABLE'){
                $(e.target).find('tr.r').each(function(idx,row){
                    markImportant(row);
                });
            }
        });
        initialisedIframe = true;
    }

    iframe.onload = initIframe();
    initIframe();

    
})();