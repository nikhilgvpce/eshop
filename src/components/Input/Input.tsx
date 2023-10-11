import { ChangeEvent } from "react";

interface InputProps {
  placeholder?: string,
  value?: string,
  onChange ?: (event: ChangeEvent<HTMLInputElement>) => void,
  type?: string,
  label?: string,
  name?: string,
  id?: string,
  defaultValue?: string,
  title?: string,
  className?: string,
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { placeholder, value, onChange, type, label, name, id, defaultValue, title, className } = props;

  return (
    <>
        <label>{label}</label>
        <input className={className} title={title} name={name} id={id} type={type} defaultValue={defaultValue} placeholder={placeholder} value={value} onChange={onChange} />
    </>
  )
};

export default Input;