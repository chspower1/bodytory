import React from "react";
import styled, { keyframes } from "styled-components";
import { showFrame } from "./Modal";



const RecordModal = ({children} : {children ?: React.ReactNode}) => {
  return (
    <ModalBox>
      <Dim />
      <Modal>
        {children}
      </Modal>
    </ModalBox>
  );
};

export default RecordModal;


const ModalBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display:flex;
`;

const Dim = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const Modal = styled.div`
  position: relative;
  z-index: 3;
  width: 800px;
  height: 780px;
  border-radius: 40px;
  margin: auto;
  overflow: hidden;
  background: ${({ theme }) => theme.color.white};
  opacity:0;
  animation: ${showFrame} 0.3s forwards;
`;
