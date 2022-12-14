import Input from "@components/layout/input/Input";
import Modal from "@components/modals/Modal";
import customApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { USER_CHANGE_PASSWORD } from "constant/queryKeys";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useUser from "@hooks/useUser";
import { FlexContainer, InnerContainer } from "@styles/Common";
import styled, { css } from "styled-components";
import { theme } from "@styles/theme";
import Naver from "@src/assets/icons/naver.svg";
import Kakao from "@src/assets/icons/kakao.svg";
import Origin from "@src/assets/icons/origin.svg";
import getAmericanAge from "@utils/client/getAmericanAge";
import { PASSWORD_REGEX } from "constant/regex";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext } from "next";

interface PasswordType {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const UserPage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [closingComment, setClosingComment] = useState(false);
  const [isFade, setIsFade] = useState(false);
  const { user } = useUser();
  const americanAge = getAmericanAge(String(user?.birth!));

  const [{ oldPassword, newPassword }, setChangePassword] = useState({ oldPassword: "", newPassword: "" });
  const { putApi } = customApi("/api/users/edit");
  const { mutate } = useMutation([USER_CHANGE_PASSWORD], putApi, {
    onError(error: any) {
      setShowModal(false);
      setErrorModal(true);
      setError("oldPassword", { message: `현재 비밀번호를 적어주세요!` });
    },
    onSuccess() {
      setClosingComment(true);
    },
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordType>();
  const isErrorMessage =
    errors.oldPassword?.message || errors.newPassword?.message || errors.newPasswordConfirm?.message;
  const onValid: SubmitHandler<PasswordType> = ({ oldPassword, newPassword, newPasswordConfirm }) => {
    if (!PASSWORD_REGEX.test(newPassword)) {
      setError("newPassword", {
        type: "custom",
        message: "비밀번호는 6자리 이상 영문 대소문자, 숫자를 조합해서 입력해주세요",
      });
    } else if (newPassword !== newPasswordConfirm) {
      setError("newPasswordConfirm", { type: "custom", message: "비밀번호가 일치하지 않습니다" });
    } else if (oldPassword === newPassword) {
      setError("newPassword", { type: "custom", message: "새로운 비밀번호를 입력해주세요" });
    } else {
      setChangePassword({ oldPassword, newPassword });
      return setShowModal(true);
    }
    setErrorModal(true);
  };

  const handleClickActiveFunction = () => {
    if (!closingComment) {
      mutate({ password: oldPassword, newPassword });
    } else {
      setShowModal(false);
      router.replace("/");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsFade(true);
    }, 200);
  }, []);

  return (
    <Container>
      <InContainer isFade={isFade}>
        <div>
          <SeperationBox>
            <Name>{user?.name}</Name>
          </SeperationBox>
          <UserInfo>
            <span>
              {user?.gender === "male" ? "남" : "여"},{` 만 ${americanAge}세`}
            </span>
          </UserInfo>
          <LoginStatusBox>
            {user?.type === "naver" && <Naver width={50} height={50} />}
            {user?.type === "kakao" && <Kakao width={50} height={50} />}
            {user?.type === "origin" && <Origin width={50} height={50} />}
          </LoginStatusBox>
          <EmailInputBox>
            <Input disabled={true} type="text" name="user-email" value={user?.email} align="left" motion={false} />
          </EmailInputBox>
        </div>
        <div>
          <form onSubmit={handleSubmit(onValid)}>
            <h2>비밀번호 변경</h2>
            <SeperationBox>
              <Input
                $light
                name="oldPassword"
                type="password"
                register={register("oldPassword", { required: "현재 비밀번호를 입력해주세요" })}
                placeholder={user?.type === "origin" ? "현재 비밀번호를 입력해주세요" : "변경할 수 없습니다"}
                error={errors.oldPassword?.message}
                align="left"
                disabled={user?.type !== "origin"}
                motion={false}
              />
              <Input
                $light
                name="newPassword"
                type="password"
                register={register("newPassword", { required: "새로운 비밀번호를 입력해주세요" })}
                placeholder={user?.type === "origin" ? "새로운 비밀번호를 입력해주세요" : "변경할 수 없습니다"}
                error={errors.newPassword?.message}
                align="left"
                disabled={user?.type !== "origin"}
                motion={false}
              />
              <Input
                $light
                name="newPasswordConfirm"
                type="password"
                register={register("newPasswordConfirm", { required: "새로운 비밀번호확인을 입력해주세요" })}
                placeholder={user?.type === "origin" ? "새로운 비밀번호확인을 입력해주세요" : "변경할 수 없습니다"}
                error={errors.newPasswordConfirm?.message}
                align="left"
                disabled={user?.type !== "origin"}
                motion={false}
              />
            </SeperationBox>
            {user?.type === "origin" && (
              <SeperationBox style={{ display: "flex", justifyContent: "center" }}>
                <EditButton bgColor={theme.color.mintBtn}>비밀번호 변경하기</EditButton>
              </SeperationBox>
            )}
          </form>
          <Modal
            onClose={() => setShowModal(false)}
            activeFunction={handleClickActiveFunction}
            show={showModal}
            closingComment={closingComment}
          >
            {!closingComment ? (
              <>비밀번호를 변경하시겠습니까?</>
            ) : (
              <>
                변경이 성공적으로 완료되었습니다
                <br />
                홈으로 이동합니다
              </>
            )}
          </Modal>
          <Modal
            onClose={() => setErrorModal(false)}
            activeFunction={() => setErrorModal(false)}
            show={errorModal}
            closingComment
          >
            {isErrorMessage}
          </Modal>
        </div>
        <WithdrawBox>
          <Link href="/auth/withdraw">
            <button>탈퇴하기</button>
          </Link>
        </WithdrawBox>
      </InContainer>
    </Container>
  );
};
export default UserPage;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
export const EditButton = styled(RoundedDefaultButton)`
  font-size: 18px;
  padding: 16px 50px;
`;

const InContainer = styled(InnerContainer)<{ isFade: boolean }>`
  height: 830px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  form {
    h2 {
      margin-bottom: 20px;
      font-weight: 600;
    }
    > div:nth-of-type(1) {
      div {
        input[type="password"]::placeholder {
          letter-spacing: -0.2px;
          font-size: 14px;
        }
      }
      div + div {
        margin: 20px auto 0;
      }
    }
  }
  opacity: 0;
  transition: opacity 0.8s;
  ${({ isFade }) =>
    isFade &&
    css`
      opacity: 1;
    `}
`;

const Name = styled.h1`
  font-size: 30px;
  font-weight: 900;
`;

const UserInfo = styled.div`
  font-size: 24px;
  margin-top: 14px;
`;

const SeperationBox = styled.div`
  & + & {
    margin-top: 30px;
  }
`;

const LoginStatusBox = styled(SeperationBox)`
  float: right;
  margin-bottom: 20px;
`;

const Container = styled(FlexContainer)``;

const EmailInputBox = styled(SeperationBox)`
  clear: both;
  display: flex;
  justify-content: center;
`;

const WithdrawBox = styled.div`
  margin: 0 auto;
  position: relative;
  a {
    position: relative;
    z-index: 2;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(217, 222, 255, 1) 40%, transparent 40%);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    &:before {
      opacity: 1;
    }
  }
`;
