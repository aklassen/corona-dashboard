import {
  Chip,
  createStyles,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography,
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import React, { useContext } from 'react';
import { CoronaContext, CoronaDataType } from './CoronaData';
import WhatshotIcon from '@material-ui/icons/Whatshot';

function CountyFilter() {
  const data = useContext(CoronaContext);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        height: 50,
        width: 350,
        padding: 8,
      },
      control: {
        padding: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
      },
    })
  );

  const classes = useStyles();

  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    data.setCounty(event.target.value as string);
  }

  function chipContent(data: any[]): string {
    if (data.length > 0) {
      const date = data[data.length - 1]['Meldedatum'];
      const incidence =
        data[data.length - 1]['7-Tagesinzidenz pro 100.000 Einwohner'];
      return `${incidence}`;
    } else return 'Keine Daten vorhanden';
  }

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
      spacing={4}
    >
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="countyLabel" variant="standard">
            Landkreis
          </InputLabel>
          <Select
            labelId="countyLabel"
            value={data.county}
            onChange={handleChange}
          >
            {data.counties.map((data) => {
              return (
                <MenuItem key={data + new Date().getTime()} value={data}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Chip
          variant="outlined"
          color="secondary"
          icon={<WhatshotIcon />}
          label={chipContent(data.coronaData)}
        />
      </Grid>
    </Grid>
  );
}

export default CountyFilter;
