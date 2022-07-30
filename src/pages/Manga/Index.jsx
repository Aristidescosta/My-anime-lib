import React, { useState, useEffect, useContext } from "react";
import { RequestContext } from "../../contexts/Index";
import JikanDB from "../../JikanDB";
import { AnimeRow } from "../../components/AnimeRow/Index";

export const MangaHome = () => {
  const { setDataRequest, setType } = useContext(RequestContext);
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      const list = await JikanDB.getMangaList();
      setMangaList(list);
    };
    setType("Manga");
    setDataRequest("https://api.jikan.moe/v4/manga");
    loadAll();
  }, []);
  return (
    <div className="container">
      <section className="lists">
        {mangaList &&
          mangaList.map((item, key) => (
            <AnimeRow key={key} title={item.title} items={item.items} />
          ))}
      </section>
    </div>
  );
};
