import { theme } from "@styles/theme";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import { RoundButton } from "./button/Button";

interface ModalType {
  show: boolean;
  closingComment?: boolean;
  onClose: () => void;
  activeFuction: () => void;
  title?: string;
  children?: string | JSX.Element;
}
/**
 * @show 필수 입니다.
 * @closingComment false가 기본값입니다.
 */
function Modal({ show, closingComment = false, onClose, activeFuction, children, title }: ModalType) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    return setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <Dim>
      <ModalBox>
        <ModalTitle>
          <h3>{title}</h3>
        </ModalTitle>
        <ModalContent>{children}</ModalContent>
        <ConfirmBtnBox>
          <RoundButton size="sm"  onClick={activeFuction}>네</RoundButton>
          {!closingComment && <RoundButton size="sm" bgColor={theme.color.error} onClick={onClose}>아니요</RoundButton>}
        </ConfirmBtnBox>
      </ModalBox>
    </Dim>
  ) : null;
  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
  } else {
    return null;
  }
}

const ConfirmBtnBox = styled.div`
  margin-top: 30px;
  button{
    display:inline-block;
    margin : 0 10px;
    width:auto;
    padding: 0 30px;
    &:first-child:hover  {
      background : ${({theme}) =>theme.color.mintBtn};
    }
  }
`;

const ConfirmBtn = styled.button``;

const showFrame = keyframes`
  100%{
    opacity: 1;
  }
`;

const Dim = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1200;
  background: #00000042;
  display: flex;
  text-align: center;
`;
const ModalBox = styled.div`
  width: 400px;
  background: #fff;
  margin: auto;
  opacity: 0;
  animation: ${showFrame} 0.3s forwards;
  padding: 20px;
  border-radius: 10px;
`;

const ModalTitle = styled.div`
  padding: 20px 0;
  font-size: 30px;
  
`;
const ModalContent = styled.div`
  font-size: 16px;
  padding: 30px 10px;
  border-radius: 10px;
  background : ${({theme}) =>theme.color.lightBg};
`;

export default Modal;
