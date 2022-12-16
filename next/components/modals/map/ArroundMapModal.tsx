import { ToryText26 } from "@styles/Common";
import styled from "styled-components";
import { NextPage } from "next";
import { AnimatePresence } from "framer-motion";
import { ModalContainer, ModalWrapper, Dim } from "@styles/ModalStyled";
import ArroundMap from "@components/map/ArroundMap";
import useUser from "@hooks/useUser";
import usePortal from "@hooks/usePortal";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import { ToryBox } from "@components/records/BodyPartChecker";
import { media } from "@styles/theme";

interface ArroundMapMaodalProps {
  onClose: () => void;
  mostThreeDepartment: string[] | undefined;
  longitude: number | null;
  latitude: number | null;
  show: boolean;
}
const ArroundMapModal: NextPage<ArroundMapMaodalProps> = ({ onClose, mostThreeDepartment, longitude, latitude, show }) => {
  const { user } = useUser();
  const Portal = usePortal();

  const modalContent = (
    <AnimatePresence>
      {
        show && (
          <ModalWrapper>
            <Dim onClick={onClose} />
            <ModalContainer flex width="1500px" height="auto">
              <ToryTextBox>
                <ToryText26>
                  현재 <strong>{user?.name}님</strong>의 위치를 기준으로 주변 <strong>{mostThreeDepartment?.join(", ")}</strong>들을 찾았어요!
                </ToryText26>
              </ToryTextBox>
              <MapBox>
                <ArroundMap  longitude={longitude} latitude={latitude} departmentList={mostThreeDepartment} />
              </MapBox>
              <ButtonBox>
                <RoundedDefaultButton sm onClick={onClose}>
                  닫기
                </RoundedDefaultButton>
              </ButtonBox>
            </ModalContainer>
          </ModalWrapper>
        )
      }
    </AnimatePresence>
  );

  return Portal({ children: modalContent });

};
export default ArroundMapModal;

const ToryTextBox = styled(ToryBox)`
  padding: 20px;
  text-align:center;
  word-break:keep-all;
  ${ToryText26}{
    ${media.custom(1100)}{
      font-size: 20px;
    }
    ${media.custom(870)}{
      font-size: 18px;
    }
  }
`

const MapBox = styled.div`
  width: 100%;
  max-height: 600px;
  height: 80vh;
  min-height: 300px;

  ${media.custom(870)}{
    height: 60vh;
  }
`

const ButtonBox = styled.div`
  padding: 20px 0;
  button {
    margin: 0 auto;
  }
`;


