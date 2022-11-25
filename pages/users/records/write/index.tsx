import Input from "@components/Input";
import customApi from "utils/client/customApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RECORDS_CREATE, RECORDS_READ } from "constant/queryKeys";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BodyNavigator from "@components/record/BodyNavigator";
import styled from "styled-components";
import SiteChecker from "@components/record/SiteChecker";

interface WriteType {
  write: string;
}

export type SiteType =
  | "head"
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
  // const queryClient = useQueryClient();
  // const { postApi } = customApi("/api/users/records");
  // const { mutate } = useMutation([RECORDS_CREATE], postApi, {
  //   onSuccess(data, variables, context) {
  //     queryClient.invalidateQueries([RECORDS_READ]);
  //   },
  // });
  // const [isText, setIsText] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   setError,
  //   formState: { errors },
  // } = useForm<WriteType>();
  // const onValid: SubmitHandler<WriteType> = ({ write }) => {
  //   mutate({ type: "user", position: "head", description: write });
  //   setValue("write", "");ㅋ
  //   setIsText(true);
  //   setTimeout(() => {
  //     setIsText(false);
  //   }, 2000);
  // };
  const [selectedSite, setSelectedSite] = useState<SiteType>(null);
  const [hoveredSite, setHoveredSite] = useState<string>("");

  return (
    <RecordContainer>
      <SiteChecker hoveredSite={hoveredSite} selectedSite={selectedSite} setSelectedSite={setSelectedSite} />
      <BodyNavigator
        selectedSite={selectedSite}
        setSelectedSite={setSelectedSite}
        setHoveredSite={setHoveredSite}
        isRecordSiteSelected={selectedSite !== null}
      />
    </RecordContainer>
    // <div>
    //   <form onSubmit={handleSubmit(onValid)}>
    //     <Input
    //       name="write"
    //       label="기록할내용"
    //       type="text"
    //       register={register("write", { required: "필수값입니다" })}
    //       placeholder="내용을 입력하세요"
    //       errorMessage={errors.write?.message}
    //     />
    //     <button type="submit">작성</button>
    //   </form>
    //   <br />
    //   <br />
    //   {isText && <div>작성 되었습니다!</div>}
    //   <br />
    //   <br />
    //   <Link href={"/users/records/chart"}>
    //     <button>기록보기</button>
    //   </Link>
    // </div>
  );
}

const RecordContainer = styled.div`
  padding: 50px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
`;
