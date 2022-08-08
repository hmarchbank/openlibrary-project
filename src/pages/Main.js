import axios from "axios"
import { useEffect, useState } from "react"

const Main = () => {
    const [searchTerm,  setSearchTerm] = useState("harry")
    const [searchResults,  setSearchResults] = useState([])

    useEffect(() => {
        search()
    }, [searchTerm])

    const search = () => {
        console.log(searchTerm)
        axios.get(`https://openlibrary.org/search/authors.json?q=${searchTerm}&offset=${10}&limit=${20}`)
            .then((response) => {
                console.log(response.data)
                setSearchResults(response.data.docs)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    

    const handleSearch = (event) => {
        event.preventDefault()
        setSearchTerm(event.target.value)
    }
    

    return (<>
        <h1>test</h1>
        <input placeholder="Author name e.g. 'Nick Schrute'" onChange={(e) => handleSearch(e)}></input>
        {/* <button onClick={() => search(searchTerm)}>Search</button> */}
        
        {searchResults.map((author) => {
            return <h1>{author.name}</h1>
        })}
    </>

    )
}

export default Main