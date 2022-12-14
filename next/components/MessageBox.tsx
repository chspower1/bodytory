import { media } from "@styles/theme";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

interface MessageProps {
  children?: React.ReactNode;
  isErrorsMessage?: string;
  currentComment?: string;
}

const MessageBox = ({ children, isErrorsMessage, currentComment }: MessageProps) => {
  const errorMessageText = () => {
    if (isErrorsMessage) {
      if (isErrorsMessage.includes("\n")) {
        return isErrorsMessage.split("\n").map(ele => <p key={ele}>{ele}</p>);
      } else {
        return <p>{isErrorsMessage}</p>;
      }
    } else {
      if (currentComment?.includes("\n")) {
        return currentComment?.split("\n").map(ele => <p key={ele}>{ele}</p>);
      } else {
        return <p>{currentComment}</p>;
      }
    }
  };

  return (
    <MessageContainer
      key={isErrorsMessage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 , transition: { duration: 0.7, ease: "easeOut" } }}
      className="messageBox"
    >
      {children ? children : errorMessageText()}
    </MessageContainer>
  );
};

export default MessageBox;

const MessageContainer = styled(motion.div)`
  font-size: 34px;
  letter-spacing: -1px;
  word-spacing: -2px;
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 166px;
  word-break:keep-all;
  ${media.mobile}{
    font-size: 24px;
    height:136px;
  }
`;
