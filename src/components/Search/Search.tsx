import styles from "./Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/slices/searchSlice";
import React, { useCallback, useRef, useState } from "react";
import { LuUtensilsCrossed } from "react-icons/lu";
import debounce from "lodash.debounce";

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  // const searchValue = useSelector((state) => state.search.searchValue);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickClear = () => {
    dispatch(setSearchValue(""));
    setInputValue("");
    inputRef.current?.focus();
  };

  const testDebounce = useCallback(
    debounce((inputQuery: string) => {
      dispatch(setSearchValue(inputQuery));
    }, 1000),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    testDebounce(value);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        ref={inputRef}
        onChange={(e) => onChangeInput(e)}
        className={styles.inputStyles}
        type="text"
        placeholder="Поиск по пиццам..."
        value={inputValue}
      />
      {inputValue && (
        <LuUtensilsCrossed
          onClick={handleClickClear}
          className={styles.clearCrossIcon}
        />
      )}
    </div>
  );
};

export default Search;
