import { useGLTF } from '@react-three/drei';

const Laboratory = () => {
  const { scene } = useGLTF('models/lab.glb');

  return <primitive object={scene} />;
};

export default Laboratory;
useGLTF.preload('models/lab.glb');
