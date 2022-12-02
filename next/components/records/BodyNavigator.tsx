import { RoundButton } from "@components/buttons/Button";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { bodyPartType } from "types/bodyParts";
import OutlineBack from "./svg/OutlineBack";
import OutlineFront from "./svg/OutlineFront";
import OutlineFace from "./svg/OutlineFace";
import { useRecoilState } from "recoil";
import { selectedBodyPart } from "atoms/atoms";
import { FrontPaths, BackPaths, FacePaths } from "./svg/svgMapping";

interface BodyNavigator {
  isWritePage: boolean;
}
type CurrentBodyPosition = "front" | "back" | "face";

const common: bodyPartType[] = ["head", "neck", "shoulder", "upperArm", "albow", "forearm", "wrist", "hand", "thigh", "knee", "calf", "ankle", "foot"];
const front: bodyPartType[] = ["chest", "stomach", "sexOrgan", "pelvis"];
const back: bodyPartType[] = ["back", "waist", "hip"];
const face: bodyPartType[] = ["head", "forehead", "eyes", "nose", "mouth", "cheek", "chin", "ears"];

const bodyFront = [...common, ...front];
const bodyBack = [...common, ...back];


const BodyNavigator = ({ isWritePage }: BodyNavigator) => {
  const [selectedPart, setSelectedPart] = useRecoilState(selectedBodyPart);
  const [currentBodyPosition, setCurrentBodyPosition] = useState<CurrentBodyPosition>("front");
  const [hoveredPart, setHoveredPart] = useState("");

  useEffect(() => {
    if(selectedPart === null) {
      setCurrentBodyPosition("front");
    }
  }, [selectedPart]);

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
              {
                bodyFront.map((part, index) => {
                  if (FrontPaths[part!].length > 1) {
                    return (
                      <>
                        <HoverPath
                          isChecked={selectedPart === part}
                          onClick={() => setSelectedPart(part)}
                          isHover={hoveredPart === part}
                          onMouseEnter={() => setHoveredPart(part!)}
                          onMouseLeave={() => setHoveredPart("")}
                          d={FrontPaths[part!][0]}
                        />
                        <HoverPath
                          isChecked={selectedPart === part}
                          onClick={() => setSelectedPart(part)}
                          isHover={hoveredPart === part}
                          onMouseEnter={() => setHoveredPart(part!)}
                          onMouseLeave={() => setHoveredPart("")}
                          d={FrontPaths[part!][1]}
                        />
                      </>
                    )
                  } else {
                    return(
                      <HoverPath
                        isChecked={selectedPart === part}
                        onClick={() => part === "head" ? setCurrentBodyPosition("face") : setSelectedPart(part)}
                        isHover={hoveredPart === part}
                        onMouseEnter={() => setHoveredPart(part!)}
                        onMouseLeave={() => setHoveredPart("")}
                        d={FrontPaths[part!]}
                      />
                    )
                  }
                })
              }
            </g>
            <OutlineFront />
          </svg>
        )}

        {currentBodyPosition === "back" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 409 769" fill="none">
            <g id="partArea__back">
              {
                bodyBack.map((part, index) => {
                  if (BackPaths[part!].length > 1) {
                    return (
                      <>
                        <HoverPath
                          isChecked={selectedPart === part}
                          onClick={() => setSelectedPart(part)}
                          isHover={hoveredPart === part}
                          onMouseEnter={() => setHoveredPart(part!)}
                          onMouseLeave={() => setHoveredPart("")}
                          d={BackPaths[part!][0]}
                        />
                        <HoverPath
                          isChecked={selectedPart === part}
                          onClick={() => setSelectedPart(part)}
                          isHover={hoveredPart === part}
                          onMouseEnter={() => setHoveredPart(part!)}
                          onMouseLeave={() => setHoveredPart("")}
                          d={BackPaths[part!][1]}
                        />
                      </>
                    )
                  } else {
                    return(
                      <HoverPath
                        isChecked={selectedPart === part}
                        onClick={() => part === "head" ? setCurrentBodyPosition("face") : setSelectedPart(part)}
                        isHover={hoveredPart === part}
                        onMouseEnter={() => setHoveredPart(part!)}
                        onMouseLeave={() => setHoveredPart("")}
                        d={BackPaths[part!]}
                      />
                    )
                  }
                })
              }
            </g>
            <OutlineBack />
          </svg>
        )}

        {currentBodyPosition === "face" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 470 543" fill="none">
            <g id="partArea__face">
              {
                face.map((part, index) => {
                  if (FacePaths[part!].length > 1) {
                    return (
                      <>
                        <HoverPath
                          isChecked={selectedPart === part}
                          onClick={() => setSelectedPart(part)}
                          isHover={hoveredPart === part}
                          onMouseEnter={() => setHoveredPart(part!)}
                          onMouseLeave={() => setHoveredPart("")}
                          d={FacePaths[part!][0]}
                        />
                        <HoverPath
                          isChecked={selectedPart === part}
                          onClick={() => setSelectedPart(part)}
                          isHover={hoveredPart === part}
                          onMouseEnter={() => setHoveredPart(part!)}
                          onMouseLeave={() => setHoveredPart("")}
                          d={FacePaths[part!][1]}
                        />
                      </>
                    )
                  } else {
                    return(
                      <HoverPath
                        isChecked={selectedPart === part}
                        onClick={() => setSelectedPart(part)}
                        isHover={hoveredPart === part}
                        onMouseEnter={() => setHoveredPart(part!)}
                        onMouseLeave={() => setHoveredPart("")}
                        d={FacePaths[part!]}
                      />
                    )
                  }
                })
              }
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
  position: relative;
  z-index: 5;
  display: flex;
  margin: auto;
  width: 46%;
  min-width: 390px;
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

const HoverPath = styled.path<{ isChecked: boolean, isHover: boolean }>`
  cursor: pointer;
  transition: fill .2s;

  ${({ isChecked, isHover }) =>
    isChecked
      ? css`
          fill: rgb(3, 231, 203);
          pointer-events: none;
        `
      : isHover 
        ? css`
          fill: rgb(178, 189, 255);
        `
        : css`
            fill: rgb(217, 222, 255);
          `}
`;

export default BodyNavigator;
