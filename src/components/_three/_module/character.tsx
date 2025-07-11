import { useCallback, useEffect, useRef, useState } from 'react';
import { useFBX, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface Animations {
  [name: string]: {
    clip: THREE.AnimationAction;
  };
}

const Character = () => {
  const group = useRef(null);
  const character = useFBX('models/soldier.fbx');
  const [activeAnimation, setActiveAnimation] = useState<{
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    run: boolean;
  }>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    run: false,
  });

  const animations: Animations = {};

  character.traverse((f) => {
    f.castShadow = true;
    f.receiveShadow = true;
  });

  const mixer = new THREE.AnimationMixer(character);
  const idle = useFBX('./animations/idle.fbx');

  animations['idle'] = {
    clip: mixer.clipAction(idle.animations[0]),
  };

  const walk = useFBX('./animations/walking.fbx');

  animations['walk'] = {
    clip: mixer.clipAction(walk.animations[0]),
  };

  animations['run'] = {
    clip: mixer.clipAction(walk.animations[0]),
  };

  let currAction = animations['idle'].clip;

  let prevAction: THREE.AnimationAction;

  const handleKeyPress = useCallback((event: any) => {
    switch (event.keyCode) {
      case 87:
        setActiveAnimation((prev) => ({ ...prev, forward: true }));
        break;

      case 65: //a
        setActiveAnimation((prev) => ({ ...prev, left: true }));
        break;

      case 83: //s
        setActiveAnimation((prev) => ({ ...prev, backward: true }));
        break;

      case 68: // d
        setActiveAnimation((prev) => ({ ...prev, right: true }));
        break;

      case 16: // shift
        setActiveAnimation((prev) => ({ ...prev, run: true }));
        break;
    }
  }, []);

  const handleKeyUp = useCallback((event: any) => {
    switch (event.keyCode) {
      case 87: //w
        setActiveAnimation((prev) => ({ ...prev, forward: false }));
        break;

      case 65: //a
        setActiveAnimation((prev) => ({ ...prev, left: false }));
        break;

      case 83: //s
        setActiveAnimation((prev) => ({ ...prev, backward: false }));
        break;

      case 68: // d
        setActiveAnimation((prev) => ({ ...prev, right: false }));
        break;

      case 16: // shift
        setActiveAnimation((prev) => ({ ...prev, run: false }));
        break;
    }
  }, []);

  useFrame((_, delta) => {
    prevAction = currAction;

    console.log('activeAnimation: ', activeAnimation);
    if (activeAnimation.forward) {
      if (activeAnimation.run) {
        currAction = animations['run'].clip;
      } else {
        currAction = animations['walk'].clip;
      }
    } else if (activeAnimation.left) {
      if (activeAnimation.run) {
        currAction = animations['run'].clip;
      } else {
        currAction = animations['walk'].clip;
      }
    } else if (activeAnimation.right) {
      if (activeAnimation.run) {
        currAction = animations['run'].clip;
      } else {
        currAction = animations['walk'].clip;
      }
    } else if (activeAnimation.backward) {
      if (activeAnimation.run) {
        currAction = animations['run'].clip;
      } else {
        currAction = animations['walk'].clip;
      }
    }

    if (prevAction !== currAction) {
      prevAction.fadeOut(0.2);

      if (prevAction === animations['walk'].clip) {
        const ratio =
          currAction.getClip().duration / prevAction.getClip().duration;
        currAction.time = prevAction.time * ratio;
      }

      currAction.reset().play();
    } else {
      currAction.play();
    }

    mixer.update(delta);
  });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    document.addEventListener('keyup', handleKeyUp);
    currAction.play();
    return () => {
      document.removeEventListener('keydown', handleKeyPress);

      document.removeEventListener('keyup', handleKeyUp);
    };
  });

  return (
    <group
      ref={group}
      rotation={[0, 0, 0]}
      position={[0, -0.85, 0]}
      scale={0.01}
      userData={{ camCollision: false }}
    >
      <primitive object={character} />
    </group>
  );
};

export default Character;
useGLTF.preload('/models/soldier.fbx');
