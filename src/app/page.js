"use client"

import { useRef, useState } from "react";
import styles from "./page.module.css";
import commonStyles from "../styles/common.module.css";

export default function Home() {
  return (
    <main>
      <p className={styles.headerText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. </p>
      <button>PROYECTOS</button>
      <button>NOSOTROS</button>
      <button>CONTACTO</button>
    </main>
  );
}
