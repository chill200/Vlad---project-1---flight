import { useEffect, useRef } from 'react';
import { CameraControls, PerspectiveCamera } from '@react-three/drei';

import Laboratory from './_module/laboratory';
import * as THREE from 'three';

const Scene3 = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    cameraRef.current?.lookAt(0, 0, 0);
  }, []);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 2]} />
      <Laboratory />
      <CameraControls />
    </>
  );
};

export default Scene3;
