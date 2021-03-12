import { createStyles, makeStyles, Theme } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import React, { useContext } from "react";
import { CoronaContext } from "./CoronaData";

function CoronaFilter() {
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
    })
  );

  // const classes = useStyles();

  // function valuetext(value: number) {
  //   return `${value}Tage`;
  // }

  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    data.setCounty(event.target.value as string);
  }

  // function handleDataChange(event: React.ChangeEvent<{ value: unknown }>) {
  //   data.setCoronaDataType(event.target.value as CoronaDataType);
  // }
  // const handleSliderChange = (event: any, newValue: number | number[]) => {
  //   console.log(newValue as number[]);
  // };

  return (
    <>
      <InputLabel htmlFor="county-select">Landkreis</InputLabel>
      <NativeSelect
        id="county-select"
        value={data.county}
        onChange={handleChange}
      >
        {data.counties.map((data) => {
          return (
            <option key={data + new Date().getTime()} value={data}>
              {data}
            </option>
          );
        })}
      </NativeSelect>
    </>
    // <Grid container justify="center" spacing={2}>
    //   <Grid key={"county-container"} item>
    //     <Paper className={classes.paper}>
    //       <InputLabel htmlFor="county-select">Landkreis</InputLabel>
    //       <NativeSelect
    //         id="county-select"
    //         value={data.county}
    //         onChange={handleChange}
    //       >
    //         {data.counties.map((data) => {
    //           return (
    //             <option key={data + new Date().getTime()} value={data}>
    //               {data}
    //             </option>
    //           );
    //         })}
    //       </NativeSelect>
    //     </Paper>
    //   </Grid>
    //   <Grid key={"data-container"} item>
    //     <Paper className={classes.paper}>
    //       <InputLabel htmlFor="data-select">Daten</InputLabel>
    //       <NativeSelect
    //         id="data-select"
    //         value={data.coronaDataType}
    //         onChange={handleDataChange}
    //       >
    //         {" "}
    //         <option key={"incidence"} value={CoronaDataType.INCIDENCE}>
    //           {"7-Tagesinzidenz pro 100.000 Einwohner"}
    //         </option>
    //         <option key={"casesPastWeek"} value={CoronaDataType.CASES_PAST_WEEK}>
    //           {"Fälle vergangene 7-Tage"}
    //         </option>
    //         <option key={"confirmedCases"} value={CoronaDataType.CONFIRMED_CASES}>
    //           {"Bestätigte Fälle"}
    //         </option>
    //       </NativeSelect>
    //     </Paper>
    //   </Grid>
    //   <Grid key={"slider-container"} item>
    //     <Paper className={classes.paper}>
    //     <InputLabel htmlFor="date-slider">Tage</InputLabel>
    //       <Slider
    //         id="date-slider"
    //         min={0}
    //         max={100}
    //         value={[5, 29]}
    //         onChange={handleSliderChange}
    //         valueLabelDisplay="auto"
    //         aria-labelledby="range-slider"
    //         getAriaValueText={valuetext}
    //       />
    //     </Paper>
    //   </Grid>
    // </Grid>
  );
}

export default CoronaFilter;
