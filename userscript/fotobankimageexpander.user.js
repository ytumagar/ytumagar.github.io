// ==UserScript==
// @name         fotobank image expander
// @namespace    http://ytumagar.net/fotobankimageexpander
// @version      0.1
// @description  expand photo images in fotobank
// @author       You
// @match        https://www.fotobank.co.jp/photo_cart/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll('.img_box>img').forEach(
        (img) => {
            img.src = img.dataset.original;
            img.parentNode.style.cssText = "width: 800px";
            img.width = "800";
            img.height = "600";
        }
    );

})();
