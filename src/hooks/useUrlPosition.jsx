import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParam] = useSearchParams();
  const Lat = searchParam.get("lat");
  const Lng = searchParam.get("lng");

  return [Lat, Lng];
}
