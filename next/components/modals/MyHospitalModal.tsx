import { ChangeToHoverColor, RectangleButton, RoundButton } from "@components/buttons/Button";
import { Dim, ModalContainer, ModalWrapper } from "@styles/ModalStyled";
import { AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import type { MyHospital } from "pages/users/my-hospital";
import hospital from "@api/hospital";
import { theme } from "@styles/theme";
import { useState } from "react";
import { ShareStatus } from "@components/HospitalContent";
import useHospital from "@hooks/useHospital";
interface MyHospitalModalProps {
  show?: boolean;
  hospitals?: MyHospital;
  activeFunction?: () => void;
  onClose?: () => void;
}

const MyHospitalModal = ({ show, hospitals, activeFunction, onClose }: MyHospitalModalProps) => {
  const { handleClickShare } = useHospital();

  const modalContent = (
    <AnimatePresence>
      {show && (
        <ModalWrapper>
          <Dim onClick={onClose} />
          <ModalBox width="900px" height="auto">
            <ModalTitle>
              <HospitalName>{hospitals?.name}</HospitalName>
            </ModalTitle>
            <ContentContainer>
              <ContentBox>
                <DetailBox>
                  <Title>주소</Title>
                  <Text>{hospitals?.address}</Text>
                </DetailBox>
                <DetailBox>
                  <Title>홈페이지</Title>
                  <Text>
                    <a href={String(hospitals?.homepage)} target="blank">
                      {hospitals?.homepage}
                    </a>
                  </Text>
                </DetailBox>
                <DepartmentListBox>
                  <Title>진료과목</Title>
                  <DepartmentLists>
                    {hospitals?.medicalDepartments.map(elem => elem.medicalDepartment?.department).join(",")}
                  </DepartmentLists>
                </DepartmentListBox>
              </ContentBox>
              <Map
                center={{ lat: Number(hospitals?.y), lng: Number(hospitals?.x) }}
                style={{ width: "320px", height: "320px", borderRadius: "30px" }}
                level={5}
              >
                <MapMarker
                  position={{ lat: Number(hospitals?.y), lng: Number(hospitals?.x) }}
                  image={{
                    src: "https://imagedelivery.net/AbuMCvvnFZBtmCKKJV_e6Q/ba695e48-c89f-4e8d-febb-10018a877600/avatar", // 마커이미지의 주소입니다
                    size: {
                      width: 45,
                      height: 45,
                    },
                    options: {
                      offset: {
                        x: 23,
                        y: 0,
                      },
                    },
                  }}
                />
              </Map>
            </ContentContainer>
            <CloseBox>
              <RoundButton
                size="custom"
                width="150px"
                height="40px"
                textColor="rgb(93,107,178)"
                bgColor="rgb(197,205,251)"
                onClick={onClose}
              >
                닫기
              </RoundButton>
            </CloseBox>
          </ModalBox>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
  return ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
};

export default MyHospitalModal;

const HospitalName = styled.h3`
  margin-left: 30px;
  color: white;
`;

const ModalBox = styled(ModalContainer)`
  background: #fff;
  border-radius: 10px;
  text-align: center;
`;

const ShareStatusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background-color: ${theme.color.lightBg};
`;

const ModalTitle = styled.div`
  padding: 20px;
  font-size: 20px;
  font-weight: 700;
  height: 70px;
  background-color: #363cbf;
  display: flex;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 400px;
  display: flex;
  padding: 30px 40px 30px 50px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 400px;
  height: 100%;
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  height: 70px;
`;

const Title = styled.span`
  color: #5359e9;
`;
const Text = styled.span``;

const CloseBox = styled.div`
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const DepartmentListBox = styled(DetailBox)`
  height: 100px;
`;

const DepartmentLists = styled.div`
  max-height: 100px;
  overflow-y: scroll;
  word-break: keep-all;
`;
