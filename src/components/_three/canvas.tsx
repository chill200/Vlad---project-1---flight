import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, HueSaturation } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Landscape } from './landscape';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { SphereEnv } from './sphere';
import { Airplane } from './plane';
import { MotionBlur } from './motion';
import { useAppStore } from '../../store';

const CanvasContainer = () => {
  const { scene } = useAppStore();

  return (
    <>
      <Canvas shadows>
        <Suspense fallback={null}>
          {scene === 1 && (
            <>
              <PerspectiveCamera makeDefault position={[0, 10, 10]} />
              <Airplane />
              <Landscape />
              <SphereEnv />
            </>
          )}
          {scene === 2 && <></>}
          {scene === 3 && <></>}
        </Suspense>

        <directionalLight
          castShadow
          color={'#f3d29a'}
          intensity={2}
          position={[10, 5, 4]}
          shadow-bias={-0.0005}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.01}
          shadow-camera-far={20}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-camera-left={-6.2}
          shadow-camera-right={6.4}
        />

        <Environment background={false} files={'textures/envmap.hdr'} />
        <EffectComposer>
          <MotionBlur />
          <HueSaturation
            blendFunction={BlendFunction.NORMAL}
            hue={-0.15}
            saturation={0.1}
          />
        </EffectComposer>
      </Canvas>
    </>
  );
};

export default CanvasContainer;
