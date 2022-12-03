import BodyNavigator from "@components/records/BodyNavigator";
import styled from "styled-components";
import IconArrowLeft from "@public/static/icon/icon_arrow_left.png";
import { useRouter } from "next/router";
import { currentBodyPosition, SelectBodyPartProps } from "types/bodyParts";
import { useState } from "react";

function SelectPart({ selectedBodyPart, setSelectedBodyPart, currentBodyPosition, setCurrentBodyPosition }: SelectBodyPartProps) {

  const router = useRouter();


  return (
    <SelectPartWarp>
      <SelectPartContainer>
        {
          router.pathname !== "/users/records" && (
            <BackButton onClick={() => {
                router.push("/users/records");
              }}>
              <span>대시보드</span>
            </BackButton>
          )
        }
        <GuideText>자세한 기록을 확인하고 싶은 부위를 선택해주세요</GuideText>
        <BodyNavigator 
          selectedBodyPart={selectedBodyPart} 
          setSelectedBodyPart={setSelectedBodyPart} 
          currentBodyPosition={currentBodyPosition}
          setCurrentBodyPosition={setCurrentBodyPosition}
          isWritePage={false} 
        />
      </SelectPartContainer>
    </SelectPartWarp>
  );
}

const SelectPartWarp = styled.div`
  position: relative;
  width: 37.5%;
  height: 100%;
`;

const SelectPartContainer = styled.div`
  width: 100%;
  max-width: 720px;
  height: 100%;
  padding: 30px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background: url(${IconArrowLeft.src}) no-repeat 10px 50%/26px;
  background-color: #5155ba;
  overflow: hidden;
  transition: width 0.4s;

  span {
    display: block;
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.lightBg};
    width: 130px;
    padding-left: 20px;
    opacity: 0;
    transition: opacity 0.4s;
  }

  &:hover {
    width: 130px;

    span {
      opacity: 1;
    }
  }
`;

const GuideText = styled.div`
  text-align: center;
  color: #5155ba;
  margin: 40px 0 20px;
`;

export default SelectPart;
