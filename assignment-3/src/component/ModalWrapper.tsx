import React from 'react';
import clsx from 'clsx';

function Modal({ mode, isShowModal, setIsShowModal, children }) {
  const style = clsx(isShowModal && 'is-show-modal', 'delete-book-modal');
  let text = '';

  if (mode === 'DELETE') {
    text = 'Delete';
  } else if (mode === 'ADD') {
    text = 'Add';
  }

  return (
    <div id="delete-book-modal" className={style}>
      <div className="modal-content">
        <CloseButton setIsShowModal={setIsShowModal} />

        <div className="modal-header">
          <h1 className="'modal-title">`${text} book`</h1>
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
