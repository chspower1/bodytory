import { RectangleButton } from "@components/buttons/Button";
import { theme } from "@styles/theme";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { HOSPITALS } from "constant/queryKeys";
import { SetStateAction, useState } from "react";

const useHospital = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [onConnected, setOnConnected] = useState(false);
  const { getApi, postApi, putApi, deleteApi } = customApi("/api/users/my-hospitals");
  const refreshHospitalCache = () => {
    queryClient.invalidateQueries(["isMyHospital"]);
    queryClient.invalidateQueries([HOSPITALS]);
  };
  const { mutate: addHospitalMutate } = useMutation(["addHospitalKey"], postApi, {
    onSuccess() {
      refreshHospitalCache();
    },
  });
  const { mutate: deleteHospitalMutate } = useMutation(["addHospitalKey"], deleteApi, {
    onSuccess() {
      refreshHospitalCache();
    },
  });
  const { mutate: sharedHospitalMutate } = useMutation(["addHospitalKey"], putApi, {
    onSuccess() {
      refreshHospitalCache();
    },
  });
  const handleClickAddHospital = (id: number, option?: (value: SetStateAction<boolean | undefined>) => void) => {
    addHospitalMutate({ id });
    option && option(true);
    setShowModal(false);
  };
  const handleClickDeleteHospital = (id: number, option?: (value: SetStateAction<boolean | undefined>) => void) => {
    deleteHospitalMutate({ id });
    option && option(false);
    setShowModal(false);
  };
  const handleClickShare = (id: number, option?: (value: SetStateAction<boolean>) => void) => {
    sharedHospitalMutate({ id });
    option && option(prev => !prev);
  };

  return {
    addHospitalMutate,
    deleteHospitalMutate,
    sharedHospitalMutate,
    showModal,
    setShowModal,
    handleClickAddHospital,
    handleClickDeleteHospital,
    handleClickShare,
  };
};
export default useHospital;
