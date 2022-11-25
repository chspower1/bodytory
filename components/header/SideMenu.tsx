import { Col, Row } from "@styles/Common";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import settingIcon from "@public/settingIcon.png";
import HamburgerMenuButton from "./HamburgerMenuButton";
import { useRouter } from "next/router";
const SideMenu = () => {
  const router = useRouter();
  const dimRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuList, _] = useState([
    {
      subject: "오늘 기록하기",
      link: "/auth/records/write",
    },
    {
      subject: "기록 확인하기",
      link: "/auth/records/chart",
    },
    {
      subject: "내 병원 관리하기",
      link: "",
    },
  ]);
  /* /auth/hospital */
  return (
    <>
      <HamburgerMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <Dim>
        <SideMenuBox>
          <InnerBox>
            <ContentsBox>
              <div className="goEdit">
                <Link href="/auth/profile/edit">
                  <i></i>계정 설정
                </Link>
              </div>
              <Nav>
                <ul>
                  {menuList.map(({ subject, link }) => (
                    <li key={subject} className={router.asPath === link ? "active" : ""}>
                      <Link href={link}>{subject}</Link>
                    </li>
                  ))}
                </ul>
              </Nav>
            </ContentsBox>
          </InnerBox>
        </SideMenuBox>
      </Dim>}
    </>
  );
};

export default SideMenu;

const OpenDimAnimation = keyframes`
  0%{
    opacity: 0;
    display:none;
  }
  100%{
    opacity: 1;
    display: flex;
  }
`
const CloseDimAnimation = keyframes`
  0%{
    opacity: 1;
    
  }
  100%{
    opacity: 0;
    
  }
`
const OpenMenuAnimation = keyframes`
  0%{
    transform: translateX(100%);
  }
  100%{
    transform: translateX(0);
  }
`

const Dim = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  animation: ${OpenDimAnimation} .6s forwards;
`;

const SideMenuBox = styled.div`
  width: 500px;
  height: 97%;
  padding: 87px 40px 56px 76px;
  margin: auto 0 0 auto;
  background: ${({ theme }) => theme.color.darkBg};
  border-radius: 50px 0 0 50px;
  transform: translateX(100%);
  animation: ${OpenMenuAnimation} .6s forwards;
  color: #fff;
  a {
    color: #fff;
  }
`;

const InnerBox = styled(Col)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const ContentsBox = styled.div`
  width: 100%;
  .goEdit {
    text-align: right;
    a {
      display: inline-flex;
      align-items: center;
      i {
        width: 22px;
        height: 22px;
        background: url(${settingIcon.src}) no-repeat center center;
        background-size: cover;
        margin-right: 10px;
      }
    }
  }
`;

const Nav = styled.nav`
  padding-top: 100px;
  ul {
    li {
      position: relative;
      display: inline-block;
      padding-bottom: 10px;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: #fff;
        transform: scaleX(0);
        transition: transform 0.6s;
      }
      a {
        font-size: 35px;
        font-weight: bolder;
        letter-spacing: -2px;
      }
      & + li {
        margin-top: 50px;
      }
      &.active::after {
        transform: scaleX(1);
      }
      &:hover::after {
        transform: scaleX(1);
      }
    }
  }
`;

const Footer = styled(Row)`
  justify-content: space-around;
`;
