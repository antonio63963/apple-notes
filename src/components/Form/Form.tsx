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

type FormType = "create" | "update";

interface IForm {
  formTitle: string;
  onClose: () => void;
  onSave: () => void;
  titleValue: string;
  descriptionValue: string;
  onDescriptionChange: (data: string) => void;
  onTitleChange: (data: string) => void;
  type: FormType;
}

const Form: FC<IForm> = ({
  type,
  onClose,
  onSave,
  titleValue,
  descriptionValue,
  onDescriptionChange,
  onTitleChange,
  formTitle,
}) => {
  return (
    <div className={cn(styles.bg)}>
      <Modal onClose={onClose} title={formTitle}>
        <div>
          <label>Title</label>
          <input
            required
            onChange={(e) => onTitleChange(e.target.value)}
            value={titleValue}
            className={cn(styles.input)}
            name="title"
          />
          <label>Description</label>
          <textarea
            required
            value={descriptionValue}
            rows={5}
            className={cn(styles.input)}
            name="description"
            onChange={(e) => onDescriptionChange(e.target.value)}
          />

          {type === "create" && (
            <div className={cn(styles.bottonsRow)}>
              <Button onClick={onClose}>
                <IoClose size={24} />
              </Button>
              <Button onClick={onSave}>
                <IoSave size={24} />
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Form;
