import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  color: {
    darkBg: "rgb(83, 89, 233)",
    lightBg: "rgb(242, 243, 255)",
    disabled: "rgb(75, 77, 122)",
    disabledText: "rgb(210, 210, 221)",
    error: "rgb(248, 78, 139)",
    text: "rgb(43, 45, 100)",
    weekPurple: "rgb(198,205,250)",
    mint: "rgb(3, 231, 203)",
    mintBtn: "rgb(18, 212, 201)",
    input: "rgb(100, 106, 235)",
    white: "rgb(255, 255, 255)",
  },
  boxShadow: {
    normal: "8px 8px 24px rgba(49, 54, 167, 0.2)",
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
