import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimeSearch } from "../../components/AnimeSearch";
import axios from "axios";
import { RequestContext } from "../../contexts/Index";
import "./style.css";

// import { Navbar } from "../../components/navbar";
export const Anime = () => {
  const [translatedText, setTranslatedText] = useState("");
  const [titlePortuguese, setTitlePortuguese] = useState("");

  const { id } = useParams();
  const [data, setData] = useState(null);

  /* Função para traduzir */
  const traslate = async (text, targetText) => {
    let data1 = {
      q: text,
      source: "en",
      target: "pt",
    };
    await axios
      .post(`https://libretranslate.de/translate`, data1)
      .then((response) => {
        targetText(response.data.translatedText);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const t = async () => {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
      const data = await res.json();
      setData(data.data);
    };
    t();
  }, []);
  // return <>{data && (<> <AnimeSearch anime={data} showLink={false} /> </>)}</>;
  const getItemData = (itemData, itemName) => {
    for (let i in itemData) {
      itemName.push(itemData[i].name);
    }
  };

  let titles = [];
  let producers = [];
  let studios = [];
  let genres = [];
  let style = [];
  let opn = [];
  let description;
  if (data) {
    // traslate(data.title_english, setTitlePortuguese);
    if (data.synopsis.length > 300) {
      description = data.synopsis.substring(0, 300) + "...";
      traslate(description, setTranslatedText);
    } else {
      traslate(data.synopsis, setTranslatedText);
    }
    for (let i in data.theme.openings) {
      opn.push(data.theme.openings[i]);
    }
    titles.push(data.title_english);
    titles.push(data.title_japanese);
    for (let i in data.producers) {
      producers.push(data.producers[i].name);
    }
    getItemData(data.studios, studios);
    getItemData(data.genres, genres);
    getItemData(data.demographics, style);
  }
  return (
    <>
      {data && (
        <main>
          <aside>
            <div className="div-img">
              <img src={data.images.jpg.image_url} alt="" />
            </div>

            <div className="anime-details">
              <h2>Titulos</h2>
              <div className="div-center">
                <h4>Japonês: </h4>
                <span>{titles[1]}</span>
              </div>
              <div className="div-center">
                <h4>Inglês: </h4>
                <span>{titles[0]}</span>
              </div>
              <div className="div-center">
                <h4>Português: </h4>
                <span>{titlePortuguese}</span>
              </div>
              <div className="anime-info">
                <h1>Informações</h1>
                <hr />
                <p>
                  <strong>Tipo: </strong>
                  {data.type}
                </p>
                <p>
                  <strong>Episódios: </strong>
                  {data.episodes}
                </p>
                <p>
                  <strong>Data de lançamento: </strong>
                  {data.aired.from.slice(0, 10)}
                </p>
                <p>
                  <strong>Estrea: </strong>
                  {data.premiered ? data.premiered : data.season + data.year}
                </p>
                <p>
                  <strong>Data de lançamento: </strong>
                  {data.broadcast.string}
                </p>
                <p>
                  <strong>Produtores: </strong>
                  {producers.join(", ")}
                </p>
                <p>
                  <strong>Estúdios: </strong>
                  {studios.join(", ")}
                </p>
                <p>
                  <strong>Gêneros: </strong>
                  {genres.join(", ")}
                </p>
                <p>
                  <strong>Estilo: </strong>
                  {style.join(", ")}
                </p>
                <p>
                  <strong>Duração: </strong>
                  {data.duration}
                </p>
              </div>
            </div>
          </aside>
          <section>
            <div className="animeSynopisis">
              <h2>Sinopse</h2>
              <p>{translatedText}</p>
            </div>

            <div className="anime-info">
              <div>
                <h4>Score</h4>
                {data.score}
              </div>

              <div>
                <h4>Classificação</h4>
                {data.rank} classificado
              </div>

              <div>
                <h4>Aberturas</h4>
                {opn.join(", ")}
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};
