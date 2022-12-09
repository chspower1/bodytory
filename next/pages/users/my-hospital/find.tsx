import { RoundButton } from "@components/buttons/Button";
import HospitalList from "@components/MyHospitalList";
import Input from "@components/Input";
import ArroundMap from "@components/modals/map/ArroundMapModal";
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
import List from "@public/static/icon/list.svg";
import useIO from "@hooks/useIO";
import useCoords from "@hooks/useCoords";
import { AnimatePresence } from "framer-motion";
import { BackButton } from "@styles/Common";
import Link from "next/link";
import SearchHospitalList from "@components/SearchHospitalList";
import SearchHospitalMap from "@components/SearchHospitalMap";

type PageCategory = "search" | "map";
const FindHospital = () => {
  const [pageCategory, setPageCategory] = useState<PageCategory>("map");

  return (
    <MainContainer>
      <Link href="/users/my-hospital">
        <BackButton>
          <span>병원관리</span>
        </BackButton>
      </Link>
      <MainInnerContainer>
        <DescriptionBox>
          <Pragraph>
            추가할 병원을 검색해주세요
            <br />
            지도에서 내 주변 병원도 확인할 수 있어요
          </Pragraph>
        </DescriptionBox>
        <ButtonBox>
          <RoundButton
            size="md"
            bgColor={theme.color.mintBtn}
            nonSubmit
            onClick={() => setPageCategory(prev => (prev === "search" ? "map" : "search"))}
          >
            {pageCategory === "search" && (
              <>
                <MapIcon width={30} height={30} style={{ marginBottom: "6px" }} />
                &nbsp;&nbsp; 지도에서 병원 찾기
              </>
            )}
            {pageCategory === "map" && (
              <>
                <List width={30} height={30} />
                &nbsp;&nbsp; 리스트로 병원 찾기
              </>
            )}
          </RoundButton>
        </ButtonBox>

        {pageCategory === "search" && <SearchHospitalList />}
        {pageCategory === "map" && <SearchHospitalMap />}
      </MainInnerContainer>
    </MainContainer>
  );
};

export default FindHospital;

const ErrorMessage = styled.div`
  position: absolute;
  bottom: -30px;
  left: 100px;
`;

const DescriptionContainer = styled.div`
  width: 100%;
`;
