import { theme } from "@styles/theme";
import { useState } from "react";
import styled from "styled-components";
import { ButtonBox, DescriptionBox, MainContainer, MainInnerContainer, Pragraph } from ".";
import MapIcon from "@src/assets/icons/mapIcon.svg";
import List from "@src/assets/icons/list.svg";
import { BackButton } from "@styles/Common";
import Link from "next/link";
import SearchHospitalList from "@components/search/SearchHospitalList";
import SearchHospitalMap from "@components/search/SearchHospitalMap";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext } from "next";

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
          <SearchModeTogleButton
            img
            bgColor={theme.color.mintBtn}
            type="button"
            onClick={() => setPageCategory(prev => (prev === "search" ? "map" : "search"))}
          >
            {pageCategory === "search" && (
              <>
                <MapIcon width={26} height={26} />
                &nbsp;&nbsp; 지도에서 병원 찾기
              </>
            )}
            {pageCategory === "map" && (
              <>
                <List width={26} height={26} />
                &nbsp;&nbsp; 리스트로 병원 찾기
              </>
            )}
          </SearchModeTogleButton>
        </ButtonBox>

        {pageCategory === "search" && <SearchHospitalList />}
        {pageCategory === "map" && <SearchHospitalMap />}
      </MainInnerContainer>
    </MainContainer>
  );
};

export default FindHospital;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
const SearchModeTogleButton = styled(RoundedDefaultButton)`
  padding: 12px 50px;
`;

const ErrorMessage = styled.div`
  position: absolute;
  bottom: -30px;
  left: 100px;
`;

const DescriptionContainer = styled.div`
  width: 100%;
`;
