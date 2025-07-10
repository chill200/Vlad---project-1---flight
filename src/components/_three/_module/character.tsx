import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';

const Character = () => {
  const group = useRef(null);
  const { scene, animations } = useGLTF('models/soldier.glb');
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]]?.play();
  }, []);

  return (
    <group ref={group} rotation={[0, -Math.PI / 2, 0]} position={[0, -0.85, 0]}>
      <primitive object={scene} />
    </group>
  );
};

export default Character;
useGLTF.preload('/models/soldier.glb');
