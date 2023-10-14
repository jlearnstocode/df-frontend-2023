import { ThreeCircles } from 'react-loader-spinner';

interface ModalFooterProps {
  handleSubmit?: () => void;
  setIsShowModal: (b: boolean) => void;
  actionText: string;
  disabled?: boolean;
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
}

export function ModalFooter({
  handleSubmit,
  setIsShowModal,
  actionText,
  buttonType = 'button',
  disabled,
}: ModalFooterProps) {
  return (
    <div className="pt-5 flex justify-evenly">
      {disabled ? (
        <button
          disabled
          type="submit"
          className="bg-red-400 flex items-center justify-center"
        >
          <ThreeCircles
            height="22"
            width="22"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </button>
      ) : (
        <button
          type={buttonType}
          className="bg-red-400 hover:bg-red-300"
          onClick={() => {
            if (handleSubmit) handleSubmit();
          }}
        >
          {actionText}
        </button>
      )}
      <button
        disabled={disabled}
        className="hover:border hover:border-solid "
        onClick={() => setIsShowModal(false)}
      >
        Cancel
      </button>
    </div>
  );
}
