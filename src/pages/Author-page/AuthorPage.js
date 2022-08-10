import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./Author-page.css";

const AuthorPage = () => {
  const { authorId } = useParams();
  const [authorDetails, setAuthorDetails] = useState(null);
  const [author, setAuthor] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getAuthorDetails();
    setAuthor(location.state.author);
  }, []);

  const getAuthorDetails = () => {
    axios
      .get(`https://openlibrary.org/authors/${authorId}.json`)
      .then((res) => {
        if (res.data.bio && res.data.bio.value) {
          res.data.bio = res.data.bio.value;
        }
        setAuthorDetails(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div id="author-page-container">
        {authorDetails ? (
          <>
            <div className="titles">
              <h1>{authorDetails.name}</h1>
              <h5>
                {authorDetails.birth_date
                  ? authorDetails.birth_date
                  : "Unknown DOB"}
                {!authorDetails.death_date && authorDetails.birth_date
                  ? " - present"
                  : ""}
                {authorDetails.death_date ? ` - ${authorDetails.death_date}` : ""}
              </h5>
            </div>
            <div className="details-container">
              <div className="author-details">
                <h5 className="section-headings">Bio: </h5>
                <p>
                  {authorDetails.bio
                    ? authorDetails.bio
                    : "There is currently no biography details for this author."}
                </p>
                <h5 className="section-headings">Most popular work: </h5>
                <p>
                  <em>{author.top_work ? author.top_work : "Unknown"}</em>
                </p>
              </div>
              <div className="author-image">
                {authorDetails.photos ? (
                  <img
                    alt={authorDetails.name}
                    src={`//covers.openlibrary.org/a/id/${authorDetails.photos[0]}-M.jpg`}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="nav-buttons">
              <Link to={"/"}>
                <button className="return-button">Return to Search</button>
              </Link>
            </div>
          </>
        ) : (
          <h1 className="loading-header">Loading...</h1>
        )}
      </div>
    </>
  );
};

export default AuthorPage;
