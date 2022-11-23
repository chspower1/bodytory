import React from 'react'
import styled from 'styled-components'

interface MessageProps{
  children ?: React.ReactNode;
  isErrorsMessage ?: string;
  currentComment ?: string;
}

const MessageBox = ({children, isErrorsMessage, currentComment}: MessageProps) => {
  const errorMessageText = () => {
    if (isErrorsMessage) {
      if (isErrorsMessage.includes("\n")) {
        return isErrorsMessage.split("\n").map(ele => <p key={ele}>{ele}</p>);
      } else {
        return <p>{isErrorsMessage}</p>;
      }
    } else {
      if (currentComment!.includes("\n")) {
        return currentComment!.split("\n").map(ele => <p key={ele}>{ele}</p>);
      } else {
        return <p>{currentComment}</p>;
      }
    }
  };
  return (
    <MessageContainer>
      {children ? children : errorMessageText()}
    </MessageContainer>
  )
}

export default MessageBox

const MessageContainer = styled.div`
  font-size: 36px;
  color:#fff;
  padding-bottom: 50px;
  text-align:center;
`