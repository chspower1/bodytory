import useIO from "@hooks/useIO";
import { Hospital } from "@prisma/client";
import { theme } from "@styles/theme";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MyHospital, MyHospitalResponse } from "pages/users/my-hospital";
import { LegacyRef, MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import HospitalContent from "./HospitalContent";
import ListSkeleton from "./skeletonUI/ListSkeleton";

interface SearchHospitalListProps {
  hospitals?: MyHospital[];
  add: boolean;
  searchWord: string;
}

const SearchHospitalList = ({ add, searchWord }: SearchHospitalListProps) => {
  const queryclient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [hasLastPage, setHasLastPage] = useState(false);
  const [hospitals, setHospitals] = useState<MyHospital[]>([]);
  const [page, setPage] = useState<number>(0);
  const ioCallback = () => {
    setPage(page => page + 1);
    page !== 0 && getSearchLists();
  };

  const { setTarget } = useIO(hasLastPage, ioCallback);

  const getSearchLists = useCallback(async () => {
    setIsLoading(() => true);
    const result = await axios.get(`/api/users/my-hospitals/find?page=${page}&search=${searchWord}`);
    setHasLastPage(() => result.data.status);
    setHospitals((current: MyHospital[]) => {
      const array = [...current];
      if (array) {
        array.push(...result.data.foundHospitals);
      }
      return [...new Set(array)];
    });
    setIsLoading(() => false);
    queryclient.invalidateQueries(["isMyHospital"]);
  }, [searchWord, page]);

  useEffect(() => {
    if (searchWord) {
      setPage(0);
      setHospitals([]);
    }
  }, [searchWord]);

  useEffect(() => {
    page === 0 && getSearchLists();
  }, [page, searchWord]);

  return (
    <HospitalContainer add={add}>
      <InnerContainer add={add}>
        {hospitals?.length === 0 && isLoading && <ListSkeleton backgroundColor="rgb(225,227,255)" />}
        {hospitals?.length !== 0 && (
          <HospitalLists>
            {hospitals?.map((hospital, idx) => (
              <HospitalContent hospital={hospital} idx={hospital.id} add={add} key={idx} shared={false} />
            ))}
            {isLoading ? (
              <ListSkeleton backgroundColor="rgb(225,227,255)" />
            ) : (
              <div
                style={{ width: "1px", height: "1px" }}
                ref={(ref: any) => {
                  setTarget(ref);
                }}
              />
            )}
          </HospitalLists>
        )}
        {hospitals?.length === 0 && !isLoading && (
          <NoneMessage>{add ? "검색결과가 없습니다" : "병원내역이 없습니다"}</NoneMessage>
        )}
      </InnerContainer>
    </HospitalContainer>
  );
};

export default SearchHospitalList;

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
  overflow-y: scroll;
  padding: 30px 0;
  position: relative;
  &::-webkit-scrollbar-track {
    margin: 30px 0;
  }
`;

const HospitalContainer = styled.div<{ add: boolean }>`
  width: 1600px;
  height: 580px;
  background-color: ${prop => (prop.add ? "#f2f3ff" : "#d9deff")};
  border-radius: 40px;
  padding: 30px 30px 0;
`;

const HospitalLists = styled.ul`
  width: 1500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;