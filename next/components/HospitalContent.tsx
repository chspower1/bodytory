import { Hospital, MedicalDepartment } from "@prisma/client";
import { theme } from "@styles/theme";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import sliceName from "@utils/client/sliceHospitalName";
import { currentHospitalIdx } from "atoms/atoms";
import { HOSPITALS } from "constant/queryKeys";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ChangeToHoverColor, RectangleButton, RoundButton } from "./buttons/Button";
import Modal from "./modals/Modal";

export interface HospitalListT extends Hospital {
  medicalDepartments: [
    {
      id: number;
      medicalDepartmentId: number;
      hospitalId: number;
      medicalDepartment: MedicalDepartment;
    },
  ];
}

export interface HospitalListProps extends HospitalListT {
  hospital?: HospitalListT;
}

const HospitalContent = ({ list, add, idx }: { list: HospitalListProps; add: boolean; idx: number }) => {
  const router = useRouter();
  const [onShare, setOnShare] = useState<boolean>(false);
  const setHospitalCurrentIdx = useSetRecoilState(currentHospitalIdx);
  const [isAddButton, setIsAddButton] = useState(false);
  const handleShare = () => {
    setOnShare(!onShare);
  };

  const queryclient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const { postApi, getApi } = customApi("/api/users/my-hospitals");
  const { data } = useQuery(["isMyHospital"], getApi, {
    onSuccess(data) {
      data.map(({ hospital }: { hospital: { id: number; name: string } }) => {
        if (hospital.id === list.id) {
          setIsAddButton(true);
        }
      });
    },
  });
  // 추가용 api
  const { mutate } = useMutation(["addHospitalKey"], postApi, {
    onSuccess(data) {
      queryclient.invalidateQueries(["isMyHospital"]);
      queryclient.invalidateQueries([HOSPITALS])
    },
  });

  const handleClickAddHospital = () => {
    mutate({ id: list.id });
    setShowModal(false);
  };

  const handleClickGoClinicList = () => {
    router.push("/users/my-hospital/clinic-list");
    setHospitalCurrentIdx(idx);
  };

  return (
    <HospitalInfor add={add}>
      <HospitalInforContainer>
        <HospitalInforBox>
          <HospitalDescriptionBox>
            <NameText size="18px" weight="900" add={add}>
              {sliceName(list.name)}
            </NameText>
            <Department>
              {list.medicalDepartments[0].medicalDepartment && list.medicalDepartments[0].medicalDepartment.department}{" "}
              외 {list.medicalDepartments.length - 1}과목
            </Department>
          </HospitalDescriptionBox>
          <HospitalPlaceBox>
            <SpaceText weight="200" size="17px" add={add} title={list.address}>
              {list.address}
            </SpaceText>
          </HospitalPlaceBox>
          {!add && <ClinicListLinkButton onClick={handleClickGoClinicList}>진료내역확인</ClinicListLinkButton>}
        </HospitalInforBox>
        {add ? (
          <AddButtonBox>
            <RectangleButton nonSubmit size="md" disabled={isAddButton} onClick={() => setShowModal(true)}>
              추가
            </RectangleButton>
          </AddButtonBox>
        ) : (
          <HospitalStatusBox>
            <ShareStatus weight="200" size="15px" add={add} status={onShare}>
              {onShare ? "기록 공유 중" : "기록 공유 중지"}
            </ShareStatus>
            <ShareButton status={onShare} onClick={() => handleShare()}>
              {onShare ? "공유 중지" : "공유 시작"}
            </ShareButton>
          </HospitalStatusBox>
        )}
      </HospitalInforContainer>
      <Modal show={showModal} onClose={()=> setShowModal(false)} activeFuction={handleClickAddHospital} agreeType title="개인정보 수집 동의" >
        <p>병원을 추가하면 병원에서 나의 기록을 열람할 수 있습니다</p>
        <p><b>{sliceName(list.name)}</b>에서 개인정보 수집 및 이용에 동의하십니까?</p>
      </Modal>
    </HospitalInfor>
  );
};

export default HospitalContent;

const ShareButton = styled.button<{ status: boolean }>`
  width: auto;
  height: 50px;
  font-size: 18px;
  padding: 0 50px;
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

const ClinicListLinkButton = styled.button`
  color: #fff;
  :hover {
    text-decoration: underline;
  }
`;

const Text = styled.span<{ size?: string; weight?: string; add: boolean }>`
  position: relative;
  font-size: ${prop => prop.size || "16px"};
  font-weight: ${prop => prop.weight || "300"};
  color: ${prop => (prop.add ? "#000" : "#fff")};
`;

const NameText = styled(Text)`
  display: inline-block;
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SpaceText = styled(Text)`
  display: inline-block;
  white-space: nowrap;
  max-width: 600px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ShareStatus = styled(Text)<{ status: boolean }>`
  padding-left: 20px;
  &::after {
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
  column-gap: 80px;
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
  max-width: 350px;
`;

const HospitalDescriptionBox = styled.div`
  display: flex;
  align-items: center;
  min-width: 400px;
  max-width: 400px;
`;

const HospitalStatusBox = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 300px;
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
