import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpecialExhibition from './pages/specialexhibition/SpecialExhibition';
import Main from './pages/main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/exhibition" element={<SpecialExhibition />} />
      </Routes>
    </Router>
  );
}

export default App;