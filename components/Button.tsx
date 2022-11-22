import React from "react";
import styled, { css } from "styled-components";
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
}

type ButtonSize = "sm" | "md" | "lg" | "xl" | "custom";

const Button = styled.button<{
  padding: string;
  width: string;
  height: string;
  fontSize: string;
  bgColor: string;
  textColor: string;

  borderRadius: string;
}>`
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
  height = "50px",
  borderRadius = "50px",
  fontSize = "18px",
  bgColor = "#3D42BF",
  textColor = "#FFFFFF",
  children,
  size = "md",
}: ButtonProps) => {
  if (size === "sm") {
    [width, height, fontSize, borderRadius] = ["140px", "40px", "16px", "30px"];
  }
  if (size === "lg") {
    [width, height, fontSize, borderRadius] = ["140", "40px", "20px", "90px"];
  }
  if (size === "xl") {
    [width, height, fontSize, borderRadius] = ["500px", "70px", "22px", "100px"];
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
export const SnsButton = ({
  padding = "auto",
  width = "360px",
  height = "80px",
  borderRadius = "100px",
  fontSize = "22px",
  bgColor = "#3D42BF",
  textColor = "#FFFFFF",
  children,
  size = "lg",
}: ButtonProps) => {
  if (size === "sm") {
    [width, height, fontSize] = ["240px", "60px", "20px"];
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
