import React from "react";
import styled from "styled-components";
import { InputProps } from "./Input";

interface TextAreaProps extends InputProps {
  children?: React.ReactNode;
  id?: string;
}

const Textarea = ({
  children,
  disabled = false,
  id,
  register,
  placeholder,
  error,
  align,
  value,
  bgcolor,
  color,
}: TextAreaProps) => {
  return (
    <TextAreaStyle
      disabled={disabled}
      id={id}
      {...register}
      placeholder={placeholder}
      value={value}
      className={error ? "error" : ""}
      bgColor={bgcolor}
      color={color}
    ></TextAreaStyle>
  );
};

export default Textarea;

const TextAreaStyle = styled.textarea<{bgColor ?: string,  color ?: string}>`
  width: 500px;
  height: 200px;
  resize: none;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  transition: border 0.3s ease;
  border: 2px solid transparent;
  background: ${({bgColor}) => bgColor ? bgColor : `rgba(217, 222, 255, 1)`};
  box-shadow: 8px 8px 24px rgba(49, 54, 167, 0.2);
  color: ${({color}) => color ? color : `#232323`};
  outline: 0;
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(188, 197, 255, 1);
    border-radius: 10px;
    background-clip: padding-box;
    border: 5px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 10px 0;
  }
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
