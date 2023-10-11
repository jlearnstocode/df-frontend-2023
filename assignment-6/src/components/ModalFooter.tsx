interface ModalFooterProps {
  handleSubmit?: () => void;
  setIsShowModal: (b: boolean) => void;
  actionText: string;
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
}

export function ModalFooter({
  handleSubmit,
  setIsShowModal,
  actionText,
  buttonType = 'button',
}: ModalFooterProps) {
  return (
    <div className="pt-5 flex justify-evenly">
      <button
        type={buttonType}
        className="bg-red-400 hover:bg-red-300"
        onClick={() => {
          if (handleSubmit) handleSubmit();
        }}
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
