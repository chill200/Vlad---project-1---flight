import { useCallback, useEffect, useRef } from 'react';
import { useFBX } from '@react-three/drei';
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
  const activeAnimation = useRef<{
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    run: boolean;
    jump: boolean;
  }>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    run: false,
    jump: false,
  });

  const animations: Animations = {};

  const mixer = new THREE.AnimationMixer(character);
  const idle = useFBX('./animations/idle.fbx');

  animations['idle'] = {
    clip: mixer.clipAction(idle.animations[0]),
  };

  const walk = useFBX('./animations/walking.fbx');

  animations['walk'] = {
    clip: mixer.clipAction(walk.animations[0]),
  };

  const run = useFBX('./animations/running.fbx');
  animations['run'] = {
    clip: mixer.clipAction(run.animations[0]),
  };

  const jump = useFBX('./animations/jumping.fbx');
  animations['jump'] = {
    clip: mixer.clipAction(jump.animations[0]),
  };

  let currAction = animations['idle'].clip;

  let prevAction: THREE.AnimationAction;

  const handleKeyPress = useCallback((event: any) => {
    switch (event.keyCode) {
      case 87:
        activeAnimation.current.forward = true;
        break;

      case 65: //a
        activeAnimation.current.left = true;
        break;

      case 83: //s
        activeAnimation.current.backward = true;
        break;

      case 68: // d
        activeAnimation.current.right = true;
        break;

      case 16: // shift
        activeAnimation.current.run = true;
        break;

      case 32: // Space
        activeAnimation.current.jump = true;
        break;
    }
  }, []);

  const handleKeyUp = useCallback((event: any) => {
    switch (event.keyCode) {
      case 87: //w
        activeAnimation.current.forward = false;
        break;

      case 65: //a
        activeAnimation.current.left = false;
        break;

      case 83: //s
        activeAnimation.current.backward = false;
        break;

      case 68: // d
        activeAnimation.current.right = false;
        break;

      case 16: // shift
        activeAnimation.current.run = false;
        break;

      case 32: // Space
        activeAnimation.current.jump = false;
        break;
    }
  }, []);

  useFrame((_, delta) => {
    prevAction = currAction;

    const activeAnim = activeAnimation.current;

    if (activeAnim.forward) {
      if (activeAnim.run) {
        currAction = animations['run'].clip;
      } else {
        currAction = animations['walk'].clip;
      }
    } else if (activeAnim.left) {
      if (activeAnim.run) {
        currAction = animations['run'].clip;
      } else {
        currAction = animations['walk'].clip;
      }
    } else if (activeAnim.right) {
      if (activeAnim.run) {
        currAction = animations['run'].clip;
      } else {
        currAction = animations['walk'].clip;
      }
    } else if (activeAnim.backward) {
      if (activeAnim.run) {
        currAction = animations['run'].clip;
      } else {
        currAction = animations['walk'].clip;
      }
    } else if (activeAnim.jump) {
      currAction = animations['jump'].clip;
    } else {
      currAction = animations['idle'].clip;
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
      position={[0, -0.9, 0]}
      scale={0.01}
      userData={{ camCollision: false }}
    >
      <primitive object={character} />
    </group>
  );
};

export default Character;
useFBX.preload('/models/soldier.fbx');
useFBX.preload('./animations/idle.fbx');
useFBX.preload('./animations/walking.fbx');
useFBX.preload('./animations/running.fbx');
