import { media, theme } from "@styles/theme";
import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import styled from "styled-components";
import { RoundedDefaultButton } from "../buttons/DefaultButtons";
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
  isRegister?: boolean;
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
  isRegister,
}: ButtonInInputProps) => {
  const handleClickResetBtn = () => {
    setIsToken!(false);
    if (setValue) {
      setValue("token", "");
    }
  };

  return (
    <InputBox
      className={`${error ? "error" : ""} ${isAuthenticationColumn ? "authenticationColumn" : ""} ${
        isRegister ? "register" : ""
      }`}
    >
      <Input
        id={name}
        className={isAuthenticationColumn && error ? "error" : ""}
        {...register}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
      <div>
        {!name?.includes("token") ? (
          isToken ? (
            !isCertified && (
              <RoundedDefaultButton sm onClick={handleClickResetBtn} type={nonSubmit ? "button" : "submit"}>
                {`${changeButtonValue} `}재설정
              </RoundedDefaultButton>
            )
          ) : (
            <RoundedDefaultButton sm onClick={activeFn} type={nonSubmit ? "button" : "submit"}>
              {buttonValue}
            </RoundedDefaultButton>
          )
        ) : (
          <RoundedDefaultButton
            sm
            onClick={activeFn}
            type={nonSubmit ? "button" : "submit"}
            bgColor={theme.color.lightBg}
            color={theme.color.darkBg}
          >
            {buttonValue}
          </RoundedDefaultButton>
        )}
      </div>
    </InputBox>
  );
};

export default ButtonInInput;

const InputBox = styled(motion.div)`
  width: 500px;
  height: 62px;
  margin: 0 auto;
  padding-right: 10px;
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
  ${media.mobile} {
    width: 79.8611vw;
    min-width: 287px;
    height: 50px; 
    font-size: 14px;
  }
  &.authenticationColumn {
    margin: 0 auto;
    background-color: transparent;
    &:not(.register) {
      justify-content: center;
    }
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
    ${media.mobile} {
      justify-content: center;
      input{
        width: 100px;
        height: 40px;
      }
      button{
        margin-left: 10px;
      }
    }
  }

`;
const Input = styled.input`
  width: 100%;
  height: 100%;
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
`;
