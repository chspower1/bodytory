import Chart from "@components/records/chart/Chart";
import SelectPart from "@components/records/SelectBodyPart";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { bodyPartType } from "types/bodyParts";

export default function ChartPage() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);

  return (
    <RecordWrap>
      <SelectPartArea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, type: "tween", ease: "easeOut", delay: .4}}
      >
        <SelectPart selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} />
      </SelectPartArea>
      <ChartArea
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: .6, type: "tween", ease: "easeOut" }}
      >
        <Chart />
      </ChartArea>
    </RecordWrap>
  );
}

export const RecordWrap = styled.div`
  display: flex;
  height: 100%;
`;

const SelectPartArea = styled(motion.div)`
  width: 37.5%;
`;

const ChartArea = styled(motion.div)`
  width: 62.5%;
`;