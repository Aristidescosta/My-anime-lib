import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { AnimeSearch } from "../../components/AnimeSearch";
import { Navbar } from "../../components/navbar"; 
import "./style.css";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [searchAnimes, setSearchAnimes] = useState([]);
  const [searchMangas, setSearchMangas] = useState(null);
  const [searchCharacters, setSearchCharacters] = useState([]);

  const getSearchAnimes = async (url, myFunction) => {
    setSearchAnimes(null);
    const res = await fetch(url);
    const data = await res.json();
    myFunction(data.data);
  };

  useEffect(() => {
    const searchAnimeWithQueryURL = `https://api.jikan.moe/v4/anime?q=${query}&page=1`;
    getSearchAnimes(searchAnimeWithQueryURL, setSearchAnimes);
  }, [query]);

  /* useEffect(() => {
    const searchMangaWithQueryURL = `https://api.jikan.moe/v4/manga?q=${query}&page=1`;
    getSearchAnimes(searchMangaWithQueryURL, setSearchMangas);
  }, []);

  useEffect(() => {
    const searchCharacterWithQueryURL = `https://api.jikan.moe/v4/characters?q=${query}`;
    getSearchAnimes(searchCharacterWithQueryURL, setSearchCharacters);
  }, []); */
  console.log(searchAnimes);
  return (
    <>
      <Navbar />
      {searchAnimes === null ? (
        <>
          <h2 className="title">
            Resultados para: <span className="query-text">{query}</span>
          </h2>
          <h1 className="title">Carregando</h1>
        </>
      ) : searchAnimes.length === 0 ? (
        <h1 className="title">Nenhum resultado encontrado para {query}</h1>
      ) : (
        <div className="card-container">
          {searchAnimes.map((item, key) => (
            <AnimeSearch key={key} anime={item} showLink={true} />
          ))}
        </div>
      )}
    </>
  );
};
