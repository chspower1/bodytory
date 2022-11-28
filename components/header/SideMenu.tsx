import { Col, Row } from "@styles/Common";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import settingIcon from "@public/settingIcon.png";
import HamburgerMenuButton from "./HamburgerMenuButton";
import { useRouter } from "next/router";
import LogoutBtn from "@components/LogoutBtn";
const SideMenu = () => {
  const router = useRouter();
  const dimRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [menuList, _] = useState([
    {
      subject: "오늘 기록하기",
      link: "/users/records/write",
    },
    {
      subject: "기록 확인하기",
      link: "/users/records/chart",
    },
    {
      subject: "내 병원 관리하기",
      link: "",
    },
  ]);
  /* /auth/hospital */

  const handleClickCloseMenu = () => {
    if (isOpen === isActive) {
      if (isOpen) {
        setIsOpen(false);
        setTimeout(() => {
          setIsActive(false);
        }, 600);
      }
    }
  };
  useEffect(() => {
    handleClickCloseMenu();
  }, [router.asPath]);

  return (
    <>
      <HamburgerMenuButton isOpen={isOpen} setIsOpen={setIsOpen} isActive={isActive} setIsActive={setIsActive} />
      {isActive && (
        <Dim isOpen={isOpen}>
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
        </Dim>
      )}
    </>
  );
};

export default SideMenu;

const Dim = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? `1` : `0`)};
  transition: opacity 0.6s;
  ${({ isOpen }) =>
    isOpen &&
    css`
      & > div {
        transform: translateX(0%);
      }
    `}
`;

const SideMenuBox = styled.div`
  position: absolute;
  right: -500px;
  bottom: 0;
  z-index: 11;
  display: flex;
  width: 500px;
  height: 97%;
  flex-direction: column;
  background: ${({ theme }) => theme.color.darkBg};
  border-radius: 50px 0 0 50px;
  transform: translateX(100%);
  transition: transform 0.6s;

  color: #fff;
  a {
    color: #fff;
  }
`;

const InnerBox = styled(Col)`
  width: 100%;
  height: 100%;
  padding: 87px 40px 56px;
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

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Nav = styled.nav`
  padding-top: 100px;
  ul {
    margin-left: 36px;
    li {
      a {
        position: relative;
        font-size: 35px;
        font-weight: bolder;
        padding-bottom: 10px;
        letter-spacing: -2px;
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
        &.active::after {
          transform: scaleX(1);
        }
        &:hover::after {
          transform: scaleX(1);
        }
      }
      & + li {
        margin-top: 50px;
      }
    }
  }
`;

const Footer = styled.div`
  flex-shrink: 0;
  padding: 18px 0;
  background: ${({ theme }) => theme.color.disabled};
`;
const FooterUl = styled(Row)`
  justify-content: space-between;
  margin-left: 40px;
  padding: 0 30px;
  font-size: 14px;
  li {
    list-style: none;
  }
`;
