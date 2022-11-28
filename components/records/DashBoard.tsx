import styled from 'styled-components';
import { ToryText26 } from '@styles/Common';
import Statistics from './DashBoardStatistics';
import ToryRecommend from './ToryRecommend';

function DashBoard() {
  return (
    <DashBoardWarp>
      <DashBoardContainer>
        <ToryTextBox>
          <Tory24 />
          <ToryText26>
            <strong>$소희님</strong> 최근 한달간 <strong>$손목</strong>에서 증상이 많이 발생하셨네요
          </ToryText26>
        </ToryTextBox>
        <ToryRecommend />
        <Statistics />
      </DashBoardContainer>
    </DashBoardWarp>
  )
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

const Tory24 = styled.div`
  // 추후 토리로 변경
  background: #fff;
  width: 120px;
  height: 120px;
  margin-right: 30px;
`;




export default DashBoard