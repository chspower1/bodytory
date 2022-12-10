import HospitalChart from '@components/hospital/HospitalChart';
import HospitalSelectPart from '@components/hospital/HospitalSelectPart';
import { RecordWrap } from 'pages/users/records/chart/[position]';
import React, { useState } from 'react'
import { bodyPartType } from 'types/bodyParts';
import HospitalChartPositionPage from './[position]';

const HospitalChartHomePage = () => {

  return (
    <HospitalChartPositionPage/>
  )
}

export default HospitalChartHomePage