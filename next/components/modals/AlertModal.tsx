import CheckBoxInput from "@components/layout/input/CheckBoxInput";
import usePortal from "@hooks/usePortal";
import { media } from "@styles/theme";
import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface AlertModalProps {
  show: boolean;
  onClose: () => void;
}

const AlertModal = ({ show, onClose }: AlertModalProps) => {
  const Portal = usePortal();

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
          initial={{x: `-50%`, y: -130, opacity: 0}}
          animate={{
            x: `-50%`,
            y: 30,
            opacity: 1, 
            transition: {
              duration: 0.8,
            },
          }}
          exit={{
            x: `-50%`,
            y: -130,
            opacity: 0, 
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

  return Portal({ children: modalContent });
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
  ${media.mobile}{
    width: 360px;
    height: 60px;
    z-index: 2200;
  }
`;
