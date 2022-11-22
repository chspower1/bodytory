import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  color: {
    darkBg: "#5359E9",
    lightBg: "#F2F3FF",
    disabled: "#4B4D7A",
    disabledText: "#D2D2DD",
    error: "#F84E8B",
    text: "#2B2D64",
    mint: "#03E7CB",
    mintBtn: "#12D4C9",
    input: "#646AEB",
    white: "#FFFFFF",
  },
  boxShadow: {
    normal: "0 3px 8px 0 rgb(0 0 0 / 10%)",
  },
  font: {
    size: {
      toriText: "36px",
      bodyText: "15px",
    },
    bold: {
      Regular: "Noto Sans KR Regular",
      Medium: "Noto Sans KR Medium",
      Bold: "Noto Sans KR Bold",
    },
  },
};

const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};
