// ==UserScript==
// @name         PLLrecog shortcuts
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds keyboard shortcuts to Gil Zussman's PLL recog quiz
// @author       JaiWWW
// @license      GPL-3.0
// @match        https://speedcubedb.com/t/pllrecog
// @icon         https://www.google.com/s2/favicons?sz=64&domain=speedcubedb.com
// @homepageURL  https://github.com/JaiWWW/pll-recog-shortcuts
// @supportURL   https://github.com/JaiWWW/pll-recog-shortcuts/issues/new
// @downloadURL  https://github.com/JaiWWW/pll-recog-shortcuts/raw/main/pll-recog-shortcuts.user.js
// @updateURL    https://github.com/JaiWWW/pll-recog-shortcuts/raw/main/pll-recog-shortcuts.user.js
// @grant        none
// ==/UserScript==

/*

How to use this script:


This script adds keyboard shortcuts to the quiz, so you can use your keyboard to
answer the training questions instead of finding and mousing over the the buttons.

If you want to guess a PLL that's part of a group, eg. Ub, first you will press
your U key, and then the group selection indicator under the timer will show the
letter U. From there, simply press b on your keyboard to guess the Ub case.

If you select a group such as R, and before pressing a or b you decide it's
actually a different PLL, you can press either backspace, delete or escape to
return to the default selection mode (represented by the - character).

Notes: this script is not case-sensitive, it will work with capslock or the shift
key held down. Any key that is not a group, exact case or delete function will be
ignored. If you select a group, the only keys that will have any effect are
a and b, c and d if the group is G, and the three delete function keys.

*/

(function() {
    'use strict';

    const stopwatch = document.getElementById('stopwatch_display');
    stopwatch.insertAdjacentHTML('afterend', '<div id="selected_group" style="font-size: 50px;text-align: center;">-</div>');

    // function to update group
    function ug(key='') {
        group = key;
        if (document.getElementById('selected_group') == null) {
            stopwatch.insertAdjacentHTML('beforeend', '<div id="selected_group"></div>');
        }
        const group_disp = document.getElementById('selected_group');
        if (group == '') {
            group_disp.innerText = '-';
        } else {
            group_disp.innerText = group;
        }
    }

    // define the PLL guess buttons
    let buttons = {
        'Aa': document.querySelector('[data-pll-guess="Aa"]'),
        'Ab': document.querySelector('[data-pll-guess="Ab"]'),
        'E': document.querySelector('[data-pll-guess="E"]'),
        'F': document.querySelector('[data-pll-guess="F"]'),
        'Ga': document.querySelector('[data-pll-guess="Ga"]'),
        'Gb': document.querySelector('[data-pll-guess="Gb"]'),
        'Gc': document.querySelector('[data-pll-guess="Gc"]'),
        'Gd': document.querySelector('[data-pll-guess="Gd"]'),
        'H': document.querySelector('[data-pll-guess="H"]'),
        'Ja': document.querySelector('[data-pll-guess="Ja"]'),
        'Jb': document.querySelector('[data-pll-guess="Jb"]'),
        'Na': document.querySelector('[data-pll-guess="Na"]'),
        'Nb': document.querySelector('[data-pll-guess="Nb"]'),
        'Ra': document.querySelector('[data-pll-guess="Ra"]'),
        'Rb': document.querySelector('[data-pll-guess="Rb"]'),
        'T': document.querySelector('[data-pll-guess="T"]'),
        'Ua': document.querySelector('[data-pll-guess="Ua"]'),
        'Ub': document.querySelector('[data-pll-guess="Ub"]'),
        'V': document.querySelector('[data-pll-guess="V"]'),
        'Y': document.querySelector('[data-pll-guess="Y"]'),
        'Z': document.querySelector('[data-pll-guess="Z"]')
    }

    let group = ''; // eg. if U is pressed, this will store U waiting for an a or b press

    addEventListener("keydown", (event) => {
        if (group == '') { // No group selected, looking for group or exact case
            switch(event.key.toLowerCase()) {
                case 'a':
                    ug('A');
                    break;
                case 'e':
                    buttons.E.click();
                    break;
                case 'f':
                    buttons.F.click();
                    break;
                case 'g':
                    ug('G');
                    break;
                case 'h':
                    buttons.H.click();
                    break;
                case 'j':
                    ug('J');
                    break;
                case 'n':
                    ug('N');
                    break;
                case 'r':
                    ug('R');
                    break;
                case 't':
                    buttons.T.click();
                    break;
                case 'u':
                    ug('U');
                    break;
                case 'v':
                    buttons.V.click();
                    break;
                case 'y':
                    buttons.Y.click();
                    break;
                case 'z':
                    buttons.Z.click();
                    break;
            }
        } else { // Group already selected, looking for exact case or to exit group
            switch (event.key.toLowerCase()) {
                case 'c':
                    if (group == 'G') {
                        buttons.Gc.click();
                        ug()}
                    break;
                case 'd':
                    if (group == 'G') {
                        buttons.Gd.click()
                        ug()}
                    break;
                case 'a':
                    buttons[group + 'a'].click();
                    ug();
                    break;
                case 'b':
                    buttons[group + 'b'].click();
                    ug();
                    break;
                case 'backspace':
                case 'delete':
                case 'escape':
                    ug();
            }
        }
    });
})();
