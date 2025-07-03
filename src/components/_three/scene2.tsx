import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

import PlaneStatic from './_module/planeStatic';
import { useAppStore } from '../../store';

const Scene2 = () => {
  const { setScene } = useAppStore();
  const [position, setPosition] = useState(0);
  const ref = useRef<THREE.PerspectiveCamera>(null);
  const planeRef = useRef<THREE.Group>(null);

  useEffect(() => {
    ref.current?.lookAt(0, 0, -4);
  }, []);

  useEffect(() => {
    if (position <= -2) {
      console.log();
    }
  }, [position]);

  useFrame(() => {
    if (!planeRef.current) return;
    planeRef.current.position.z -= 0.025;
    if (planeRef.current.position.z <= -4) {
      setScene(3);
    }
    setPosition(planeRef.current.position.z);
  });

  return (
    <>
      <group position={[0, 3, -1]} ref={planeRef}>
        <PlaneStatic />
      </group>
      <PerspectiveCamera ref={ref} makeDefault position={[0, 6.3, -2.3]} />
    </>
  );
};

export default Scene2;
