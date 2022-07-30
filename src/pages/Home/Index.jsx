import React, { useContext, useEffect, useState } from "react";
import { AnimeRow } from "../../components/AnimeRow/Index"
import { RequestContext } from "../../contexts/Index";
import JikanDB from "../../JikanDB"
export const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const { setDataRequest } = useContext(RequestContext);

  useEffect(() => {
    const loadAll = async () => {
      const list = await JikanDB.getAnimeList();
      setAnimeList(list);
    };
    setDataRequest("https://api.jikan.moe/v4/seasons/now");
    loadAll();
  }, []);
  console.log(animeList)

  return (
    <div className="container">
      <section className="lists">
        Lista de animes
        {animeList &&
          animeList.map((item, key) => (
            <AnimeRow key={key} title={item.title} items={item.items} />
          ))}
      </section>
    </div>
  );
};
