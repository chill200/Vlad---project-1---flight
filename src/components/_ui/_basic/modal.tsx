import { type ReactNode } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

type Props = {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  setIsOpen: (flag: boolean) => void;
  disableClose?: boolean;
};

const Modal: React.FC<Props> = ({
  children,
  isOpen = false,
  disableClose = false,
  setIsOpen = () => {},
}) => {
  function close() {
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => {
        if (!disableClose) close();
      }}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-sm rounded-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
