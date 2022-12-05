import { RoundButton } from "@components/buttons/Button";
import { Dispatch, SetStateAction, useState } from "react";
import styled, { css } from "styled-components";
import { bodyPartType } from "types/bodyParts";
import OutlineBack from "./svg/OutlineBack";
import OutlineFront from "./svg/OutlineFront";
import OutlineFace from "./svg/OutlineFace";
import { FrontPaths, BackPaths, FacePaths } from "./svg/svgMapping";
import { useRouter } from "next/router";
import { Position } from "@prisma/client";
import { useRecoilState } from "recoil";
import { currentBodyPosition } from "atoms/atoms";
import { motion } from "framer-motion";

export interface SelectBodyPartProps {
  selectedBodyPart: bodyPartType;
  setSelectedBodyPart: Dispatch<SetStateAction<bodyPartType>>;
  isWritePage: boolean;
  isHospital?: boolean;
}

const common: bodyPartType[] = [
  "head",
  "neck",
  "shoulder",
  "upperArm",
  "albow",
  "forearm",
  "wrist",
  "hand",
  "thigh",
  "knee",
  "calf",
  "ankle",
  "foot",
];
const front: bodyPartType[] = ["chest", "stomach", "sexOrgan", "pelvis"];
const back: bodyPartType[] = ["back", "waist", "hip"];
const face: bodyPartType[] = ["head", "forehead", "eyes", "nose", "mouth", "cheek", "chin", "ears"];

const bodyFront = [...common, ...front];
const bodyBack = [...common, ...back];

