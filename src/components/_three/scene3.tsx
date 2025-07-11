import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Character from './_module/character';
import Controller from 'ecctrl';
import Laboratory from './_module/laboratory';
import gsap from 'gsap';
import { KeyboardControls, PerspectiveCamera } from '@react-three/drei';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { useGame3Store } from '../../store/game';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['Shift'] },
];

const Scene3 = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { openEnterCodeModal, setEnterCodeModal } = useGame3Store();
  const [activeControl, setActiveControl] = useState(false);

  useEffect(() => {
    const camera = cameraRef.current;

    if (camera) {
      gsap.to(camera.position, {
        x: 0,
        y: 1.2,
        z: -5,
        duration: 2,
        onComplete: () => {
          setActiveControl(true);
        },
      });
    }
  }, []);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 1.2, 0]} />
      <Physics timeStep="vary">
        {activeControl && (
          <KeyboardControls map={keyboardMap} key={`soldier`}>
            <Controller animated position={[0, 0.45, -3]} camCollision={true}>
              <Character />
            </Controller>
          </KeyboardControls>
        )}
        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider
            args={[0.4, 1, 0.7]}
            position={[1.95, 2.5, -20]}
            sensor={true}
            onIntersectionEnter={() => {
              if (!openEnterCodeModal) {
                setEnterCodeModal(true);
              }
            }}
            onIntersectionExit={() => {
              if (openEnterCodeModal) {
                setEnterCodeModal(false);
              }
            }}
          />
        </RigidBody>
        <RigidBody type="fixed" colliders="trimesh">
          <Laboratory />
        </RigidBody>
      </Physics>
    </>
  );
};

export default Scene3;
