import { RoundButton } from "@components/button/Button";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { bodyPartType } from "types/bodyParts";
import OutlineBack from "./svg/OutlineBack";
import OutlineFront from "./svg/OutlineFront";
import * as SvgPathFront from "./svg/PartAreaFront";
import * as SvgPathBack from "./svg/PartAreaBack";
import * as SvgPathFace from "./svg/PartAreaFace";
import OutlineFace from "./svg/OutlineFace";
import { useRecoilState } from "recoil";
import { selectedBodyPart } from "atoms/atoms";

interface BodyNavigator {
  isWritePage: boolean;
}
type CurrentBodyPosition = "front" | "back" | "face";
const face: bodyPartType[] = ["head", "forehead", "eyes", "nose", "mouth", "cheek", "chin", "ears"];
const back: bodyPartType[] = ["back", "waist", "hip"];


const BodyNavigator = ({ isWritePage }: BodyNavigator) => {

  const [selectedPart, setSelectedPart] = useRecoilState(selectedBodyPart);
  const [currentBodyPosition, setCurrentBodyPosition] = useState<CurrentBodyPosition>("front");

  return (
    <CustomContainer isWritePage={isWritePage}>
      {currentBodyPosition !== "face" ? (
        <ButtonsBox>
          <RoundButton
            width="90px"
            height="50px"
            onClick={() => setCurrentBodyPosition("front")}
            bgColor={currentBodyPosition !== "front" ? "rgb(188, 197, 255)" : undefined}
          >
            앞
          </RoundButton>
          <RoundButton
            width="90px"
            height="50px"
            onClick={() => setCurrentBodyPosition("back")}
            bgColor={currentBodyPosition !== "back" ? "rgb(188, 197, 255)" : undefined}
          >
            뒤
          </RoundButton>
        </ButtonsBox>
      ) : (
        <ButtonsBox>
          {currentBodyPosition !== "face" || (
            <RoundButton
              width="90px"
              height="50px"
              bgColor={currentBodyPosition === "face" ? "rgb(188, 197, 255)" : undefined}
              onClick={() => setCurrentBodyPosition("front")}
            >
              몸
            </RoundButton>
          )}
        </ButtonsBox>
      )}

      <PathBox>
        {currentBodyPosition === "front" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 414 792" fill="none">
            <g id="partArea__front">
              <HoverPath
                isChecked={selectedPart === "neck"}
                onClick={() => setSelectedPart("neck")}
                d={SvgPathFront.NECK}
              />
              <HoverPath
                isChecked={selectedPart === "shoulder"}
                onClick={() => setSelectedPart("shoulder")}
                d={SvgPathFront.SHOULDER_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "upperArm"}
                onClick={() => setSelectedPart("upperArm")}
                d={SvgPathFront.UPPERARM_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "albow"}
                onClick={() => setSelectedPart("albow")}
                d={SvgPathFront.ALBOW_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "forearm"}
                onClick={() => setSelectedPart("forearm")}
                d={SvgPathFront.FOREARM_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "wrist"}
                onClick={() => setSelectedPart("wrist")}
                d={SvgPathFront.WRIST_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "shoulder"}
                onClick={() => setSelectedPart("shoulder")}
                d={SvgPathFront.SHOULDER_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "upperArm"}
                onClick={() => setSelectedPart("upperArm")}
                d={SvgPathFront.UPPERARM_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "albow"}
                onClick={() => setSelectedPart("albow")}
                d={SvgPathFront.ALBOW_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "forearm"}
                onClick={() => setSelectedPart("forearm")}
                d={SvgPathFront.FOREARM_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "wrist"}
                onClick={() => setSelectedPart("wrist")}
                d={SvgPathFront.WRIST_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "chest"}
                onClick={() => setSelectedPart("chest")}
                d={SvgPathFront.CHEST}
              />
              <HoverPath
                isChecked={selectedPart === "stomach"}
                onClick={() => setSelectedPart("stomach")}
                d={SvgPathFront.STOMACH}
              />
              <HoverPath
                isChecked={selectedPart === "pelvis"}
                onClick={() => setSelectedPart("pelvis")}
                d={SvgPathFront.PELVIS_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "pelvis"}
                onClick={() => setSelectedPart("pelvis")}
                d={SvgPathFront.PELVIS_RIGHT}

              />
              <HoverPath
                isChecked={selectedPart === "sexOrgan"}
                onClick={() => setSelectedPart("sexOrgan")}
                d={SvgPathFront.SEXORGAN}
              />
              <HoverPath
                isChecked={selectedPart === "thigh"}
                onClick={() => setSelectedPart("thigh")}
                d={SvgPathFront.THIGH_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "knee"}
                onClick={() => setSelectedPart("knee")}
                d={SvgPathFront.KNEE_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "calf"}
                onClick={() => setSelectedPart("calf")}
                d={SvgPathFront.CALF_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "ankle"}
                onClick={() => setSelectedPart("ankle")}
                d={SvgPathFront.ANKLE_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "thigh"}
                onClick={() => setSelectedPart("thigh")}
                d={SvgPathFront.THIGH_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "knee"}
                onClick={() => setSelectedPart("knee")}
                d={SvgPathFront.KNEE_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "calf"}
                onClick={() => setSelectedPart("calf")}
                d={SvgPathFront.CALF_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "ankle"}
                onClick={() => setSelectedPart("ankle")}
                d={SvgPathFront.ANKLE_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "hand"}
                onClick={() => setSelectedPart("hand")}
                d={SvgPathFront.HAND_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "hand"}
                onClick={() => setSelectedPart("hand")}
                d={SvgPathFront.HAND_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "foot"}
                onClick={() => setSelectedPart("foot")}
                d={SvgPathFront.FOOT_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "foot"}
                onClick={() => setSelectedPart("foot")}
                d={SvgPathFront.FOOT_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "head"}
                onClick={() => setCurrentBodyPosition("face")}
                d={SvgPathFront.HEAD}
              />
            </g>
            <OutlineFront />
          </svg>
        )}
        
        {currentBodyPosition === "back" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 409 769" fill="none">
            <g id="partArea__back">
              <HoverPath
                isChecked={selectedPart === "neck"}
                onClick={() => setSelectedPart("neck")}
                d={SvgPathBack.NECK}
              />
              <HoverPath
                isChecked={selectedPart === "shoulder"}
                onClick={() => setSelectedPart("shoulder")}
                d={SvgPathBack.SHOULDER_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "upperArm"}
                onClick={() => setSelectedPart("upperArm")}
                d={SvgPathBack.UPPERARM_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "albow"}
                onClick={() => setSelectedPart("albow")}
                d={SvgPathBack.ALBOW_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "forearm"}
                onClick={() => setSelectedPart("forearm")}
                d={SvgPathBack.FOREARM_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "wrist"}
                onClick={() => setSelectedPart("wrist")}
                d={SvgPathBack.WRIST_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "shoulder"}
                onClick={() => setSelectedPart("shoulder")}
                d={SvgPathBack.SHOULDER_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "upperArm"}
                onClick={() => setSelectedPart("upperArm")}
                d={SvgPathBack.UPPERARM_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "albow"}
                onClick={() => setSelectedPart("albow")}
                d={SvgPathBack.ALBOW_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "forearm"}
                onClick={() => setSelectedPart("forearm")}
                d={SvgPathBack.FOREARM_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "wrist"}
                onClick={() => setSelectedPart("wrist")}
                d={SvgPathBack.WRIST_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "thigh"}
                onClick={() => setSelectedPart("thigh")}
                d={SvgPathBack.THIGH_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "knee"}
                onClick={() => setSelectedPart("knee")}
                d={SvgPathBack.KNEE_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "calf"}
                onClick={() => setSelectedPart("calf")}
                d={SvgPathBack.CALF_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "ankle"}
                onClick={() => setSelectedPart("ankle")}
                d={SvgPathBack.ANKLE_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "thigh"}
                onClick={() => setSelectedPart("thigh")}
                d={SvgPathBack.THIGH_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "knee"}
                onClick={() => setSelectedPart("knee")}
                d={SvgPathBack.KNEE_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "calf"}
                onClick={() => setSelectedPart("calf")}
                d={SvgPathBack.CALF_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "ankle"}
                onClick={() => setSelectedPart("ankle")}
                d={SvgPathBack.ANKLE_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "hand"}
                onClick={() => setSelectedPart("hand")}
                d={SvgPathBack.HAND_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "hand"}
                onClick={() => setSelectedPart("hand")}
                d={SvgPathBack.HAND_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "head"}
                onClick={() => setCurrentBodyPosition("face")}
                d={SvgPathBack.HEAD}
              />
              <HoverPath
                isChecked={selectedPart === "back"}
                onClick={() => setSelectedPart("back")}
                fill-rule="evenodd"
                clip-rule="evenodd"
                d={SvgPathBack.BACK}
              />
              <HoverPath
                isChecked={selectedPart === "waist"}
                onClick={() => setSelectedPart("waist")}
                fill-rule="evenodd"
                clip-rule="evenodd"
                d={SvgPathBack.WAIST}
              />
              <HoverPath
                isChecked={selectedPart === "hip"}
                onClick={() => setSelectedPart("hip")}
                fill-rule="evenodd"
                clip-rule="evenodd"
                d={SvgPathBack.HIP}
              />
              <HoverPath
                isChecked={selectedPart === "foot"}
                onClick={() => setSelectedPart("foot")}
                d={SvgPathBack.FOOT_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "foot"}
                onClick={() => setSelectedPart("foot")}
                d={SvgPathBack.FOOT_RIGHT}
              />
            </g>
            <OutlineBack />
          </svg>
        )}

        {currentBodyPosition === "face" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 470 543" fill="none">
            <g id="partArea__face">
              <HoverPath
                isChecked={selectedPart === "head"}
                onClick={() => setSelectedPart("head")}
                d={SvgPathFace.HEAD}
              />
              <HoverPath
                isChecked={selectedPart === "forehead"}
                onClick={() => setSelectedPart("forehead")}
                d={SvgPathFace.FOREHEAD}
              />
              <HoverPath
                isChecked={selectedPart === "eyes"}
                onClick={() => setSelectedPart("eyes")}
                d={SvgPathFace.EYE_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "eyes"}
                onClick={() => setSelectedPart("eyes")}
                d={SvgPathFace.EYE_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "cheek"}
                onClick={() => setSelectedPart("cheek")}
                d={SvgPathFace.CHEEK_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "cheek"}
                onClick={() => setSelectedPart("cheek")}
                d={SvgPathFace.CHEEK_RIGHT}
              />
              <HoverPath
                isChecked={selectedPart === "nose"}
                onClick={() => setSelectedPart("nose")}
                d={SvgPathFace.NOSE}
              />
              <HoverPath
                isChecked={selectedPart === "mouth"}
                onClick={() => setSelectedPart("mouth")}
                d={SvgPathFace.MOUTH}
              />
              <HoverPath
                isChecked={selectedPart === "chin"}
                onClick={() => setSelectedPart("chin")}
                d={SvgPathFace.CHIN}
              />
              <HoverPath
                isChecked={selectedPart === "ears"}
                onClick={() => setSelectedPart("ears")}
                d={SvgPathFace.EAR_LEFT}
              />
              <HoverPath
                isChecked={selectedPart === "ears"}
                onClick={() => setSelectedPart("ears")}
                d={SvgPathFace.EAR_RIGHT}
              />
            </g>
            <OutlineFace />
          </svg>
        )}
      </PathBox>
    </CustomContainer>
  );
};

BodyNavigator.defaultProps = {
  isWritePage: true,
};

const CustomContainer = styled.div<{ isWritePage: boolean }>`
  position: relative;
  display: flex;
  aspect-ratio: 1/1.2;

  ${({ isWritePage }) =>
    isWritePage
      ? css`
          aspect-ratio: 1/1;
          width: 50%;
          background-color: #ebecfc;
          box-shadow: 8px 8px 18px rgba(174, 178, 228, 0.25);
          border-radius: 30px;
        `
      : css``}
`;

const PathBox = styled.div<{ isViewMode?: boolean }>`
  display: flex;
  margin: auto;
  width: 46%;
  min-width: 390px;
  z-index: 100;
  ${({ isViewMode }) =>
    isViewMode &&
    css`
      pointer-events: none;
      width: 85%;
    `}
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  padding: 18px;
  bottom: 0;
`;

const HoverPath = styled.path<{ isChecked: boolean; }>`
  cursor: pointer;

  &:hover {
    fill: rgb(178, 189, 255);
  }

  ${({ isChecked }) =>
    isChecked
      ? css`
          fill: rgb(3, 231, 203);
          pointer-events: none;
        `
      : css`
          fill: rgb(217, 222, 255);
        `}
`;

export default BodyNavigator;
