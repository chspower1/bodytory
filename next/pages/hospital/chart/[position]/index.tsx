import HospitalChart from "@components/hospital/HospitalChart";
import HospitalSelectPart from "@components/hospital/HospitalSelectPart";
import { RecordWrap } from "pages/users/records/chart/[position]";
import React, { useState } from "react";
import { bodyPartType } from "types/bodyParts";

const HospitalChartPositionPage = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);
  return (
    <RecordWrap>
      <HospitalSelectPart selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} />
      <HospitalChart />
    </RecordWrap>
  );
};

export default HospitalChartPositionPage;
