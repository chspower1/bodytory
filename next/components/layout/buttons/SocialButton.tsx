import styled, { css } from "styled-components";
import Naver from "@src/assets/icons/naver.svg";
import Kakao from "@src/assets/icons/kakao.svg";
import Origin from "@src/assets/icons/origin.svg";

export const ChangeToHoverColor = (color: string) => {
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
  children: React.ReactNode;
  sm?: boolean;
  social?: SocailType;
  onClick?: (() => void) | (() => Promise<void>);
}
type SocailType = "kakao" | "naver" | "origin";
export type ButtonSize = "sm" | "md" | "lg" | "xl" | "custom";

const Button = styled.button<{sm ?: boolean; bgColor?: string;}>`
  position: relative;
  width: 340px;
  height: 80px;
  font-size: 22px;
  font-weight: 500;
  background-color: rgb(61, 66, 191);
  color: rgb(255, 255, 255);
  border-radius: 80px;
  box-shadow: 8px 8px 24px rgb(49, 54, 167, 0.2);
  transition: background-color 0.35s ease;
  padding: 0 0 0 110px;
  text-align:left;
  &:hover {
    background-color: ${ChangeToHoverColor("rgb(61, 66, 191)")};
  }
  ${({sm}) => sm && css`
    width: 240px;
    height: 60px;
    font-size: 18px;
    background-color: rgb(75, 80, 211);
    padding: 0 0 0 80px;
    &:hover {
      background-color: ${ChangeToHoverColor("rgb(75, 80, 211)")};
    }
  `}

  svg{
    position: absolute;
    left:0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const ButtonText = styled.span`

`

export const SocialButton = ({
  children,
  sm,
  social,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      sm={sm}
      onClick={onClick}
    >
      {social === "naver" && <Naver width={sm ? 60 : 78} height={sm ? 60 : 78} />}
      {social === "kakao" && <Kakao width={sm ? 60 : 78} height={sm ? 60 : 78} />}
      {social === "origin" && <Origin width={sm ? 60 : 78} height={sm ? 60 : 78} />}
      <ButtonText>{children}</ButtonText>
    </Button>
  );
};
