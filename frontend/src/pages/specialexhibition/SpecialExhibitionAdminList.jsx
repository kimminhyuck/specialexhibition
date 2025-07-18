import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import specialexhibitionAPI from '../../services/specialexhibition/specialexhibition';
import ActionButton from '../../components/button/ActionButton';

const SpecialExhibitionAdminList = () => {
  const navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      setLoading(true);
      setError(null); 
      const response = await specialexhibitionAPI.getList();
      
      const exhibitions = response.data.exhibitionList || [];
      setExhibitions(exhibitions);
    } catch (err) {
      console.error('기획전 목록 조회 실패:', err);
      setError('기획전 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = (exhibitionId, exhibitionName) => {
    console.log(`기획전 "${exhibitionName}"에 상품 등록:`, exhibitionId);
    // 상품 등록 페이지로 이동
    navigate(`/admin/exhibition/${exhibitionId}/product/register`);
  };

  const handleAddPattern = (exhibitionId, exhibitionName) => {
    console.log(`기획전 "${exhibitionName}"에 상세 패턴 등록:`, exhibitionId);
    // 상세 패턴 등록 페이지로 이동
    navigate(`/admin/exhibition/${exhibitionId}/pattern/register`);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>로딩 중...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <h2>오류 발생</h2>
        <p>{error}</p>
        <button onClick={fetchExhibitions}>다시 시도</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#333' }}>기획전 관리</h1>
        <ActionButton
          onClick={() => navigate('/admin/exhibition/register')}
        >
          + 새 기획전 등록
        </ActionButton>
      </div>

      <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
        총 {exhibitions.length}개의 기획전 (활성화: {exhibitions.filter(ex => ex.prdGrView === 'Y').length}개)
      </div>

      {/* 기획전 카드 목록 - 4개씩 배치 */}
      {exhibitions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          <h3>등록된 기획전이 없습니다.</h3>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {exhibitions.map((exhibition) => (
            <div
              key={exhibition.prdGrIdx}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: '1px solid #ddd',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
            >
              {/* 기획전 헤더 */}
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '12px', 
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ 
                    margin: '0 0 3px 0', 
                    color: '#333',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '150px'
                  }}>
                    {exhibition.prdGrName}
                  </h4>
                  <span style={{ 
                    fontSize: '10px', 
                    color: '#666',
                    fontWeight: 'bold'
                  }}>
                    ID: {exhibition.prdGrIdx}
                  </span>
                </div>
                <span style={{
                  padding: '3px 6px',
                  backgroundColor: exhibition.prdGrView === 'Y' ? '#28a745' : '#dc3545',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  {exhibition.prdGrView === 'Y' ? '활성화' : '비활성화'}
                </span>
              </div>

              {/* 기획전 이미지 */}
              <div style={{ height: '150px', overflow: 'hidden' }}>
                <img
                  src={`http://localhost:8081/images/${exhibition.prdGrImg}`}
                  alt={exhibition.prdGrName}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    console.log('이미지 로드 실패:', e.target.src);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#e9ecef',
                  color: '#6c757d',
                  fontSize: '12px',
                  textAlign: 'center'
                }}>
                  이미지 로드 실패<br/>
                  {exhibition.prdGrImg}
                </div>
              </div>

              {/* 기획전 정보 */}
              <div style={{ padding: '15px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
                    <span style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontSize: '10px'
                    }}>
                      {exhibition.prdGrBr}
                    </span>
                    <span style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontSize: '10px'
                    }}>
                      {exhibition.prdGrTm}
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '11px', color: '#666', marginBottom: '3px' }}>
                    전시 기간: {exhibition.prdGrPeriod}
                  </div>
                  
                  {exhibition.prdGrSale && (
                    <div style={{ fontSize: '11px', color: '#dc3545', fontWeight: 'bold' }}>
                      할인율: {exhibition.prdGrSale}%
                    </div>
                  )}
                </div>

                {/* 상세 패턴/상품 등록 버튼 */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '8px'
                }}>
                  <ActionButton
                    onClick={() => handleAddPattern(exhibition.prdGrIdx, exhibition.prdGrName)}
                  >
                    상세 패턴 등록
                  </ActionButton>

                <ActionButton
                  onClick={() => handleAddProduct(exhibition.prdGrIdx, exhibition.prdGrName)}
                >
                  상품 등록
                </ActionButton>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialExhibitionAdminList;