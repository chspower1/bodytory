import { media } from "@styles/theme";
import styled, { css } from "styled-components";
import { ChangeToHoverColor } from "./SocialButton";

export const RoundedDefaultButton = styled.button<{
  lg?: boolean;
  sm?: boolean;
  img?: boolean;
  disable?: boolean;
  bgColor?: string;
  color?: string;
}>`
  font-size: 18px;
  font-weight: 500;
  padding: 16px 50px;
  text-align: center;
  border-radius: 50px;
  background: ${({ bgColor }) => bgColor || "rgb(61, 66, 191)"};
  color: ${({ color }) => color || "rgb(255, 255, 255)"};
  transition: background 0.35s ease;
  box-shadow: 8px 8px 24px rgb(49, 54, 167, 0.2);
  img,
  svg {
    margin-right: 15px;

  }
  :hover {
    background: ${({ bgColor }) => ChangeToHoverColor(bgColor || "rgb(61, 66, 191)")};
  }
  ${({ img }) =>
    img &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 30px;
    `}
  ${({ lg }) =>
    lg &&
    css`
      max-width: 500px;
      width:100%;
      padding: 20px 0;
      border-radius: 60px;
      font-size: 20px;
      ${media.custom(1366)}{
        
      }
      ${media.mobile}{
        font-size: 16px;
        padding: 15px 0;
        border-radius: 40px;
      }
    `}
  ${({ sm }) =>
    sm &&
    css`
      width: 140px;
      font-size: 16px;
      border-radius: 40px;
      padding: 12px 0;
    `}
  ${({ disable, theme }) =>
    disable &&
    css`
      background: ${theme.color.disabled};
      :hover {
        background: ${ChangeToHoverColor(theme.color.disabled)};
      }
    `}
`;

export const CircleDefaultButton = styled.button<{
  lg?: boolean;
  sm?: boolean;
  disable?: boolean;
  bgColor?: string;
  color?: string;
}>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  text-weight: 500;
  background: ${({ bgColor }) => bgColor || "rgb(61, 66, 191)"};
  color: ${({ color }) => color || "rgb(255, 255, 255)"};
  transition: background 0.35s ease;
  box-shadow: 8px 8px 24px rgb(49, 54, 167, 0.2);
  :hover {
    background: ${({ bgColor }) => ChangeToHoverColor(bgColor || "rgb(61, 66, 191)")};
  }
  ${({ lg }) =>
    lg &&
    css`
      width: 140px;
      height: 140px;
      font-size: 26px;
    `}
  ${({ sm }) =>
    sm &&
    css`
      width: 62px;
      height: 62px;
    `}
  ${({ disable, theme }) =>
    disable &&
    css`
      background: ${theme.color.disabled};
      cursor: not-allowed;
      :hover {
        background: ${ChangeToHoverColor(theme.color.disabled)};
      }
    `}
`;

export const RectangleDefaultButton = styled.button<{ sm?: boolean; bgColor?: string; color?: string }>`
  width: 88px;
  text-align: center;
  padding: 10px 0;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  text-weight: 500;
  background: ${({ bgColor }) => bgColor || "rgb(61, 66, 191)"};
  color: ${({ color }) => color || "rgb(255, 255, 255)"};
  transition: background 0.35s ease;
  box-shadow: 8px 8px 24px rgb(49, 54, 167, 0.2);
  :hover {
    background: ${({ bgColor }) => ChangeToHoverColor(bgColor || "rgb(61, 66, 191)")};
  }
  ${({ sm }) =>
    sm &&
    css`
      padding: 7px 0;
      font-size: 14px;
      font-weight: 500;
    `}
`;
