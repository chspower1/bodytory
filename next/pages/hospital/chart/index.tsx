import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";
import HospitalChartPositionPage from "./[position]";

const HospitalChartHomePage: NextPage = () => {
  return <HospitalChartPositionPage />;
};

export default HospitalChartHomePage;

