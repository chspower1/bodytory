import { RoundButton } from "@components/button/Button";
import Input from "@components/Input";
import { FlexContainer, InnerContainer } from "@styles/Common";
import { theme } from "@styles/theme";
import { useEffect } from "react";
import styled from "styled-components";

const FindHospital = () => {
  useEffect(() => {
    document.body.style.backgroundColor = theme.color.lightBg;
    return () => {
      document.body.style.backgroundColor = theme.color.darkBg;
    };
  }, []);

  return <div></div>;
};

export default FindHospital;
