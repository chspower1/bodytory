import BodyNavigator from "@components/records/BodyNavigator";
import styled from "styled-components";
import BodyPartChecker from "@components/records/BodyPartChecker";
import { useEffect, useState } from "react";
import { bodyPartType } from "../../../../types/bodyParts";
import { useSetRecoilState } from "recoil";
import { currentBodyPosition } from "atoms/atoms";
import { motion } from "framer-motion";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext, NextPage } from "next";

const WritePage: NextPage = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);
  const setCurrentPosition = useSetRecoilState(currentBodyPosition);

  useEffect(() => {
    setCurrentPosition("front");
  }, []);

  return (
    <RecordContainer>
      <BodyPartCheckerArea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, type: "tween", ease: "easeOut" }}
      >
        <BodyPartChecker selectedBodyPart={selectedBodyPart} />
      </BodyPartCheckerArea>
      <BodyNavigatorArea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, type: "tween", ease: "easeOut", delay: 0.4 }}
      >
        <BodyNavigator
          selectedBodyPart={selectedBodyPart}
          setSelectedBodyPart={setSelectedBodyPart}
          isWritePage={true}
        />
      </BodyNavigatorArea>
    </RecordContainer>
  );
};
export default WritePage;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
const RecordContainer = styled.div`
  padding: 50px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BodyPartCheckerArea = styled(motion.div)`
  width: 55%;
  max-width: 1200px;
`;

const BodyNavigatorArea = styled(motion.div)`
  width: 45%;
  max-width: 820px;
`;
