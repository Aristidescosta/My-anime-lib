import React from "react";
import { BiStar } from "react-icons/bi";
import { Link } from "react-router-dom";

export const AnimeSearch = ({ anime, showLink }) => {
  return (
    <>
      <div className="animeCard">
        <img
          src={anime.images.jpg.image_url}
          alt={`Imagem do ${anime.title}`}
        />
        <h2>{anime.title}</h2>
        <p>
          <BiStar />
          {anime.score}
        </p>
        {showLink && <Link to={`/anime/${anime.mal_id}`}>Detalhes</Link>}
      </div>
    </>
  );
};
