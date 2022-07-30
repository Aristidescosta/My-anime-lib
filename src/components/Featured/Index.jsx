import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BsPlayBtn, BsPlus } from "react-icons/bs";
import "./style.css";
import { RequestContext } from "../../contexts/Index";

export const Featured = ({ item, type }) => {
  const [translatedText, setTranslatedText] = useState("");
  const [btnShow, setBtnShow] = useState(false);
  const { traslate } = useContext(RequestContext);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (item.synopsis.length > 300) {
      setDescription(item.synopsis.substring(0, 300) + "...");
      traslate(description, setTranslatedText);
      setDescription(translatedText);
    } else {
      traslate(description, setTranslatedText);
      setDescription(translatedText);
    }
  }, []);
  let genres = [];
  for (let i in item.genres) {
    genres.push(item.genres[i].name);
  }
  const code = item.trailer.url.slice(item.trailer.url.lastIndexOf("=") + 1);
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
                <div className="modal">
                  <a
                    className="btn btn-watch"
                    style={{
                      backgroundImage: `url(${item.trailer.images.image_url})`,
                    }}
                    href="#"
                    onClick={() => setBtnShow(!btnShow)}
                  >
                    <div>
                      <BsPlayBtn /> Assistir
                    </div>
                  </a>

                  <div
                    className={
                      btnShow ? "video-container show" : "video-container"
                    }
                  >
                    <span
                      className="close"
                      onClick={() => setBtnShow(!btnShow)}
                    >
                      &#10006;
                    </span>
                    <iframe
                      src={`https://www.youtube.com/embed/${code}?enablejsapi=1&wmode=opaque&autoplay=1`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
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
