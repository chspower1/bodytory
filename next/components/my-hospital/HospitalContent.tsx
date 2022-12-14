import { RectangleDefaultButton, RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import useHospital from "@hooks/useHospital";
import { Box } from "@styles/Common";
import { media, theme } from "@styles/theme";
import sliceName from "@utils/client/sliceHospitalName";
import { currentHospitalIdx } from "atoms/atoms";
import { useRouter } from "next/router";
import type { MyHospital } from "pages/users/my-hospital";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import DeleteBtn from "../layout/buttons/DeleteBtn";
import Modal from "../modals/Modal";
import MyHospitalModal from "../modals/MyHospitalModal";

interface HospitalContentProps {
  hospital: MyHospital;
  add: boolean;
  idx: number;
  shared: boolean;
  setShowAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const HospitalContent = ({ hospital, add, idx, shared, setShowAlertModal }: HospitalContentProps) => {
  const router = useRouter();
  const [onShare, setOnShare] = useState<boolean>(shared);
  const setHospitalCurrentIdx = useSetRecoilState(currentHospitalIdx);
  const [onConnected, setOnConnected] = useState(hospital.my);
  const [detailModal, setDetailModal] = useState(false);
  const department = hospital.medicalDepartments;
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
  return (
    <HospitalInfor add={add}>
      <HospitalInforContainer>
        <HospitalInforBox>
          <HospitalDescriptionBox add={add}>
            <NameText
              size="18px"
              weight="900px"
              add={add}
              onClick={() => setDetailModal(true)}
              title={`${sliceName(hospital.name)}`}
            >
              {sliceName(hospital.name)}
            </NameText>
            {add && (
              <Department>
                <Text weight="500" size="16px">
                  {department[0].medicalDepartment ? department[0].medicalDepartment.department : "기타"}
                </Text>
                {department.length <= 1 || <Text size="16px">&nbsp;외 {department.length - 1} 과목</Text>}
              </Department>
            )}
          </HospitalDescriptionBox>
          <HospitalPlaceBox add={add}>
            <SpaceText weight="300" size="17px" add={add} title={hospital.address} onClick={() => setDetailModal(true)}>
              {hospital.address}
            </SpaceText>
          </HospitalPlaceBox>
          {!add && (
            <ShowMedicalDetailButton bgColor={`rgba(75, 80, 211, 1)`} onClick={handleClickGoClinicList}>
              진료내역 보기
            </ShowMedicalDetailButton>
          )}
        </HospitalInforBox>
        {add ? (
          <AddButtonBox>
            <RectangleDefaultButton
              type="button"
              color={onConnected ? "#3d42bf" : "white"}
              bgColor={onConnected ? "rgb(197,205,251)" : theme.color.darkBg}
              onClick={() => {
                setShowModal(true);
              }}
            >
              {onConnected ? "삭제" : "추가"}
            </RectangleDefaultButton>
            {onConnected && <span>내 병원</span>}
          </AddButtonBox>
        ) : (
          <HospitalStatusBox>
            <ShareStatus weight="200" size="15px" add={add} status={onShare}>
              {onShare ? "기록 공유 중" : "기록 공유 중지"}
            </ShareStatus>
            <RoundedDefaultButton
              sm
              bgColor={onShare ? "rgb(128,133,251)" : theme.color.mintBtn}
              onClick={() => handleClickShare(hospital.id, setOnShare)}
            >
              {onShare ? "공유 중지" : "공유 시작"}
            </RoundedDefaultButton>
          </HospitalStatusBox>
        )}
        {add || (
          <DeleteBtnBox>
            <DeleteBtn
              mutate={deleteHospitalMutate}
              setShowAlertModal={setShowAlertModal}
              id={hospital.id}
              backgroundColor="rgb(100, 106, 235)"
              isCircle
            />
          </DeleteBtnBox>
        )}
      </HospitalInforContainer>

      <MyHospitalModal show={detailModal} onClose={() => setDetailModal(false)} hospitals={hospital}></MyHospitalModal>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        activeFunction={
          onConnected
            ? () => {
                handleClickDeleteHospital(hospital.id, setOnConnected);
                setShowAlertModal(true);
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

const ShowMedicalDetailButton = styled(RectangleDefaultButton)`
  width: 120px;
  font-size: 16px;
  ${media.mobile} {
    font-size: 12px;
    width: 80px;
  }
`;

const AddButtonBox = styled.div`
  flex-shrink: 0;
  position: relative;

  span {
    position: absolute;
    left: -70px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.input};
  }
  ${media.mobile} {
    position: absolute;
    top: 15px;
    right: 20px;
  }
`;

export const DeleteBtnBox = styled.div`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  ${media.custom(1366)} {
    top: 76%;
  }
`;

const Text = styled.span<{ size?: string; weight?: string; add?: boolean }>`
  position: relative;
  font-size: ${prop => prop.size || "16px"};
  font-weight: ${prop => prop.weight || "300"};
  color: ${prop => (prop.add ? prop.theme.color.text : "#fff")};
`;

const NameText = styled(Text)`
  display: inline-block;
  cursor: pointer;
  white-space: nowrap;
  width: 200px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    text-decoration: underline;
  }
  ${media.mobile} {
    font-size: 14px;
    display: block;
    min-width: 100px;
    width: 50%;
  }
`;

const SpaceText = styled(Text)<{ add: boolean }>`
  display: inline-block;
  ${({ add }) =>
    !add &&
    css`
      max-width: 350px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `}
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  ${media.mobile} {
    font-size: 14px;
  }
`;
export const ShareStatus = styled(Text)<{ status: boolean }>`
  padding-left: 20px;
  position: relative;
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
  ${media.custom(1366)} {
    text-indent: -9999px;
    margin-right: 10px;
    &::after {
      potision: absolute;
      left: 10px;
    }
  }
`;
const HospitalInforBox = styled.div`
  display: flex;
  column-gap: 120px;

  button {
    font-weight: 600;
    :hover {
      text-decoration: underline;
    }
  }
  ${media.pc} {
    margin-right: 40px;
    flex-direction: column;
    row-gap: 15px;
  }
  ${media.mobile} {
  }
`;

const HospitalInfor = styled.li<{ add: boolean }>`
  display: inline-block;
  position: relative;
  padding: 20px 40px;
  width: 100%;
  background-color: ${prop => (prop.add ? "rgb(225,227,255)" : "rgb(100,106,235)")};
  transition: all 0.4s ease;
  border-radius: 20px;
  & + & {
    margin-top: 20px;
  }
  ${media.mobile} {
    width: 100%;
    padding: 20px;
  }
`;

const HospitalInforContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${media.mobile} {
    display: block;
  }
`;

const HospitalPlaceBox = styled.div<{ add?: boolean }>`
  display: flex;
  align-items: center;
  width: ${props => (props.add ? "500px" : "270px")};
`;

const HospitalDescriptionBox = styled.div<{ add?: boolean }>`
  display: flex;
  align-items: center;
  width: ${props => (props.add ? "400px" : "270px")};
  ${media.mobile} {
    display: block;
    width: 100%;
  }
`;

export const HospitalStatusBox = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 280px;
  margin-right: 90px;
  justify-content: space-between;
  ${media.custom(1366)} {
    position: absolute;
    right: -70px;
    width: 110px;
    top: 15px;
  }
`;

const Department = styled(Box)`
  background-color: rgb(54, 60, 191);
  color: ${props => props.theme.color.weekPurple};
  padding: 0 10px;
  border-radius: 5px;
  height: 32px;
  margin-left: 20px;
  ${media.mobile} {
    width: 150px;
    margin-left: 0;
  }
`;
