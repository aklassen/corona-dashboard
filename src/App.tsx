import {
  createStyles,
  Grid,
  GridSpacing,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import React from "react";
import "./App.css";
import CoronaData from "./components/CoronaData";
import logo from "./corona.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingLeft: 64,
      paddingRight: 64,
    },
    paper: {
      //height: 140,
      //width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  })
);

function App() {
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  return (
    <>
      <div className="App-Header">
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <img src={logo} className="App-logo" alt="logo" />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <CoronaData></CoronaData>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;

{
  /* 
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Corona Dashboard</h1>
          <CoronaData></CoronaData>
        </header>
      </div> /* */
}
