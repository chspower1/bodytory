import BodyNavigator from "@components/records/BodyNavigator";
import styled from "styled-components";
import BodyPartChecker from "@components/records/BodyPartChecker";
import { useEffect, useState } from "react";
import { bodyPartType } from "../../../../types/bodyParts";
import { useSetRecoilState } from "recoil";
import { currentBodyPosition } from "atoms/atoms";

export default function WritePage() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);
  const setCurrentPosition = useSetRecoilState(currentBodyPosition);

  useEffect(() => {
    setCurrentPosition("front");
  }, []);

  return (
    <RecordContainer>
      <BodyPartChecker selectedBodyPart={selectedBodyPart} />
      <BodyNavigator selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} isWritePage={true} />
    </RecordContainer>
  );
}

const RecordContainer = styled.div`
  padding: 50px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
`;
