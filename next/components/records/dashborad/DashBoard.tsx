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

function DashBoard() {
  const user = useUser();

  const { getApi } = customApi(`/api/users/records/dashboard/aMonth`);
  const { isLoading, data } = useQuery<any>([AI_RESULT_READ], getApi, {
    onSuccess(data) {
      // console.log(data);
    },
  });

  return user ? (
    <DashBoardWarp>
      <DashBoardContainer>
        <ToryTextBox>
          <Tory26 />
          <ToryText26White>
            {data ? (
              <>
                <strong>{user?.name}님</strong> 최근 한달간{" "}
                <strong>{KoreanPosition[data.mostInAMonth as Position]}</strong>에서 증상이 많이 발생하셨네요
              </>
            ) : (
              <>
                <strong>{user?.name}님</strong>의 건강상태 분석을 위해 증상을 기록해주세요!
              </>
            )}
          </ToryText26White>
        </ToryTextBox>
        <ToryRecommend mostThreeDepartment={data ? data.mostThreeDepartment : null} />
        <DashBoardStatistics />
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

export default DashBoard;
