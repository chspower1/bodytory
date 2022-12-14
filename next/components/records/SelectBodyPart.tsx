import BodyNavigator from "@components/records/BodyNavigator";
import styled from "styled-components";

import { useRouter } from "next/router";
import { bodyPartType } from "types/bodyParts";
import { Dispatch, SetStateAction } from "react";
import { BackButton } from "@styles/Common";

export interface SelectBodyPartProps {
  selectedBodyPart: bodyPartType;
  setSelectedBodyPart: Dispatch<SetStateAction<bodyPartType>>;
}

function SelectPart({ selectedBodyPart, setSelectedBodyPart }: SelectBodyPartProps) {
  const router = useRouter();

  return (
    <SelectPartWarp>
      <SelectPartContainer>
        {router.pathname !== "/users/records" && (
          <BackButton
            onClick={() => {
              router.push("/users/records");
            }}
          >
            <span>대시보드</span>
          </BackButton>
        )}
        <GuideText>자세한 기록을 확인하고 싶은 부위를 선택해주세요</GuideText>
        <BodyNavigator
          selectedBodyPart={selectedBodyPart}
          setSelectedBodyPart={setSelectedBodyPart}
          isWritePage={false}
        />
      </SelectPartContainer>
    </SelectPartWarp>
  );
}

export const SelectPartWarp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const SelectPartContainer = styled.div`
  width: 100%;
  max-width: 720px;
  height: 100%;
  padding: 30px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const GuideText = styled.div`
  text-align: center;
  color: #5155ba;
  margin: 40px 0 20px;
`;

export default SelectPart;
