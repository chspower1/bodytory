import useUser from "@hooks/useUser";
import styled from "styled-components";

function Statistics() {
  const user = useUser();

  return user ? (
    <StatisticsContainer>
      <Title>최근 3개월 동안 {user?.name}님의 건강상태를 분석했어요</Title>
      <FlexContainer>
        <ChartBox>
          <p>가장 많은 기록을 남긴 부위는 <strong>$손목</strong>이에요</p>
        </ChartBox>
        <ChartBox>
          <p>가장 많이 기록된 키워드는 <strong>$통증</strong>이에요</p>
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

  & + & {
    margin-left: 40px;
  }

  p {
    text-align: center;

    strong {
      font-weight: 700;
    }
  }
`;




export default Statistics