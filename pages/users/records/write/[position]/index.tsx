import useAudio from "@hooks/useAudio";
import React, { useCallback, useState } from "react";

const PositionPage = () => {
  const { RecordBtn, audioBlobUrl, audioFile } = useAudio();
  return (
    <>
      <RecordBtn />
    </>
  );
};

export default PositionPage;
