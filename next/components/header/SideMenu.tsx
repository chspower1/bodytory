import { Col, Row } from "@styles/Common";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import settingIcon from "@src/assets/icons/settingIcon.png";
import HamburgerMenuButton from "./HamburgerMenuButton";
import { useRouter } from "next/router";
import LogoutBtn from "@components/layout/buttons/LogoutBtn";
import toriLink from "@src/assets/icons/toriLink.png";
import menuLogo from "@src/assets/icons/menuLogo.png";
import { media } from "@styles/theme";

const SideMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [menuList, _] = useState([
    {
      subject: "홈으로",
      link: "/",
    },
    {
      subject: "오늘 기록하기",
      link: "/users/records/write",
    },
    {
      subject: "기록 확인하기",
      link: "/users/records",
    },
    {
      subject: "내 병원 관리하기",
      link: "/users/my-hospital",
    },
    {
      subject: "병원 검색하기",
      link: "/users/my-hospital/find",
    },
  ]);

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
        <SideMenuWrap>
          <Dim isOpen={isOpen} onClick={handleClickCloseMenu} />
          <SideMenuBox>
            <InnerBox>
              <ContentsBox>
                <Link href="/" onClick={handleClickCloseMenu}>
                  <LogoBox>
                    <div className="logoBg"></div>
                  </LogoBox>
                </Link>
                <div className="goEdit">
                  <Link href="/users" onClick={handleClickCloseMenu}>
                    <span>
                      <i />
                      계정 설정
                    </span>
                  </Link>
                </div>
                <Nav>
                  <ul>
                    {menuList.map(({ subject, link }) => (
                      <li key={subject}>
                        <Link href={link} onClick={handleClickCloseMenu}>
                          {subject}
                        </Link>
                        {router.asPath === link && <i></i>}
                      </li>
                    ))}
                  </ul>
                </Nav>
              </ContentsBox>
              <ButtonBox>
                <LogoutBtn />
              </ButtonBox>
            </InnerBox>
            <Footer>
              <FooterUl>
                <li>
                  <Link href="/about/tory">바디토리 소개</Link>
                </li>
                <li>
                  <Link href="/about/team">팀 소개</Link>
                </li>
                <li>© 2022. BODYTORY</li>
              </FooterUl>
            </Footer>
          </SideMenuBox>
        </SideMenuWrap>
      )}
    </>
  );
};

export default SideMenu;

const SideMenuWrap = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
`;

const LogoBox = styled.div`
  .logoBg {
    width: 190px;
    height: 70px;
    background: url(${menuLogo.src}) no-repeat center center/contain;
  }

  ${media.custom(1280)} {
    .logoBg {
      width: 170px;
    }
  }

  ${media.mobile} {
    .logoBg {
      width: 130px;
      height: 50px;
    }
  }
`;

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
      & + div {
        transform: translate(0, 0);
      }
    `}
`;

const SideMenuBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(100%, 0);
  z-index: 11;
  display: flex;
  width: 90%;
  max-width: 500px;
  height: 97%;
  flex-direction: column;
  background: ${({ theme }) => theme.color.darkBg};
  border-radius: 30px 0 0 30px;
  transition: transform 0.6s;
  overflow: hidden;
  color: #fff;
  a {
    color: #fff;
  }
`;

const InnerBox = styled(Col)`
  width: 100%;
  height: 100%;
  padding: 30px 40px 40px;
  justify-content: space-between;

  ${media.mobile} {
    padding: 20px 30px 30px;
  }
`;

const ContentsBox = styled.div`
  width: 100%;

  .goEdit {
    text-align: right;

    a {
      position: relative;
      display: inline-flex;
      align-items: center;

      span {
        position: relative;
        z-index: 5;
        display: flex;
        align-items: center;
      }

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to top, rgba(61, 66, 191, 0.5) 40%, transparent 40%);
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s;
      }

      &:hover {
        &:before {
          opacity: 1;
        }
      }

      i {
        display: block;
        width: 20px;
        height: 20px;
        background: url(${settingIcon.src}) no-repeat center center;
        background-size: cover;
        margin-right: 6px;
      }
    }
  }

  ${media.mobile} {
    .goEdit {
      font-size: 16px;

      a {
        i {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Nav = styled.nav`
  padding-top: 80px;
  ul {
    margin-left: 36px;
    li {
      display: flex;
      align-items: center;
      i {
        background: url(${toriLink.src}) no-repeat center center;
        width: 50px;
        height: 50px;
        margin: 0 0 10px 10px;
      }
      & + li {
        margin-top: 30px;
      }
      a {
        position: relative;
        font-size: 30px;
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
        &:not(.active):hover::after {
          transform: scaleX(1);
        }
      }
    }
  }

  ${media.custom(1280)} {
    padding-top: 60px;

    ul {
      li {
        & + li {
          margin-top: 20px;
        }

        a {
          font-size: 28px;
        }
      }
    }
  }

  ${media.mobile} {
    padding-top: 40px;

    ul {
      li {
        a {
          font-size: 24px;
        }
      }
    }
  }
`;

const Footer = styled.div`
  flex-shrink: 0;
  padding: 18px 0;
  background: #4b50d3;
`;
const FooterUl = styled(Row)`
  justify-content: space-between;
  margin-left: 40px;
  padding: 0 30px;
  font-size: 14px;
  li {
    list-style: none;
  }

  ${media.mobile} {
    font-size: 12px;
    margin-left: 20px;
  }
`;
