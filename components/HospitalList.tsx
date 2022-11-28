import { Hospital } from "@prisma/client";
import { theme } from "@styles/theme";
import { MouseEvent } from "react";
import styled from "styled-components";
import { RectangleButton, RoundButton } from "./button/Button";
import HospitalContent from "./HospitalContent";

const HospitalList = ({ lists, add }: { lists?: Hospital[]; add: boolean }) => {
  console.log(lists);
  return (
    <HospitalContainer add={add}>
      <InnerContainer add={add}>
        <HospitalLists>
          {lists &&
            lists.map((list: Hospital) => {
              return <HospitalContent list={list} add={add} key={list.id} />;
            })}
        </HospitalLists>
      </InnerContainer>
    </HospitalContainer>
  );
};

export default HospitalList;

const InnerContainer = styled.div<{ add: boolean }>`
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
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: ${prop => prop.add && "#e2e6ff"};
  }
`;

const HospitalContainer = styled.div<{ add: boolean }>`
  width: 1700px;
  height: 600px;
  background-color: ${prop => (prop.add ? "#f2f3ff" : "#d9deff")};
  border-radius: 40px;
  padding: 30px;
`;

const HospitalLists = styled.ul`
  width: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
