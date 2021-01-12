import React, { useState, useEffect } from "react";
import Axios from "axios";
import ReactTooltip from "react-tooltip";
import abbreviations from "./util/abbreviations";
import "./App.css";
import USMap from "./components/USMap";
import popsByState from "./data/popsByState";

function App() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [covidData, setCovidData] = useState(null);

  useEffect(() => {
    let fetchData = async () => {
      let data = await Axios.get(
        "https://api.covidtracking.com/v1/states/current.json"
      );
      console.log(popsByState);
      let updatedDataWithPopulation = data.data.map((abbrev) => {
        return {
          ...abbrev,
          state: abbreviations[abbrev.state],
          population: popsByState[abbreviations[abbrev.state]],
        };
      });

      setCovidData(updatedDataWithPopulation);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);

  return (
    <div className="App">
      {loading ? (
        "Loading..."
      ) : (
        <>
          <USMap setContent={setContent} covidData={covidData} />
          {content ? (
            <ReactTooltip>
              {`
              ${content.state} - 
              Population: ${content.population}
              Total tested positive: ${content.positive} 
              Total percentage infected: ${content.percent}
              `}
            </ReactTooltip>
          ) : null}
        </>
      )}
    </div>
  );
}

export default App;
