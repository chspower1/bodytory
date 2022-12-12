import { theme } from "@styles/theme";
import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import styled from "styled-components";
import { RoundButton } from "../buttons/Button";
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
      <div>
        {!name?.includes("token") ? (
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
          <RoundButton
            size="sm"
            onClick={activeFn}
            nonSubmit={nonSubmit}
            bgColor={theme.color.lightBg}
            textColor={theme.color.darkBg}
          >
            {buttonValue}
          </RoundButton>
        )}
      </div>
    </InputBox>
  );
};

export default ButtonInInput;

const InputBox = styled(motion.div)`
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
  &:not(.authenticationColumn) {
    box-shadow: 8px 8px 24px rgba(49, 54, 167, 0.2);
  }
  &:not(.authenticationColumn):focus-within {
    border: 2px solid #8c9af3;
  }
  &.error:not(.authenticationColumn) {
    border: 2px solid ${({ theme }) => theme.color.error};
  }
  & + & {
    margin-top: 10px;
  }
  &.authenticationColumn {
    margin: 0 auto;
    background-color: #00000000;
    input {
      width: 190px;
      height: 50px;
      border-bottom: 2px solid #fff;
      &:focus {
        border-bottom: 2px solid #fff;
      }
      &.error {
        border: 0;
        border-bottom: 2px solid ${({ theme }) => theme.color.error};
      }
    }
    button {
      font-weight: bolder;
      letter-spacing: -1px;
      margin-left: 20px;
    }
  }
`;
const Input = styled.input`
  width: 100%;
  height: 62px;
  text-align: center;
  background: transparent;
  border: 0;
  outline: 0;
  color: #fff;
  transition: border 0.3s;
  padding: 0 20px;
  &::placeholder {
    color: #aaa;
  }
  &.error {
    border: 2px solid ${({ theme }) => theme.color.error};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  }
`;
