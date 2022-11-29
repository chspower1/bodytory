import BodyNavigator from "@components/record/BodyNavigator";
import styled from "styled-components";
import SiteChecker from "@components/record/SiteChecker";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { selectedBodyPart } from "atoms/atoms";

export default function WritePage() {

  const setSelectedPart = useSetRecoilState(selectedBodyPart); 

  useEffect(() => {
    setSelectedPart(null);
  }, []);

  return (
    <RecordContainer>
      <SiteChecker />
      <BodyNavigator />
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
