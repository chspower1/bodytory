import { RectangleButton, RoundButton } from "@components/button/Button";

import Confirm from "@components/records/write/Confirm";
import Select from "@components/records/write/Select";
import { Box, Col, Row, ToryText } from "@styles/Common";
import { theme } from "@styles/theme";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { RECORDS_CREATE, RECORDS_READ } from "constant/queryKeys";
import Input from "@components/Input";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BodyNavigator from "@components/record/BodyNavigator";
import styled from "styled-components";
import SiteChecker from "@components/record/SiteChecker";
import { bodyPartType } from "types/bodyParts";

interface WriteType {
  write: string;
}

export default function WritePage() {
  const [selectedSite, setSelectedSite] = useState<bodyPartType>(null);
  const [hoveredSite, setHoveredSite] = useState<string>("");

  return (
    <RecordContainer>
      <SiteChecker hoveredSite={hoveredSite} selectedSite={selectedSite} setSelectedSite={setSelectedSite} />
      <BodyNavigator
        selectedSite={selectedSite}
        setSelectedSite={setSelectedSite}
        setHoveredSite={setHoveredSite}
        hoveredSite={hoveredSite}
      />
    </RecordContainer>
  );
}

const RecordContainer = styled.div`
  padding: 50px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
`;
