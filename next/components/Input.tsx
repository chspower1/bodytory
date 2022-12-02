import Image, { StaticImageData } from "next/image";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styled, { css } from "styled-components";
import checked from "@public/static/icon/check_checked.svg";
import { theme } from "@styles/theme";

export interface InputProps {
  label?: string;
  name?: string;
  register?: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  error?: FieldError | string;
  disabled?: boolean;
  value?: string;
  checked?: boolean;
  maxLength?: number;
  width?: string;
  height?: string;
  align?: string;
  bgcolor?: string;
  color?: string;
  light?: boolean;
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
  align = "center",
  bgcolor = theme.color.input,
  color = "#fff",
  light,
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
        align={align}
        bgColor={bgcolor}
        color={color}
        light={light}
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
const MainInput = styled.input<{ align?: string; bgColor?: string; color?: string; light?: boolean }>`
  &[type="password"] {
    &::placeholder {
      letter-spacing: 7.2px;
      font-size: 12px;
    }
    &:disabled {
      background: rgb(107, 114, 142);
      cursor: not-allowed;
    }
  }
  width: 100%;
  height: 100%;
  text-align: ${prop => prop.align};
  padding: 10px 20px;
  border-radius: 10px;
  transition: border 0.3s ease;
  border: 2px solid transparent;
  background-color: ${prop => prop.bgColor};
  color: ${prop => prop.color};
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
  ${props =>
    props.light &&
    css`
      background: rgba(217, 222, 255, 1);
      color: #232323;
      :-webkit-autofill,
      :-webkit-autofill:hover,
      :-webkit-autofill:focus,
      :-webkit-autofill:active {
        -webkit-text-fill-color: #232323 !important;
      }
    `}
`;
