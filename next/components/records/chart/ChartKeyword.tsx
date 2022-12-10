import styled from 'styled-components';

interface KeywordsProps {
  keywords?: string[];
}

function ChartKeyword({ keywords }: KeywordsProps) {
  return (
    <KeywordContainer>
      {
        (keywords && keywords.length !== 0) ? (
          <>
            <strong>많이 기록된 키워드</strong>
            <Keywords>
              {
                keywords.map((keyword) => (
                  <span>{keyword}</span>
                ))
              }
            </Keywords>
          </>
        ) : (
          <strong>기록이 충분히 쌓이면 키워드를 분석해드릴게요!</strong>
        )
      }
    </KeywordContainer>
  )
}


const KeywordContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 25px;
  min-height: 48px;
  margin-bottom: 10px;

  strong {
    color: ${({ theme }) => theme.color.white};
    font-weight: 700;
    margin-right: 30px;
  }
`; 

const Keywords = styled.div`
  span {
    display: inline-block;
    background: ${({ theme }) => theme.color.mintBtn};
    color: ${({ theme }) => theme.color.white};
    padding: 4px 15px;
    margin: 4px 0;
    border-radius: 8px;
  }

  span + span {
    margin-left: 10px;
  }
`;

export default ChartKeyword