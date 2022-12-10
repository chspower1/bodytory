import { RoundButton } from "@components/buttons/Button";
import { ToryText } from "@styles/Common";
import styled from "styled-components";
import { NextPage } from "next";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ModalContainer, ModalWrapper, Dim } from "@styles/ModalStyled";
import useCoords from "@hooks/useCoords";
import ArroundMap from "@components/map/ArroundMap";
import useDepartmentSelect from "@hooks/useDepartmentSelect";
import { useEffect, useState } from "react";

interface ArroundMapMaodalProps {
  show: boolean;
  onClose: () => void;
  mostThreeDepartment: string[] | undefined;
}
const ArroundMapModal: NextPage<ArroundMapMaodalProps> = ({ show, onClose, mostThreeDepartment }) => {
  const { latitude, longitude } = useCoords();
  const { department, DepartmentSelect } = useDepartmentSelect(mostThreeDepartment ? mostThreeDepartment : []);
  const [isBrowser, setIsBrowser] = useState(false);
  const modalContent = (
    <AnimatePresence>
      {show && (
        <ModalWrapper>
          <Dim onClick={onClose} />
          <ModalContainer flex width="1500px" height="800px">
            <ToryText>현재 소희님의 위치를 기준으로 주변 정형외과들을 찾았어요!</ToryText>
            <DepartmentSelect />

            <ArroundMap
              width="1500px"
              height="600px"
              longitude={longitude}
              latitude={latitude}
              department={department}
            />

            <ButtonBox>
              <RoundButton fontSize="16px" width="220px" height="40px" onClick={onClose}>
                닫기
              </RoundButton>
            </ButtonBox>
          </ModalContainer>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  return isBrowser ? ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement) : null;
};
export default ArroundMapModal;

const ButtonBox = styled.div`
  button {
    margin: 0 auto;
  }
`;
