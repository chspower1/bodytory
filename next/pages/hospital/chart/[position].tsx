import HospitalChart from "@components/hospital/HospitalChart";
import HospitalSelectPart from "@components/hospital/HospitalSelectPart";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext, NextPage } from "next";
import { RecordWrap } from "pages/users/records/chart/[position]";
import React, { useState } from "react";
import styled from "styled-components";
import { bodyPartType } from "types/bodyParts";

const HospitalChartPositionPage: NextPage = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);
  return (
    <RecordWrap>
      <HospitalSelectPartArea>
        <HospitalSelectPart selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} />
      </HospitalSelectPartArea>
      <HospitalChartArea>
        <HospitalChart />
      </HospitalChartArea>
    </RecordWrap>
  );
};

const HospitalSelectPartArea = styled.div`
  width: 37.5%;
`;

const HospitalChartArea = styled.div`
  width: 62.5%;
`;

export default HospitalChartPositionPage;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
