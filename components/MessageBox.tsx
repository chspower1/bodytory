import React from 'react'
import styled from 'styled-components'

const MessageBox = ({children}:{children : React.ReactNode}) => {
  return (
    <MessageContainer>
      {children}
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