/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 scene.glb
*/

import { useEffect, useMemo } from 'react';
import { MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function Landscape() {
  const { nodes, materials } = useGLTF('models/scene.glb');

  const [waterMaterial] = useMemo(() => {
    return [
      <MeshReflectorMaterial
        transparent={true}
        opacity={0.6}
        color={'#23281b'}
        roughness={0}
        blur={[10, 10]} // Blur ground reflections (width, height), 0 skips blur
        mixBlur={1} // How much blur mixes with surface roughness (default = 1)
        mixStrength={20} // Strength of the reflections
        mixContrast={1.2} // Contrast of the reflections
        resolution={512} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={0.1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.0025} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        reflectorOffset={0.0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />,
    ];
  }, []);

  useEffect(() => {
    const landscapeMat = materials['Material.009'];
    (landscapeMat as THREE.MeshStandardMaterial).envMapIntensity = 0.75;
  }, [materials]);

  return (
    <group dispose={null}>
      <mesh
        geometry={(nodes.landscape_gltf as THREE.Mesh).geometry}
        material={materials['Material.009']}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={(nodes.landscape_borders as THREE.Mesh).geometry}
        material={materials['Material.010']}
      />
      <mesh
        position={[-2.536, 1.272, 0.79]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        scale={[1.285, 1.285, 1]}
      >
        <planeGeometry args={[1, 1]} />
        {waterMaterial}
      </mesh>
      <mesh
        position={[1.729, 0.943, 2.709]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        scale={[3, 3, 1]}
      >
        <planeGeometry args={[1, 1]} />
        {waterMaterial}
      </mesh>
      <mesh
        position={[0.415, 1.588, -2.275]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        scale={[3.105, 2.405, 1]}
      >
        <planeGeometry args={[1, 1]} />
        {waterMaterial}
      </mesh>
    </group>
  );
}

useGLTF.preload('models/scene.glb');
