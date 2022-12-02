import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const LendingRoot = styled.div`

  .btnBox{
    display:flex;

    a{
      display:flex;
      justify-content:center;
      align-items:center;
      width:100px;
      height:100px;
      border-radius: 50%;
      border : 1px solid #000;
      &:first-child{ 
        background:#fff;
        color:#000;
        box-shadow: 0 0 5px 3px #00000053, inset 0 0 0 #000;
        &:active{
          box-shadow: 0 0 0 0 #00000053, inset 0 0 5px 3px #000;
        }
      }
      &:last-child{
        background:#000;
        color:#fff;
        box-shadow: 0 0 5px 3px #fff, inset 0 0 0 #fff;
        &:active{
          box-shadow: 0 0 0 0 #fff, inset 0 0 5px 3px #fff;
        }
      }
    }
  }
`

export default function LendingPage() {
  return (
    <LendingRoot>
      <h2>바디토리는 처음이신가요?</h2>
      <div className="btnBox">
        <Link href="/auth/choice">
          네
        </Link>
        <Link href="/auth/login">
          아니요
        </Link>
      </div>
    </LendingRoot>
  )
}
