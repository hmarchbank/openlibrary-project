import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useLocation } from 'react-router-dom'

 

const AuthorPage = () => {
    const {authorId} = useParams()
    const [authorDetails, setAuthorDetails] = useState(null)
    const [author, setAuthor] = useState(null)
    const location = useLocation()


    useEffect(() => {
        getAuthorDetails()
        setAuthor(location.state.author)
    }, [])

    console.log(authorDetails)
    console.log(author)
    
    const getAuthorDetails = () => {  
        axios.get(`https://openlibrary.org/authors/${authorId}.json`)
        .then( res => {
            if (res.data.bio && res.data.bio.value){
                res.data.bio = res.data.bio.value
            }
            setAuthorDetails(res.data)
        })
        .catch( err => console.log(err))
    } 

    return <>
        { authorDetails ?
        <>
            <h1>{authorDetails.name}</h1>
                    <h5>{authorDetails.birth_date} - {authorDetails.death_date ? authorDetails.death_date : "present"}</h5>
            <div className="author-page-container">
                <div className="author-details">
                    <p><strong>Bio: </strong>{authorDetails.bio}</p>
                    <p><strong>Most popular work: </strong>{author.top_work}</p>
                </div>
            {authorDetails.photos ? 
            <img alt={authorDetails.name}src={`//covers.openlibrary.org/a/id/${authorDetails.photos[0]}-M.jpg`} />
            : ''}
            </div>
            <Link to={'/'}><button>Return to Search</button></Link>
        </> 
        : ''}
    </>
}

export default AuthorPage