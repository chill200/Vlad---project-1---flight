import { PerspectiveCamera } from '@react-three/drei';
import { Airplane } from './_module/planeControllable';

const Scene1 = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 10, 10]} />
      <Airplane />
    </>
  );
};

export default Scene1;
