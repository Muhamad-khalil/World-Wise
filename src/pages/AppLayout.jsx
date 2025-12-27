import AppNav from "../component/AppNav";
import SideBar from "../component/SideBar";
import Map from "../component/Map";
import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
