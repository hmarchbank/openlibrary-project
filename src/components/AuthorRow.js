import { NavLink } from "react-router-dom"

const AuthorRow = ({author}) => {
    return (<>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h1>{author.name}</h1>
            <NavLink to={`/author/${author.key}`}>
                <button>More details</button>
            </NavLink>
        </div>
    </>)
}

export default AuthorRow