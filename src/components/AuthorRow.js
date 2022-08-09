import { NavLink } from "react-router-dom"

const AuthorRow = ({author}) => {
    return (<>
        <div className="author-row">
            <h1>{author.name}</h1>
            <NavLink to={`/author/${author.key}`} state={{author: author}}>
                <button>More details</button>
            </NavLink>
        </div>
    </>)
}

export default AuthorRow