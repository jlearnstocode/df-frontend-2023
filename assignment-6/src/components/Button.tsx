import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
  variant: string;
  text: string;
}

export default function Button({ variant, text, ...rest }: ButtonProps) {
  let style = variant;

  if (variant === 'link-button') {
    style = clsx('bg-white underline text-red-500 hover:bg-gray-200 w-16');
  }

  if (variant === 'main-button') {
    style = 'bg-red-400 hover:bg-red-300';
  }

  if (variant === 'logout-button') {
    style = 'bg-red-400 hover:bg-red-300 w-20';
  }

  return (
    <button type="button" className={style} {...rest}>
      {text}
    </button>
  );
}
