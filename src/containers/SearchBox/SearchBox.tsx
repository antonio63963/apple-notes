import { FC, useState } from "react";

import { Input, SearchButton } from "../../components";

const SearchBox: FC = () => {
  const [isInput, setIsInput] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  return (
    <div>
      {!isInput ? (
        <SearchButton onClick={() => setIsInput(true)} />
      ) : (
        <Input value={value} setValue={setValue} />
      )}
    </div>
  );
};

export default SearchBox;
