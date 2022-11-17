import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

interface ModalType {
  show: boolean;
  onClose : () => void;
  children?: string;
  title?: string;
}

function Modal({ show, onClose, children, title }: ModalType) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    return setIsBrowser(true);
  }, []);
  const handleCloseClick = () => {
    onClose();
  };
  const modalContent = show ? (
    <Dim>
      <ModalBox>
        <ModalCloseBtnBox>
          <button onClick={handleCloseClick}>x</button>
        </ModalCloseBtnBox>
        <ModalTitle>
          <h3>{title}</h3>
        </ModalTitle>
        <ModalContent>{children}</ModalContent>
      </ModalBox>
    </Dim>
  ) : null;
  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
  } else {
    return null;
  }
}

const showFrame = keyframes`
  100%{
    opacity: 1;
  }
`;

const Dim = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: #00000042;
  display: flex;
  text-align:center;
`;
const ModalBox = styled.div`
  width: 400px;
  height: 400px;
  background: #fff;
  margin:auto;
  opacity:0;
  animation: ${showFrame} .3s forwards;
  padding: 20px;
`;

const ModalCloseBtnBox = styled.div`
  text-align:right;
`

const ModalTitle = styled.div`
  padding: 20px 0;
  h3{
    font-size: 25px;
  }
`
const ModalContent = styled.div`

`

export default Modal;
