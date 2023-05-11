import { FC, useState, useCallback, useContext } from "react";

import { NotesContext } from "../../context/NotesContext";

import { Input, SearchButton } from "../../components";

const SearchBox: FC = () => {
  const [isInput, setIsInput] = useState<boolean>(false);

  const { searchFilter, setSearchFilter } = useContext(NotesContext);

  const onLeaveInput = useCallback(() => {
    if (!searchFilter) {
      setIsInput(false);
    }
  }, [searchFilter, setIsInput]);

  return (
    <div>
      {!isInput ? (
        <SearchButton onClick={() => setIsInput(true)} />
      ) : (
        <Input
          value={searchFilter}
          setValue={setSearchFilter}
          onLeaveEmpty={onLeaveInput}
        />
      )}
    </div>
  );
};

export default SearchBox;
