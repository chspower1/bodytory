import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import styled from 'styled-components';

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
              <h2>
                바디토리
              </h2>
              </Link>
          </HeaderLogoBox>
        </HeaderInnerBox>
      </HeaderContainer>
    </HeaderWrap>
  )
}

export default Header;

const HeaderWrap = styled.div`
  
`
const HeaderContainer = styled.div`
  padding:0 70px;
`
const HeaderInnerBox = styled.div`
  padding: 25px 0;
  display:flex;
  align-items:center;
  justify-content:end;
`
const HeaderLogoBox = styled.div`
  margin-left: 40px;
  a{
    h2{
      color:#fff;
      font-weight:bolder;
      font-size: 42px;
      letter-spacing: -6px;
    }
  }
`
const HeaderUl = styled.ul`
  display:flex;
  width:270px;
  align-items:center;
  li{
    margin : 0 30px;
    font-size: 18px;
    letter-spacing : -2px;
    font-weight: 600;
    a{
      color:#fff;
    }
  }
`
