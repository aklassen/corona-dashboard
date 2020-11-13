import React from 'react';
import axios from 'axios';
import { readString } from 'react-papaparse';

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
        ),
      });
    });
  }

  render() {
    return (
      <table>
        {this.state.coronaData.map((data, index) => (
          <tr key={index}>
            <td> {data.Meldedatum} </td>
            <td> {data.Landkreis} </td>
            <td> {data['7-Tagesinzidenz pro 100.000 Einwohner']}</td>
          </tr>
        ))}
      </table>
    );
  }
}
