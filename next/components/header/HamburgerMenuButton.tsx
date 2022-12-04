import React, { useState } from "react";
import styled from "styled-components";

interface MenuProps {
  isOpen : boolean;
  isActive : boolean;
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
  setIsActive : React.Dispatch<React.SetStateAction<boolean>>;
}

const HamburgerMenuButton = ({isOpen, setIsOpen, isActive, setIsActive} : MenuProps) => {
  const handle =()=>{
    if(isOpen === isActive){
      if(!isOpen){
        setIsActive(true);
        setTimeout(()=>{
          setIsOpen(true);
        },10)
      }else{
        setIsOpen(false);
        setTimeout(()=>{
          setIsActive(false);
        },600)
      }
    }
    
  }
  return (
    <MenuButtonBox className={isOpen ? "active" : ""}>
      <MenuButton onClick={handle}>
        <LineBox>
          <span />
          <span />
          <span />
        </LineBox>
      </MenuButton>
    </MenuButtonBox>
  );
};
export default HamburgerMenuButton;

const MenuButtonBox = styled.div`
  position:fixed;
  right:0;
  top:0;
  z-index: 6100;
  width: 80px;
  height: 80px;
  background: ${({theme}) => theme.color.input};
  border-radius: 0 0 0 10px;
  box-shadow :-5px 5px 12px rgba(78, 83, 188, 0.3);
  overflow:hidden;
  transition: background .6s;
  &.active{
    background: ${({theme}) => theme.color.white};
    button{
      div{
        transform:rotate(180deg);
        span{
          background:${({theme}) => theme.color.darkBg};
        }
        span:nth-child(1){
          width:60%;
          transform: translate(-2px,5px) rotate(-45deg);
        }
        span:nth-child(3){
          width:60%;
          transform: translate(-2px,-5px) rotate(45deg);
        }
      }
    }
  }
`;
const MenuButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 26px 22px;
`;

const LineBox = styled.div`
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction: column;
  justify-content:space-between;
  transition: transform .6s;
  span {
    display: block;
    width:100%;
    height:4px;
    border-radius: 4px;
    background:#fff;
    transition: transform .3s, width .3s , background .3s;
  }
  
`;
