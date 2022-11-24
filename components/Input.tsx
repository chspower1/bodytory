import Image, { StaticImageData } from "next/image";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";
import checked from "@public/check_checked.svg";

export interface InputProps {
  label?: string;
  name: string;
  register?: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  checked?: boolean;
  maxLength?: number;
  width?: string;
  height?: string;
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
  maxLength,
  width = "500px",
  height = "62px",
}: InputProps) {
  return (
    <InputBox width={width} height={height}>
      <MainInput
        disabled={disabled}
        id={name}
        {...register}
        type={type}
        placeholder={placeholder}
        value={value}
        className={error ? "error" : ""}
        maxLength={maxLength}
      />
    </InputBox>
  );
}

const InputBox = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: 0 auto;
  position: relative;
  & + & {
    margin: 40px auto 0;
  }
`;
const MainInput = styled.input`
  &[type="password"] {
    &::placeholder {
      letter-spacing: 7.2px;
      font-size: 12px;
    }
  }
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 10px 5px;
  border-radius: 10px;
  transition: border 0.3s ease;
  border: 2px solid transparent;
  background-color: ${({ theme }) => theme.color.input};
  color: #fff;
  box-shadow: 8px 8px 24px rgba(49, 54, 167, 0.2);
  outline: 0;
  &:focus {
    border: 2px solid #8c9af3;
  }
  &.error {
    border: 2px solid ${({ theme }) => theme.color.error};
  }
  &::placeholder {
    color: #aaa;
  }
`;
