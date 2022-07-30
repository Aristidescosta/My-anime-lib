import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BsPlayBtn, BsPlus } from "react-icons/bs";
import "./style.css";
import { RequestContext } from "../../contexts/Index";

export const Featured = ({ item, type }) => {
  const [translatedText, setTranslatedText] = useState("");
  const { traslate } = useContext(RequestContext);
  let description = item.synopsis;

  if (description.length > 300) {
    description = description.substring(0, 300) + "...";
    traslate(description, setTranslatedText);
    description = translatedText;
  } else {
    traslate(description, setTranslatedText);
    description = translatedText;
  }
  let genres = [];
  for (let i in item.genres) {
    genres.push(item.genres[i].name);
  }
  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${item.images.jpg.image_url})`,
      }}
    >
      <div className="featured-vertical">
        <div className="featured-vertical">
          <div className="featured-horizontal">
            <div className="featured-name">{item.title}</div>
            <div className="featured-info">
              <div className="featured-points">{item.score} pontos</div>
              {item.year ? (
                <div className="featured-year">{item.year}</div>
              ) : (
                <div className="featured-year">
                  {item.published.prop.from.year}
                </div>
              )}
              <div className="featured-season">
                {item.type === type
                  ? `${item.volumes} Volume${item.volumes > 1 ? "s" : ""}`
                  : ""}
              </div>
            </div>
            <div className="featured-overview">{description}</div>
            <div className="featured-buttons">
              {item.trailer && (
                <a
                  className="btn btn-watch"
                  style={{
                    backgroundImage: `url(${item.trailer.images.image_url})`,
                  }}
                  href={item.trailer.url}
                >
                  <div>
                    <BsPlayBtn /> Assistir
                  </div>
                </a>
              )}
              <a className="btn btn-list" href={`/list/add/${item.id}`}>
                <div>
                  <BsPlus /> Minha lista
                </div>
              </a>
            </div>
            <div className="feature-genres">
              <strong>Gêneros: </strong>
              {genres.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
