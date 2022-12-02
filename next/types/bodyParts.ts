import { Dispatch, SetStateAction } from "react";

export type bodyPartType =
  "head"
  | "forehead"
  | "eyes"
  | "nose"
  | "mouth"
  | "cheek"
  | "chin"
  | "ears"
  | "back"
  | "waist"
  | "hip"
  | "neck"
  | "chest"
  | "stomach"
  | "pelvis"
  | "sexOrgan"
  | "shoulder"
  | "upperArm"
  | "albow"
  | "forearm"
  | "wrist"
  | "hand"
  | "thigh"
  | "knee"
  | "calf"
  | "ankle"
  | "foot"
  | null
;

export type currentBodyPosition = "front" | "back" | "face";

export interface SelectBodyPartProps {
  selectedBodyPart: bodyPartType;
  setSelectedBodyPart: Dispatch<SetStateAction<bodyPartType>>;
  isWritePage?: boolean;
  currentBodyPosition: currentBodyPosition;
  setCurrentBodyPosition: Dispatch<SetStateAction<currentBodyPosition>>;
}
  