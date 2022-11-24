import React, { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import styled from "styled-components";
import { RoundButton } from "./button/Button";
import { InputProps } from "./Input";

interface ButtonInInputProps<T extends FieldValues = any> extends InputProps {
  activeFn?: () => Promise<void>;
  buttonValue?: string;
  nonSubmit?: boolean;
  setValue?: UseFormSetValue<T>;
  changeButtonValue?: string;
  isToken?: boolean;
  setIsToken?: Dispatch<SetStateAction<boolean>>;
  isAuthenticationColumn?: boolean;
  isCertified?: boolean;
}

const ButtonInInput = ({
  name,
  register,
  type = "text",
  error,
  placeholder,
  disabled = false,
  activeFn,
  buttonValue,
  nonSubmit,
  setValue,
  changeButtonValue,
  isToken,
  setIsToken,
  isAuthenticationColumn,
  isCertified,
  value,
}: ButtonInInputProps) => {
  const handleClickResetBtn = () => {
    setIsToken!(false);
    if (setValue) {
      setValue("token", "");
    }
  };
  console.log(isToken);

  return (
    <InputBox className={`${error ? "error" : ""} ${isAuthenticationColumn ? "authenticationColumn" : ""}`}>
      <Input
        id={name}
        className={isAuthenticationColumn && error ? "error" : ""}
        {...register}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
      {!name.includes("token") ? (
        isToken ? (
          !isCertified && (
            <RoundButton size="sm" onClick={handleClickResetBtn} nonSubmit={nonSubmit}>
              {`${changeButtonValue} `}재설정
            </RoundButton>
          )
        ) : (
          <RoundButton size="sm" onClick={activeFn} nonSubmit={nonSubmit}>
            {buttonValue}
          </RoundButton>
        )
      ) : (
        <RoundButton size="sm" onClick={activeFn} nonSubmit={nonSubmit}>
          {buttonValue}
        </RoundButton>
      )}
    </InputBox>
  );
};

export default ButtonInInput;

const InputBox = styled.div`
  width: 500px;
  margin: 0 auto;
  transition: border 0.3s ease;
  border: 2px solid transparent;
  background-color: ${({ theme }) => theme.color.input};
  border-radius: 10px;
  user-select: none;
  display: flex;
  align-items: center;
  overflow: hidden;
  &:not(.authenticationColumn):focus-within {
    border: 2px solid #8c9af3;
    &.error {
      border: 2px solid ${({ theme }) => theme.color.error};
    }
  }
  & + & {
    margin-top: 10px;
  }
  &.authenticationColumn {
    width: 315px;
    margin: 0 auto;
    background-color: #00000000;
    input {
      border-bottom: 2px solid #888;
      &:focus {
        border-bottom: 2px solid #fff;
      }
    }
  }
`;
const Input = styled.input`
  flex: 1;
  height: 62px;
  text-align: center;
  background: transparent;
  border: 0;
  outline: 0;
  color: #fff;
  transition: border 0.3s;
  &::placeholder {
    color: #aaa;
  }
  &.error {
    border-bottom: 2px solid ${({ theme }) => theme.color.error};
  }
`;
