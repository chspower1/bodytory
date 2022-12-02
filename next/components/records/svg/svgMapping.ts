import * as SvgPathFront from "./PartAreaFront";
import * as SvgPathBack from "./PartAreaBack";
import * as SvgPathFace from "./PartAreaFace";

export const FrontPaths:any = {
  "head": [SvgPathFront.HEAD],
  "neck": [SvgPathFront.NECK],
  "shoulder": [SvgPathFront.SHOULDER_LEFT, SvgPathFront.SHOULDER_RIGHT],
  "upperArm": [SvgPathFront.UPPERARM_LEFT, SvgPathFront.UPPERARM_RIGHT],
  "albow": [SvgPathFront.ALBOW_LEFT, SvgPathFront.ALBOW_RIGHT],
  "forearm": [SvgPathFront.FOREARM_LEFT, SvgPathFront.FOREARM_RIGHT],
  "wrist": [SvgPathFront.WRIST_LEFT, SvgPathFront.WRIST_RIGHT],
  "hand": [SvgPathFront.HAND_LEFT, SvgPathFront.HAND_RIGHT],
  "thigh": [SvgPathFront.THIGH_LEFT, SvgPathFront.THIGH_RIGHT],
  "knee": [SvgPathFront.KNEE_LEFT, SvgPathFront.KNEE_RIGHT],
  "calf": [SvgPathFront.CALF_LEFT, SvgPathFront.CALF_RIGHT],
  "ankle": [SvgPathFront.ANKLE_LEFT, SvgPathFront.ANKLE_RIGHT],
  "foot": [SvgPathFront.FOOT_LEFT, SvgPathFront.FOOT_RIGHT],
  "chest": [SvgPathFront.CHEST],
  "stomach": [SvgPathFront.STOMACH],
  "sexOrgan": [SvgPathFront.SEXORGAN], 
  "pelvis": [SvgPathFront.PELVIS_LEFT, SvgPathFront.PELVIS_RIGHT]
}

export const BackPaths:any = {
  "head": [SvgPathBack.HEAD],
  "neck": [SvgPathBack.NECK],
  "shoulder": [SvgPathBack.SHOULDER_LEFT, SvgPathBack.SHOULDER_RIGHT],
  "upperArm": [SvgPathBack.UPPERARM_LEFT, SvgPathBack.UPPERARM_RIGHT],
  "albow": [SvgPathBack.ALBOW_LEFT, SvgPathBack.ALBOW_RIGHT],
  "forearm": [SvgPathBack.FOREARM_LEFT, SvgPathBack.FOREARM_RIGHT],
  "wrist": [SvgPathBack.WRIST_LEFT, SvgPathBack.WRIST_RIGHT],
  "hand": [SvgPathBack.HAND_LEFT, SvgPathBack.HAND_RIGHT],
  "thigh": [SvgPathBack.THIGH_LEFT, SvgPathBack.THIGH_RIGHT],
  "knee": [SvgPathBack.KNEE_LEFT, SvgPathBack.KNEE_RIGHT],
  "calf": [SvgPathBack.CALF_LEFT, SvgPathBack.CALF_RIGHT],
  "ankle": [SvgPathBack.ANKLE_LEFT, SvgPathBack.ANKLE_RIGHT],
  "foot": [SvgPathBack.FOOT_LEFT, SvgPathBack.FOOT_RIGHT],
  "back": [SvgPathBack.BACK],
  "waist": [SvgPathBack.WAIST],
  "hip": [SvgPathBack.HIP]
}

export const FacePaths:any = {
  "head": [SvgPathFace.HEAD],
  "forehead": [SvgPathFace.FOREHEAD],
  "eyes": [SvgPathFace.EYE_LEFT, SvgPathFace.EYE_RIGHT],
  "cheek": [SvgPathFace.CHEEK_LEFT, SvgPathFace.CHEEK_RIGHT],
  "nose": [SvgPathFace.NOSE],
  "mouth": [SvgPathFace.MOUTH],
  "chin": [SvgPathFace.CHIN],
  "ears": [SvgPathFace.EAR_LEFT, SvgPathFace.EAR_RIGHT],
}