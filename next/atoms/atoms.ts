import { Position, Record, RecordImage, User } from "@prisma/client";
import { RegisterForm } from "pages/auth/register";
import { HospitalName } from "pages/hospital";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loggedInUser = atom<User | RegisterForm | null>({
  key: "loggedInUserKey",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
export const loggedInHospital = atom<HospitalName | null>({
  key: "loggedInHospitalKey",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const currentHospitalIdx = atom<number>({
  key: "currentHospitalIdxKey",
  default: 0,
});

export const currentBodyPosition = atom<string>({
  key: "currentBodyPositionKey",
  default: "front",
  effects_UNSTABLE: [persistAtom],
});

export const selectedKeyword = atom<string | null>({
  key: "selectedKeywordKey",
  default: null,
});

export const currentPatientInfo = atom<{ name: string; id: number | null }>({
  key: "currentPatientInfoKey",
  default: {
    name: "",
    id: null,
  },
  effects_UNSTABLE: [persistAtom],
});
