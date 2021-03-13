import { Box, Grid, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { readString } from 'react-papaparse';
import CoronaChart from './CoronaChart/CoronaChart';
import CoronaFilter from './CoronaFilter';
import CoronaTable from './CoronaTable';
import CountyFilter from './CountyFilter';

export enum CoronaDataType {
  INCIDENCE,
  CASES_PAST_WEEK,
  CONFIRMED_CASES,
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
  county: 'Osnabrück, Stadt',
  counties: ['Osnabrück, Stadt'],
  setCounty: () => {},
  setCoronaDataType: () => {},
});

function CoronaData(props: {}) {
  const [counties, setCounties] = useState([]);
  const [coronaData, setCoronaData] = useState([]);

  const [county, setCounty] = useState('Osnabrück, Stadt');
  const [coronaDataType, setCoronaDataType] = useState(
    CoronaDataType.INCIDENCE
  );

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
        setCoronaDataType: setCoronaDataType,
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <CoronaChart></CoronaChart>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Paper>
            <CountyFilter></CountyFilter>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <CoronaTable></CoronaTable>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box mx="auto" p={1}>
            <Typography variant="caption" display="block" gutterBottom>
              🦠 Datenbasis{' '}
              <a
                href="https://www.niedersachsen.de/Coronavirus/aktuelle_lage_in_niedersachsen/"
                target="_blank"
              >
                Land Niedersachsen
              </a>{' '}
              Made 2021 with ❤️ in Osnabrück
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </CoronaContext.Provider>
  );
}

export default CoronaData;
