import { RoundButton } from "@components/layout/buttons/Button";
import { ToryText, ToryText26 } from "@styles/Common";
import styled from "styled-components";
import { NextPage } from "next";
import { AnimatePresence } from "framer-motion";
import { ModalContainer, ModalWrapper, Dim } from "@styles/ModalStyled";
import ArroundMap from "@components/map/ArroundMap";
import useDepartmentSelect from "@hooks/useDepartmentSelect";
import useUser from "@hooks/useUser";
import usePortal from "@hooks/usePortal";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";

interface ArroundMapMaodalProps {
  onClose: () => void;
  show : boolean; 
  mostThreeDepartment: string[] | undefined;
  longitude: number | null;
  latitude: number | null;
}
const ArroundMapModal: NextPage<ArroundMapMaodalProps> = ({ show, onClose, mostThreeDepartment, longitude, latitude }) => {
  const { user } = useUser();
  const { department, DepartmentSelect } = useDepartmentSelect(mostThreeDepartment ? mostThreeDepartment : []);
  const Portal = usePortal();

  const modalContent = (
    <AnimatePresence>
      {show &&
        <ModalWrapper>
          <Dim onClick={onClose} />
          <ModalContainer flex width="1500px" height="800px">
            <ToryText>
              현재 {user?.name}님의 위치를 기준으로 주변 {department}들을 찾았어요!
            </ToryText>
            <DepartmentSelect />

            <ArroundMap width="1500px" height="600px" longitude={longitude} latitude={latitude}/>

            <ButtonBox>
              <RoundedDefaultButton sm onClick={onClose}>
                닫기
              </RoundedDefaultButton>
            </ButtonBox>
          </ModalContainer>
        </ModalWrapper>
      }
    </AnimatePresence>
  );

  return Portal({ children: modalContent });
};
export default ArroundMapModal;

const ButtonBox = styled.div`
  button {
    margin: 0 auto;
  }
`;

const ToryBox = styled.div`
  padding: 15px 0 10px;
`;