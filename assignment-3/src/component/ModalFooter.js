export function ModalFooter({ handleSubmit, setIsShowModal, actionText }) {
  return (
    <div className="modal-footer">
      <button
        className="delete-book-modal__confirm main-button "
        onClick={() => handleSubmit()}
      >
        {actionText}
      </button>
      <button
        className="cancel-button secondary-button"
        onClick={() => setIsShowModal(false)}
      >
        Cancel
      </button>
    </div>
  );
}
