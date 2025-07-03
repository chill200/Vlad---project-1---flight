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
      <CameraControls
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 6}
        minPolarAngle={-Math.PI / 3}
        maxPolarAngle={(Math.PI * 2) / 3}
      />
    </>
  );
};

export default Scene3;
