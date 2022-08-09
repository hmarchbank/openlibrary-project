import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import AuthorRow from "../components/AuthorRow"

const Main = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        search()
    }, [searchTerm])

    const search = () => {
        if (searchTerm.length >= 20) {
            setSearchResults(null)
        } else {
            axios.get(`https://openlibrary.org/search/authors.json?q=${searchTerm}&offset=${10}&limit=${20}`)
            .then((response) => {
                console.log(response.data)
                setSearchResults(response.data.docs)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }



    const handleSearch = (event) => {
        event.preventDefault()
        setSearchTerm(event.target.value)
    }


    return (<>
        <h1>test</h1>
        <input placeholder="Author name e.g. 'Nick Schrute'" onChange={(e) => handleSearch(e)}></input>

        {searchResults ? searchResults.map((author) => {
            return <>
            <AuthorRow author={author}/>
            </>
            {/* <div style={{display: "flex", justifyContent: "center"}}>
                <h1>{author.name}</h1>
                <NavLink to={`/author/${author.key}`}>
                    <button>More details</button>
                </NavLink>
            </div> */}
        }) : <h1>Search terms must be shorter than 20 characters long</h1>}
    </>

    )
}

export default Main