import { RoundButton } from "@components/button/Button";
import SwiperBox from "@components/SwiperBox";
import { Container, InnerContainer, Row } from "@styles/Common";
import { theme } from "@styles/theme";
import { DescriptionBox, HighlightText, Pragraph } from "pages/hospital";
import React from "react";
import styled from "styled-components";

const ClinicList = () => {
  return (
    <ClinicListWrap>
      <ClinicContainer>
        <PageHeadBox>
          <PageHead>
            <ToriBox></ToriBox>
            <DescriptionBox>
              <Pragraph>
                <strong>$$ 정형외과</strong> 진료목록이에요 <br />
                자세한 진료내역은 각 날짜를 클릭해서 볼 수 있어요
              </Pragraph>
            </DescriptionBox>
          </PageHead>
          <ButtonBox>
            <RoundButton nonSubmit bgColor={theme.color.mintBtn}>
              나의 병원 전체 목록보기
            </RoundButton>
          </ButtonBox>
        </PageHeadBox>
        <SwiperBox />
      </ClinicContainer>
    </ClinicListWrap>
  );
};

export default ClinicList;


const ClinicListWrap = styled.div`
  display:flex;
  flex-direction: column;
  height:100%;
  background:#fff;
`;

const PageHeadBox = styled(Container)``

const ClinicContainer = styled.div`
  margin: auto 0;
`

const PageHead = styled.div`
  display: flex;
  align-items: center;
`;

const ToriBox = styled.div`
  width: 120px;
  height: 190px;
  background: #fff;
`;
const ButtonBox = styled(Row)`
  margin : 30px 0;
`;
