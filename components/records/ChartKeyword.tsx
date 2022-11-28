import styled from 'styled-components';

function ChartKeyword() {
  return (
    <KeywordContainer>
      <strong>많이 기록된 키워드</strong>
      <Keywords>
        <span>저릿저릿</span>
        <span>움직일때</span>
        <span>통증</span>
        <span>찌릿찌릿</span>
        <span>오른쪽</span>
      </Keywords>
    </KeywordContainer>
  )
}


const KeywordContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 25px;
  margin-bottom: 20px;

  strong {
    color: ${({ theme }) => theme.color.white};
    font-weight: 700;
    margin-right: 30px;
  }
`; 

const Keywords = styled.div`
  span {
    background: ${({ theme }) => theme.color.mintBtn};
    color: ${({ theme }) => theme.color.white};
    padding: 5px 15px;
    border-radius: 8px;
  }

  span + span {
    margin-left: 10px;
  }
`;

export default ChartKeyword