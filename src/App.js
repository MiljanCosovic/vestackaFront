
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import PytnikPocetna from './Pytnik/PytnikPocetna';
import Pytnik from './Pytnik/Pytnik';

function App() {
  return (

    <Routes>
    <Route path="/" element={<PytnikPocetna/>}></Route>
    <Route path="/igra" element={<Pytnik/>}></Route>
   <Route path='/**' element={<p>404</p>}></Route>
    </Routes>

  );
}

export default App;
