import NaverLoginBtn from "@components/layout/buttons/NaverBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { USER_LOGIN, USE_USER } from "constant/queryKeys";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import LoadingDot from "@components/LoadingDot";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext, NextPage } from "next";

const LoadingBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bolder;
`;

const ButtonBox = styled.div`
  display: none;
`;

const Loading: NextPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { postApi } = customApi("/api/auth/login");
  const { mutate } = useMutation([USER_LOGIN], postApi, {
    onError(error: any) {},
    onSuccess(data) {
      if (data.isNew) {
        return router.push(
          {
            pathname: "/auth/register",
            query: data,
          },
          "/auth/register",
        );
      } else {
        queryClient.refetchQueries([USE_USER]);
        return router.push("/");
      }
    },
  });
  return (
    <LoadingBox>
      <div>
        유저 정보 조회중입니다
        <LoadingDot />
      </div>
      <ButtonBox>
        <NaverLoginBtn mutate={mutate} kind={"login"} />
      </ButtonBox>
    </LoadingBox>
  );
};
export default Loading;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
