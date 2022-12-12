import { Variants } from "framer-motion";

export const BTN_VARIANTS: Variants = {
  initial: {
    y: 30,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: .4,
    },
  },
  exit: {
    y: 30,
    opacity: 0,
  },
};
