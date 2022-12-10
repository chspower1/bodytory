import styled from "styled-components";
import DashBoard from "@components/records/dashborad/DashBoard";
import SelectPart from "@components/records/SelectBodyPart";
import { useEffect, useState } from "react";
import { bodyPartType } from "types/bodyParts";
import { useSetRecoilState } from "recoil";
import { currentBodyPosition } from "atoms/atoms";

export default function RecordPage() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);
  const setCurrentPosition = useSetRecoilState(currentBodyPosition);

  useEffect(() => {
    setCurrentPosition("front");
  }, []);

  return (
    <RecordWrap>
      <DashBoard />
      <SelectPart selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} />
    </RecordWrap>
  );
}

const RecordWrap = styled.div`
  display: flex;
  height: 100%;
`;
