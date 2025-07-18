import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpecialExhibition from './pages/specialexhibition/SpecialExhibition';
import Main from './pages/main';
import SpecialExhibitionAdminList from './pages/specialexhibition/SpecialExhibitionAdminList';
import Layout from './common/layout/Layout';
import SpecialExhibitionList from './pages/specialexhibition/SpecialExhibitionList';
import SpecialExhibitionpatternreg from './pages/specialexhibition/SpecialExhibitionpatternreg';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>

        {/* 일반 사용자 페이지 */}

        {/* 메인 페이지 */}
        <Route path="/" element={<Main />} />

        {/* 기획전 리스트 페이지 */}
        <Route path="/exhibition/detail" element={<SpecialExhibitionList />} />


        {/* 관리자 페이지 */}

        {/* 기획전 등록 */}
        <Route path="/admin/exhibition/register" element={<SpecialExhibition />} />

        {/* 기획전 관리 */}
        <Route path="/admin/exhibition" element={<SpecialExhibitionAdminList />} />

        {/* 기획전 패턴&상품 등록 */}
        <Route path="/admin/exhibition/:exhibitionId/pattern/register" element={<SpecialExhibitionpatternreg />} />

      </Routes>
        </Layout>
    </Router>
  );
}

export default App;