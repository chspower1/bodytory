import useHospital from "@hooks/useHospital";
import { Hospital, MedicalDepartment } from "@prisma/client";
import { theme } from "@styles/theme";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import sliceName from "@utils/client/sliceHospitalName";
import { currentHospitalIdx } from "atoms/atoms";
import { HOSPITALS } from "constant/queryKeys";
import { useRouter } from "next/router";
import type { MyHospital, MyHospitalResponse } from "pages/users/my-hospital";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { ChangeToHoverColor, RectangleButton, RoundButton } from "./buttons/Button";
import DeleteBtn from "./buttons/DeleteBtn";
import Modal from "./modals/Modal";
import MyHospitalModal from "./modals/MyHospitalModal";

interface HospitalContentProps {
  hospital: MyHospital;
  add: boolean;
  idx: number;
  shared: boolean;
}

const HospitalContent = ({ hospital, add, idx, shared }: HospitalContentProps) => {
  const router = useRouter();
  const [onShare, setOnShare] = useState<boolean>(shared);
  const setHospitalCurrentIdx = useSetRecoilState(currentHospitalIdx);
  const [onConnected, setOnConnected] = useState(hospital.my);
  const [detailModal, setDetailModal] = useState(false);

  const {
    deleteHospitalMutate,
    showModal,
    setShowModal,
    handleClickAddHospital,
    handleClickDeleteHospital,
    handleClickShare,
  } = useHospital();
  const handleClickGoClinicList = () => {
    router.push("/users/my-hospital/clinic-list");
    setHospitalCurrentIdx(idx);
  };
  console.log(hospital, "fdskfhsdajk");
  // useEffect(() => {
  //   setOnShare(shared);
  // }, [shared]);
  return (
    <HospitalInfor add={add}>
      <HospitalInforContainer>
        <HospitalInforBox >
          <HospitalDescriptionBox>
            <NameText size="18px" weight="900px" add={add} onClick={() => setDetailModal(true)} title={`${sliceName(hospital.name)}`}>
              {sliceName(hospital.name)}
            </NameText>
          </HospitalDescriptionBox>
          <HospitalPlaceBox>
            <SpaceText weight="200" size="17px" add={add} title={hospital.address} onClick={() => setDetailModal(true)} >
              {hospital.address}
            </SpaceText>
          </HospitalPlaceBox>
          {!add && <RectangleButton size="md" fontSize="16px" width="120px" bgColor={theme.color.white} textColor={theme.color.darkBg}  onClick={handleClickGoClinicList}>진료내역 보기</RectangleButton>}
        </HospitalInforBox>
        {add ? (
          <AddButtonBox>
            <RectangleButton
              nonSubmit
              size="md"
              bgColor={onConnected ? theme.color.error : theme.color.darkBg}
              onClick={() => {
                setShowModal(true);
              }}
            >
              {onConnected ? "삭제" : "추가"}
            </RectangleButton>
          </AddButtonBox>
        ) : (
          <HospitalStatusBox>
            <ShareStatus weight="200" size="15px" add={add} status={onShare}>
              {onShare ? "기록 공유 중" : "기록 공유 중지"}
            </ShareStatus>
            <ShareButton status={onShare} onClick={() => handleClickShare(hospital.id, setOnShare)}>
              {onShare ? "공유 중지" : "공유 시작"}
            </ShareButton>
          </HospitalStatusBox>
        )}
        {add || 
        <DeleteBtnBox>
          <DeleteBtn mutate={deleteHospitalMutate} id={hospital.id} backgroundColor="rgb(100, 106, 235)" isCircle />
        </DeleteBtnBox>
        }
      </HospitalInforContainer>

      <MyHospitalModal show={detailModal} onClose={() => setDetailModal(false)} hospitals={hospital}></MyHospitalModal>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        activeFuction={
          onConnected
            ? () => {
                handleClickDeleteHospital(hospital.id, setOnConnected);
              }
            : () => {
                handleClickAddHospital(hospital.id, setOnConnected);
              }
        }
        agreeType={!onConnected}
        title="개인정보 수집 동의"
      >
        {onConnected ? (
          <p>
            <b>{sliceName(hospital.name)}</b>를 등록된 병원에서 제거하시겠습니까?
          </p>
        ) : (
          <>
            <p>병원을 추가하면 병원에서 나의 기록을 열람할 수 있습니다</p>
            <p>
              <b>{sliceName(hospital.name)}</b>에서 개인정보 수집 및 이용에 동의하십니까?
            </p>
          </>
        )}
      </Modal>
    </HospitalInfor>
  );
};

export default HospitalContent;

const ShareButton = styled.button<{ status: boolean }>`
  width: auto;
  font-size: 16px;
  padding: 12px 25px;

  transition: background-color 0.5s ease;
  &:hover {
    background-color: ${props => ChangeToHoverColor(props.status ? "rgb(128,133,251)" : "rgb(18, 212, 201)")};
  }
  background-color: ${prop => (prop.status ? "rgb(128,133,251)" : theme.color.mintBtn)};
  border-radius: 50px;
  color: white;
`;

const AddButtonBox = styled.div`
  flex-shrink: 0;
`;



const DeleteBtnBox = styled.div`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  width:40px;
  height:40px;
`

const Text = styled.span<{ size?: string; weight?: string; add: boolean }>`
  position: relative;
  font-size: ${prop => prop.size || "16px"};
  font-weight: ${prop => prop.weight || "300"};
  color: ${prop => (prop.add ? "#000" : "#fff")};
`;

const NameText = styled(Text)`
  display: inline-block;
  cursor: pointer;
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SpaceText = styled(Text)<{add : boolean}>`
  display: inline-block;
  ${({add}) => !add && css`
    max-width: 350px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `}
  cursor: pointer;
`;
export const ShareStatus = styled(Text)<{ status: boolean }>`
  padding-left: 20px;
  &::after {
    transition: background-color 0.4s ease;
    content: "";
    width: 10px;
    height: 10px;
    background-color: ${prop => (prop.status ? theme.color.mint : "red")};
    position: absolute;
    border-radius: 50%;
    top: 25%;
    left: 0;
  }
`;
const HospitalInforBox = styled.div`
  display: flex;
  column-gap: 120px;

  button{
    font-weight:600;
    :hover{
      text-decoration : underline;
    }
  }
`;

const HospitalInfor = styled.li<{ add: boolean }>`
  display: inline-block;
  position: relative;
  padding: 0 40px;
  width: 100%;
  height: 80px;
  background-color: ${prop => (prop.add ? "rgb(225,227,255)" : "rgb(100,106,235)")};
  border-radius: 20px;
  & + & {
    margin-top: 20px;
  }
`;

const HospitalInforContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HospitalPlaceBox = styled.div`
  display: flex;
  align-items: center;
  min-width: 350px;
`;

const HospitalDescriptionBox = styled.div`
  display: flex;
  align-items: center;
  min-width: 200px;
  max-width: 200px;
`;

export const HospitalStatusBox = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 250px;
  margin-right: 90px;
  justify-content: space-between;
`;

const Department = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgb(54, 60, 191);
  color: white;
  padding: 0 10px;
  border-radius: 5px;
  height: 29px;
  min-width: 87px;
  margin-left: 20px;
`;
