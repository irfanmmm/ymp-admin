import React from "react";

export function FormModal({ children, onClose, heading }) {
  return (
    <div class="modal-lg modal-dialog-centered custome-modal ">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="myLargeModalLabel">
           {heading}
          </h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-hidden="true"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
