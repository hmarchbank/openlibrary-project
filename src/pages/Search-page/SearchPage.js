import axios from "axios";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";

import AuthorRow from "../../components/AuthorRow";
import SearchInputs from "../../components/SearchInputs";

import "./SearchPage.css";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [resultNumbers, setResultNumbers] = useState(5);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    search();
  }, [searchTerm, resultNumbers]);

  const search = (() => {
    if (searchTerm) {
      axios
        .get(
          `https://openlibrary.org/search/authors.json?q=${searchTerm}&offset=${0}&limit=${resultNumbers}`
        )
        .then((response) => {
          if (response.data.docs.length === 0) {
            setErrorMessage(
              "Your query returned 0 results, please try another query."
            );
          } else {
            setSearchResults(response.data.docs);
          }
        })
        .catch((err) => {
          setErrorMessage(`Error retrieving authors from DB - ${err.message}.`);
        });
    }
  });

  const handleSearch = (event, type) => {
    event.preventDefault();
    const currentSearch = event.target.value;
    if (type === "select") {
      setResultNumbers(currentSearch);
    } else {
      if (currentSearch.length >= 20) {
        setErrorMessage("Queries must be shorter than 20 characters.");
      } else if (currentSearch.length === 0) {
        setErrorMessage(null);
        setSearchResults([]);
      } else if (currentSearch.match(/^[A-Z-a-z\s]*$/)) {
        setErrorMessage(null);
        setSearchTerm(currentSearch);
      } else {
        setErrorMessage(
          "Please use only letters, no numbers or special characters."
        );
      }
    }
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 200), [
    searchTerm,
  ]);

  return (
    <>
      <h1>OpenLibrary Author Searcher</h1>
      <div className="search-form">
        <SearchInputs
          debouncedHandleSearch={debouncedHandleSearch}
          handleSearch={handleSearch}
        />
        {!errorMessage && searchResults ? (
          searchResults.map((author, index) => {
            return (
              <>
                <AuthorRow index={index} author={author} />
              </>
            );
          })
        ) : (
          <h1 id="errorMessage">{errorMessage}</h1>
        )}
      </div>
    </>
  );
};

export default SearchPage;
