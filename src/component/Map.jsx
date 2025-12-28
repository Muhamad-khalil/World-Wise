import { useSearchParams } from "react-router-dom";
import styles from "./map.module.css";

function Map() {
  const [searchParam, setSearchParam] = useSearchParams();

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        Position : lat{lat} lng{lng}
      </h1>
      <button onClick={() => setSearchParam({ lat: 23, lng: 20 })}>Change Poss</button>
    </div>
  );
}

export default Map;
