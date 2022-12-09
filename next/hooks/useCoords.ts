import { useEffect, useState } from "react";

interface Coords {
  latitude: number | null;
  longitude: number | null;
}

export default function useCoords() {
  const [coords, setCoords] = useState<Coords>({ latitude: null, longitude: null });
  const [isAccess, setIsAccess] = useState(false);

  const onSuccess = ({ coords: { latitude, longitude } }: GeolocationPosition) => {
    console.log({ latitude, longitude });
    setCoords({ latitude, longitude });
    setIsAccess(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return { ...coords, isAccess };
}
