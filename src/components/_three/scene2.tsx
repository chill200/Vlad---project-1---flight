import { useEffect, useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Scene2 = () => {
  const ref = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    ref.current?.lookAt(0, 0, -4);
  }, []);

  return (
    <>
      <PerspectiveCamera ref={ref} makeDefault position={[1, 5, 0]} />
    </>
  );
};

export default Scene2;
