import Image from "next/image";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";
import checkbox from '@public/checkbox.png';

interface InputProps {
  label?: string;
  name: string;
  register: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  checked?: boolean;
}

export default function Input({
  label,
  name,
  register,
  type = "text",
  error,
  placeholder,
  value,
  disabled = false,
  checked,
}: InputProps) {
  return (
    <InputContainer>
      <InputBox>
        <MainInput disabled={disabled} id={name} {...register} type={type} placeholder={placeholder} value={value} className={error ? "error" : ""} />
        <Label htmlFor={name}>{label}</Label>
      </InputBox>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  & + &{
    margin-top: 20px;
  }
`;
const Label = styled.label`
  margin-left: 20px;
`;
const InputBox = styled.div`
  width: 400px;
  display:flex;
  align-items:center;
  position: relative;
`;
const MainInput = styled.input`
&[type="password"]{
  &::placeholder{
    letter-spacing: 7.2px;
    font-size:12px;
  }
}
  &[type="checkbox"]{
    width:auto;
  }
  
  width: 100%;
  height: 50px;
  text-align:center;
  padding: 10px 5px;
  border-radius: 10px;
  transition : border .3s;
  border: 2px solid transparent;
  background-color:${({theme})=> theme.color.input};
  color:#fff;
  box-shadow: 8px 8px 24px rgba(49, 54, 167, 0.2);
  outline : 0;
  &:focus{
    border: 2px solid #000;
  }
  &.error{
    border: 2px solid ${({theme}) => theme.color.error};
  }
  &::placeholder{
    color:#aaa;
  }
`;
