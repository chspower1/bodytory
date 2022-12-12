import { Variants } from "framer-motion";

export const BTN_VARIANTS: Variants = {
  initial: {
    y: 15,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: .5,
    },
  },
  exit: {
    y: 15,
    opacity: 0,
  },
};
