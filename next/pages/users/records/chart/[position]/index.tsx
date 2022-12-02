import Chart from "@components/records/chart/Chart";
import SelectPart from "@components/records/SelectBodyPart";
import { useState } from "react";
import styled from "styled-components";
import { bodyPartType, currentBodyPosition } from "types/bodyParts";

export default function ChartPage() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);
  const [currentBodyPosition, setCurrentBodyPosition] = useState<currentBodyPosition>("front");

  return (
    <RecordWrap>
      <SelectPart 
        selectedBodyPart={selectedBodyPart} 
        setSelectedBodyPart={setSelectedBodyPart} 
        currentBodyPosition={currentBodyPosition}
        setCurrentBodyPosition={setCurrentBodyPosition}
      />
      <Chart />
    </RecordWrap>
  );
}

const RecordWrap = styled.div`
  display: flex;
  height: 100%;
`;