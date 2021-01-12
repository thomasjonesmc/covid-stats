import React, { useState, useEffect, memo } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

export const USMap = ({ setContent, covidData }) => {
  //geoUrl holds the topojson file required to build the map with react-simple-maps
  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
  const numberFormat = Intl.NumberFormat();

  return (
    <>
      <ComposableMap data-tip="" projection="geoAlbersUsa">
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const state = covidData.find(
                  ({ state }) => state === geo.properties.name
                );
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke={"#FFF"}
                    onMouseEnter={() => {
                      const NAME = geo.properties.name;
                      setContent({
                        state: NAME,
                        total: numberFormat.format(state.positive),
                        positive: numberFormat.format(state.positive),
                        population: numberFormat.format(state.population),
                        percent:
                          ((state.positive / state.population) * 100).toFixed(
                            3
                          ) + "%",
                      });
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                    style={{
                      default: {
                        fill: "#DDD",
                      },
                      hover: {
                        fill: "#b58173",
                      },
                      pressed: {
                        fill: "#b59373",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(USMap);
