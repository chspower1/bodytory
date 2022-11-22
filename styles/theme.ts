import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  color: {
    purpleBg: "#5359E9",
    lightBg: "#F2F3FF",
    disabled: "#4B4D7A",
    error: "#F84E8B",
    textColor: "#2B2D64",
  },
  boxShadow: {
    normal: "0 3px 8px 0 rgb(0 0 0 / 10%)",
  },
};

const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};
