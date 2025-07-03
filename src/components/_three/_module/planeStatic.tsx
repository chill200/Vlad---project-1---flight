import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const PlaneStatic = () => {
  const { nodes } = useGLTF('models/b2.glb');

  return (
    <group scale={0.09} rotation={[-Math.PI / 2, 0, 0]}>
      {Object.keys(nodes)
        .filter((key) => nodes[key].type === 'Mesh')
        .map((key) => (
          <mesh
            key={key}
            geometry={(nodes[key] as THREE.Mesh).geometry}
            material={(nodes[key] as THREE.Mesh).material}
          />
        ))}
    </group>
  );
};

export default PlaneStatic;
useGLTF.preload('models/b2.glb');
