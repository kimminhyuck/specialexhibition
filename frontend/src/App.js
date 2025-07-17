import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpecialExhibition from './pages/specialexhibition/SpecialExhibition';
import Main from './pages/main';
import SpecialExhibitionAdminList from './pages/specialexhibition/SpecialExhibitionAdminList';
import Layout from './common/layout/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>

        {/* 일반 페이지 */}

        {/* 메인 페이지 */}
        <Route path="/" element={<Main />} />

        {/* 기획전 리스트 페이지 */}
        <Route path="/exhibition/detail" element={<div>사용자 기획전 리스트 페이지</div>} />



        {/* 관리자 페이지 */}

        {/* 기획전 등록 */}
        <Route path="/exhibition" element={<SpecialExhibition />} />

        {/* 기획전 관리 */}
        <Route path="/admin/exhibition" element={<SpecialExhibitionAdminList />} />

      </Routes>
        </Layout>
    </Router>
  );
}

export default App;