import Input from "@components/Input";
import Modal from "@components/Modal/Modal";
import customApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { USER_CHANGE_PASSWORD } from "constant/queryKeys";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useUser from "@hooks/useUser";
import { FlexContainer, InnerContainer } from "@styles/Common";
import styled from "styled-components";
import { theme } from "@styles/theme";
import { RoundButton } from "@components/button/Button";
import naver from "/public/static/naver.svg";
import kakao from "/public/static/kakao.svg";
import origin from "/public/static/origin.svg";
import Image from "next/image";
import getAmericanAge from "@utils/client/getAmericanAge";
import { loggedInUser } from "atoms/atoms";
import { useRecoilValue } from "recoil";
import { User } from "@prisma/client";
import { RegisterForm } from "pages/auth/register";

interface PasswordType {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export default function Edit() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [closingComment, setClosingComment] = useState(false);
  const currentUser = useRecoilValue(loggedInUser);
  const[test, setTest] = useState<User | RegisterForm | null>(null);
  const americanAge = getAmericanAge(String(test?.birth!));
  
  const [{ oldPassword, newPassword }, setChangePassword] = useState({ oldPassword: "", newPassword: "" });
  const { putApi } = customApi("/api/users/edit");
  const { mutate } = useMutation([USER_CHANGE_PASSWORD], putApi, {
    onError(error: any) {
      setShowModal(false);
      setError("oldPassword", { message: `${error.data}` });
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
  const onValid: SubmitHandler<PasswordType> = ({ oldPassword, newPassword, newPasswordConfirm }) => {
    if (newPassword !== newPasswordConfirm) {
      setError("newPasswordConfirm", { message: "비밀번호가 일치하지 않습니다" });
    } else if (oldPassword === newPassword) {
      setError("newPassword", { message: "새로운 비밀번호를 입력해주세요" });
    } else {
      setChangePassword({ oldPassword, newPassword });
      setShowModal(true);
    }
  };
  const handleClickOnClose = () => {
    setShowModal(false);
  };
  const handleClickActiveFuction = () => {
    if (!closingComment) {
      mutate({ password: oldPassword, newPassword });
    } else {
      setShowModal(false);
      router.replace("/");
    }
  };
  useEffect(() => {
    setTest(currentUser);
  }, [])
  useEffect(() => {
    document.body.style.backgroundColor = theme.color.lightBg;
    return () => {
      document.body.style.backgroundColor = theme.color.darkBg;
    };
  }, []);
  return (
    <Container>
      <InContainer>
        <div>
          <SeperationBox>
            <Name>{test?.name}</Name>
          </SeperationBox>
          <UserInfo>
            <span>
              {test?.gender === "male" ? "남" : "여"},{` 만 ${americanAge}세`}
            </span>
          </UserInfo>
          <LoginStatusBox>
            <Image
              src={test?.type === "naver" ? naver : test?.type === "kakao" ? kakao : origin}
              alt="logo"
              height={50}
              width={50}
            />
          </LoginStatusBox>
          <EmailInputBox>
            <Input disabled={true} type="text" name="user-email" value={test?.email} align="left" />
          </EmailInputBox>
        </div>
        <div>
          <form onSubmit={handleSubmit(onValid)}>
            <h2>비밀번호 변경</h2>
            <SeperationBox>
              <Input
                light
                name="oldPassword"
                type="password"
                register={register("oldPassword", { required: "필수값입니다" })}
                placeholder="현재 비밀번호를 입력해주세요."
                error={errors.oldPassword?.message}
                align='left'
              />
              <Input
                light
                name="newPassword"
                type="password"
                register={register("newPassword", { required: "필수값입니다" })}
                placeholder="새로운 비밀번호를 입력해주세요."
                error={errors.newPassword?.message}
                align='left'
              />
              <Input
                light
                name="newPasswordConfirm"
                type="password"
                register={register("newPasswordConfirm", { required: "필수값입니다" })}
                placeholder="새로운 비밀번호확인을 입력해주세요."
                error={errors.newPasswordConfirm?.message}
                align='left'
              />
            </SeperationBox>
            <SeperationBox style={{ display: "flex", justifyContent: "center" }}>
              <RoundButton size="md" bgColor={theme.color.mintBtn}>
                비밀번호 변경하기
              </RoundButton>
            </SeperationBox>
          </form>
          <Modal
            onClose={handleClickOnClose}
            activeFuction={handleClickActiveFuction}
            show={showModal}
            closingComment={closingComment}
            title={"시스템"}
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
        </div>
        <WithdrawBox>
          <Link href="/auth/withdraw">
            <button>탈퇴하기</button>
          </Link>
        </WithdrawBox>
      </InContainer>
    </Container>
  );
}

const InContainer = styled(InnerContainer)`
  height: 830px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  form{
    h2{
      margin-bottom: 20px;
      font-weight:600;
    }
    > div:nth-of-type(1){
      div{
        input[type="password"]::placeholder{
          letter-spacing: -.2px;
          font-size: 14px;
        }
      }
      div + div{
        margin: 20px auto 0;
      }
    }
  }
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
  display: flex;
  justify-content: center;
`;
