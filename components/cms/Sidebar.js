import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faList, faHome } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";

import React from "react";
import styles from "./styles.module.css";

const Sidebar = (props) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.sidebarcontainer}>
        <div className={styles.sidebar}>
          <div
            className={styles.homeicon_wrapper}
            onClick={() => {
              router.push("/admin");
            }}
          >
            <FontAwesomeIcon
              className={styles.icon}
              style={{ color: "white", height: "50px" }}
              icon={faHome}
            />
            <div className={styles.label}>Home</div>
          </div>

          <div
            className={styles.icon_wrapper}
            onClick={() => {
              router.push("/menubar");
            }}
          >
            <FontAwesomeIcon
              className={styles.icon}
              style={{ color: "white", height: "50px" }}
              icon={faList}
            />
            <div className={styles.label}>MenuBar</div>
          </div>

          <div className={styles.icon_wrapper}>
            <FontAwesomeIcon
              className={styles.icon}
              style={{ color: "white", height: "50px" }}
              icon={faList}
            />
            <div className={styles.label}>Jobs Application</div>
          </div>

          <div className={styles.icon_wrapper}>
            <FontAwesomeIcon
              className={styles.icon}
              style={{ color: "white", height: "50px" }}
              icon={faList}
            />
            <div className={styles.label}>Social Media</div>
          </div>
          <div className={styles.l_icon_wrapper}>
            <FontAwesomeIcon
              className={styles.icon}
              style={{ color: "white", height: "50px" }}
              icon={faList}
            />
            <div className={styles.label}>Global Values</div>
          </div>
        </div>
      </div>

      <div className={styles.children}>{props.children}</div>
    </div>
  );
};

export default Sidebar;
