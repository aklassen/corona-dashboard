import React from 'react';

export default class CoronaTable extends React.Component {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Landkreis</th>
            <th>7-Tagesinzidenz</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((data, index) => (
            <tr key={index}>
              <td> {data.Meldedatum} </td>
              <td> {data.Landkreis} </td>
              <td> {data['7-Tagesinzidenz pro 100.000 Einwohner']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
