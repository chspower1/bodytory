import { motion, Variants } from "framer-motion";
import styled from "styled-components";
const MODAL_VARIANTS: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", bounce: 0.5, duration: 0.7 },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    transition: {
      type: "spring",
      duration: 0.6,
    },
  },
};
const DIM_VARIANTS: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
export const ModalWrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
export const ModalContainer = styled(motion.div).attrs({
  variants: MODAL_VARIANTS,
  initial: "initial",
  animate: "animate",
  exit: "exit",
})<{
  width?: string;
  height?: string;
}>`
  z-index: 2000;
  width: ${props => (props.width ? props.width : "650px")};
  height: ${props => (props.height ? props.height : "350px")};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 30px;
`;

export const Dim = styled(motion.div).attrs({
  variants: DIM_VARIANTS,
  initial: "initial",
  animate: "animate",
  exit: "exit",
})`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1200;
  background: #00000042;
`;
