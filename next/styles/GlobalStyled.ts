import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyled = createGlobalStyle`
${reset}

  * {
    box-sizing: border-box;
  }


  html,
  body {
    background: ${props => props.theme.color.darkBg};
    font-optical-sizing: auto;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-size: ${props => props.theme.font.size.bodyText};
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.6;
    color: ${props => props.theme.color.text};
  }

  // 현재는 pc용 웹서비스 (모바일 반응형 X)
  body {
    /* min-width: 1460px; */
    // overflow-y: scroll;
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
    background: tranparent;
  }

  a:hover,
  a:active,
  a:visited,
  a:link {
    color: inherit;
    text-decoration: none;
    background-color: transparent;
  }
  
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1;
    margin: 0;
  }
  
  button,
  input {
    color:${({ theme }) => theme.color.text};
    overflow: visible;
  }
  
  button,
  select {
    text-transform: none;
  }

  button {
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }
  
  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  
  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  img {
    max-width: 100%;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset,  8px 8px 24px rgba(49, 54, 167, 0.2) !important;
    -webkit-text-fill-color: #fff !important;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgb(188, 197, 255);
  }
  
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: ${prop => prop.add && "#e2e6ff"};
  }

  .blind {
    overflow: hidden;
    border: 0;
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    display: inline-block;
  }

`;

export default GlobalStyled;
