import styled from "styled-components";
import DashBoard from "@components/records/dashborad/DashBoard";
import SelectPart from "@components/records/SelectBodyPart";
import { useEffect, useState } from "react";
import { bodyPartType } from "types/bodyParts";
import { useSetRecoilState } from "recoil";
import { currentBodyPosition } from "atoms/atoms";
import { motion } from "framer-motion";

export default function RecordPage() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);
  const setCurrentPosition = useSetRecoilState(currentBodyPosition);

  useEffect(() => {
    setCurrentPosition("front");
  }, []);

  return (
    <RecordWrap>
      <DashBoardArea
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: .6, type: "tween", ease: "easeOut" }}
      >
        <DashBoard />
      </DashBoardArea>
      <SelectPartArea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, type: "tween", ease: "easeOut", delay: .4}}
      >
        <SelectPart selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} />
      </SelectPartArea>
    </RecordWrap>
  );
}

const RecordWrap = styled.div`
  display: flex;
  height: 100%;
`;

const DashBoardArea = styled(motion.div)`
  width: 62.5%;
`;

const SelectPartArea = styled(motion.div)`
  width: 37.5%;
`;
