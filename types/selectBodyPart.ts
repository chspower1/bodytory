import { Dispatch, SetStateAction } from "react";
import { bodyPartType } from "./bodyParts";

export interface SelectBodyPartProps {
  isSelected?: boolean;
  setIsSelected?: Dispatch<SetStateAction<boolean>>;
  hoveredSite?: string;
  setHoveredSite?: Dispatch<SetStateAction<string>>;
  selectedSite?: bodyPartType;
  setSelectedSite?: Dispatch<SetStateAction<bodyPartType>>;
  isWritePage?: boolean;
}