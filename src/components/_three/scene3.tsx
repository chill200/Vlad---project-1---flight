import { useEffect, useRef } from 'react';
import Laboratory from './_module/laboratory';
import gsap from 'gsap';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Scene3 = () => {
  const ref = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current.position, {
        x: 0,
        y: 1.2,
        z: -5,
        duration: 2,
      });
    }
  }, []);

  return (
    <>
      <PerspectiveCamera ref={ref} makeDefault position={[0, 1.2, 3]} />
      <Laboratory />
    </>
  );
};

export default Scene3;
