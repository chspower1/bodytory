// 사용 규칙
// 1. 모든 Color값은 rgb값으로만 가능 ex) rgb(255,0,4)

import Image from "next/image";
import { useEffect } from "react";
import styled, { css } from "styled-components";
import naver from "/public/static/naver.svg";
import kakao from "/public/static/kakao.svg";
import origin from "/public/static/origin.svg";
import { theme } from "@styles/theme";
import { Box, Col } from "@styles/Common";

const ChangeToHoverColor = (color: string) => {
  if (color.includes("rgb")) {
    const colorArr = color.split(",");
    const redValue = parseInt(colorArr[0].split("(")[1]);
    const greenValue = parseInt(colorArr[1]);
    const blueValue = parseInt(colorArr[2].replace(")", ""));
    const newColor = `rgb(${redValue - 15},${greenValue - 15},${blueValue - 15})`;
    return newColor;
  }
  return color;
};

interface ButtonProps {
  padding?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  bgColor?: string;
  textColor?: string;
  children: React.ReactNode;
  size?: ButtonSize;
  social?: SocailType;
  onClick?: (() => void) | (() => Promise<void>);
  nonSubmit?: boolean;
  disable?: boolean;
  boxShadow?: boolean;
}
type SocailType = "kakao" | "naver" | "origin";
export type ButtonSize = "sm" | "md" | "lg" | "xl" | "custom";

const Button = styled.button<{
  padding: string;
  width: string;
  height: string;
  fontSize: string;
  bgColor: string;
  textColor: string;
  disable: boolean;
  borderRadius: string;
  boxShadow: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  font-size: ${props => props.fontSize};
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  border-radius: ${props => props.borderRadius};
  box-shadow: ${props => (props.boxShadow ? "8px 8px 24px rgb(49, 54, 167, 0.2)" : "none")};
  /* box-shadow: ${({ theme }) => theme.boxShadow}; */
  &:hover {
    background-color: ${props => ChangeToHoverColor(props.bgColor)};
  }
  transition: background-color 0.5s ease;
  button {
    color: ${props => props.textColor};
  }
`;

export const CircleButton = ({
  size = "md",
  padding = "auto",
  width = size === "md" ? "100px" : size === "lg" ? "140px" : "62px",
  height = size === "md" ? "100px" : size === "lg" ? "140px" : "62px",
  borderRadius = "50%",
  fontSize = size === "md" ? "18px" : size === "lg" ? "26px" : "62px",
  bgColor = "rgb(61, 66, 191)",
  textColor = "rgb(255, 255, 255)",
  children,
  nonSubmit = false,
  disable = false,
  onClick,
  boxShadow = true,
}: ButtonProps) => {
  return (
    <Button
      width={width}
      height={height}
      fontSize={fontSize}
      bgColor={disable ? theme.color.disabled : bgColor}
      textColor={textColor}
      padding={padding}
      borderRadius={borderRadius}
      type={nonSubmit ? "button" : "submit"}
      disable={disable}
      onClick={onClick}
      boxShadow={boxShadow}
    >
      {children}
    </Button>
  );
};
export const RoundButton = ({
  size = "custom",
  padding = "0px 50px",
  width = size === "custom" || size === "md" ? "auto" : size === "lg" ? "500px" : size === "sm" ? "140px" : "500px",
  height = "60px",
  borderRadius,
  fontSize = "18px",
  bgColor = "rgb(61, 66, 191)",
  textColor = "rgb(255, 255, 255)",
  children,
  nonSubmit = false,
  disable = false,
  onClick,
  boxShadow = true,
}: ButtonProps) => {
  if (size === "sm") {
    [width, height, fontSize, padding] = ["140px", "40px", "16px", "auto"];
  }
  if (size === "md") {
    [width, height, fontSize, padding] = ["auto", "50px", "18px", "0px 50px"];
  }
  if (size === "lg") {
    [width, height, fontSize, padding] = ["500px", "60px", "20px", "auto"];
  }
  if (size === "xl") {
    [width, height, fontSize, padding] = ["500px", "70px", "22px", "auto"];
  }

  return (
    <Button
      width={width}
      height={height}
      fontSize={fontSize}
      bgColor={disable ? theme.color.disabled : bgColor}
      textColor={textColor}
      padding={padding}
      borderRadius={height}
      type={nonSubmit ? "button" : "submit"}
      disable={disable}
      onClick={onClick}
      boxShadow={boxShadow}
    >
      {children}
    </Button>
  );
};
export const SocialButton = ({
  padding = "auto",
  width = "360px",
  height = "80px",
  borderRadius = "100px",
  fontSize = "22px",
  bgColor = "rgb(75, 80, 211)",
  textColor = "rgb(255, 255, 255)",
  children,
  size = "lg",
  social,
  onClick,
  nonSubmit = false,
  disable = false,
  boxShadow = true,
}: ButtonProps) => {
  if (size === "sm") {
    [width, height, fontSize] = ["240px", "60px", "20px"];
  }

  return (
    <Button
      onClick={onClick}
      width={width}
      height={height}
      fontSize={fontSize}
      bgColor={disable ? theme.color.disabled : bgColor}
      textColor={textColor}
      padding={padding}
      borderRadius={borderRadius}
      style={{ justifyContent: "flex-start" }}
      type={nonSubmit ? "button" : "submit"}
      disable={disable}
      boxShadow={boxShadow}
    >
      <Image
        src={social === "naver" ? naver : social === "kakao" ? kakao : origin}
        alt="naver"
        height={size === "lg" ? 80 : 60}
      />

      <Col style={{ width: "100%" }}>{children}</Col>
    </Button>
  );
};
export const RectangleButton = ({
  padding = "auto",
  width = "88px",
  height = "40px",
  borderRadius = "5px",
  fontSize = "18px",
  bgColor = "rgb(61, 66, 191)",
  textColor = "rgb(255, 255, 255)",
  children,
  size = "md",
  nonSubmit = false,
  disable = false,
  onClick,
  boxShadow = true,
}: ButtonProps) => {
  if (size === "sm") {
    [width, height, fontSize] = ["87px", "29px", "14px"];
  }

  return (
    <Button
      width={width}
      height={height}
      fontSize={fontSize}
      bgColor={disable ? theme.color.disabled : bgColor}
      textColor={textColor}
      padding={padding}
      borderRadius={borderRadius}
      type={nonSubmit ? "button" : "submit"}
      disable={disable}
      onClick={onClick}
      boxShadow={boxShadow}
    >
      {children}
    </Button>
  );
};
