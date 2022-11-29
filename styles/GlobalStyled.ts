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
    font-family: 'Noto Sans KR', sans-serif;
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
    line-height: 1.15;
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
    -webkit-box-shadow: 0 0 0px 1000px ${({theme}) => theme.color.input} inset,  8px 8px 24px rgba(49, 54, 167, 0.2) !important;
    -webkit-text-fill-color: #fff !important;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #e0d6be;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #AFA58D;
  }

`;

export default GlobalStyled;
