import { FC } from "react";
import cn from "classnames";
import { IoCloseCircleOutline } from "react-icons/io5";

import styles from "./Input.module.css";
interface TInput {
  value: string;
  setValue: (data: string) => void;
  onLeaveEmpty: () => void;
}

const Input: FC<TInput> = ({ value, setValue, onLeaveEmpty }) => {
  return (
    <div className={cn(styles.container)}>
      <input
        autoFocus
        onBlur={onLeaveEmpty}
        value={value}
        className={cn(styles.input)}
        type="text"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setValue(e.currentTarget.value)
        }
      />
      <div className={cn(styles.iconContainer)} onClick={() => setValue("")}>
        {value.length ? <IoCloseCircleOutline size={24} /> : null}
      </div>
    </div>
  );
};

export default Input;
