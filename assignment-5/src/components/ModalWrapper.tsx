import React from 'react';
import clsx from 'clsx';

interface ModalWrapperProps {
  mode: string;
  isShowModal: boolean;
  setIsShowModal: (b: boolean) => void;
  children: React.ReactNode;
}

function ModalWrapper({
  mode,
  isShowModal,
  setIsShowModal,
  children,
}: ModalWrapperProps) {
  const style = clsx(
    isShowModal && 'is-show-modal',
    'fixed inset-0 z-50 hidden bg-black bg-opacity-40 backdrop-blur-sm',
  );

  let text = '';

  if (mode === 'DELETE') {
    text = 'Delete';
  } else if (mode === 'ADD') {
    text = 'Add';
  }

  return (
    <div id="delete-book-modal" className={style}>
      <div className="bg-white border border-gray-300 p-3 m-auto max-h-96 max-w-xs relative shadow-md">
        <CloseButton setIsShowModal={setIsShowModal} />

        <div className="flex justify-center text-xl font-bold p-2">
          <h1>{text} book</h1>
        </div>

        <div className="text-center p-4">{children}</div>
      </div>
    </div>
  );
}

export default ModalWrapper;

export function CloseButton({
  setIsShowModal,
}: {
  setIsShowModal: (v: boolean) => void;
}) {
  return (
    <button
      className="close-button hover:text-red-500"
      onClick={() => setIsShowModal(false)}
    >
      &times;
    </button>
  );
}
