import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

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
          <ConfirmBtn onClick={activeFuction}>확인</ConfirmBtn>
          {!closingComment && <ConfirmBtn onClick={onClose}>취소</ConfirmBtn>}
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

const ConfirmBtnBox = styled.div``;

const ConfirmBtn = styled.button``;

const showFrame = keyframes`
  100%{
    opacity: 1;
  }
`;

export const Dim = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: #00000042;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
const ModalBox = styled.div`
  width: 400px;
  height: 400px;
  background: #fff;
  margin: auto;
  opacity: 0;
  animation: ${showFrame} 0.3s forwards;
  padding: 20px;
`;

const ModalTitle = styled.div`
  padding: 20px 0;
  h3 {
    font-size: 25px;
  }
`;
const ModalContent = styled.div``;

export default Modal;
