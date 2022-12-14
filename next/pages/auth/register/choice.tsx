import KakaoLoginBtn from "@components/layout/buttons/KakaoBtn";
import NaverLoginBtn from "@components/layout/buttons/NaverBtn";
import customApi from "utils/client/customApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_LOGIN, USE_USER } from "constant/queryKeys";
import { useRouter } from "next/router";
import React from "react";
import OriginLoginBtn from "@components/layout/buttons/OriginBtn";
import { Box, Col, FlexContainer, InnerContainer } from "@styles/Common";
import styled from "styled-components";
import MessageBox from "@components/MessageBox";
import { Variants, motion } from "framer-motion";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext, NextPage } from "next";

const CHOICE_VARIANTS: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const TYPE_VARIANTS: Variants = {
  initial: {
    opacity: 0,
    x: 80,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.7,
    },
  },
};
const ChoicePage: NextPage = () => {
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
        router.push("/");
      }
    },
  });
  return (
    <FlexContainer>
      <InnerContainer>
        <MessageBox>어떤 방식으로 회원가입할까요?</MessageBox>
        <ButtonBox>
          <ButtonInnerBox variants={CHOICE_VARIANTS} initial="initial" animate="animate">
            <motion.div variants={TYPE_VARIANTS}>
              <OriginLoginBtn size="lg" kind="register" />
            </motion.div>
            <motion.div variants={TYPE_VARIANTS}>
              <NaverLoginBtn size="lg" mutate={mutate} kind="register" />
            </motion.div>
            <motion.div variants={TYPE_VARIANTS}>
              <KakaoLoginBtn size="lg" mutate={mutate} kind="register" />
            </motion.div>
          </ButtonInnerBox>
        </ButtonBox>
      </InnerContainer>
    </FlexContainer>
  );
};

export default ChoicePage;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

const ButtonBox = styled(Box)`
  margin: 50px 0;
`;

const ButtonInnerBox = styled(Col)`
  display: inline-flex;
  gap: 50px;
`;
