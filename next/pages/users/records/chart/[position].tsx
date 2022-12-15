import BodyNavigator from "@components/records/BodyNavigator";
import Chart from "@components/records/chart/Chart";
import SelectPart from "@components/records/SelectBodyPart";
import { Position } from "@prisma/client";
import { media } from "@styles/theme";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { motion } from "framer-motion";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { bodyPartType } from "types/bodyParts";
import { EnterNavigatorButton, MobBodyNavigatorArea } from "../write";

const ChartPage: NextPage = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);

  const [isSelect, setIsSelect] = useState(false);

  const { query } = useRouter();
  const position = query.position as Position;

  useEffect(() => {
    if (position) {
      setIsSelect(false);
    }
  }, [position]);

  return (
    <RecordWrap>
      <SelectPartArea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, type: "tween", ease: "easeOut", delay: 0.4 }}
      >
        <SelectPart selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} />
      </SelectPartArea>
      <ChartArea
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, type: "tween", ease: "easeOut" }}
      >
        <Chart />
      </ChartArea>
      <MobBodyNavigatorArea isSelect={isSelect}>
        <BodyNavigator
          selectedBodyPart={selectedBodyPart}
          setSelectedBodyPart={setSelectedBodyPart}
          isWritePage={false}
        />
        <EnterNavigatorButton isSelect={isSelect} onClick={() => setIsSelect(prev => !prev)} >
          <i/>
        </EnterNavigatorButton>
      </MobBodyNavigatorArea>
    </RecordWrap>
  );
};
export default ChartPage;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
export const RecordWrap = styled.div`
  display: flex;
  height: 100%;
`;

const SelectPartArea = styled(motion.div)`
  width: 37.5%;

  ${media.custom(1280)} {
    display: none;
  }
`;

const ChartArea = styled(motion.div)`
  width: 62.5%;

  ${media.custom(1280)} {
    width: 100%;
  }
`;
