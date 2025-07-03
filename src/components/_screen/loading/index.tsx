import Loader from '../../_ui/_basic/loader';

const LoadingScreen = () => {
  return (
    <div className="fixed z-50 w-screen h-screen top-0 left-0 flex items-center justify-center bg-black">
      <Loader />
    </div>
  );
};

export default LoadingScreen;
