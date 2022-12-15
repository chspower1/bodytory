import styled from "styled-components";
import DashBoard from "@components/records/dashborad/DashBoard";
import SelectPart from "@components/records/SelectBodyPart";
import { useEffect, useState } from "react";
import { bodyPartType } from "types/bodyParts";
import { useSetRecoilState } from "recoil";
import { currentBodyPosition } from "atoms/atoms";
import { motion } from "framer-motion";
import { GetServerSidePropsContext, NextPage } from "next";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { EnterNavigatorButton, MobBodyNavigatorArea } from "./write";
import BodyNavigator from "@components/records/BodyNavigator";
import { media } from "@styles/theme";

const RecordPage: NextPage = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);
  const setCurrentPosition = useSetRecoilState(currentBodyPosition);

  const [isSelect, setIsSelect] = useState(false);

  useEffect(() => {
    setCurrentPosition("front");
  }, []);

  useEffect(() => {
    if (selectedBodyPart) {
      setIsSelect(false);
    }
  }, [selectedBodyPart]);

  return (
    <RecordWrap>
      <DashBoardArea
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, type: "tween", ease: "easeOut" }}
      >
        <DashBoard />
      </DashBoardArea>
      <SelectPartArea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, type: "tween", ease: "easeOut", delay: 0.4 }}
      >
        <SelectPart selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} />
      </SelectPartArea>
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
export default RecordPage;

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
const RecordWrap = styled.div`
  display: flex;
  height: 100%;
`;

const DashBoardArea = styled(motion.div)`
  width: 62.5%;

  ${media.custom(1280)} {
    width: 100%;
  }
`;

const SelectPartArea = styled(motion.div)`
  width: 37.5%;

  ${media.custom(1280)} {
    display: none;
  }
`;
