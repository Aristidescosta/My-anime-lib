import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Featured } from "./components/Featured/Index";
import { Navbar } from "./components/Navbar/Index";
import { RequestContext } from "./contexts/Index";
import axios from "axios";
function App() {
  const [dataRequest, setDataRequest] = useState(
    "https://api.jikan.moe/v4/seasons/now"
  );
  const [type, setType] = useState("anime");
  const [request, setRequest] = useState(null);
  
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
  
  const getTopRatedMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    //Pegando o featured
    let randomChoice = Math.floor(Math.random() * (data.data.length - 1));
    let choice = data.data[randomChoice];
    setRequest(choice);
  };

  useEffect(() => {
    // setRequest("https://api.jikan.moe/v4/seasons/now")
    getTopRatedMovie(dataRequest);
  }, [dataRequest]);
  return (
    <RequestContext.Provider
      value={{ dataRequest, setDataRequest, type, setType, traslate }}
    >
      <Navbar />
      {request && <Featured item={request} type={type} />}
      <Outlet />
    </RequestContext.Provider>
  );
}

export default App;
