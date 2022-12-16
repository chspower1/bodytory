import { media } from "@styles/theme";
import { UseMutateFunction } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled, { css } from "styled-components";

interface DeleteBtnProps {
  mutate: UseMutateFunction<any, unknown, any, unknown>;
  id: number;
  backgroundColor?: string;
  isCircle?: boolean;
  setShowAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
  isdowntext?: number;
}

const DeleteBtn = ({ mutate, id, backgroundColor, isCircle, setShowAlertModal, isdowntext = 0 }: DeleteBtnProps) => {
  const [confirmDelete, setConfirmDelete] = useState(-1);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, targetId: number) => {
    if (confirmDelete !== -1) {
      mutate({ id: confirmDelete });
      setConfirmDelete(-1);
      setShowAlertModal(true);
    } else {
      setConfirmDelete(targetId);
    }
  };
  return (
    <>
      <DeleteButton
        onClick={e => handleClick(e, id)}
        className={confirmDelete === id ? "active" : ""}
        onBlur={() => setConfirmDelete(-1)}
        bgColor={backgroundColor}
        isCircle={isCircle}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
        </svg>
        <span>삭제</span>
      </DeleteButton>
      {isCircle && (
        <AnimatePresence>
          {confirmDelete === id && (
            <DeleteCofirmTextBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              isdowntext={isdowntext}
            >
              <span>삭제하시겠습니까?</span>
            </DeleteCofirmTextBox>
          )}
        </AnimatePresence>
      )}
    </>
  );
};
export default DeleteBtn;
const DeleteButton = styled.button<{ bgColor?: string; isCircle?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 100%;
  background: ${props => (props.bgColor ? props.bgColor : "#d9deff")};
  border-radius: 0 20px 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.4s, width 0.4s;

  svg {
    width: 22px;
    height: 22px;
    fill: #8c9af3;
    transition: all 0.4s;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 40px;
    z-index: -1;
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.white};
    margin-top: 7px;
    opacity: 0;
    transition: opacity 0.4s, zIndex 0.4s, transform 0.4s;
  }

  &:hover {
    /* background: #c6cdfa; */

    svg {
      fill: ${props => props.theme.color.error};
    }
  }

  &.active {
    width: 70px;
    background: ${({ theme }) => theme.color.error};

    svg {
      transform: translate(0, -5px);
      fill: #fff;
    }

    span {
      opacity: 1;
      z-index: 1;
      transform: translate(-50%, 5px);
    }
  }

  ${media.mobile} {
    width: 34px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  ${({ isCircle }) =>
    isCircle &&
    css`
      position: relative;
      width: 100%;
      border-radius: 50%;
      svg {
      }
      span {
        display: none;
      }
      :hover {
        svg {
          fill: #fff;
        }
      }
      &.active {
        width: 100%;
        height: 100%;
        svg {
          transform: none;
        }
      }
    `}
`;

const DeleteCofirmTextBox = styled(motion.div)<{ isdowntext?: number }>`
  position: absolute;
  left: -68px;
  top: -50px;
  display: block;
  width: 120px;
  padding: 5px 0;
  background: ${({ theme }) => theme.color.error};
  font-size: 14px;
  border-radius: 5px;
  text-align: center;
  ::after {
    content: "";
    position: absolute;
    display: block;
    width: 15px;
    height: 15px;
    background: ${({ theme }) => theme.color.error};
    right: 25px;
    bottom: -8px;
    transform: rotate(-45deg);
    z-index: 2;
  }
  span {
    position: relative;
    z-index: 3;
    color: #fff;
  }
  ${({ isdowntext }) =>
    isdowntext &&
    css`
      top: auto;
      bottom: -50px;
      ::after {
        right: 25px;
        top: -8px;
        bottom: auto;
      }
    `}
`;
