import { RoundButton } from "@components/button/Button";
import { Col, WhiteText } from "@styles/Common";
import { theme } from "@styles/theme";
import { NextPage } from "next";
import Link from "next/link";

const SuccessPage: NextPage = () => {
  return (
    <Col>
      <WhiteText>회원가입이 완료되었어요!</WhiteText>
      <WhiteText>회원가입이 완료되었어요!바디토리 시작해볼까요?</WhiteText>
      <Link href="/">
        <RoundButton size="lg" bgColor={theme.color.mintBtn}>
          바디토리 시작하기
        </RoundButton>
      </Link>
    </Col>
  );
};
export default SuccessPage;
