import { RoundButton } from "@components/buttons/Button";
import Header from "@components/header/Header";
import MessageBox from "@components/MessageBox";
import { Col, FlexContainer, InnerContainer, WhiteText } from "@styles/Common";
import { theme } from "@styles/theme";
import { NextPage } from "next";
import Link from "next/link";
import { FinalCommentBox } from "../help/find-id";

const SuccessPage: NextPage = () => {
  return (
    <FlexContainer>
      <Header />
      <InnerContainer>
        <FinalCommentBox>
          <div className="innerBox">
            <MessageBox>
              <p>회원가입이 완료되었어요!</p>
              <p>바디토리를 시작해볼까요?</p>
            </MessageBox>
            <div className="linkButton">
              <Link href="/">
                <RoundButton size="lg" bgColor={theme.color.mintBtn}>
                  바디토리 시작하기
                </RoundButton>
              </Link>
            </div>
          </div>
        </FinalCommentBox>
      </InnerContainer>
    </FlexContainer>
  );
};
export default SuccessPage;
