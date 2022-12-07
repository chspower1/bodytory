import { Hospital } from "@prisma/client";
import { theme } from "@styles/theme";
import { MyHospital, MyHospitalResponse } from "pages/users/my-hospital";
import { LegacyRef, MouseEvent, useState } from "react";
import styled from "styled-components";
import HospitalContent from "./HospitalContent";
import ListSkeleton from "./skeletonUI/ListSkeleton";

interface SearchHospitalMapProps {
  hospitals?: MyHospital[];
  add: boolean;
  setobserverTarget?: LegacyRef<HTMLDivElement> | null;
  isLoading?: boolean;
}

const SearchHospitalMap = ({ hospitals, add, setobserverTarget, isLoading }: SearchHospitalMapProps) => {
  return (
    <HospitalContainer add={add}>
      <InnerContainer add={add}>
        {hospitals?.length === 0 && isLoading && <ListSkeleton backgroundColor="rgb(225,227,255)" />}
        {hospitals?.length !== 0 && (
          <HospitalLists>
            {hospitals?.map((hospital, idx) => (
              <HospitalContent hospital={hospital} idx={idx} add={add} key={idx} shared={false} />
            ))}
            {isLoading ? <ListSkeleton backgroundColor="rgb(225,227,255)" /> : <div ref={setobserverTarget} />}
          </HospitalLists>
        )}
        {hospitals?.length === 0 && !isLoading && (
          <NoneMessage>{add ? "검색결과가 없습니다" : "병원내역이 없습니다"}</NoneMessage>
        )}
      </InnerContainer>
    </HospitalContainer>
  );
};

export default SearchHospitalMap;

const NoneMessage = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  font-size: 30px;
  color: ${theme.color.darkBg};
`;

const InnerContainer = styled.div<{ add: boolean }>`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgb(188, 197, 255);
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: ${prop => prop.add && "#e2e6ff"};
  }
`;

const HospitalContainer = styled.div<{ add: boolean }>`
  width: 1600px;
  height: 600px;
  background-color: ${prop => (prop.add ? "#f2f3ff" : "#d9deff")};
  border-radius: 40px;
  padding: 30px;
`;

const HospitalLists = styled.ul`
  width: 1500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
