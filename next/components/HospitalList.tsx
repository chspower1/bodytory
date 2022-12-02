import { Hospital } from "@prisma/client";
import { theme } from "@styles/theme";
import { MouseEvent } from "react";
import styled from "styled-components";
import HospitalContent, { HospitalListT } from "./HospitalContent";

const HospitalList = ({
  lists,
  add,
  listRef,
  viewRef,
}: {
  lists?: HospitalListT[];
  add: boolean;
  listRef: any;
  viewRef: any;
}) => {
  console.log("lists", lists);
  return (
    <HospitalContainer add={add}>
      <InnerContainer add={add} ref={viewRef}>
        {lists !== undefined && lists.length !== 0 ? (
          <HospitalLists>
            {lists.map((list) => (
              <HospitalContent list={list} add={add} key={list.id} />
            ))}
            <div ref={listRef}></div>
          </HospitalLists>
        ) : (
          <NoneMessage>{add ? "검색결과가 없습니다" : "병원내역이 없습니다"}</NoneMessage>
        )}
      </InnerContainer>
    </HospitalContainer>
  );
};

export default HospitalList;

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
