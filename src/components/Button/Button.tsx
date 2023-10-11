import { MouseEvent } from 'react';
import './Button.css';

interface ButtonProps {
  text?: string,
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void,
  className?: string,
  disabled?: boolean,
}

const Button = (props: ButtonProps) => {
  const { text, onClick, className, disabled } = props;

  return (
    <button onClick={onClick} title={text} className={className} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
