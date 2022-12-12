import Chart from "@components/records/chart/Chart";
import SelectPart from "@components/records/SelectBodyPart";
import { useState } from "react";
import styled from "styled-components";
import { bodyPartType } from "types/bodyParts";

export default function ChartPage() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);

  return (
    <RecordWrap>
      <SelectPart selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} />
      <Chart />
    </RecordWrap>
  );
}

export const RecordWrap = styled.div`
  display: flex;
  height: 100%;
`;
