import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SearchMovie from "./pages/SearchMovie/SearchMovie";
import DetailMovie from "./pages/DetailMovie/DetailMovie";
import MovieType from "./pages/MovieType/MovieType";

function App() {
  return (
    <div className="bg-black/90">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movie/detail/:id" element={<DetailMovie />}></Route>
          <Route path="/movie/:type" element={<MovieType />}></Route>
          <Route path="/movie/search/:query" element={<SearchMovie />}></Route>
          <Route path="/*" element={<h1>Page Not Found</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
