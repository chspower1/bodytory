import { RoundButton } from "@components/buttons/Button";
import { WhiteBoldText, WhiteText } from "@styles/Common";
import { Dim, ModalContainer, ModalWrapper } from "@styles/ModalStyled";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Next from "/public/static/icon/right_bracket.svg";
import Previus from "/public/static/icon/left_bracket.svg";
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
  console.log(show, index);
  const modalContent = (
    <AnimatePresence>
      {show === index && (
        <ModalWrapper>
          <Dim onClick={onClose} />
          <ModalContainer flex width="0px" height="0px">
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
  return ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
};
export default ImageDetailModal;
const ImageBox = styled.div`
  position: relative;
  padding: 350px;
`;
const NextBtn = styled.button`
  position: absolute;
  right: -100px;
  color: white;
`;
const PreviusBtn = styled.button`
  position: absolute;
  left: -100px;
  color: white;
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
