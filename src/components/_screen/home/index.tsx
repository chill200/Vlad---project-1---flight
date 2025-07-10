import CanvasContainer from '../../_three/canvas';
import LoadingScreen from '../loading';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useProgress } from '@react-three/drei';
import { useAppStore } from '../../../store';

const HomeScreen = () => {
  const { activeScene } = useAppStore();
  const { progress } = useProgress();
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <CanvasContainer />
      <>
        {progress < 100 ? (
          <LoadingScreen />
        ) : (
          <>
            {activeScene === 1 && (
              <div className="fixed bottom-2 text-xs left-1/2 -translate-x-1/2">
                Click anywhere to turn on turbo
              </div>
            )}
            {activeScene === 3 && (
              <div className="fixed bottom-2 text-xs left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <div className="w-12 h-12 border rounded flex items-center justify-center">
                  W
                </div>
                <div className="flex gap-1">
                  <div className="w-12 h-12 border rounded flex items-center justify-center">
                    A
                  </div>
                  <div className="w-12 h-12 border rounded flex items-center justify-center">
                    S
                  </div>
                  <div className="w-12 h-12 border rounded flex items-center justify-center">
                    D
                  </div>
                </div>
              </div>
            )}
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
