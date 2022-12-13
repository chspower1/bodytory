import { theme } from "@styles/theme";
import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { Dim, ModalContainer, ModalWrapper } from "@styles/ModalStyled";
import usePortal from "@hooks/usePortal";
import { ModalButton } from "./RecordModal";

interface ModalProps {
  show: boolean;
  closingComment?: boolean;
  onClose: () => void;
  activeFunction: () => void;
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
  activeFunction,
  children,
  title = "알림",
  agreeType = false,
  terms = false,
}: ModalProps) {
  const Portal = usePortal();
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
              <ModalButton sm onClick={activeFunction}>
                {agreeType ? `동의합니다` : !closingComment ? "네" : "확인"}
              </ModalButton>
              {!closingComment && (
                <ModalButton sm bgColor="rgb(188, 197, 255)" onClick={onClose}>
                  {agreeType ? `동의하지 않습니다` : "아니요"}
                </ModalButton>
              )}
            </ConfirmBtnBox>
          </ModalBox>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );

  return Portal({ children: modalContent });
}

const ConfirmBtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 40px;
`;

const ModalBox = styled(ModalContainer)`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
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
