import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt } from "react-icons/bi";
import "./style.css";

export const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <nav id="navbar">
      <h2>
        <Link to="/">
          <BiCameraMovie />
          AnimeLib
        </Link>
      </h2>
      <div>
        <ul>
          <li>
            <Link to="/">Animes</Link>
          </li>

          <li>
            <Link to="/mangas">Mangás</Link>
          </li>
        </ul>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Busque por um anime, manga, personagem"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button type="submit">
            <BiSearchAlt />
          </button>
        </form>
      </div>
    </nav>
  );
};
