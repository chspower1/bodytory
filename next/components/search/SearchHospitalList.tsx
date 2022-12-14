import useIO from "@hooks/useIO";
import { Hospital } from "@prisma/client";
import { Container, FlexContainer } from "@styles/Common";
import { media, theme } from "@styles/theme";
import { MutationCache, QueryCache, useQuery, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import axios from "axios";
import { MyHospital, MyHospitalResponse } from "pages/users/my-hospital";
import { LegacyRef, MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import HospitalContent from "../my-hospital/HospitalContent";
import Input from "../layout/input/Input";
import ListSkeleton from "../skeletonUI/ListSkeleton";
import AlertModal from "@components/modals/AlertModal";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";

interface SearchHospitalListResponse {
  foundHospitals: MyHospital[];
  isLastPage: boolean;
}
export interface SearchForm {
  search: string;
}
const SearchHospitalList = () => {
  const [hasLastPage, setHasLastPage] = useState(false);
  const [hospitals, setHospitals] = useState<MyHospital[]>([]);
  const [page, setPage] = useState<number>(0);
  const [searchWord, setSearchWord] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchForm>({ mode: "onChange" });

  const { getApi } = customApi(`/api/users/my-hospitals/find?page=${page}&search=${searchWord}`);
  const { data, isLoading, refetch, isFetching } = useQuery<SearchHospitalListResponse>(
    ["hospitals", searchWord, page],
    getApi,
    { enabled: searchWord !== "" && !hasLastPage },
  );

  const onValid = useCallback(async (searchForm: SearchForm) => {
    setPage(0);
    setSearchWord(searchForm.search);
    setHasLastPage(false);
    setValue("search", "");
  }, []);

  const ioCallback = () => {
    isFetching || setPage(page => page + 1);
  };
  const { setTarget } = useIO(hasLastPage, ioCallback);

  useEffect(() => {
    console.log(hasLastPage);
  }, [hasLastPage]);
  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    setHasLastPage(data?.isLastPage!);
    if (data?.foundHospitals) {
      page === 0 ? setHospitals(data.foundHospitals) : setHospitals(prev => [...prev, ...data?.foundHospitals]);
    }
  }, [data]);

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
          <SearchButton bgColor="rgb(100,106,235)">검색</SearchButton>
        </SearchForm>
      </SearchBox>
      <HospitalContainer add={true}>
        <InnerContainer add={true}>
          {!searchWord || (hospitals?.length === 0 && isLoading && <ListSkeleton backgroundColor="rgb(225,227,255)" />)}
          {hospitals?.length !== 0 && (
            <HospitalLists>
              {hospitals?.map((hospital, idx) => (
                <HospitalContent
                  hospital={hospital}
                  idx={hospital.id}
                  add={true}
                  key={hospital.id}
                  shared={false}
                  setShowAlertModal={setShowModal}
                />
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
              <AlertModal show={showModal} onClose={() => setShowModal(false)} />
            </HospitalLists>
          )}
          {hospitals?.length === 0 && !isLoading && <NoneMessage>{"검색결과가 없습니다"}</NoneMessage>}
        </InnerContainer>
      </HospitalContainer>
    </SearchContainer>
  );
};

export default SearchHospitalList;

const SearchButton = styled(RoundedDefaultButton)`
  height: 60px;
  padding: 0 50px;
  ${media.custom(1440)} {
    width: 100px;
    font-size: 16px;
    padding: 5px;
    margin-left: 20px;
  }
  ${media.mobile} {
    position: absolute;
    right: 10px;
    height: 40px;
    width: 50px;
    font-size: 14px;
    border-radius: 10px;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  max-width: 1600px;
  width: 100%;
`;
const NoneMessage = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  font-size: 30px;
  color: ${theme.color.darkBg};
  word-break: keep-all;
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
  ${media.custom(1440)} {
    width: 80%;
  }
  ${media.mobile} {
    width: 90%;
  }
`;
const InnerContainer = styled.div<{ add: boolean }>`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 30px 0 0;
  position: relative;
  &::-webkit-scrollbar-track {
    margin: 30px 0 0;
  }
  ${media.mobile} {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
`;

const HospitalContainer = styled.div<{ add: boolean }>`
  width: 100%;
  height: 540px;
  background-color: ${prop => (prop.add ? "#f2f3ff" : "#d9deff")};
  border-radius: 40px;
  padding: 0 30px 0;
  margin-top: 10px;
  background: rgba(231, 232, 255, 0.5);
  transition: background 0.3s;
  ${media.custom(1440)} {
    width: 100%;
    padding: 10px;
  }
`;

const HospitalLists = styled.ul`
  max-width: 1500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  ${media.custom(1440)} {
    width: auto;
  }
`;
