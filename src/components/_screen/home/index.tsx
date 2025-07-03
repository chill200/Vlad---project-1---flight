import CanvasContainer from '../../_three/canvas';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

const HomeScreen = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <CanvasContainer />
      <div>
        <div className="fixed bottom-2 text-xs left-1/2 -translate-x-1/2">
          Click anywhere to turn on turbo
        </div>
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="fixed top-2 text-xs right-2 z-50 cursor-pointer"
        >
          <ArrowUturnLeftIcon width={32} height={32} />
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