const BodyNavigator = ({ selectedBodyPart, setSelectedBodyPart, isWritePage, isHospital }: SelectBodyPartProps) => {
  const router = useRouter();
  const { query } = useRouter();
  const position = query.position as Position;

  const [hoveredPart, setHoveredPart] = useState("");
  // const [currentBodyPosition, setCurrentBodyPosition] = useState<currentBodyPosition>("front");

  const [currentPosition, setCurrentPosition] = useRecoilState(currentBodyPosition);

  return (
    <CustomContainer
      initial={{ x: 500 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.7, type: "tween", ease: "easeOut" }}
      isWritePage={isWritePage}
    >
      {currentPosition !== "face" ? (
        <ButtonsBox>
          <RoundButton
            width="90px"
            height="50px"
            onClick={() => setCurrentPosition("front")}
            bgColor={currentPosition !== "front" ? "rgb(188, 197, 255)" : undefined}
          >
            앞
          </RoundButton>
          <RoundButton
            width="90px"
            height="50px"
            onClick={() => setCurrentPosition("back")}
            bgColor={currentPosition !== "back" ? "rgb(188, 197, 255)" : undefined}
          >
            뒤
          </RoundButton>
        </ButtonsBox>
      ) : (
        <ButtonsBox>
          {currentPosition !== "face" || (
            <RoundButton
              width="90px"
              height="50px"
              bgColor={currentPosition === "face" ? "rgb(188, 197, 255)" : undefined}
              onClick={() => setCurrentPosition("front")}
            >
              몸
            </RoundButton>
          )}
        </ButtonsBox>
      )}

      <PathBox>
        {currentPosition === "front" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 414 792" fill="none">
            <g id="partArea__front">
              {bodyFront.map((part, index) => {
                if (FrontPaths[part!].length > 1) {
                  return (
                    <>
                      <HoverPath
                        isChecked={isWritePage ? selectedBodyPart === part : position === part}
                        onClick={() => {
                          if (isWritePage) {
                            setSelectedBodyPart(part);
                          } else {
                            setCurrentPosition("front");
                            router.push(isHospital ? {
                              pathname: `/hospital/chart`,
                              query:{ position: part}
                            } :`/users/records/chart/${part}`);
                          }
                        }}
                        isHover={hoveredPart === part}
                        onMouseEnter={() => setHoveredPart(part!)}
                        onMouseLeave={() => setHoveredPart("")}
                        d={FrontPaths[part!][0]}
                      />
                      <HoverPath
                        isChecked={isWritePage ? selectedBodyPart === part : position === part}
                        onClick={() => {
                          if (isWritePage) {
                            setSelectedBodyPart(part);
                          } else {
                            setCurrentPosition("front");
                            router.push(isHospital ? {
                              pathname: `/hospital/chart`,
                              query:{ position: part}
                            } :`/users/records/chart/${part}`);
                          }
                        }}
                        isHover={hoveredPart === part}
                        onMouseEnter={() => setHoveredPart(part!)}
                        onMouseLeave={() => setHoveredPart("")}
                        d={FrontPaths[part!][1]}
                      />
                    </>
                  );
                } else {
                  return (
                    <HoverPath
                      key={index}
                      isChecked={isWritePage ? selectedBodyPart === part : position === part}
                      onClick={() => {
                        if (part === "head") {
                          setCurrentPosition("face");
                        } else {
                          isWritePage ? setSelectedBodyPart(part) : router.push(isHospital ? {
                            pathname: `/hospital/chart`,
                            query:{ position: part}
                          } :`/users/records/chart/${part}`);
                        }
                      }}
                      isHover={hoveredPart === part}
                      onMouseEnter={() => setHoveredPart(part!)}
                      onMouseLeave={() => setHoveredPart("")}
                      d={FrontPaths[part!]}
                    />
                  );
                }
              })}
            </g>
            <OutlineFront />
          </svg>
        )}

        {currentPosition === "back" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 409 769" fill="none">
            <g id="partArea__back">
              {bodyBack.map((part, index) => {
                if (BackPaths[part!].length > 1) {
                  return (
                    <>
                      <HoverPath
                        isChecked={isWritePage ? selectedBodyPart === part : position === part}
                        onClick={() => {
                          if (isWritePage) {
                            setSelectedBodyPart(part);
                          } else {
                            setCurrentPosition("back");
                            router.push(isHospital ? {
                              pathname: `/hospital/chart`,
                              query:{ position: part}
                            } :`/users/records/chart/${part}`);
                          }
                        }}
                        isHover={hoveredPart === part}
                        onMouseEnter={() => setHoveredPart(part!)}
                        onMouseLeave={() => setHoveredPart("")}
                        d={BackPaths[part!][0]}
                      />
                      <HoverPath
                        isChecked={isWritePage ? selectedBodyPart === part : position === part}
                        onClick={() => {
                          if (isWritePage) {
                            setSelectedBodyPart(part);
                          } else {
                            setCurrentPosition("back");
                            router.push(isHospital ? {
                              pathname: `/hospital/chart`,
                              query:{ position: part}
                            } :`/users/records/chart/${part}`);
                          }
                        }}
                        isHover={hoveredPart === part}
                        onMouseEnter={() => setHoveredPart(part!)}
                        onMouseLeave={() => setHoveredPart("")}
                        d={BackPaths[part!][1]}
                      />
                    </>
                  );
                } else {
                  return (
                    <HoverPath
                      key={index}
                      isChecked={isWritePage ? selectedBodyPart === part : position === part}
                      onClick={() => {
                        if (part === "head") {
                          setCurrentPosition("face");
                        } else {
                          isWritePage ? setSelectedBodyPart(part) : router.push(isHospital ? {
                            pathname: `/hospital/chart`,
                            query:{ position: part}
                          } :`/users/records/chart/${part}`);
                        }
                      }}
                      isHover={hoveredPart === part}
                      onMouseEnter={() => setHoveredPart(part!)}
                      onMouseLeave={() => setHoveredPart("")}
                      d={BackPaths[part!]}
                    />
                  );
                }
              })}
            </g>
            <OutlineBack />
          </svg>
        )}

        {currentPosition === "face" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 470 543" fill="none">
            <g id="partArea__face">
              {face.map((part, index) => {
                if (FacePaths[part!].length > 1) {
                  return (
                    <>
                      <HoverPath
                        isChecked={isWritePage ? selectedBodyPart === part : position === part}
                        onClick={() => {
                          if (isWritePage) {
                            setSelectedBodyPart(part);
                          } else {
                            setCurrentPosition("face");
                            router.push(isHospital ? {
                              pathname: `/hospital/chart`,
                              query:{ position: part}
                            } :`/users/records/chart/${part}`);
                          }
                        }}
                        isHover={hoveredPart === part}
                        onMouseEnter={() => setHoveredPart(part!)}
                        onMouseLeave={() => setHoveredPart("")}
                        d={FacePaths[part!][0]}
                      />
                      <HoverPath
                        isChecked={isWritePage ? selectedBodyPart === part : position === part}
                        onClick={() => {
                          if (isWritePage) {
                            setSelectedBodyPart(part);
                          } else {
                            setCurrentPosition("face");
                            router.push(isHospital ? {
                              pathname: `/hospital/chart`,
                              query:{ position: part}
                            } :`/users/records/chart/${part}`);
                          }
                        }}
                        isHover={hoveredPart === part}
                        onMouseEnter={() => setHoveredPart(part!)}
                        onMouseLeave={() => setHoveredPart("")}
                        d={FacePaths[part!][1]}
                      />
                    </>
                  );
                } else {
                  return (
                    <HoverPath
                      key={index}
                      isChecked={isWritePage ? selectedBodyPart === part : position === part}
                      onClick={() => {
                        if (isWritePage) {
                          setSelectedBodyPart(part);
                        } else {
                          setCurrentPosition("face");
                          router.push(isHospital ? {
                            pathname: `/hospital/chart`,
                            query:{ position: part}
                          } :`/users/records/chart/${part}`);
                        }
                      }}
                      isHover={hoveredPart === part}
                      onMouseEnter={() => setHoveredPart(part!)}
                      onMouseLeave={() => setHoveredPart("")}
                      d={FacePaths[part!]}
                    />
                  );
                }
              })}
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
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const CustomContainer = styled(motion.div)<{ isWritePage: boolean }>`
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

const HoverPath = styled.path<{ isChecked: boolean; isHover: boolean }>`
  cursor: pointer;
  transition: fill 0.2s;

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
        `};
`;

export default BodyNavigator;
