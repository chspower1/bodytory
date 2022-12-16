import { WhiteText } from "@styles/Common";
import { Dim, ModalWrapper, MODAL_VARIANTS } from "@styles/ModalStyled";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Next from "@src/assets/icons/right_bracket.svg";
import Previus from "@src/assets/icons/left_bracket.svg";
import usePortal from "@hooks/usePortal";
import { media } from "@styles/theme";
interface ImageDetailModalProps {
  show: number;
  onClose: () => void;
  url: string;
  width?: string;
  height?: string;
  index: number;
  imagesLength: number;
  setShow: Dispatch<SetStateAction<number>>;
}

const ImageDetailModal = ({ show, onClose, url, index, imagesLength, setShow }: ImageDetailModalProps) => {
  const Portal = usePortal();

  const modalContent = (
    <AnimatePresence>
      {show === index && (
        <ModalWrapper>
          <Dim onClick={onClose} />
          <ModalContainer flex width="0px" height="0px">
            <ImageBox>
              <Image src={url} fill alt="사진" objectFit="scale-down" />
              <CurrentPage>
                {index + 1} / {imagesLength}
              </CurrentPage>
              {imagesLength === index + 1 || (
                <NextBtn onClick={() => setShow(prev => prev + 1)}>
                  <NextIcon />
                </NextBtn>
              )}
              {index === 0 || (
                <PreviusBtn onClick={() => setShow(prev => prev - 1)}>
                  <PreviusIcon />
                </PreviusBtn>
              )}
            </ImageBox>
          </ModalContainer>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
  return Portal({ children: modalContent });
};
export default ImageDetailModal;
const ModalContainer = styled(motion.div).attrs({
  variants: MODAL_VARIANTS,
  initial: "initial",
  animate: "animate",
  exit: "exit",
})<{
  width?: string;
  height?: string;
  flex?: boolean;
}>`
  z-index: 2000;
  width: ${props => (props.width ? props.width : "650px")};
  height: ${props => (props.height ? props.height : "350px")};
  min-width: 360px;
  background-color: white;
  border-radius: 30px;
  margin: auto;
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
    `}
`;
const ImageBox = styled.div`
  position: relative;
  padding: 350px;
  ${media.mobile} {
    padding: 160px;
  }
`;
const NextBtn = styled.button`
  position: absolute;
  right: -100px;
  color: white;
  ${media.custom(950)} {
    width: 30px;
    right: 260px;
    bottom: -48px;
  }
  ${media.mobile} {
    right: 60px;
  }
`;
const PreviusBtn = styled.button`
  position: absolute;
  left: -100px;
  color: white;
  ${media.custom(950)} {
    width: 30px;
    left: 260px;
    bottom: -48px;
  }
  ${media.mobile} {
    left: 60px;
  }
`;
const CurrentPage = styled(WhiteText)`
  position: absolute;
  font-size: 30px;
  bottom: -50px;
  transform: translateX(-50%);
`;
const NextIcon = styled(Next)`
  stroke: white;
  transition: stroke 0.3s ease;
  &:hover {
    stroke: ${props => props.theme.color.mint};
  }
  .none {
    stroke: rgba(0, 0, 0, 0.4);
  }
`;
const PreviusIcon = styled(Previus)`
  stroke: white;
  transition: stroke 0.3s ease;
  &:hover {
    stroke: ${props => props.theme.color.mint};
  }
`;
