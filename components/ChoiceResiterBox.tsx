import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'


const ContentBox =  styled.div`
  width:400px;
  height:80px;
  border: 1px solid #000;
  & + &{
    margin-top :19px;
  }
  a{
    display: flex;
    width:100%;
    height:100%;
    align-items:center;
  }
`
const ImgBg =  styled.div`
  width:80px;
  height:100%;
  flex-shrink:0;
  border: 1px solid #000;

`
const TextBox =  styled.div`
  flex:1;
  text-align:center;
`

export default function ChoiceResiterBox({title, img} : { title : string, img : string }) {
  return (
    <ContentBox>
      <Link href="/auth/register">
        <ImgBg className="imgBg"></ImgBg>
        <TextBox>
            {title} 회원가입
        </TextBox>
      </Link>
    </ContentBox>
  )
}
