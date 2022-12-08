import Item from "@components/team/Item";
import { Container } from "@styles/Common";
import { Dim } from "@styles/ModalStyled";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const qwe = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectId, setSelectId] = useState<any>(null);
  return (
    <AnimateSharedLayout>
      <TeamContainer>
        <InnerContainer>
          <div></div>
          <Team>
            <HoSung layoutId="a" onClick={() => setSelectId("a")}></HoSung>
            <KyengWon layoutId="b" onClick={() => setSelectId("b")} />
            <DaHyun />
            <SoHee />
            <DongRyong layoutId="c" onClick={() => setSelectId("c")} />
          </Team>
        </InnerContainer>
        <AnimatePresence>
          {selectId && (
            <Test layoutId={selectId}>
              <motion.h1>"asdasd"</motion.h1>
              <motion.div onClick={() => setSelectId(null)}>qweqwe</motion.div>
            </Test>
          )}
        </AnimatePresence>
      </TeamContainer>
    </AnimateSharedLayout>
  );
};

const Test = styled(motion.div)`
  width: 1600px;
  height: 800px;
  background-color: blue;
  position: absolute;
  top: 50%;
`;

const TeamContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
`;

const InnerContainer = styled.div`
  max-width: 1920;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 100px 0;
`;

const Detail = styled.div``;

const Team = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
`;

const DongRyong = styled(motion.div)`
  width: 300px;
  height: 300px;
  background-color: red;
`;

const HoSung = styled(DongRyong)``;
const SoHee = styled(DongRyong)``;
const KyengWon = styled(DongRyong)``;
const DaHyun = styled(DongRyong)``;

export default qwe;
