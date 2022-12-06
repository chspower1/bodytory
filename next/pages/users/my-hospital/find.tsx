import { RoundButton } from "@components/buttons/Button";
import HospitalList from "@components/MyHospitalList";
import Input from "@components/Input";
import ArroundMap from "@components/modals/map/ArroundMap";
import { theme } from "@styles/theme";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  ButtonBox,
  DescriptionBox,
  ImageIcon,
  MainContainer,
  MainInnerContainer,
  MyHospital,
  MyHospitalResponse,
  Pragraph,
} from ".";
import MapIcon from "@public/static/icon/mapIcon.svg";
import useIO from "@hooks/useIO";
import useCoords from "@hooks/useCoords";
import { AnimatePresence } from "framer-motion";
import { BackButton } from "@styles/Common";
import Link from "next/link";
import SearchHospitalList from "@components/SearchHospitalList";

interface SearchForm {
  search: string;
}

const FindHospital = () => {
  const queryclient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { latitude, longitude } = useCoords();
  const [searchWord, setSearchWord] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [findState, setFindState] = useState<MyHospital[]>([]);
  const [hasLastPage, setHasLastPage] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SearchForm>({ mode: "onChange" });

  const ioCallback = () => {
    setPage(page => page + 1);
  };
  const { setTarget } = useIO(hasLastPage, ioCallback);

  useEffect(() => {
    if (searchWord) {
      getSearchLists();
    }
  }, [searchWord, page]);

  const getSearchLists = useCallback(async () => {
    setIsLoading(() => true);
    const result = await axios.get(`/api/users/my-hospitals/find?page=${page}&search=${searchWord}`);
    setHasLastPage(() => result.data.status);
    setFindState((current: MyHospital[]) => {
      const array = [...current];
      if (array) {
        array.push(...result.data.foundHospitals);
      }
      return [...new Set(array)];
    });
    setIsLoading(() => false);
    queryclient.invalidateQueries(["isMyHospital"]);
  }, [searchWord, page]);

  const onValid = useCallback(async (input: SearchForm) => {
    if (input.search === "") return;
    setSearchWord(() => input.search);
    setFindState([]);
    setPage(0);
    setValue("search", "");
  }, []);

  useEffect(() => {
    if (observerTarget) setTarget(observerTarget.current);
  }, [observerTarget, setTarget, []]);

  return (
    <MainContainer>
      <Link href="/users/my-hospital">
        <BackButton>
          <span>병원관리</span>
        </BackButton>
      </Link>

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
              {/* <ImageIcon src={mapIcon} width={30} height={30} alt="map" /> */}
              <MapIcon style={{ marginBottom: "6px" }} />
              &nbsp;&nbsp; 지도에서 내 주변 병원 찾기
            </RoundButton>
          </ButtonBox>
          <SearchBox>
            <SearchForm onSubmit={handleSubmit(onValid)}>
              <Input
                $white
                name="search"
                width="700px"
                placeholder="병원명을 입력해주세요"
                register={register("search", {
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
        </DescriptionContainer>
        <SearchHospitalList hospitals={findState} add={true} setobserverTarget={observerTarget} isLoading={isLoading} />
      </MainInnerContainer>
      <AnimatePresence>
        {showModal && <ArroundMap latitude={latitude!} longitude={longitude!} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </MainContainer>
  );
};

export default FindHospital;

const ErrorMessage = styled.div`
  position: absolute;
  bottom: -30px;
  left: 100px;
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
  margin-top: 50px;
`;
const DescriptionContainer = styled.div`
  width: 100%;
`;
