"use client"

import { useRef, useState } from "react";
import styles from "./page.module.css";

import * as THREE from 'three';
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
extend({ OrbitControls });
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

import { easing } from "maath";

import 'material-icons/iconfont/material-icons.css';


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

  
  function Rhombus(props) {
    const group = useRef()
    
    const x = 0, y = 0;

    const rhombusShape = new THREE.Shape();
    
    
    rhombusShape.moveTo(x , y);
    rhombusShape.lineTo(3, 1)
    rhombusShape.lineTo(6, 0)
    rhombusShape.lineTo(3, -1)

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const mesh = new THREE.Mesh( geometry, material );

    console.log(group.current);

    return (
      <group ref={group} {...props}>
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
      <div className={`${styles.threeContainer}`}>
        {
          false ? 
          <div className={styles.scenePage}>
            <div className={styles.menuItem}>
              <span class="material-icons">settings</span>
            </div>
            <div className={`${styles.menuItem} ${styles.menuItemEnd}`}>
              <span class="material-icons">person</span>
            </div>
            <div className={styles.menuItem}>
            <span class="material-icons">mail</span>
            </div>
          </div>
          : ''
        }
          <Canvas style={{ background: 'black' }} camera={{ position: [0, 0.1, 3] }}>
            <CameraControls />
            <ambientLight />
            <axesHelper args={[20]}/>
            <directionalLight position={[10, 10, 10]} />
            {/* <Cube /> */}
            <Rhombus />
          </Canvas>
      </div>
    </main>
  );
}
