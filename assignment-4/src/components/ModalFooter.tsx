interface ModalFooterProps {
  handleSubmit: () => void;
  setIsShowModal: (b: boolean) => void;
  actionText: string;
}

export function ModalFooter({
  handleSubmit,
  setIsShowModal,
  actionText,
}: ModalFooterProps) {
  return (
    <div className="pt-5 flex justify-evenly">
      <button
        className="bg-red-400 hover:bg-red-300"
        onClick={() => handleSubmit()}
      >
        {actionText}
      </button>
      <button
        className="hover:border hover:border-solid "
        onClick={() => setIsShowModal(false)}
      >
        Cancel
      </button>
    </div>
  );
}
