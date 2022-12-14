import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import rotateIcon from "@src/assets/icons/rotateIcon.png";
import { media } from "@styles/theme";

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
  const [currentPosition, setCurrentPosition] = useRecoilState(currentBodyPosition);

  const [currentPos, setCurrentPos] = useState("");

  useEffect(() => {
    if (currentPosition) setCurrentPos(currentPosition);
  }, [currentPosition]);

  return (
    <CustomContainer isWritePage={isWritePage}>
      {currentPos !== "face" ? (
        <>
        <ButtonsBox>
          <FrontBackButton
            onClick={() => setCurrentPosition("front")}
            bgColor={currentPos !== "front" ? "rgb(188, 197, 255)" : undefined}
          >
            앞
          </FrontBackButton>
          <FrontBackButton
            onClick={() => setCurrentPosition("back")}
            bgColor={currentPos !== "back" ? "rgb(188, 197, 255)" : undefined}
          >
            뒤
          </FrontBackButton>
        </ButtonsBox>
        <MobileFrontBackButton onClick={() => setCurrentPosition(prev => prev === "back" ? "front" : "back")}>
          <div className="rotateImgBg" />
        </MobileFrontBackButton>
        </>
      ) : (
        <ButtonsBox>
          {currentPos !== "face" || (
            <FrontBackButton
              bgColor={currentPos === "face" ? "rgb(188, 197, 255)" : undefined}
              onClick={() => setCurrentPosition("front")}
            >
              몸
            </FrontBackButton>
          )}
        </ButtonsBox>
      )}

      <PathBox>
        {currentPos === "front" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 414 792" fill="none">
            <g id="partArea__front">
              {bodyFront.map((part, index) => {
                if (FrontPaths[part!].length > 1) {
                  return (
                    <React.Fragment key={`${part} + front`}>
                      <HoverPath
                        isChecked={isWritePage ? selectedBodyPart === part : position === part}
                        onClick={() => {
                          if (isWritePage) {
                            setSelectedBodyPart(part);
                          } else {
                            setCurrentPosition("front");
                            router.push(
                              isHospital
                                ? {
                                    pathname: `/hospital/chart`,
                                    query: { position: part },
                                  }
                                : `/users/records/chart/${part}`,
                            );
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
                            router.push(
                              isHospital
                                ? {
                                    pathname: `/hospital/chart`,
                                    query: { position: part },
                                  }
                                : `/users/records/chart/${part}`,
                            );
                          }
                        }}
                        isHover={hoveredPart === part}
                        onMouseEnter={() => setHoveredPart(part!)}
                        onMouseLeave={() => setHoveredPart("")}
                        d={FrontPaths[part!][1]}
                      />
                    </React.Fragment>
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
                          isWritePage
                            ? setSelectedBodyPart(part)
                            : router.push(
                                isHospital
                                  ? {
                                      pathname: `/hospital/chart`,
                                      query: { position: part },
                                    }
                                  : `/users/records/chart/${part}`,
                              );
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

        {currentPos === "back" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 409 769" fill="none">
            <g id="partArea__back">
              {bodyBack.map((part, index) => {
                if (BackPaths[part!].length > 1) {
                  return (
                    <React.Fragment key={`${part} + back`}>
                      <HoverPath
                        isChecked={isWritePage ? selectedBodyPart === part : position === part}
                        onClick={() => {
                          if (isWritePage) {
                            setSelectedBodyPart(part);
                          } else {
                            setCurrentPosition("back");
                            router.push(
                              isHospital
                                ? {
                                    pathname: `/hospital/chart`,
                                    query: { position: part },
                                  }
                                : `/users/records/chart/${part}`,
                            );
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
                            router.push(
                              isHospital
                                ? {
                                    pathname: `/hospital/chart`,
                                    query: { position: part },
                                  }
                                : `/users/records/chart/${part}`,
                            );
                          }
                        }}
                        isHover={hoveredPart === part}
                        onMouseEnter={() => setHoveredPart(part!)}
                        onMouseLeave={() => setHoveredPart("")}
                        d={BackPaths[part!][1]}
                      />
                    </React.Fragment>
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
                          isWritePage
                            ? setSelectedBodyPart(part)
                            : router.push(
                                isHospital
                                  ? {
                                      pathname: `/hospital/chart`,
                                      query: { position: part },
                                    }
                                  : `/users/records/chart/${part}`,
                              );
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

        {currentPos === "face" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 470 543" fill="none">
            <g id="partArea__face">
              {face.map((part, index) => {
                if (FacePaths[part!].length > 1) {
                  return (
                    <React.Fragment key={`${part} + face`}>
                      <HoverPath
                        isChecked={isWritePage ? selectedBodyPart === part : position === part}
                        onClick={() => {
                          if (isWritePage) {
                            setSelectedBodyPart(part);
                          } else {
                            setCurrentPosition("face");
                            router.push(
                              isHospital
                                ? {
                                    pathname: `/hospital/chart`,
                                    query: { position: part },
                                  }
                                : `/users/records/chart/${part}`,
                            );
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
                            router.push(
                              isHospital
                                ? {
                                    pathname: `/hospital/chart`,
                                    query: { position: part },
                                  }
                                : `/users/records/chart/${part}`,
                            );
                          }
                        }}
                        isHover={hoveredPart === part}
                        onMouseEnter={() => setHoveredPart(part!)}
                        onMouseLeave={() => setHoveredPart("")}
                        d={FacePaths[part!][1]}
                      />
                    </React.Fragment>
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
                          router.push(
                            isHospital
                              ? {
                                  pathname: `/hospital/chart`,
                                  query: { position: part },
                                }
                              : `/users/records/chart/${part}`,
                          );
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

const FrontBackButton = styled(RoundedDefaultButton)`
  padding: 16px 40px;

`;
const MobileFrontBackButton = styled.div`
  display:none;
  .rotateImgBg{
    width: 50px;
    height: 50px;
    background: url(${rotateIcon.src}) no-repeat center center;
    background-size:  contain;
  }
  ${media.custom(1366)}{
    display:block;
    position: absolute;
    right: 10%;
    top: 30px;
    z-index: 6;
  }
`

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const CustomContainer = styled.div<{ isWritePage: boolean }>`
  position: relative;
  display: flex;
  padding: 50px 0;
  z-index: 6;
  ${({ isWritePage }) =>
    isWritePage && css`
          background-color: #ebecfc;
          box-shadow: 8px 8px 18px rgba(174, 178, 228, 0.25);
          border-radius: 30px;
          ${media.custom(1633)}{
            border-radius: 0 30px 30px 0;
          }
  `}
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
  ${media.custom(1366)}{
    min-width: 300px;
  }
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  padding: 18px;
  bottom: 0;
  ${media.custom(1366)}{
    display:none;
  }
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
