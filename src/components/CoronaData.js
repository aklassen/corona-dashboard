import React from 'react';
import axios from 'axios';
import { readString } from 'react-papaparse';
import CoronaChart from './CoronaChart/CoronaChart';
import CoronaTable from './CoronaTable';

export default class CoronaData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { coronaData: [] };
  }

  componentDidMount() {
    axios.get(`/corona/download.php?csv_tag_region`).then((res) => {
      const parsedData = readString(res.data, { header: true });
      this.setState({
        coronaData: parsedData.data.filter(
          (data) => data.Landkreis === 'Osnabrück, Stadt'
          //(data) => data.Landkreis === 'Osnabrück'
          //(data) => data.Landkreis === 'Emsland'
          // (data) => data.Landkreis === 'Hannover, Region'
        ).slice(-10),
      });
    });
  }

  render() {
    return (
      <div>    
        <CoronaChart data={this.state.coronaData}></CoronaChart>
        <CoronaTable data={this.state.coronaData}></CoronaTable>
      </div>
    );
  }
}
