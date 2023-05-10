import { FC, ReactNode } from "react";
import cn from "classnames";
import { IoClose, IoSave } from "react-icons/io5";

import styles from "./Modal.module.css";

interface IModal {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<IModal> = ({title, onClose, children}) => {
  return <div className={cn(styles.bg)}>
    <div className={cn(styles.container)}>
      <div className={cn(styles.titleRow)}>
        <h2 className={cn(styles.title)}>{title}</h2>
        <div onClick={onClose}>
          <IoClose size={24} />
        </div>
      </div>
      {children}
    </div>
  </div>;
};

export default Modal;
