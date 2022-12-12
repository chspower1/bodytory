import CheckBoxInput from '@components/layout/input/CheckBoxInput';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import styled from 'styled-components';


interface AlertModalProps{
  show : boolean;

  onClose : () => void;
}

const AlertModal = ({show, onClose} : AlertModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const modalContent = (
    <AnimatePresence>
      {show && (
        <ModalWrapper>
          <CheckBoxInput name="deleteCheck" label="삭제되었습니다" checked/>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );

  return isBrowser ? ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement) : null;
}

export default AlertModal;

const ModalWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 0;
  width: 300px;
  height: 60px;
  border-radius: 0 0 10px 10px;
  box-shadow: inset 3px 3px 2px 4px rgba(0,0,0,.2);
  button{
    width: 100%;
    height:100%;
  }
`