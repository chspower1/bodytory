import MessageBox from "@components/MessageBox";
import { FlexContainer, InnerContainer } from "@styles/Common";
import { theme } from "@styles/theme";
import { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { FinalCommentBox } from "../help/find-id";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import { useRouter } from "next/router";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";

const SuccessPage: NextPage = () => {
  const router = useRouter();
  return (
    <FlexContainer>
      <InnerContainer>
        <FinalCommentBox>
          <div className="innerBox">
            <MessageBox>
              <p>회원가입이 완료되었어요!</p>
              <p>바디토리를 시작해볼까요?</p>
            </MessageBox>
            <div className="linkButton">
              <RoundedDefaultButton lg bgColor={theme.color.mintBtn} onClick={()=> router.push("/")}>
                바디토리 시작하기
              </RoundedDefaultButton>
            </div>
          </div>
        </FinalCommentBox>
      </InnerContainer>
    </FlexContainer>
  );
};
export default SuccessPage;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
