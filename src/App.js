import logo from './corona.svg';
import './App.css';
import CoronaData from './components/CoronaData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Corona Dashboard</h1>
        <CoronaData></CoronaData>
      </header>
    </div>
  );
}

export default App;
