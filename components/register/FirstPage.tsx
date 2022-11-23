import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { RegisterForm } from "pages/auth/register";
import { CircleButton, RectangleButton, RoundButton } from "@components/button/Button";
import { Box, Col, Container, Row, WhiteText, Wrapper } from "@styles/Common";
import Link from "next/link";
import CheckBoxInput from "@components/CheckBoxInput";
import MessageBox from "@components/MessageBox";
import styled from "styled-components";
import { theme } from "@styles/theme";
interface FirstRegisterForm {
  agree: boolean;
}
interface RegisterPageProps {
  user: RegisterForm | undefined;
  setUser: Dispatch<SetStateAction<RegisterForm | undefined>>;
  setPage: Dispatch<SetStateAction<number>>;
}
const FirstPage = ({ user, setUser, setPage }: RegisterPageProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FirstRegisterForm>({
    mode: "onChange",
    defaultValues: {
      agree: user?.agree,
    },
  });

  const onValid = () => {
    setUser(prev => ({ ...prev!, agree: true }));
    if (user?.type !== "origin") {
      setPage(3);
    } else setPage(2);
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <FirstPageContainer>
          <MessageBox>토리가 이용자님의 정보를 수집하고 안전하게 보호해요!</MessageBox>
          <CheckBoxInput
            label="모든 약관에 동의합니다."
            name="agree"
            register={register("agree", { required: "약관 동의 해주세요" })}
            error={errors.agree?.message}
          />
          <Col>
            <TermsRow>
              <WhiteText fontSize="18px">[필수] 서비스 이용 약관 </WhiteText>
              <RectangleButton bgColor="rgb(61, 66, 191)" fontSize="16px">
                내용 보기
              </RectangleButton>
            </TermsRow>
            <TermsRow>
              <WhiteText fontSize="18px">[필수] 개인 정보 수집 및 이용 약관 </WhiteText>
              <RectangleButton bgColor="rgb(61, 66, 191)" fontSize="16px">
                내용 보기
              </RectangleButton>
            </TermsRow>
          </Col>
          <ButtonBox>
            <Link href="/auth/register/choice">
              <CircleButton nonSubmit bgColor="rgb(75, 80, 211)">
                이전 단계
              </CircleButton>
            </Link>
            <CircleButton bgColor={theme.color.mintBtn} disable={!(user?.agree || watch("agree"))}>
              다음 단계
            </CircleButton>
          </ButtonBox>
        </FirstPageContainer>
      </form>
    </Wrapper>
  );
};

export default FirstPage;

const TermsRow = styled(Row)`
  width: 600px;
  padding: 0px 25px;
  height: 70px;
  justify-content: space-between;
`;
const FirstPageContainer = styled(Container)`
  height: 100vh;
  flex-direction: column;
  justify-content: space-evenly;
`;
export const ButtonBox = styled(Row)`
  gap: 65px;
`;
