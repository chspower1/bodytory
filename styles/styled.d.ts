import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      darkBg: "#5359E9";
      lightBg: "#F2F3FF";
      disabled: "#4B4D7A";
      disabledText: "#D2D2DD";
      error: "#F84E8B";
      text: "#2B2D64";
      mint: "#03E7CB";
      mintBtn: "#12D4C9";
      input: "#646AEB";
      white: "#FFFFFF";
    };
    boxShadow: {
      normal: "0 3px 8px 0 rgb(0 0 0 / 10%)";
    };
    font: {
      size: {
        toriText: "36px";
        bodyText: "15px";
      };
      bold: {
        Regular: "Noto Sans KR Regular";
        Medium: "Noto Sans KR Medium";
        Bold: "Noto Sans KR Bold";
      };
    };
  }
}
