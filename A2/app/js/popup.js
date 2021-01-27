/** 
 * popup.js 
 * code for running 1 dialog
 */
"use strict";
//Same dialog in DoublePopup.js and this page popup.js as double popup is needed when there are two popups on a screen and popup runs if theres just one.
//If we tried to run double popups on a page with only one then there would be undefined stuff. So we have created 2 separate files for doing this stuff.
var dialog = document.querySelector('dialog');
  var showDialogButton = document.querySelector('#show-dialog');
  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  showDialogButton.addEventListener('click', function () {
    dialog.showModal();
  });
  dialog.querySelector('.close').addEventListener('click', function () {
    dialog.close();
  });

  