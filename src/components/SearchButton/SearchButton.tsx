import { FC } from "react";
import cn from "classnames";

import styles from "./SearchButton.module.css";

import { IconContext } from "react-icons";
import { IoSearch } from "react-icons/io5";

interface ISearchButton {
  onClick: () => void;
}

const SearchButton: FC<ISearchButton> = ({onClick}) => {
  return (
    <div className={cn(styles.container)} onClick={onClick}>
      <IoSearch fill="#8a8989" />
      <span className={cn(styles.text)}>Search</span>
    </div>
  );
};

export default SearchButton;
