import { useGLTF } from '@react-three/drei';

const Laboratory = () => {
  const { scene } = useGLTF('models/lab.glb');

  scene.traverse((f) => {
    f.castShadow = true;
    f.receiveShadow = true;
  });

  return <primitive object={scene} scale={1.8} />;
};

export default Laboratory;
useGLTF.preload('models/lab.glb');
