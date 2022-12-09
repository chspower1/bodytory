import { motion } from "framer-motion";
import { useState } from "react";

const Item = ({ content }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return <motion.div layout>{isOpen && content}</motion.div>;
};

export default Item;
