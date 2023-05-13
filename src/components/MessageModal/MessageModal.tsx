import { FC } from "react";
import cn from "classnames";
import { IoClose } from "react-icons/io5";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";

interface IModal {
  onClose: () => void;
  title: string;
  message: string;
}

const MessageModal: FC<IModal> = ({ onClose, title, message }) => {
  return (
    <Modal onClose={onClose} title={title}>
      <p>{message}</p>
      <Button onClick={onClose}>
        <IoClose size={24} />
      </Button>
    </Modal>
  );
};

export default MessageModal;
