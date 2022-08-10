const SearchInputs = (props) => {
  return (
    <>
      <div className="search-inputs">
        <label>
          Search for an Author
          <br />
          <input
            id="input"
            placeholder="Author name e.g. 'Nick Schrute'"
            onChange={(e) => props.debouncedHandleSearch(e, "input")}
          ></input>
        </label>
        <br />
        <label>
          Number of results:
          <br />
          <select
            id="select"
            placeholder="Author name e.g. 'Nick Schrute'"
            onChange={(e) => props.handleSearch(e, "select")}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>
    </>
  );
};

export default SearchInputs;
