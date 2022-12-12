import { Hospital } from "@prisma/client";
import { Box } from "@styles/Common";
import { theme } from "@styles/theme";
import { MyHospitalResponse } from "pages/users/my-hospital";
import React, { LegacyRef, MouseEvent, useState } from "react";
import styled from "styled-components";
import HospitalContent from "./HospitalContent";
import ListSkeleton from "../skeletonUI/ListSkeleton";
import AlertModal from "@components/modals/AlertModal";

interface MyHospitalListProps {
  hospitals?: MyHospitalResponse[];
  add: boolean;
  setobserverTarget?: LegacyRef<HTMLDivElement> | null;
  isLoading?: boolean;
}

const MyHospitalList = ({ hospitals, add, isLoading }: MyHospitalListProps) => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <HospitalContainer add={add}>
      <InnerContainer add={add}>
        {isLoading && <ListSkeleton backgroundColor="rgb(100,106,235)" />}
        {!isLoading && hospitals && (
          <HospitalLists>
            {hospitals?.map((hospital, idx) => (
                <HospitalContent
                  hospital={hospital.hospital}
                  idx={idx}
                  add={false}
                  shared={hospital.shared}
                  key={hospital.hospital.id}
                  setShowAlertModal={setShowModal}
                />
            ))}
            <AlertModal show={showModal} onClose={()=> setShowModal(false)}  />
          </HospitalLists>
        )}
        {!isLoading && hospitals?.length === 0 && (
          <NoneMessage>{add ? "검색결과가 없습니다" : "병원내역이 없습니다"}</NoneMessage>
        )}
      </InnerContainer>
    </HospitalContainer>
  );
};

export default MyHospitalList;

const NoneMessage = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  font-size: 30px;
  color: ${theme.color.darkBg};
`;

const InnerContainer = styled(Box)<{ add: boolean }>`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 30px 0 0;
  position: relative;
  align-items: flex-start;
  &::-webkit-scrollbar-track {
    margin: 30px 0 0;
  }
`;

const HospitalContainer = styled.div<{ add: boolean }>`
  width: 1600px;
  height: 600px;
  background-color: ${prop => (prop.add ? "#f2f3ff" : "#d9deff")};
  border-radius: 40px;
  padding: 0 30px 30px;
`;

const HospitalLists = styled.ul`
  width: 1500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
