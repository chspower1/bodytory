import { FlexContainer } from "@styles/Common";
import styled from "styled-components";
import { ToryIcon } from "./users/my-hospital/clinic-list";
import toriQuestionIcon from "@public/static/icon/toriQuestion.png";
import { CircleButton } from "@components/buttons/Button";
import { theme } from "@styles/theme";
import { useRouter } from "next/router";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <FlexContainer>
      <ContentBox>
        <ToriBox>
          <ToriErrIcon />
        </ToriBox>
        <TextBox>
          <p>요청하신 페이지를 찾지 못했어요</p>
          <p>바디토리로 돌아갈까요?</p>
          <Link href="/">
            <CircleButton size="sm" bgColor={theme.color.input}>
              네
            </CircleButton>
          </Link>
        </TextBox>
      </ContentBox>
    </FlexContainer>
  );
};

export default NotFoundPage;

const ContentBox = styled.div`
  display: flex;
  align-items: center;
`;

const ToriBox = styled.div`
  flex-shrink: 0;
  width: 220px;
  height: 300px;
`;

const ToriErrIcon = styled(ToryIcon)`
  background-image: url(${toriQuestionIcon.src});
`;

const TextBox = styled.div`
  margin-left: 60px;
  font-size: 40px;
  color: ${({ theme }) => theme.color.darkBg};
  p {
    font-weight: 700;
  }
  button {
    margin: 50px auto 0;
    font-size: 15px;
  }
`;
