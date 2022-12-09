import useUser from "@hooks/useUser";
import { Position } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { BODYPART_CHARTDATA_READ, KEYWORDS_CHARTDATA_READ } from "constant/queryKeys";
import { useState } from "react";
import styled from "styled-components";
import { KoreanPosition } from "types/write";
import MostBodyPart from "./MostBodyPart";
import MostKeyword from "./MostKeyword";

function DashBoardStatistics() {
  const user = useUser();

  const [mostPart, setMostPart] = useState<string[]>();
  const [mostPartIdx, setMostPartIdx] = useState<number[]>();
  const [bodyPartChartData, setBodyPartChartData] = useState();

  const [mostKeyword, setMostKeyword] = useState<string>();
  const [keywordChartData, setKeywordChartData] = useState();

  const dashboardGetApi = customApi(`/api/users/records/dashboard/threeMonth`);
  const dashboardQuery = useQuery<any>([BODYPART_CHARTDATA_READ], dashboardGetApi.getApi, {
    onSuccess(data) {

      console.log("하나 입력했는데 왜 안와", data);

      if (data) {
        // 가장 기록이 많은 부위 찾기
        let maxLength = 0;
        let maxPart: string[] = [];
        let maxIdx: number[] = [];

        data.forEach((ele: any) => {
          if(ele.userLength > maxLength) maxLength = ele.userLength;
        });
        data.forEach((ele: any, idx: number) => {
          if(ele.userLength === maxLength) {
            maxPart.push(ele.position);
            maxIdx.push(idx);
          }
        });

        setMostPart(maxPart);
        setMostPartIdx(maxIdx);
        setBodyPartChartData(data);
      }
    }
  });

  const flaskGetApi = customApi(`/api/users/records/flask/allKeywords`);
  const flaskQuery = useQuery<any>([KEYWORDS_CHARTDATA_READ], flaskGetApi.getApi, {
    onSuccess(data) {

      console.log("하나 입력했는데 왜 안와 키워드", data);

      if (data) {
        setKeywordChartData(data);
        setMostKeyword(data[0]);
      }
    }
  });


  return user ? (
    <StatisticsContainer>
      <Title>최근 3개월 동안 {user?.name}님의 건강상태를 분석했어요</Title>
      <FlexContainer>
        <ChartBox>
          {
            mostPart && (
              <p>가장 많은 기록을 남긴 부위는 <strong>{
                mostPart?.length > 1 ? (
                  `${KoreanPosition[mostPart[0] as Position]} 외 ${mostPart.length-1}곳`
                ) : (
                  KoreanPosition[mostPart[0] as Position]
                )
            }</strong> 입니다</p>
            )
          }
          <MostBodyPart chartData={bodyPartChartData ? bodyPartChartData : null} mostPartIdx={mostPartIdx} />
        </ChartBox>
        <ChartBox>
          {
            mostKeyword && (
              <p>가장 많이 기록된 키워드는 <strong>{keywordChartData ? keywordChartData[0] : null}</strong> 입니다</p>
            )
          }
          <MostKeyword chartData={keywordChartData ? keywordChartData: null} />
        </ChartBox>
      </FlexContainer>
    </StatisticsContainer>
  ) : null;
}

const StatisticsContainer = styled.div`
`;

const Title = styled.p`
  padding: 0 25px;
  margin-bottom: 30px; 
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.white};
`;

const FlexContainer = styled.div`
  display: flex;
`;

const ChartBox = styled.div`
  width: calc(50% - 20px);
  min-height: 460px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 40px;
  padding: 30px;
  box-shadow: 8px 8px 18px 0px rgba(32, 36, 120, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;

  & + & {
    margin-left: 40px;
  }

  p {
    text-align: center;
    margin-bottom: 30px;

    strong {
      font-weight: 700;
      padding: 0 1px 2px;
      background: linear-gradient(to top, rgba(18, 212, 201, .4) 40%, transparent 40%);
    }
  }
`;



export default DashBoardStatistics