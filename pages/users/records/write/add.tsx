import { PositionBoxText } from "@components/record/SiteChecker";
import { Col, FlexContainer, ToryText, WhiteText, Wrapper } from "@styles/Common";
import styled from "styled-components";

const AddPage = () => {
  return (
    <FlexContainer>
      <Col>
        <ToryText>
          <PositionBoxText>머리</PositionBoxText>에 대한 기록을 완료했어요.
        </ToryText>
        <ToryText>다른 부위도 기록할까요?</ToryText>
        <Tory />
      </Col>
    </FlexContainer>
  );
};
export default AddPage;

const Tory = styled.div`
  margin-top: 115px;
  background-color: white;
  width: 360px;
  height: 360px;
  border-radius: 50%;
`;
