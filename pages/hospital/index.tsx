import { RectangleButton, RoundButton } from "@components/button/Button";
import { Container } from "@styles/Common";
import { theme } from "@styles/theme";
import { useMutation, useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";
import setting from "../../public/settingIcon.png";

const Hospital = () => {
  const { getApi } = customApi("/api/users/hospital");
  const { data } = useQuery(["hospital"], getApi);
  console.log(data);
  const log = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  useEffect(() => {
    document.body.style.backgroundColor = theme.color.lightBg;
    return () => {
      document.body.style.backgroundColor = theme.color.darkBg;
    };
  }, []);
  return (
    <MainContainer>
      <MainInnerContainer>
        <div style={{ width: "100%", height: "200px", textAlign: "left", padding: "50px" }}>
          <p style={{ fontSize: "32px" }}>
            <Text weight="600" size="32px" style={{ color: "rgb(100,106,235)" }}>
              소희님
            </Text>
            의 기록을 공유받고 있는 병원 목록이에요
            <br /> 병원을 클릭하면 해당 병원에서의 진료내역을 확인할 수 있어요
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", height: "100px", alignItems: "end" }}>
          <RoundButton size="custom" width="260px" height="50px">
            <Image src={setting} width={20} height={20} alt="병원" style={{ marginRight: "20px" }} /> 병원 추가하기
          </RoundButton>
        </div>
        <HospitalContainer>
          <InnerContainer>
            <HospitalList>
              {log.map((number: number) => {
                return (
                  <>
                    <HospitalInfor>
                      <HospitalInforBox>
                        <HospitalDescriptionBox>
                          <span>로고</span>
                          <Text size="18px" weight="900" style={{ color: "white" }}>
                            삼성본정형외과의원
                          </Text>
                          <RectangleButton size="sm">정형외과</RectangleButton>
                        </HospitalDescriptionBox>
                        <HospitalPlaceBox>
                          <Text weight="200" size="17px">
                            서울 성북구 아리랑로 7 농협 건물 2층,4층
                          </Text>
                        </HospitalPlaceBox>
                        <HospitalStatusBox>
                          <Text weight="200" size="15px">
                            기록 공유 중
                          </Text>
                          <RoundButton size="md" bgColor="rgb(128,133,251)">
                            공유 중지하기
                          </RoundButton>
                        </HospitalStatusBox>
                      </HospitalInforBox>
                    </HospitalInfor>
                  </>
                );
              })}
            </HospitalList>
          </InnerContainer>
        </HospitalContainer>
      </MainInnerContainer>
    </MainContainer>
  );
};

export default Hospital;

const MainContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
`;

const MainInnerContainer = styled.div`
  width: 1600px;
  height: 1000px;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

const Text = styled.span<{ size?: string; weight?: string }>`
  font-size: ${prop => prop.size || "16px"};
  font-weight: ${prop => prop.weight || "300"};
  color: ${theme.color.white};
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgb(188, 197, 255);
  }
`;

const HospitalContainer = styled.div`
  width: 1700px;
  height: 600px;
  background-color: rgb(217, 222, 255);
  border-radius: 40px;
  padding: 30px;
`;

const HospitalInfor = styled.li`
  display: inline-block;
  position: relative;
  padding: 30px;
  width: 100%;
  height: 80px;
  background-color: rgb(100, 106, 235);
  border-radius: 20px;
  & + & {
    margin-top: 20px;
  }
`;

const HospitalList = styled.ul`
  width: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HospitalInforBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

const HospitalPlaceBox = styled.div`
  position: absolute;
  left: 400px;
  color: white;
`;

const HospitalDescriptionBox = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
`;

const HospitalStatusBox = styled.div`
  position: absolute;
  right: 30px;
  display: flex;
  align-items: center;
  width: 300px;
  justify-content: space-between;
`;
