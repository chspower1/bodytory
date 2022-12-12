import { RoundButton } from "@components/layout/buttons/Button";
import { PositionTextBox } from "@components/records/BodyPartChecker";
import { Position } from "@prisma/client";
import { BtnBox, Col, FlexContainer, WhiteText, Wrapper } from "@styles/Common";
import { theme } from "@styles/theme";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { KoreanPosition } from "types/write";

const AddPage = () => {
  const router = useRouter();
  const position = router.query.position as Position;
  return (
    <FlexContainer>
      <div>
        <ToryText>
          <PositionTextBox>{KoreanPosition[position]}</PositionTextBox>에 대한 기록을 완료했어요.
          <br />
          다른 부위도 기록할까요?
        </ToryText>
        <ButtonBox>
          <RoundButton onClick={()=> router.replace("/users/records/write")}>네, 다른 부위도 기록할래요</RoundButton>
          <RoundButton onClick={()=> router.replace(`/users/records/chart/${position}`)} bgColor={theme.color.weekPurple} textColor="rgb(93, 107, 178)">
            아니요,더 기록할게 없어요
          </RoundButton>
        </ButtonBox>
      </div>
    </FlexContainer>
  );
};
export default AddPage;

export const ToryText = styled.div`
  font-size: 36px;
  color: ${({ theme }) => theme.color.text};
  line-height: 1.8;
  text-align: center;
  margin-bottom: 80px;
`;

const ButtonBox = styled.div`
  display: flex;
  > button{
    margin: 0 30px;
  }
`;
