import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

interface InputProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  errorMessage?: string;
}

export default function Input({ label, name, register, type = "text", errorMessage, placeholder }: InputProps) {
  return (
    <InputContainer>
      <Label htmlFor={name}>{label}</Label>
      <InputBox>
        <MainInput id={name} {...register} type={type} placeholder={placeholder} />
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </InputBox>
    </InputContainer>
  );
}

const InputContainer = styled.div``;
const Label = styled.label``;
const InputBox = styled.div`
  width: 300px;
  display: flex;
  position: relative;
`;
const MainInput = styled.input`
  width: full;
  padding: 10px 5px;
  border-radius: 5px;
`;
const ErrorMessage = styled.span`
  position: absolute;
  right: 0px;
  bottom: -10px;
`;
