import { Position, RecordType } from "@prisma/client";
import { changeDate } from "@utils/client/changeDate";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { RoundButton } from "../buttons/Button";
import { showFrame } from "./Modal";

interface ClinicModalProps {
  id ?: number;
  createAt ?: Date;
  updateAt ?: Date;
  type ?: RecordType;
  position ?: Position;
  description ?: string;
  userId ?: number;
  diagnosis ?: string;
  prescription?: string;
  hospitalId ?: number;
  name ?: string;
  isModalOpen : boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClinicModal = ({
  name,
  createAt,
  diagnosis = "없음",
  prescription = "없음",
  description = "없음",
  isModalOpen,
  setIsModalOpen,
}: ClinicModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  
  useEffect(() => {
    setIsBrowser(true);
    return setIsBrowser(true);
  }, []);

  const modalContent = isModalOpen ? (
    <ModalBox>
      <Dim />
      <Modal>
        <ModalHead>
          <h3>{name}</h3>
          <p>
            <span>진료일시</span>
            {changeDate(createAt!)}
          </p>
        </ModalHead>
        <ModalContent>
          <ul>
            <li>
              <Subject>진단결과</Subject>
              <div>{diagnosis}</div>
            </li>
            <li>
              <Subject>처방내용</Subject>
              <div>{prescription}</div>
            </li>
            <li>
              <Subject>상세소견</Subject>
              <div>{description}</div>
            </li>
          </ul>
          <RoundButton size="sm" nonSubmit onClick={() => setIsModalOpen(false)}>
            닫기
          </RoundButton>
        </ModalContent>
      </Modal>
    </ModalBox>
  ) : null;
  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
  } else {
    return null;
  }
};

export default ClinicModal;

const ModalBox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1000;
  opacity:0;
  animation: ${showFrame} 0.3s forwards;
`;

const Dim = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.2);
  z-index: 2;
`;

const Modal = styled.div`
  position: relative;
  z-index: 3;
  width: 860px;
  border-radius: 40px;
  margin: auto;
  overflow: hidden;

`;

const ModalHead = styled.div`
  padding: 20px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.darkBg};
  color: ${({ theme }) => theme.color.white};
  h3 {
    font-size: 20px;
    font-weight: 600;
  }
  p {
    font-size: 16px;
    span {
      margin-right: 14px;
      font-weight: 600;
    }
  }
`;
const ModalContent = styled.div`
  background: ${({ theme }) => theme.color.white};
  padding: 60px 80px;
  button {
    width: 100px;
    margin: 50px auto 0;
    background: rgba(188, 197, 255, 1);
  }
  ul {
    li {
      display: flex;
      & + li {
        margin-top: 20px;
      }
      div {
      }
    }
  }
`;
export const Subject = styled.div`
  flex-shrink: 0;
  font-weight: 600;
  margin-right: 60px;
`;
