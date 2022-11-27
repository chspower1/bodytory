import { RectangleButton, RoundButton } from "@components/button/Button";

import Confirm from "@components/records/write/Confirm";
import Select from "@components/records/write/Select";
import { Box, Col, Row, ToryText } from "@styles/Common";
import { theme } from "@styles/theme";
import React, { useState } from "react";
import styled from "styled-components";
import BodyNavigator from "@components/record/BodyNavigator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { RECORDS_CREATE, RECORDS_READ } from "constant/queryKeys";
import Input from "@components/Input";
import Link from "next/link";

interface WriteType {
  write: string;
}

export type SiteType =
  | "forehead"
  | "eyes"
  | "nose"
  | "mouth"
  | "cheek"
  | "chin"
  | "ears"
  | "back"
  | "waist"
  | "hip"
  | "neck"
  | "chest"
  | "stomach"
  | "pelvis"
  | "sexOrgan"
  | "shoulder"
  | "upperArm"
  | "albow"
  | "forearm"
  | "wrist"
  | "hand"
  | "thigh"
  | "knee"
  | "calf"
  | "ankle"
  | "foot"
  | null;

export default function WritePage() {
  const queryClient = useQueryClient();
  const { postApi } = customApi("/api/users/records");
  const { mutate } = useMutation([RECORDS_CREATE], postApi, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });
  const [isText, setIsText] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<WriteType>();
  const onValid: SubmitHandler<WriteType> = ({ write }) => {
    mutate({ type: "user", position: "head", description: write });
    setValue("write", "");
    setIsText(true);
    setTimeout(() => {
      setIsText(false);
    }, 2000);
  };
  const [selectedSite, setSelectedSite] = useState<SiteType>("stomach");

  return (
    <Container>
      <BlackToryText>증상을 기록할 부위를 선택해주세요.</BlackToryText>
      <RectangleButton bgColor="rgb(208, 238, 247)"><></>&배</RectangleButton>
      <BodyNavigator selectedSite={selectedSite} setSelectedSite={setSelectedSite} />
    </Container>
  );
}
const Container = styled(Box)`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.lightBg};
`;
const BlackToryText = styled.div`
  font-size: 36px;
`;
