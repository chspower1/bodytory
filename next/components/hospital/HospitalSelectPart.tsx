import BodyNavigator from "@components/records/BodyNavigator";
import {
  GuideText,
  SelectBodyPartProps,
  SelectPartContainer,
  SelectPartWarp,
} from "@components/records/SelectBodyPart";
import { BackButton } from "@styles/Common";
import { useQueryClient } from "@tanstack/react-query";
import { RECORDS_READ } from "constant/queryKeys";
import { useRouter } from "next/router";
import React from "react";

const HospitalSelectPart = ({ selectedBodyPart, setSelectedBodyPart }: SelectBodyPartProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleClickResetQuerys = () => {
    queryClient.removeQueries([RECORDS_READ]);
    router.push("/hospital");
  };
  return (
    <SelectPartWarp>
      <SelectPartContainer>
        {router.pathname !== "/hospital" && (
          <BackButton onClick={handleClickResetQuerys}>
            <span>환자리스트</span>
          </BackButton>
        )}
        <GuideText>자세한 기록을 확인하고 싶은 부위를 선택해주세요</GuideText>
        <BodyNavigator
          selectedBodyPart={selectedBodyPart}
          setSelectedBodyPart={setSelectedBodyPart}
          isWritePage={false}
          isHospital
        />
      </SelectPartContainer>
    </SelectPartWarp>
  );
};

export default HospitalSelectPart;
