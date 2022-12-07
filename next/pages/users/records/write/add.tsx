import { RoundButton } from "@components/buttons/Button";
import { PositionBoxText } from "@components/records/BodyPartChecker";
import { BtnBox, Col, FlexContainer, ToryText, WhiteText, Wrapper } from "@styles/Common";
import { theme } from "@styles/theme";
import Link from "next/link";
import styled from "styled-components";

const AddPage = () => {
  return (
    <FlexContainer>
      <Col>
        <ToryText>
          <PositionBoxText>머리</PositionBoxText>에 대한 기록을 완료했어요.
        </ToryText>
        <ToryText>다른 부위도 기록할까요?</ToryText>
        <BtnBox>
          <Link href="/users/records/write">
            <RoundButton>네, 다른 부위도 기록할래요</RoundButton>
          </Link>
          <Link href="/users/records">
            <RoundButton bgColor={theme.color.weekPurple} textColor="rgb(93, 107, 178)">
              아니요,더 기록할게 없어요
            </RoundButton>
          </Link>
        </BtnBox>
      </Col>
    </FlexContainer>
  );
};
export default AddPage;
