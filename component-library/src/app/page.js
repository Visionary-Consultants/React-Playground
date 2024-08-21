"use client"

import { useRef, useState } from "react";
import styles from "./page.module.css";
import commonStyles from "../styles/common.module.css";

import Card from "@/components/Card/Card";

import * as THREE from 'three';
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
extend({ OrbitControls });
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

import { easing } from "maath";


export default function Home() {
  const [locked, setLocked] = useState(false);

  function Cube(props) {
    const mesh = useRef()
    const [dummy] = useState(() => new THREE.Object3D())

    // const loader = new STLLoader()
    // loader.load(
    //   'assets/models/eyeball/eyeball.stl',
    //   function (geometry) {
    //     console.log(mesh);
    //     mesh.current.geometry = geometry;
    //     mesh.current.rotation.z = (Math.PI / 4);
    //   },
    //   (xhr) => {
    //       console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    //   },
    //   (error) => {
    //       console.log(error)
    //   }
    // )

    const {
      camera,
      scene
    } = useThree();

    window.addEventListener("wheel", function (e) {
      if (scene.children[2]) {
        const cube = scene.children[2]
        const position = new THREE.Vector3
        cube.getWorldPosition(position)
        const distance = camera.position.distanceTo(position)
        if (distance < 1.5) {
          setLocked(true)
          dummy.lookAt(0, 0, 0)
        } else {
          setLocked(false)
        }
      }
    }, true);

    useFrame((state, dt) => {
      if (locked) {
        dummy.lookAt(0, 0, 0)
      } else {
        dummy.lookAt(state.pointer.x, state.pointer.y, 1)
      }
      easing.dampQ(mesh.current.quaternion, dummy.quaternion, 0.15, dt)
    })
    return (
      <group>
        <mesh ref={mesh} {...props}>
          <boxGeometry args={[1,1,1]}/>
          <meshNormalMaterial />
        </mesh>
      </group>
    )
  }

  const CameraControls = () => {
    const {
      camera,
      gl: { domElement }
    } = useThree();

    const controls = useRef();
    useFrame(state => {
      controls.current.update()
    });
    return (
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
        enableZoom={true}
        enableRotate={true}
        enablePan={false}
      />
    );
  };

  return (
    <main className={styles.main}>
      <div className={commonStyles.container}>
        <h1>Playground!</h1>
      </div>
      <Card title='Card Title!' footer="I'm the footer" footerButton='click me!'>
        <p>Card text in the body</p>
      </Card>
      <div className={`${commonStyles.container} ${styles.threeContainer}`}>
        {
          locked == true ? 
          <div className={styles.subScene}>
            <h1>TONTO EL QUE LO LEA</h1>
          </div>
          : ''
        }
        <div className={styles.mainScene}>
          <Canvas style={{ background: 'black' }} camera={{ position: [0, 0.1, 3] }}>
            <CameraControls />
            <ambientLight />
            <directionalLight position={[10, 10, 10]} />
            <Cube />
          </Canvas>
        </div>
      </div>
    </main>
  );
}
