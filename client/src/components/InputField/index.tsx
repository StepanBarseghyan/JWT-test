import React from "react";
import s from "./styles.module.css";

interface InputFieldProps {
  label: string;
  type: string;
  register: any;
  onInput?: () => void;
  error: string | undefined;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  register,
  onInput,
  error,
}) => (
  <div className={s.fieldBox}>
    <label>{label}</label>
    <input type={type} {...register} onInput={onInput} />
    {error && <p className={s.error}>{error}</p>}
  </div>
);

export default InputField;
