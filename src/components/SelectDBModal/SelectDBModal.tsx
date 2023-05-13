import { FC } from "react";
import cn from "classnames";
import { IoClose } from "react-icons/io5";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";

type IName = "indexed" | "quinta" | null;

interface IModal {
  onClose: () => void;
  title: string;
  onSelectDB: (data: IName) => void;
}

const SelectDBModal: FC<IModal> = ({ onClose, title, onSelectDB }) => {
  return (
    <Modal onClose={onClose} title={title}>
      <Button onClick={onClose}>
        <IoClose size={24} />
      </Button>
      <Button
        onClick={() => {
          onSelectDB("indexed");
          onClose();
        }}
      >
        Local
      </Button>
      <Button
        onClick={() => {
          onSelectDB("quinta");
          onClose();
        }}
      >
        Cloud
      </Button>
    </Modal>
  );
};

export default SelectDBModal;
