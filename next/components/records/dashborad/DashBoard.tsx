import styled from "styled-components";
import { ToryText26 } from "@styles/Common";
import DashBoardStatistics from "./DashBoardStatistics";
import ToryRecommend from "../ToryRecommend";
import useUser from "@hooks/useUser";
import customApi from "@utils/client/customApi";
import { useQuery } from "@tanstack/react-query";
import { AI_RESULT_READ } from "constant/queryKeys";
import { KoreanPosition } from "types/write";
import { bodyPartType } from "types/bodyParts";
import { MedicalDepartment, Position } from "@prisma/client";
import ChartAnim from "@src/lotties/ChartAnim";
import { RoundButton } from "@components/buttons/Button";
import MicIcon from "@public/static/icon/mic.svg";
import Link from "next/link";


function DashBoard() {
  const user = useUser();

  const { getApi } = customApi(`/api/users/records/dashboard/aMonth`);
  const { isLoading, data } = useQuery<any>([AI_RESULT_READ], getApi, {
    onSuccess(data) {
      // console.log(data);
    }
  });

  return user ? (
    <DashBoardWarp>
      <DashBoardContainer>
        <ToryTextBox>
          <Tory26 />
          <ToryText26White>
            {
              data ? (
                <>
                  <strong>{user?.name}님</strong> 최근 한달간 <strong>{KoreanPosition[data.mostInAMonth as Position]}</strong>에서 증상이 많이 발생하셨네요
                </>
              ) : (
                <>
                  아직 분석할 기록이 없어요.. <br /><strong>{user?.name}님</strong>의 몸 상태를 알려주시면 토리가 분석해드릴게요!
                </>
              )
            }
          </ToryText26White>
        </ToryTextBox>
        {
          data ? (
            <>
              <ToryRecommend mostThreeDepartment={data ? data.mostThreeDepartment : null} />
              <DashBoardStatistics />
            </>
          ) : (
            <>
              <NoChartContainer>
                <ChartAnim />
              </NoChartContainer>
              <NoChartButtonContainer>
                <p>오늘부터 매일매일 내 몸을 위한 건강한 기록을 시작해볼까요?</p>
                <Link href={"/users/records/write"}>
                  <RoundButton ><SmallMicIcon />오늘 기록하기</RoundButton>
                </Link>
              </NoChartButtonContainer>
            </>
   
          )
        }

      </DashBoardContainer>
    </DashBoardWarp>
  ) : null;
}

const DashBoardWarp = styled.div`
  width: 62.5%;
  height: 100%;
  background: ${({ theme }) => theme.color.darkBg};
`;

const DashBoardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 30px 60px;
`;

const ToryTextBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Tory26 = styled.div`
  // 추후 토리로 변경
  background: #fff;
  width: 120px;
  height: 120px;
  margin-right: 30px;
`;

const ToryText26White = styled(ToryText26)`
  // 토리텍스트 추후 정리필요
  color: ${({ theme }) => theme.color.white};
`;

const NoChartContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  border-radius: 40px;
  margin-top: 50px;
  padding: 20px 60px;
`;

const NoChartButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  border-radius: 40px;
  margin-top: 20px;
  padding: 40px 80px;
  font-size: 20px;
  font-weight: 700;
`;

const SmallMicIcon = styled(MicIcon)`
  width: 30px;
  height: 30px;
  margin-right: 15px;
`;

export default DashBoard;
