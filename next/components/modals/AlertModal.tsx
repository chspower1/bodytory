import CheckBoxInput from "@components/layout/input/CheckBoxInput";
import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface AlertModalProps {
  show: boolean;
  onClose: () => void;
}

const AlertModal = ({ show, onClose }: AlertModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [show]);
  const modalContent = (
    <AnimatePresence>
      {show && (
        <ModalWrapper
          onClick={onClose}
          initial={{x: `-50%`, y: -130}}
          animate={{
            x: `-50%`,
            y: 30,
            transition: {
              duration: 0.8,
            },
          }}
          exit={{
            x: `-50%`,
            y: -130,
            transition: {
              duration: 0.8,
            },
          }}
        >
          <CheckBoxInput isDeleteMessage name="deleteCheck" label="삭제되었습니다" checked={true} />
        </ModalWrapper>
      )}
    </AnimatePresence>
  );

  return isBrowser ? ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement) : null;
};

export default AlertModal;

const ModalWrapper = styled(motion.div)`
  position: fixed;
  left: 50%;
  top: 0;
  width: 400px;
  height: 100px;
  z-index: 1900;
  border-radius: 10px;
  box-shadow: 0px  0px 24px rgba(49, 54, 167, 0.2);
  background: #fff;
`;
