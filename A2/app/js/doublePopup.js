/** 
 * doublePopup.js 
 * This file is created to run 2 dialogs and is refrenced in several files with the id mentioned in the querySelector attribute. Same dialog in DoublePopup.js and 
 * this page popup.js as double popup is needed when there are two popups on a screen and popup runs if theres just one. If we tried to run double popups on a page 
 * with only one then there would be undefined stuff. So we have created 2 separate files for doing this stuff.
 */
"use strict";
var dialog = document.querySelector('#dialog1');
  var showDialogButton = document.getElementsByClassName('show-dialog1');
  for (var i = 0; i < showDialogButton.length; i++) {
  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  showDialogButton[i].addEventListener('click', function () {
    dialog.showModal();
  });
  //to run the close function upon clicking the close button refrenced in css
  dialog.querySelector('.close').addEventListener('click', function () {
    dialog.close();
  });
}

  var dialog2 = document.querySelector('#dialog2');
  var showDialogButton2 = document.getElementsByClassName('show-dialog2');
  for (var i = 0; i < showDialogButton2.length; i++) {
    
  if (!dialog2.showModal) {
    dialogPolyfill.registerDialog(dialog2);
  }
  showDialogButton2[i].addEventListener('click', function () {
    dialog2.showModal();
  });
  //to run the close function upon clicking the close button refrenced in css
  dialog2.querySelector('.close').addEventListener('click', function () {
    dialog2.close();
  });
}