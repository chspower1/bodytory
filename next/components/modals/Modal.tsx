import { theme } from "@styles/theme";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled, { css, keyframes } from "styled-components";
import { RoundButton } from "../buttons/Button";
import { AnimatePresence, motion } from "framer-motion";
import { Dim, ModalContainer, ModalWrapper } from "@styles/ModalStyled";

interface ModalProps {
  show: boolean;
  closingComment?: boolean;
  onClose: () => void;
  activeFuction: () => void;
  title?: string;
  children?: string | ReactNode;
  agreeType?: boolean;
  terms?: boolean;
  width?: string;
  height?: string;
}
/**
 * @show 필수 입니다.
 * @closingComment false가 기본값입니다.
 */
function Modal({
  show,
  closingComment = false,
  onClose,
  activeFuction,
  children,
  title = "알림",
  agreeType = false,
  terms = false,
  width = "600px",
  height = "350px",
}: ModalProps) {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
    return setIsBrowser(true);
  }, []);
  const modalContent = (
    <AnimatePresence>
      {show && (
        <ModalWrapper>
          <Dim onClick={onClose} />
          <ModalBox width="auto" height="auto">
            <ModalTitle>
              <h3>{title}</h3>
            </ModalTitle>
            <ModalContent bgColor={terms}>{children}</ModalContent>
            <ConfirmBtnBox>
              <RoundButton size="sm" onClick={activeFuction}>
                {agreeType ? `동의합니다` : !closingComment ? "네" : "확인"}
              </RoundButton>
              {!closingComment && (
                <RoundButton size="sm" bgColor={`rgba(188, 197, 255, 1)`} onClick={onClose}>
                  {agreeType ? `동의하지 않습니다` : "아니요"}
                </RoundButton>
              )}
            </ConfirmBtnBox>
          </ModalBox>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );

  return isBrowser ? ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement) : null;
}

const ConfirmBtnBox = styled.div`
  display:flex;
  justify-content:center;
  margin-top: 30px;
  button {
    display: inline-block;
    margin: 0 10px;
    width: auto;
    padding: 0 30px;
  }
`;

const ModalBox = styled(ModalContainer)`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align:center;
`;

const ModalTitle = styled.div`
  padding: 20px 0;
  font-size: 20px;
  font-weight: 700;
`;
const ModalContent = styled.div<{ bgColor: boolean }>`
  font-size: 18px;
  padding: 30px 50px;
  border-radius: 10px;
  //
  line-height: 1.5;
  p {
    padding: 5px 0;
    b {
      font-weight: 600;
    }
  }
  ${({ bgColor, theme }) =>
    bgColor &&
    css`
      background: ${theme.color.lightBg};
      padding: 10px;
    `}
`;

export default Modal;
