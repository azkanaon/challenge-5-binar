import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home/Home";
import SearchMovie from "./pages/SearchMovie/SearchMovie";
import DetailMovie from "./pages/DetailMovie/DetailMovie";
import MovieType from "./pages/MovieType/MovieType";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Protected from "./components/Protected";
import NoAccessToken from "./components/NoAccessToken";
import Profile from "./pages/Profil/Profil";

function App() {
  return (
    <div className="bg-black/90">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_CLIENT_ID}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <NoAccessToken>
                  <Login />
                </NoAccessToken>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <NoAccessToken>
                  <Register />
                </NoAccessToken>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Protected>
                  <Profile></Profile>
                </Protected>
              }
            ></Route>
            <Route
              path="/movie/detail/:id"
              element={
                <Protected>
                  <DetailMovie />
                </Protected>
              }
            ></Route>
            <Route
              path="/movie/:type"
              element={
                <Protected>
                  <MovieType />
                </Protected>
              }
            ></Route>
            <Route
              path="/movie/search/:query"
              element={
                <Protected>
                  <SearchMovie />
                </Protected>
              }
            ></Route>
            <Route path="/*" element={<h1>Page Not Found</h1>}></Route>
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
