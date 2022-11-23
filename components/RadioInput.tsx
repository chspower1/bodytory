import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

export interface RadioProps {
  label: string;
  name: string;
  register?: UseFormRegisterReturn;
  error?: string;
  value?: string;
  checked?: boolean;
}

function RadioInput({ label, name, register, error, value }: RadioProps) {
  return (
    <InputBox className={`${error ? "error" : ""}`}>
      <Input id={name} type="radio" value={value} {...register} />
      <Label htmlFor={name}>{label}</Label>
    </InputBox>
  );
}

export default RadioInput;

const InputBox = styled.div`
  width: 62px;
  height: 62px;
  transition: border 0.3s;
  border: 2px solid transparent;
  background-color: ${({ theme }) => theme.color.input};
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
  &:focus-within {
    &.error {
      border: 2px solid ${({ theme }) => theme.color.error};
    }
  }
`;
const Input = styled.input`
  position: absolute;
  left: -999999%;

  &:checked + label {
    background: #fff;
    color: ${({ theme }) => theme.color.text};
  }
`;

const Label = styled.label`
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);

  /* font-size: 100px; */
`;
