import { useMutation, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { HOSPITALS } from "constant/queryKeys";

const useAddHospital = () => {
  const queryClient = useQueryClient();
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

  return { addHospitalMutate, deleteHospitalMutate, sharedHospitalMutate };
};
export default useAddHospital;
