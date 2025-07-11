import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

import PlaneStatic from './_module/planeStatic';
import { useAppStore } from '../../store';
// import Explode from './_module/explode';

const Scene2 = () => {
  const { setScene } = useAppStore();
  const [showBomb, setShowBomb] = useState(false);
  const ref = useRef<THREE.PerspectiveCamera>(null);
  const planeRef = useRef<THREE.Group>(null);

  useEffect(() => {
    ref.current?.lookAt(0, 0, -4);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    if (showBomb) {
      gsap.to(ref.current?.position, {
        y: 0,
        z: -4,
        duration: 2,
        delay: 4,
        onUpdate: () => {
          ref.current?.lookAt(0, 0, -4);
        },
      });
    }
  }, [showBomb]);

  useFrame(() => {
    if (!planeRef.current) return;
    planeRef.current.position.z -= 0.025;
    if (planeRef.current.position.z <= -4.5) {
      setScene(3);
    }
    if (planeRef.current.position.z <= -3.4) {
      setShowBomb(true);
    }
  });

  return (
    <>
      <PerspectiveCamera ref={ref} makeDefault position={[0, 6.3, -2.3]} />
      <group position={[0, 4, -1]} ref={planeRef}>
        <PlaneStatic />
      </group>
      {/* {showBomb && <Explode />} */}
    </>
  );
};

export default Scene2;
