import { Position, RecordType } from "@prisma/client";
import { changeDate } from "@utils/client/changeDate";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { RoundButton } from "../layout/buttons/Button";
import { AnimatePresence, motion } from "framer-motion";
import { Dim, ModalContainer, ModalWrapper } from "@styles/ModalStyled";
import usePortal from "@hooks/usePortal";
import { ModalButton } from "./RecordModal";

interface ClinicModalProps {
  id?: number;
  createAt?: Date;
  updateAt?: Date;
  type?: RecordType;
  position?: Position;
  description?: string;
  userId?: number;
  diagnosis?: string;
  prescription?: string;
  hospitalId?: number;
  name?: string;
  show: boolean;
  onClose: () => void;
}

const ClinicModal = ({
  name,
  createAt,
  diagnosis = "없음",
  prescription = "없음",
  description = "없음",
  show = false,
  onClose,
}: ClinicModalProps) => {
  const Portal = usePortal();

  const modalContent = (
    <AnimatePresence>
      {show && (
        <ModalWrapper>
          <Dim onClick={onClose} />
          <ModalContainer width="860px" height="auto">
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
                  <div>
                    {description.includes("\n")
                      ? description.split("\n").map((ele, index) => <p key={index}>{ele}</p>)
                      : description}
                  </div>
                </li>
              </ul>
              <div>
                <ModalButton sm onClick={onClose} bgColor='rgb(197,205,251)' color="rgb(93,107,178)">
                  닫기
                </ModalButton>
              </div>
            </ModalContent>
          </ModalContainer>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
  return Portal({ children: modalContent });
};

export default ClinicModal;




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
  padding: 60px 80px 40px;
  > div{
    display:flex;
    justify-content:center;
    margin: 50px 0 0;
  }
  ul {
    li {
      display: flex;
      & + li {
        margin-top: 20px;
      }
      div + div {
        width: 100%;
        max-height: 170px;
        overflow-y: scroll;
        background: rgba(188, 197, 255, 0.2);
        padding: 10px 20px;
        border-radius: 5px;
      }
    }
  }
`;
export const Subject = styled.div`
  flex-shrink: 0;
  font-weight: 600;
  margin-right: 60px;
  height: 48px;
  display: flex;
  align-items: center;
`;
