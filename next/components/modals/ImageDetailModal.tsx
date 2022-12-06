import { RoundButton } from "@components/buttons/Button";
import { Dim, ModalContainer, ModalWrapper } from "@styles/ModalStyled";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface ImageDetailModalProps {
  show: number;
  onClose: () => void;
  url: string;
  width?: string;
  height?: string;
  index: number;
}

const ImageDetailModal = ({ show, onClose, url, width, height, index }: ImageDetailModalProps) => {
  console.log(show, index);
  const modalContent = (
    <AnimatePresence>
      {show === index && (
        <ModalWrapper>
          <Dim onClick={onClose} />
          <ModalContainer width="0px" height="0px">
            <ImageBox>
              <Image src={url} fill alt="사진" objectFit="contain" />
              {/* <BtnBox>
                <RoundButton
                  size="sm"
                  nonSubmit
                  onClick={() => {
                    console.log(show);
                    onClose();
                  }}
                >
                  닫기
                </RoundButton>
              </BtnBox> */}
            </ImageBox>
          </ModalContainer>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
  return ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
};
export default ImageDetailModal;
const ImageBox = styled.div`
  position: relative;
  padding: 400px;
`;
const BtnBox = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
`;
