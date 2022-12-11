import { selectedKeyword } from 'atoms/atoms';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import CloseIcon from '@public/static/icon/x.png';

interface KeywordsProps {
  keywords?: string[];
}

function ChartKeyword({ keywords }: KeywordsProps) {

  const [clickedKeyword, setClickedKeyword] = useRecoilState(selectedKeyword);

  return (
    <KeywordContainer>
      {
        (keywords && keywords.length !== 0) ? (
          <>
            <strong>많이 기록된 키워드</strong>
            <Keywords>
              {
                keywords.map((keyword) => (
                  <span className={clickedKeyword === keyword ? "active" : ""} onClick={() => clickedKeyword === keyword ? setClickedKeyword(null) : setClickedKeyword(keyword)} >
                    {keyword}
                    {
                      clickedKeyword === keyword &&  <i />
                    }
                  </span>
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
    min-width: 150px;
    color: ${({ theme }) => theme.color.white};
    font-weight: 700;
    margin-right: 20px;
  }
`; 

const Keywords = styled.div`
  display: flex;
  flex-wrap: wrap;

  span {
    position: relative;
    background: ${({ theme }) => theme.color.mintBtn};
    color: ${({ theme }) => theme.color.white};
    font-weight: 500;
    padding: 2px 12px;
    margin: 4px 10px 4px 0;
    border-radius: 8px;
    cursor: pointer;

    &.active {
      padding: 2px 26px 2px 12px;
      background: rgb(63,69,213);
      color: ${({ theme }) => theme.color.white};
    }

    i {
      position: absolute;
      top: 50%;
      right: 8px;
      transform: translate(0, -50%);
      display: block;
      width: 10px;
      height: 10px;
      background: url(${CloseIcon.src}) no-repeat 50% 50%/contain;
      margin-left: 5px;
    }
  }
`;

export default ChartKeyword