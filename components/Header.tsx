import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import styled from 'styled-components';
import LogoImg from '@public/Logo.png'
const Header = () => {
  const {pathname} = useRouter();
  return (
    <HeaderWrap>
      <HeaderContainer>
        <HeaderInnerBox>
          <HeaderUl>
            <li>
              <Link href="">
                서비스 소개
              </Link>
            </li>
            <li>
            {pathname.includes("login") ? 
              <Link href="">
                회원가입 
              </Link>
              :
              <Link href="">
                로그인 
              </Link>}
            </li>
          </HeaderUl>
          <HeaderLogoBox>
            <Link href="">
              
              </Link>
          </HeaderLogoBox>
        </HeaderInnerBox>
      </HeaderContainer>
    </HeaderWrap>
  )
}

export default Header;

const HeaderWrap = styled.div`
  position:absolute;
  left:0px;
  top:0px;
  width:100%;
`
const HeaderContainer = styled.div`
  padding:0 65px;
`
const HeaderInnerBox = styled.div`
  padding: 30px 0;
  display:flex;
  align-items:center;
  justify-content:end;
`
const HeaderLogoBox = styled.div`
  margin-left: 42px;
  a{
    display:block;
    width:148px;
    height: 50px;
    background:url(${LogoImg.src}) no-repeat center center;
    background-size: contain;
  }
`
const HeaderUl = styled.ul`
  display:flex;
  width:270px;
  align-items:center;
  li{
    margin : 0 28px;
    font-size: 18px;
    letter-spacing : -1.5px;
    font-weight: 600;
    a{
      color:#fff;
    }
  }
`
