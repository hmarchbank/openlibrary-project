import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import AuthorRow from "../../components/AuthorRow";
import './SearchPage.css'

const Main = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [resultNumbers, setResultNumbers] = useState(5);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        search();
    }, [searchTerm, resultNumbers]);

    const search = () => {
        if (searchTerm){
            axios
            .get(
                `https://openlibrary.org/search/authors.json?q=${searchTerm}&offset=${0}&limit=${resultNumbers}`
            )
            .then((response) => {
                if (response.data.docs.length === 0) {
                    setErrorMessage("Your query returned 0 results, please searching for something else");
                } else {
                    setSearchResults(response.data.docs);
                }
            })
            .catch((err) => {
                setErrorMessage(`Error retrieving authors from DB - ${err.message}`);
            });
        }
    };

    const handleSearch = (event, type) => {
        event.preventDefault();
        const currentSearch = event.target.value
        console.log(currentSearch)
        if (type === "select") {
            setResultNumbers(currentSearch)
        } else {
            if (currentSearch.length >= 20) {
                setErrorMessage("Queries must be shorter than 20 characters");
            } else if (currentSearch.length === 0) {
                setErrorMessage(null)
                setSearchResults([])
            } else if (currentSearch.match(/^[A-Z-a-z\s]*$/)) {
                setErrorMessage(null)
                setSearchTerm(currentSearch);
            } else {
                setErrorMessage(
                    "Please use only letters, no numbers or special characters"
                );
            }
        }
    };

    return (
        <>
            <h1>OpenLibrary Author Searcher</h1>
            <div className="search-form">

            <label>
                Search for an Author
                <br />
                <input
                    id="input"
                    placeholder="Author name e.g. 'Nick Schrute'"
                    onChange={(e) => handleSearch(e, "input")}
                    ></input>
            </label><br/>
            <label>
                Number of results:
                <br />
                <select
                    id="select"
                    placeholder="Author name e.g. 'Nick Schrute'"
                    onChange={(e) => handleSearch(e, "select")}
                    >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </label>

            {!errorMessage && searchResults ? (
                searchResults.map((author, index) => {
                    return (
                        <>
                            <AuthorRow key={index} author={author} />
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

export default Main;
