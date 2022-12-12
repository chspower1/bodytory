import LogoutBtn from "@components/layout/buttons/LogoutBtn";
import { loggedInHospital } from "atoms/atoms";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const HospitalHeader = () => {
  const currentHospital = useRecoilValue(loggedInHospital);
  const [isHospital, setIsHospital] = useState(false);
  useEffect(() => {
    if (currentHospital) {
      setIsHospital(true);
    } else {
      setIsHospital(false);
    }
  }, [currentHospital]);

  return isHospital ? (
    <LogoutButtonBox>
      <LogoutBtn isHospital={isHospital} />
    </LogoutButtonBox>
  ) : null;
};

export default HospitalHeader;

const LogoutButtonBox = styled.div`
  position: absolute;
  right: 60px;
  top: 40px;
  z-index: 600;
`;
