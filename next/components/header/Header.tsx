import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import LogoImg from "@src/assets/icons/Logo.png";
import SideMenu from "./SideMenu";
import useUser from "@hooks/useUser";
import { media } from "@styles/theme";

const Header = () => {
  const router = useRouter();
  const { user, isFetching } = useUser();

  return (isFetching || router.pathname.includes("/landing")) ? null : !user ? (
    <HeaderWrap>
      <HeaderContainer>
        <HeaderInnerBox>
          <HeaderUl>
            <li>
              <Link href="/">서비스 소개</Link>
            </li>
            <li>
              {router.asPath.includes("login") ? (
                <Link href="/auth/register/choice" title="회원가입">
                  회원가입
                </Link>
              ) : (
                <Link href="/auth/login" title="로그인">
                  로그인
                </Link>
              )}
            </li>
          </HeaderUl>
          <HeaderLogoBox>
            <Link href="/auth/login" title="바디토리">
              <span>바디토리</span>
            </Link>
          </HeaderLogoBox>
        </HeaderInnerBox>
      </HeaderContainer>
    </HeaderWrap>
  ) : (
    <SideMenu />
  );
};

export default Header;

const HeaderWrap = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  z-index: 2000;
`;
const HeaderContainer = styled.div`
  padding: 0 65px;
  ${media.mobile} {
    padding: 0 20px;
  }
`;
const HeaderInnerBox = styled.div`
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: end;
  ${media.tablet} {
    justify-content: space-between;
  }
  //${media.mobile}{
  //   justify-content: space-between;
  // }
`;
const HeaderLogoBox = styled.div`
  margin-left: 42px;
  a {
    display: block;
    width: 148px;
    height: 50px;
    background: url(${LogoImg.src}) no-repeat center center;
    background-size: contain;
    span {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      clip: rect(0, 0, 0, 0);
      overflow: hidden;
    }
  }
  ${media.tablet} {
    margin-left: 0;
    order: 1;
  }
  ${media.mobile} {
    a {
      width: 100px;
      height: 30px;
    }
  }
`;
const HeaderUl = styled.ul`
  display: flex;
  width: 270px;
  align-items: center;
  li {
    margin: 0 28px;
    font-size: 18px;
    letter-spacing: -1.5px;
    font-weight: 600;
    a {
      color: #fff;
    }
  }
  ${media.tablet} {
    width: 242px;
    order: 2;
  }
  ${media.mobile} {
    width: 210px;
    justify-content: flex-end;
    li {
      font-size: 14px;
      margin: 0 14px;
      &:last-child{
        width: 43px;
        text-align:center;
      }
    }
  }
`;
