import { useState } from "react";
import { StyledGroup, StyledLabel, StyledInput, StyledError } from "./style";

interface InputProps {
  name: string;
  type: "text" | "email" | "password";
  label: string;
  value: string;
  pattern?: string;
  required?: boolean;
  placeholder?: string;
  error: string;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
  const [blurred, setBlurred] = useState(false);
  const { label, name, value, error, errorMessage, onChange, ...restProps } =
    props;

  const handleBlur = () => {
    setBlurred(true);
  };

  return (
    <StyledGroup>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        id={name}
        name={name}
        value={value}
        onBlur={handleBlur}
        onFocus={() => name.includes("confirm") && setBlurred(true)}
        onChange={onChange}
        data-blurred={blurred.toString()}
        data-error={!!error}
        {...restProps}
      />
      <StyledError>{error ? error : errorMessage}</StyledError>
    </StyledGroup>
  );
};

export default Input;
