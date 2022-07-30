import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Index";
import { Search } from "./pages/Search/Index";
import { MangaHome } from "./pages/Manga/Index";
import { Anime } from "./pages/Anime/Index";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/mangas" element={<MangaHome />} />
        </Route>
        <Route path="anime/:id" element={<Anime />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
