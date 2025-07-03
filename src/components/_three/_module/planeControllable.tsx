/* eslint-disable react-refresh/only-export-components */
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Matrix4, Quaternion, Vector3 } from 'three';
import { updatePlaneAxis } from '../../../utils/controls';
import * as THREE from 'three';
import { useAppStore } from '../../../store';

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
export const planePosition = new Vector3(0, 3, 6);

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

export function Airplane() {
  const { nodes, materials } = useGLTF('models/b2.glb');
  const { setScene } = useAppStore();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    updatePlaneAxis(x, y, z, planePosition, camera as THREE.PerspectiveCamera);

    const rotMatrix = new Matrix4().makeBasis(x, y, z);

    const matrix = new Matrix4()
      .multiply(
        new Matrix4().makeTranslation(
          planePosition.x,
          planePosition.y,
          planePosition.z,
        ),
      )
      .multiply(rotMatrix);

    if (!groupRef.current) return;
    groupRef.current.matrixAutoUpdate = false;
    groupRef.current.matrix.copy(matrix);
    groupRef.current.matrixWorldNeedsUpdate = true;

    const quaternionA = new Quaternion().copy(delayedQuaternion);

    const quaternionB = new Quaternion();
    quaternionB.setFromRotationMatrix(rotMatrix);

    const interpolationFactor = 0.175;
    const interpolatedQuaternion = new Quaternion().copy(quaternionA);
    interpolatedQuaternion.slerp(quaternionB, interpolationFactor);
    delayedQuaternion.copy(interpolatedQuaternion);

    delayedRotMatrix.identity();
    delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

    const cameraMatrix = new Matrix4()
      .multiply(
        new Matrix4().makeTranslation(
          planePosition.x,
          planePosition.y,
          planePosition.z,
        ),
      )
      .multiply(delayedRotMatrix)
      .multiply(new Matrix4().makeRotationX(-0.2))
      .multiply(new Matrix4().makeTranslation(0, 0.025, 0.3));

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;

    if (planePosition.z < 0) {
      setScene(2);
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <group dispose={null} scale={0.008} rotation={[-Math.PI / 2, 0, 0]}>
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
      </group>
    </>
  );
}

useGLTF.preload('models/b2.glb');
