import React from "react";
import clsx from "clsx";

function Modal({ mode, isShowModal, setIsShowModal, children }) {
  const style = clsx(isShowModal && "is-show-modal", "delete-book-modal");

  return (
    <div id="delete-book-modal" className={style}>
      <div className="modal-content">
        <CloseButton setIsShowModal={setIsShowModal} />

        <div className="modal-header">
          <h1 className="'modal-title">
            {mode === "DELETE" ? "Delete" : mode === "ADD" ? "Add" : ""} book
          </h1>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;

export function CloseButton({ setIsShowModal }) {
  return (
    <button className="close-button" onClick={() => setIsShowModal(false)}>
      &times;
    </button>
  );
}
