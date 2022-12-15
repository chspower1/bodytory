import { selectedKeyword } from "atoms/atoms";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import CloseIcon from "@src/assets/icons/x.png";
import { media } from "@styles/theme";

interface KeywordsProps {
  keywords?: string[];
}

function ChartKeyword({ keywords }: KeywordsProps) {
  const [clickedKeyword, setClickedKeyword] = useRecoilState(selectedKeyword);

  return (
    <KeywordContainer>
      {keywords && keywords.length !== 0 ? (
        <>
          <strong>많이 기록된 키워드</strong>
          <Keywords>
            {keywords.map(keyword => (
              <span
                className={clickedKeyword && clickedKeyword !== keyword ? "noActive" : ""}
                onClick={() => (clickedKeyword === keyword ? setClickedKeyword(null) : setClickedKeyword(keyword))}
              >
                {keyword}
                {clickedKeyword === keyword && <i />}
              </span>
            ))}
          </Keywords>
        </>
      ) : (
        <p>기록이 충분히 쌓이면 키워드를 분석해드릴게요!</p>
      )}
    </KeywordContainer>
  );
}

const KeywordContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 25px;
  width: 100%;
  min-height: 48px;
  margin-bottom: 10px;

  strong {
    width: 8em;
    color: ${({ theme }) => theme.color.white};
    font-weight: 700;
    margin-right: 20px;
  }

  p {
    color: ${({ theme }) => theme.color.white};
    font-weight: 700;
    margin-right: 20px;
  }

  ${media.custom(1440)} {
    font-size: 16px;
  }
`;

const Keywords = styled.div`
  width: calc(100% - 9em);
  display: flex;
  flex-wrap: nowrap; 
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: block;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4449c2;
  }

  span {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    position: relative;
    background: ${({ theme }) => theme.color.mintBtn};
    color: ${({ theme }) => theme.color.white};
    font-weight: 500;
    padding: 2px 12px;
    margin: 4px 10px 4px 0;
    border-radius: 8px;
    cursor: pointer;

    &.noActive {
      opacity: .3;
    }

    i {
      display: block;
      width: 10px;
      height: 10px;
      background: url(${CloseIcon.src}) no-repeat 50% 50% / contain;
      margin-left: 8px;
    }
  }
`;

export default ChartKeyword;
