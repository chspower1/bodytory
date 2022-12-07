import useIO from "@hooks/useIO";
import { Hospital } from "@prisma/client";
import { Container, FlexContainer } from "@styles/Common";
import { theme } from "@styles/theme";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MyHospital, MyHospitalResponse } from "pages/users/my-hospital";
import { LegacyRef, MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { RoundButton } from "./buttons/Button";
import HospitalContent from "./HospitalContent";
import Input from "./Input";
import ListSkeleton from "./skeletonUI/ListSkeleton";

interface SearchHospitalListProps {
  hospitals?: MyHospital[];
  add: boolean;
  searchWord: string;
}
interface SearchForm {
  search: string;
}
const SearchHospitalList = () => {
  const queryclient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [hasLastPage, setHasLastPage] = useState(false);
  const [hospitals, setHospitals] = useState<MyHospital[]>([]);
  const [page, setPage] = useState<number>(0);
  const [searchWord, setSearchWord] = useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchForm>({ mode: "onChange" });

  const onValid = useCallback(async (searchForm: SearchForm) => {
    setSearchWord(searchForm.search);
    setValue("search", "");
  }, []);
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
    <SearchContainer>
      <SearchBox>
        <SearchForm onSubmit={handleSubmit(onValid)}>
          <Input
            $white
            name="search"
            width="700px"
            placeholder={errors ? errors.search?.message : "병원명을 입력해주세요"}
            register={register("search", {
              required: "검색어를 입력해주세요",
              minLength: {
                value: 2,
                message: "두 글자 이상 입력해주세요",
              },
            })}
            motion={false}
            error={errors.search?.message}
          />
          <RoundButton size="custom" height="60px" bgColor="rgb(100,106,235)">
            검색
          </RoundButton>
        </SearchForm>
      </SearchBox>
      <HospitalContainer add={true}>
        <InnerContainer add={true}>
          {hospitals?.length === 0 && isLoading && <ListSkeleton backgroundColor="rgb(225,227,255)" />}
          {hospitals?.length !== 0 && (
            <HospitalLists>
              {hospitals?.map((hospital, idx) => (
                <HospitalContent hospital={hospital} idx={hospital.id} add={true} key={idx} shared={false} />
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
          {hospitals?.length === 0 && !isLoading && <NoneMessage>{"검색결과가 없습니다"}</NoneMessage>}
        </InnerContainer>
      </HospitalContainer>
    </SearchContainer>
  );
};

export default SearchHospitalList;

export const SearchContainer = styled(FlexContainer)`
  position: relative;
  width: 1500px;
  height: 800px;
  flex-direction: column;
  justify-content: space-evenly;
`;
const NoneMessage = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  font-size: 30px;
  color: ${theme.color.darkBg};
`;
const SearchForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin: 0 auto;
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
