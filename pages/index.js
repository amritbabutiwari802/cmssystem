import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/cms/Sidebar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Sidebar home={true} />
    </div>
  );
}
