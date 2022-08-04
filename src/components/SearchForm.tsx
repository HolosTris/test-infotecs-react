import React, { ChangeEvent, FC, SetStateAction, useState } from "react";
import cl from "./SearchForm.module.css";

interface SearchFormProps {
  query: string;
  setQuery: (query: SetStateAction<string>) => void;
}

const SearchForm: FC<SearchFormProps> = ({ query, setQuery }) => {
  return (
    <form className={cl.form}>
      <input
        className={cl.input}
        type="text"
        placeholder="Search..."
        value={query}
        onChange={changeQuery}
      />
    </form>
  );

  function changeQuery(ev: ChangeEvent<HTMLInputElement>) {
    setQuery(ev.target.value);
  }
};

export default SearchForm;
