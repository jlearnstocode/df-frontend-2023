import clsx from 'clsx';

export default function Button({ variant, text, ...rest }) {
  let style = variant;

  if (variant === 'link-button') {
    style = clsx(variant, 'delete-book-modal__open');
  }

  return (
    <button type="button" className={style} {...rest}>
      {text}
    </button>
  );
}
