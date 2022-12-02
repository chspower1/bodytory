import { RoundButton } from "@components/buttons/Button";
import HospitalList from "@components/HospitalList";
import Input from "@components/Input";
import ArroundMap from "@components/modals/ArroundMap";
import FirstPage from "@components/register/FirstPage";
import { User } from "@prisma/client";
import { FlexContainer, InnerContainer } from "@styles/Common";
import { theme } from "@styles/theme";
import { useMutation, useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { loggedInUser } from "atoms/atoms";
import axios from "axios";
import Image from "next/image";
import { RegisterForm } from "pages/auth/register";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ButtonBox, DescriptionBox, ImageIcon, MainContainer, MainInnerContainer, Pragraph } from ".";
import mapIcon from "@public/static/icon/mapIcon.svg";

interface SearchForm {
  search: string;
}

const FindHospital = () => {
  const { getApi } = customApi("/api/users/my-hospitals");
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [findState, setFindState] = useState<any[]>([]);
  const listRef = useRef<Element>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const currentUser = useRecoilValue(loggedInUser);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SearchForm>({ mode: "onChange" });

  useEffect(() => {
    if (search) {
      getTest();
    }
  }, [search, page]);

  const address = useMemo(() => {
    return `/api/users/my-hospitals/find?page=${page}&search=${search}`;
  }, [search, page]);

  const getTest = useCallback(async () => {
    setIsLoading(true);
    console.log(search, "get");
    const result = await axios.get(`/api/users/my-hospitals/find?page=${page}&search=${search}`);
    console.log(result.data.status);
    if (result.data.status) return;
    setFindState((current: any) => {
      const array = [...current];
      if (array) {
        array.push(...result.data.foundHospital);
      }
      return [...new Set(array)];
    });
    setIsLoading(false);
  }, [search, page]);

  const onValid = async (input: SearchForm) => {
    console.log(input.search, "인풋서치");
    setSearch(() => input.search);
    console.log(input);
    setFindState([]);
    setPage(0);
    console.log(search);
    setValue("search", "");
  };
  // useEffect(() => {
  //   viewRef.current?.scrollTo({
  //     top: viewRef.current.scrollHeight - viewRef.current.offsetHeight + viewRef.current.offsetTop,
  //   });
  //   console.log(viewRef);
  // }, [isLoading]);

  useEffect(() => {
    console.log(findState);
    if (listRef.current === null) return;
    console.log("pp");
    console.log(listRef.current);
    const io = new IntersectionObserver(
      async ([entry], observer) => {
        console.log(entry, observer);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          setPage(page + 1);
          observer.observe(entry.target);
        }
      },
      { root: null, threshold: 1, rootMargin: "0px" },
    );
    io.observe(listRef.current as Element);
    return () => io.disconnect();
  }, [findState]);

  return (
    <MainContainer>
      <MainInnerContainer>
        <DescriptionContainer>
          <DescriptionBox>
            <Pragraph>
              추가할 병원을 검색해주세요
              <br />
              지도에서 내 주변 병원도 확인할 수 있어요
            </Pragraph>
          </DescriptionBox>
          <ButtonBox>
            <RoundButton size="md" bgColor={theme.color.mintBtn} nonSubmit onClick={() => setShowModal(true)}>
              <ImageIcon src={mapIcon} width={30} height={30} alt="map" />
              지도에서 내 주변 병원 찾기
            </RoundButton>
          </ButtonBox>
          <SearchBox>
            <SearchForm onSubmit={handleSubmit(onValid)}>
              <Input white name="search" width="700px" placeholder="병원명을 입력해주세요" register={register("search")} />
              <RoundButton size="custom" height="60px" bgColor="rgb(100,106,235)">
                검색
              </RoundButton>
            </SearchForm>
          </SearchBox>
        </DescriptionContainer>
        <HospitalList lists={findState || undefined} add={true} listRef={listRef} viewRef={viewRef} />
      </MainInnerContainer>
      {showModal && <ArroundMap setShowModal={setShowModal} />}
    </MainContainer>
  );
};

export default FindHospital;

const SearchForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
`;
const DescriptionContainer = styled.div`
  width: 100%;
`;
