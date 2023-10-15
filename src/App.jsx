import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Home from "./pages/Home/Home";
import SearchMovie from "./pages/SearchMovie/SearchMovie";
import DetailMovie from "./pages/DetailMovie/DetailMovie";
import MovieType from "./pages/MovieType/MovieType";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <div className="bg-black/90">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_CLIENT_ID}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/movie/detail/:id" element={<DetailMovie />}></Route>
            <Route path="/movie/:type" element={<MovieType />}></Route>
            <Route
              path="/movie/search/:query"
              element={<SearchMovie />}
            ></Route>
            <Route path="/*" element={<h1>Page Not Found</h1>}></Route>
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
