import React, {Component} from 'react';
class Dialog extends Component {
   Dialog(popup) {
    this.showPopup = function () {
      var main = document.querySelector(".wrapper");
      var overlay = document.createElement("div");
      var popups = popup;
      overlay.classList.add("overlay", "show-overlay");
      popups.classList.add("show-popup");
      overlay.appendChild(popups);
      main.appendChild(overlay);
      var hide = document.querySelectorAll(".btn-closePopup");
      hide.forEach(el => {
        el.addEventListener("click", hidePopup => {
          const overlay = document.querySelectorAll(".overlay");
          const popup = document.querySelectorAll(".popup");
          overlay.forEach(el => el.classList.remove("show-overlay"));
          popup.forEach(el => el.classList.remove("show-popup"));
        })
      });
    }
  }
  generateCloseBtn (popup) {
    var closeBtn = document.createElement("button");
    closeBtn.classList.add("btn-closePopup");
    var mainPopup = popup;
    closeBtn.innerHTML = "X";
    mainPopup.appendChild(closeBtn);
  }

  render (){
    return (
      <div class="popup info">
         <p class="inner-text">Popup</p>
         <button class="btn-cancel same">Save</button>
         <button class="btn-uninstall same">Cancel</button>
      </div>
    )
  }
}
export default Dialog;
