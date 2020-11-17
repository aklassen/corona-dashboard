import React, { useEffect, useState } from "react";
import axios from "axios";
import { readString } from "react-papaparse";
import CoronaChart from "./CoronaChart/CoronaChart";
import CoronaTable from "./CoronaTable";
import CoronaFilter from "./CoronaFilter";

export enum CoronaDataType {
  INCIDENCE,
  CASES_PAST_WEEK,
  CONFIRMED_CASES
}

export interface CoronaContextInterface {
  coronaData: any[];
  coronaDataType: CoronaDataType;
  county: string;
  counties: string[];
  setCounty(county: string): void;
  setCoronaDataType(type: CoronaDataType): void;
}

export const CoronaContext = React.createContext<CoronaContextInterface>({
  coronaData: [],
  coronaDataType: CoronaDataType.INCIDENCE,
  county: "Osnabrück, Stadt",
  counties: ["Osnabrück, Stadt"],
  setCounty: () => {},
  setCoronaDataType: () => {},
});

function CoronaData(props: {}) {
  const [counties, setCounties] = useState([]);
  const [coronaData, setCoronaData] = useState([]);

  const [county, setCounty] = useState("Osnabrück, Stadt");
  const [coronaDataType, setCoronaDataType] = useState(CoronaDataType.INCIDENCE);

  useEffect(() => {
    axios.get(`/corona/download.php?csv_tag_region`).then((res) => {
      const parsedData: any = readString(res.data, { header: true });
      setCoronaData(parsedData.data);

      const uniqueCounties: any = [
        ...new Set<string>(
          parsedData.data.map((item: { Landkreis: string }) => item.Landkreis)
        ),
      ]
        .filter((cty: string) => cty !== undefined)
        .sort();
      setCounties(uniqueCounties);
    });
  }, []);

  const filteredCoronaData = coronaData
    .filter((data: any) => data.Landkreis === county)
    .slice(-10);

  return (
    <CoronaContext.Provider
      value={{
        coronaData: filteredCoronaData,
        coronaDataType: coronaDataType,
        county: county,
        counties: counties,
        setCounty: setCounty,
        setCoronaDataType: setCoronaDataType
      }}
    >
      <CoronaFilter></CoronaFilter>
      <CoronaChart></CoronaChart>
      <CoronaTable></CoronaTable>
    </CoronaContext.Provider>
  );
}

export default CoronaData;
