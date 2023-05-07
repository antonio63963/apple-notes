import { FC, useState, useCallback } from "react";

import { Input, SearchButton } from "../../components";

const SearchBox: FC = () => {
  const [isInput, setIsInput] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const onLeaveInput = useCallback(() => {
    console.log("value: ", value);
    if (!value) {
      setIsInput(false);
    }
  }, [value, setValue]);

  return (
    <div>
      {!isInput ? (
        <SearchButton onClick={() => setIsInput(true)} />
      ) : (
        <Input value={value} setValue={setValue} onLeaveEmpty={onLeaveInput} />
      )}
    </div>
  );
};

export default SearchBox;
