import CanvasContainer from '../../_three/canvas';

const HomeScreen = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <CanvasContainer />
      <div className="fixed bottom-2 text-xs left-1/2 -translate-x-1/2">
        Click anywhere to turn on turbo
      </div>
    </div>
  );
};

export default HomeScreen;
