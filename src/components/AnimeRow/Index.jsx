import React, { useState } from "react";
import "./style.css";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

export const AnimeRow = ({ title, items }) => {
  const [scrollX, setScrollX] = useState(-400);
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) x = 0;
    setScrollX(x);
  };

  const handleRigthArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.data.length * 150;
    if (window.innerWidth - listW > x) x = window.innerWidth - listW - 60;
    setScrollX(x);
  };

  return (
    <div className="animeRow">
      <h2>{title}</h2>
      <div className="animeRow-left" onClick={handleLeftArrow}>
        <BsArrowLeft style={{ fontSize: 50 }} />
      </div>

      <div className="animeRow-rigth" onClick={handleRigthArrow}>
        <BsArrowRight style={{ fontSize: 50 }} />
      </div>
      <div className="animeRow-listareas">
        <div
          className="animeRow-list"
          style={{ marginLeft: scrollX, width: items.data.length * 150 }}
        >
          {items.data &&
            items.data.map((item, key) => (
              <div key={key} className="animeRow-item">
                <img
                  src={`${item.images.jpg.image_url}`}
                  alt={`imagem do ${item.type === "Manga" ? "manga" : "anime"}`}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
