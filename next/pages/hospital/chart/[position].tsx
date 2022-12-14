import HospitalChart from "@components/hospital/HospitalChart";
import HospitalSelectPart from "@components/hospital/HospitalSelectPart";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext, NextPage } from "next";
import { RecordWrap } from "pages/users/records/chart/[position]";
import React, { useState } from "react";
import { bodyPartType } from "types/bodyParts";

const HospitalChartPositionPage: NextPage = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);
  return (
    <RecordWrap>
      <HospitalSelectPart selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} />
      <HospitalChart />
    </RecordWrap>
  );
};

export default HospitalChartPositionPage;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
