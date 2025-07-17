import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
   <Router>

     <Routes>
       <Route path="/api/regist/exhibition" element={<ExhibitionRegistration />} />
       <Route path="/api/regist/pattern" element={<PatternRegistration />} />
       <Route path="/api/regist/detailPattern" element={<DetailPatternRegistration />} />
       <Route path="/api/regist/product" element={<ProductRegistration />} />
     </Routes>
     
      <Route path="/api/delete/detailPattern" element={<DetailPatternDeletion />} />
      <Route path="/api/delete/pattern" element={<PatternDeletion />} />
      <Route path="/api/delete/product" element={<ProductDeletion />} />
      <Route path="/api/list/exhibition" element={<ExhibitionList />} />
      <Route path="/api/list/detailExhibition" element={<DetailExhibitionList />} />
      <Route path="/api/list/product" element={<ProductList />} />
    </Router>
  );
}

export default App;
