import Header from '../header';

type Props = {
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full h-full">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
