import "./App.css";
import { Routes, Route } from "react-router-dom";

import SearchPage from "./pages/Search-page/SearchPage";
import AuthorPage from "./pages/Author-page/AuthorPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/author/:authorId" element={<AuthorPage />} />
      </Routes>
    </div>
  );
}

export default App;
