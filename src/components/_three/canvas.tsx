import { Suspense, useEffect, useRef, useState } from 'react';
import { BlendFunction } from 'postprocessing';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, HueSaturation } from '@react-three/postprocessing';
import { Environment } from '@react-three/drei';
import { Landscape } from './_module/landscape';
import { MotionBlur } from './_module/motion';
import { SphereEnv } from './_module/sphere';
import { useAppStore } from '../../store';
import Scene2 from './scene2';
import Scene1 from './scene1';

import gsap from 'gsap';
import Scene3 from './scene3';

const CanvasContainer = () => {
  const { activeScene } = useAppStore();
  const [currentScene, setCurrentScene] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const timeline = gsap
      .timeline({})
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentScene(activeScene);
        },
      })
      .to(containerRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      });

    return () => {
      timeline.kill();
    };
  }, [activeScene]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas shadows>
        <Suspense fallback={null}>
          {currentScene === 1 && (
            <>
              <Scene1 />
            </>
          )}
          {currentScene === 2 && (
            <>
              <Scene2 />
            </>
          )}
          {currentScene === 3 && (
            <>
              <Scene3 />
            </>
          )}
          {(currentScene === 1 || currentScene === 2) && (
            <>
              <Landscape />
              <SphereEnv />
            </>
          )}
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
          {currentScene === 1 ? <MotionBlur /> : <></>}
          <HueSaturation
            blendFunction={BlendFunction.NORMAL}
            hue={-0.15}
            saturation={0.1}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default CanvasContainer;
