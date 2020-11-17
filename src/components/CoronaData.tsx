import React from "react";
import axios from "axios";
import { readString } from "react-papaparse";
import CoronaChart from "./CoronaChart/CoronaChart";
import CoronaTable from "./CoronaTable";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";


interface CoronaDataState {
  coronaData: any[];
  county: string;
}

export const CoronaContext = React.createContext<any[]>([]);

export default class CoronaData extends React.Component<{}, CoronaDataState> {
  constructor(props: {}) {
    super(props);
    this.state = { coronaData: [], county: "Osnabrück, Stadt" };
  }

  componentDidMount() {
    axios.get(`/corona/download.php?csv_tag_region`).then((res) => {
      const parsedData: any = readString(res.data, { header: true });

      this.setState({
        coronaData: parsedData.data
          .filter(
            (data: any) => data.Landkreis === "Osnabrück, Stadt"
            //(data) => data.Landkreis === 'Osnabrück'
            //(data) => data.Landkreis === 'Emsland'
            // (data) => data.Landkreis === 'Hannover, Region'
          )
          .slice(-10),
      });
    });
  }
  handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    console.log(event.target.value);
    //this.setState({county: event.target.value as string});
  }

  render() {
    return (
      <CoronaContext.Provider value={this.state.coronaData}>
        <FormControl>
          
          <InputLabel htmlFor="county-select" >Landkreis</InputLabel>
          <NativeSelect
            id="county-select"
            value={this.state.county}
            onChange={this.handleChange.bind(this)}
          >
            <option value="Osnabrück, Stadt">Osnabrück, Stadt</option>
            <option value="Osnabrück">Osnabrück</option>
            <option value="Emsland">Emsland</option>
            <option value="Hannover, Region">Hannover, Region</option>
            
          </NativeSelect>
        </FormControl>
        <CoronaChart data={this.state.coronaData}></CoronaChart>
        <CoronaTable></CoronaTable>
      </CoronaContext.Provider>
    );
  }
}
