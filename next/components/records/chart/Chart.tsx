import styled from "styled-components";
import { RoundButton } from "@components/buttons/Button";
import ToryRecommendPart from "../ToryRecommendPart";
import ChartTimeline from "./ChartTimeline";
import ChartKeyword from "./ChartKeyword";
import { KoreanPosition } from "types/write";
import Link from "next/link";
import { useRouter } from "next/router";
import { Position } from "@prisma/client";

function Chart() {
  const { query } = useRouter();
  const position = query.position as Position;

  return (
    <ChartWrap>
      <ScrollContainer>
        <ChartContainer>
          <TitleBox>
            <Title>
              <strong>{KoreanPosition[position]}</strong> 건강기록
            </Title>
            <Link href={`/users/records/write/${position}`}>
              <RoundButton size="md" bgColor="rgb(244,245,255)" textColor="rgb(83,89,233)">
                기록 추가하기
              </RoundButton>
            </Link>
          </TitleBox>
          <ToryRecommendPart />
          <ChartKeyword />
          <ChartTimeline />
        </ChartContainer>
      </ScrollContainer>
    </ChartWrap>
  );
}

const ChartWrap = styled.div`
  position: relative;
  width: 62.5%;
  height: 100%;
  background: ${({ theme }) => theme.color.darkBg};
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 30px;
  }
  &::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #4449c2;
    background-clip: content-box;
    border: 10px solid transparent;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #363cbf;
    background-clip: content-box;
    border: 10px solid transparent;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 30px 20px 40px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 70px 0 25px;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 36px;
  color: ${({ theme }) => theme.color.white};

  strong {
    font-weight: 700;
  }
`;

export default Chart;
