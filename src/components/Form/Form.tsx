import { FC, useCallback } from "react";
import cn from "classnames";
import { IoClose, IoSave } from "react-icons/io5";

import styles from "./Form.module.css";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";

interface INote {
  id: string;
  title: string;
  description: string;
  date: Date;
}

interface IForm {
  onClose: () => void;
  onSubmit: () => void;
  titleValue: string;
  descriptionValue: string;
}

const Form: FC<IForm> = ({
  onClose,
  onSubmit,
  titleValue,
  descriptionValue,
}) => {
  return (
    <div className={cn(styles.bg)}>
      <Modal onClose={onClose} title="Create new note">
        <label>Title</label>
        <input value={titleValue} className={cn(styles.input)} name="title" />
        <label>Description</label>
        <textarea
          value={descriptionValue}
          rows={5}
          className={cn(styles.input)}
          name="description"
        />

        <div className={cn(styles.bottonsRow)}>
          <Button onClick={onClose}>
            <IoClose size={24} />
          </Button>
          <Button onClick={onSubmit}>
            <IoSave size={24} />
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Form;
