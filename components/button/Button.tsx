import Image from "next/image";
import React from "react";
import styled, { css } from "styled-components";
import naver from "/public/static/naver.svg";
import kakao from "/public/static/kakao.svg";
import origin from "/public/static/origin.svg";

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
  onClick?: () => void;
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

  borderRadius: string;
}>`
  position: "relative";
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
  button {
    color: ${props => props.textColor};
  }
`;

export const CircleButton = ({
  padding = "auto",
  width = "100px",
  height = "100px",
  borderRadius = "50%",
  fontSize = "18px",
  bgColor = "#3D42BF",
  textColor = "#FFFFFF",
  children,
  size = "md",
}: ButtonProps) => {
  if (size === "sm") {
    [width, height, fontSize] = ["62px", "62px", "18px"];
  }
  if (size === "lg") {
    [width, height, fontSize] = ["140px", "140px", "26px"];
  }

  return (
    <Button
      width={width}
      height={height}
      fontSize={fontSize}
      bgColor={bgColor}
      textColor={textColor}
      padding={padding}
      borderRadius={borderRadius}
    >
      {children}
    </Button>
  );
};
export const RoundButton = ({
  padding = "0px 50px",
  width = "auto",
  height = "60px",
  borderRadius,
  fontSize = "18px",
  bgColor = "#3D42BF",
  textColor = "#FFFFFF",
  children,
  size = "custom",
}: ButtonProps) => {
  if (size === "sm") {
    [width, height, fontSize, padding] = ["140px", "40px", "16px", "auto"];
  }
  if (size === "md") {
    [width, height, fontSize, padding] = ["auto", "50px", "18px", "0px 50px"];
  }
  if (size === "lg") {
    [width, height, fontSize, padding] = ["500px", "58px", "20px", "auto"];
  }
  if (size === "xl") {
    [width, height, fontSize, padding] = ["500px", "70px", "22px", "auto"];
  }

  return (
    <Button
      width={width}
      height={height}
      fontSize={fontSize}
      bgColor={bgColor}
      textColor={textColor}
      padding={padding}
      borderRadius={height}
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
  bgColor = "#3D42BF",
  textColor = "#FFFFFF",
  children,
  size = "lg",
  social,
  onClick,
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
      bgColor={bgColor}
      textColor={textColor}
      padding={padding}
      borderRadius={borderRadius}
      style={{ justifyContent: "flex-start" }}
    >
      <div>
        <Image
          src={social === "naver" ? naver : social === "kakao" ? kakao : origin}
          alt="naver"
          style={{ marginRight: "10px" }}
          height={size === "lg" ? 80 : 60}
        />
      </div>
      {children}
    </Button>
  );
};

export const RectangleButton = ({
  padding = "auto",
  width = "88px",
  height = "40px",
  borderRadius = "5px",
  fontSize = "18px",
  bgColor = "#3D42BF",
  textColor = "#FFFFFF",
  children,
  size = "md",
}: ButtonProps) => {
  if (size === "sm") {
    [width, height, fontSize] = ["87px", "29px", "16px"];
  }

  return (
    <Button
      width={width}
      height={height}
      fontSize={fontSize}
      bgColor={bgColor}
      textColor={textColor}
      padding={padding}
      borderRadius={borderRadius}
    >
      {children}
    </Button>
  );
};
