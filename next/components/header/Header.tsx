import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LogoImg from "@public/static/icon/Logo.png";
import SideMenu from "./SideMenu";
import { useRecoilValue } from "recoil";
import { loggedInUser } from "atoms/atoms";

const Header = () => {
  const router = useRouter();
  const loggedUser = useRecoilValue(loggedInUser);
  const [isLogin, setIsLogin] = useState(false);
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    if (loggedUser !== null) {
      setIsLogin(true);
      setRefresh(true);
    } else {
      setIsLogin(false);
      setRefresh(false);
    }
  }, [loggedUser]);

  return !isLogin ? (
    refresh ? null : (
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
    )
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
  z-index: 1000;
`;
const HeaderContainer = styled.div`
  padding: 0 65px;
`;
const HeaderInnerBox = styled.div`
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: end;
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
`;
