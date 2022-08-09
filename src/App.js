import './App.css';
import { Routes, Route } from "react-router-dom"

import SearchPage from './pages/SearchPage';
import AuthorPage from './pages/AuthorPage'


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
