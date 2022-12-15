import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { media } from "./theme";

const GlobalStyled = createGlobalStyle`
${reset}

  * {
    box-sizing: border-box;
  }


  html,
  body {
    // background: ${props => props.theme.color.darkBg};
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
    border:none;
    outline:none;
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
  select{
    -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("/static/icon/select_arrow.png") no-repeat 97% 50%/15px auto;
  background-color: white;
  
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

  ::-webkit-scrollbar {
    width: 10px;
    background-color: "#e2e6ff";
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgb(188, 197, 255);
  }
  
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: "#e2e6ff";
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

  
  ${media.tablet} {
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .gs_reveal {
    opacity: 0;
  }
  
  .gs_reveal_fromBottom {
    transform: translate(0, 40px);
  }
  
  .gs_reveal_fromTop {
    transform: translate(0, -40px);
  }
  
  .gs_reveal_fromRight {
    transform: translate(60px, 0);
  }
  
  .gs_reveal_fromLeft {
    transform: translate(-60px, 0);
  }
`;

export default GlobalStyled;
