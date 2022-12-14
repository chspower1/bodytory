import { media, theme } from "@styles/theme";
import { useState } from "react";
import styled from "styled-components";
import { ButtonBox, DescriptionBox, MainContainer, MainInnerContainer } from ".";
import MapIcon from "@src/assets/icons/mapIcon.svg";
import List from "@src/assets/icons/list.svg";
import { BackButton } from "@styles/Common";
import Link from "next/link";
import SearchHospitalList from "@components/search/SearchHospitalList";
import SearchHospitalMap from "@components/search/SearchHospitalMap";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import ToryPurpleAnim from "@components/lotties/ToryPurpleAnim";
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
          <ToryMotion>
            <ToryPurpleAnim segmentIndex={0} />
          </ToryMotion>
          <Pragraph>
            {pageCategory === "search" && (
              <>
                추가할 병원을 검색해주세요
                <br />
                지도에서 내 주변 병원도 확인할 수 있어요
              </>
            )}
            {pageCategory === "map" && (
              <>
                지도에서 내 주변 병원을 찾아보세요
                <br />
                병원 이름을 직접 검색해서 찾는 방법도 있어요
              </>
            )}
          </Pragraph>
        </DescriptionBox>
        <ButtonBox isMap={pageCategory === "search"}>
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

const Pragraph = styled.p`
  font-size: 32px;
  strong {
    font-weight: 700;
  }
  ${media.custom(1366)} {
    display: block;
    position: absolute;
    left: 150px;
    font-size: 22px;
  }
  ${media.tablet} {
    display: block;
    position: absolute;
    left: 200px;
    font-size: 18px;
  }
  ${media.mobile} {
    font-size: 14px;
    width: auto;
    display: block;
    position: absolute;
    top: 80px;
    left: 40px;
  }
`;

const SearchModeTogleButton = styled(RoundedDefaultButton)`
  padding: 12px 50px;
  ${media.mobile} {
    padding: 10px;
    font-size: 12px;
    width: 200px;
    img,
    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  bottom: -30px;
  left: 100px;
`;

const DescriptionContainer = styled.div`
  width: 100%;
`;

const ToryMotion = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-20%, -60%);
  width: 260px;
  height: 260px;
  ${media.custom(1366)} {
    width: 200px;
    height: 200px;
  }
  ${media.tablet} {
    width: 200px;
    height: 200px;
    top: 80px;
    left: 60px;
  }
  ${media.mobile} {
    width: 100px;
    height: 100px;
    top: 30px;
    left: 10px;
  }
`;
