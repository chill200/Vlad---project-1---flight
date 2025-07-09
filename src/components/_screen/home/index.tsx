import CanvasContainer from '../../_three/canvas';
import LoadingScreen from '../loading';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useProgress } from '@react-three/drei';

const HomeScreen = () => {
  const { progress } = useProgress();
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <CanvasContainer />
      <>
        {progress < 100 ? (
          <LoadingScreen />
        ) : (
          <>
            <div className="fixed bottom-2 text-xs left-1/2 -translate-x-1/2">
              Click anywhere to turn on turbo
            </div>
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="fixed top-2 text-xs right-2 z-50 cursor-pointer"
            >
              <ArrowUturnLeftIcon width={24} height={24} />
            </button>
          </>
        )}
      </>
    </div>
  );
};

export default HomeScreen;
