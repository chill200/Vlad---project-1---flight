import classnames from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <div className={classnames('max-w-[120rem] mx-auto px-5', className)}>
      {children}
    </div>
  );
};

export default Container;
