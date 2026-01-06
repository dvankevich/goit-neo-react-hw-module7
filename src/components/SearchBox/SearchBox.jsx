import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/selectors";
import { changeFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  const searchInputId = useId();
  const clearSearch = () => {
    dispatch(changeFilter(""));
  };

  const handleSearch = (evt) => {
    dispatch(changeFilter(evt.target.value));
  };

  return (
    <div className={css.box}>
      <label htmlFor={searchInputId} aria-label="Find contacts by name field">
        Find contacts by name
      </label>
      <input
        className={css.field}
        id={searchInputId}
        onChange={handleSearch}
        value={filter}
      ></input>
      <button
        className={css.btn}
        onClick={clearSearch}
        aria-label="Clear search button"
      >
        Clear
      </button>
    </div>
  );
};

export default SearchBox;
