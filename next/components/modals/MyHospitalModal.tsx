import { Dim, ModalContainer, ModalWrapper } from "@styles/ModalStyled";
import { AnimatePresence } from "framer-motion";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import type { MyHospital } from "pages/users/my-hospital";
import usePortal from "@hooks/usePortal";
import Link from "next/link";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import { media } from "@styles/theme";
interface MyHospitalModalProps {
  show?: boolean;
  hospitals?: MyHospital;
  onClose?: () => void;
}

const MyHospitalModal = ({ show, hospitals, onClose }: MyHospitalModalProps) => {
  const Portal = usePortal();
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
                    {hospitals?.homepage ? (
                      <Link href={String(hospitals?.homepage)} target="blank">
                        {hospitals?.homepage}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </Text>
                </DetailBox>
                <DetailBox>
                  <Title>진료과목</Title>
                  <DepartmentLists>
                    {hospitals?.medicalDepartments.map(elem => elem.medicalDepartment?.department).join(",")}
                  </DepartmentLists>
                </DetailBox>
              </ContentBox>
              <MapStyle
                center={{ lat: Number(hospitals?.y), lng: Number(hospitals?.x) }}
                level={5}
              >
                <MapMarker
                  position={{ lat: Number(hospitals?.y) + 0.001, lng: Number(hospitals?.x) }}
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
              </MapStyle>
            </ContentContainer>
            <CloseBox>
              <RoundedDefaultButton sm color="rgb(93,107,178)" bgColor="rgb(197,205,251)" onClick={onClose}>
                닫기
              </RoundedDefaultButton>
            </CloseBox>
          </ModalBox>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
  return Portal({ children: modalContent });
};

export default MyHospitalModal;

const MapStyle= styled(Map)`
  width:320px;
  height:320px;
  border-radius: 30px;
  margin: 0 auto;
  ${media.custom(970)}{
    width: 100%;
    margin: 10px auto 0;
    border-radius: 10px;
  }
`

const HospitalName = styled.h3`
  margin-left: 30px;
  color: white;
  ${media.mobile}{
    margin-left: 10px;
  }
`;

const ModalBox = styled(ModalContainer)`
  background: #fff;
  border-radius: 10px;
  text-align: center;
`;


const ModalTitle = styled.div`
  padding: 20px;
  font-size: 20px;
  font-weight: 700;
  height: 70px;
  background-color: #363cbf;
  display: flex;
  justify-content: space-between;
  ${media.mobile}{
    font-size: 18px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 400px;
  display: flex;
  padding: 30px 40px 30px 50px;
  ${media.custom(970)}{
    display:block;
    overflow-y:scroll;
  }
  ${media.mobile}{
    padding: 20px 15px 20px 25px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 440px;
  height: 100%;
  padding-right: 20px;
  overflow-y: scroll;
  ${media.custom(970)}{
    overflow-y: visible;
    margin: 0 auto;
    height: auto;
    width: 100%;
  }
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  height: 70px;
  & + & {
    margin-top: 40px;
  }
  ${media.custom(970)}{
    height: auto;
  }
  ${media.mobile}{
    font-size: 15px;
    & + & {
      margin-top: 20px;
    }
  }
`;

const Title = styled.span`
  color: #5359e9;
`;
const Text = styled.span`
  a:hover {
    text-decoration: underline;
  }
`;

const CloseBox = styled.div`
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const DepartmentLists = styled.div`
  max-height: 100px;
  word-break: keep-all;
  ${media.custom(970)}{
    max-height: none;
  }
`;
