"use client"

import styles from "./page.module.css";
import commonStyles from "../styles/common.module.css";
import Card from "@/components/Card/Card";
import { useEffect, useState } from "react";
import * as THREE from 'three';


export default function Home() {
  let startup = false
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (startup == false) {
      startup = true
      const container = document.querySelector('#scene')
      console.log(container);
      
      const width = 500, height = 500;
  
      const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
      camera.position.z = 1;
  
      const scene = new THREE.Scene();
  
      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const material = new THREE.MeshNormalMaterial();
  
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
  
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.setAnimationLoop(animate);
      container.appendChild(renderer.domElement)
      console.log(container);
      // container.innerHTML(renderer.domElement)
  
      function animate(time) {
  
        mesh.rotation.x = time / 2000;
        mesh.rotation.y = time / 1000;
  
        renderer.render(scene, camera);
  
      }
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={commonStyles.container}>
        <h1>Primer commit!</h1>
      </div>
      <Card title='Card Title!' footer="I'm the footer" footerButton='click me!'>
        <p>Card text in the body</p>
      </Card>
      <div id="scene" className={commonStyles.container}/>
    </main>
  );
}
