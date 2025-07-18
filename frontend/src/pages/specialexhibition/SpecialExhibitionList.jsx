import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import specialexhibitionAPI from '../../services/specialexhibition/specialexhibition';

const SpecialExhibitionList = () => {
  const navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState([]);
  const [filteredExhibitions, setFilteredExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 필터 상태
  const [filters, setFilters] = useState({
    brand: '',
    theme: '',
    searchTerm: ''
  });

  // 브랜드, 테마 옵션
  const brandOptions = ['kuhoplus', '10CorsoComo', '8SECONDS', 'AMI', 'ANOTHERSHOP', 'BEANPOLE', 'BEANPOLEKIDS', 'BEANPOLEMEN', 'BEANPOLELADIES', 'BEANPOLEGOLF', 'BEANPOLEACCESSORY', 'Alice+Olivia', 'BEAKER'];
  const themeOptions = ['NEWARRIVALS', 'SALES', 'REVIEWS', 'POP-UP STORE'];

  useEffect(() => {
    fetchExhibitions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [exhibitions, filters]);

  const fetchExhibitions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await specialexhibitionAPI.getList();
      
      // console.log('API 응답:', response);
      
      const exhibitions = response.data.exhibitionList || [];
      
      // 활성화된 기획전만 필터링
      const activeExhibitions = exhibitions.filter(exhibition => exhibition.prdGrView === 'Y');
      setExhibitions(activeExhibitions);
    } catch (err) {
      console.error('기획전 목록 조회 실패:', err);
      setError('기획전 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = exhibitions;

    // 브랜드 필터
    if (filters.brand && filters.brand !== 'ALL') {
      filtered = filtered.filter(exhibition => exhibition.prdGrBr === filters.brand);
    }

    // 테마 필터
    if (filters.theme && filters.theme !== 'ALL') {
      filtered = filtered.filter(exhibition => exhibition.prdGrTm === filters.theme);
    }

    setFilteredExhibitions(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleExhibitionClick = (exhibitionId) => {
    // 기획전 상세 페이지로 이동
    navigate(`/exhibition/${exhibitionId}`);
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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>
        기획전
      </h1>

      {/* 필터 영역 - 드롭다운 */}
      <div style={{
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          
          {/* 브랜드 드롭다운 */}
          <div style={{ position: 'relative', minWidth: '150px' }}>
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 15px',
                backgroundColor: 'white',
                fontSize: '15px',
                cursor: 'pointer',
                backgroundSize: '12px'
              }}
            >
              <option value="">모든 브랜드</option>
              {brandOptions.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* 테마 드롭다운 */}
          <div style={{ position: 'relative', minWidth: '150px' }}>
            <select
              value={filters.theme}
              onChange={(e) => handleFilterChange('theme', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 15px',
                backgroundColor: 'white',
                fontSize: '15px',
                cursor: 'pointer',
                backgroundSize: '12px'
              }}
            >
              <option value="">NEW ARRIVALS</option>
              {themeOptions.map(theme => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 기획전 목록 */}
      {filteredExhibitions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          <h3>조건에 맞는 기획전이 없습니다.</h3>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 338px)',
          gap: '25px',
          justifyContent: 'center'
        }}>
          
          {filteredExhibitions.map(exhibition => (
            <div
              key={exhibition.prdGrIdx}
              style={{
                width: '338px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
              onClick={() => handleExhibitionClick(exhibition.prdGrIdx)}
            >
              {/* 기획전 이미지 - 고정 크기 */}
              <div style={{ 
                width: '338px', 
                height: '450.98px', 
                position: 'relative'
              }}>
                <img
                  src={`http://localhost:8081/images/${exhibition.prdGrImg}`}
                  alt={exhibition.prdGrName}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    // 여러 확장자 순차적으로 시도
                    if (e.target.src.includes('.jpg')) {
                      e.target.src = `http://localhost:8081/images/${exhibition.prdGrImg}.jpeg`;
                    } else if (e.target.src.includes('.jpeg')) {
                      e.target.src = `http://localhost:8081/images/${exhibition.prdGrImg}.jfif`;
                    } else if (e.target.src.includes('.jfif')) {
                      e.target.src = `http://localhost:8081/images/${exhibition.prdGrImg}.png`;
                    } else if (e.target.src.includes('.png')) {
                      e.target.src = `http://localhost:8081/images/${exhibition.prdGrImg}.gif`;
                    } else if (e.target.src.includes('.gif')) {
                      e.target.src = `http://localhost:8081/images/${exhibition.prdGrImg}.webp`;
                    } else if (e.target.src.includes('.webp')) {
                      e.target.src = `http://localhost:8081/images/${exhibition.prdGrImg}.bmp`;
                    } else if (e.target.src.includes('.bmp')) {
                      e.target.src = `http://localhost:8081/images/${exhibition.prdGrImg}.svg`;
                    } else if (e.target.src.includes('.svg')) {
                      e.target.src = `http://localhost:8081/images/${exhibition.prdGrImg}.tiff`;
                    } else if (e.target.src.includes('.tiff')) {
                      e.target.src = `http://localhost:8081/images/${exhibition.prdGrImg}.tif`;
                    } else if (e.target.src.includes('.tif')) {
                      // 확장자 없이 시도
                      e.target.src = `http://localhost:8081/images/${exhibition.prdGrImg}`;
                    } else {
                      // 모든 확장자 실패시 대체 이미지
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div style={{
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f8f9fa',
                  color: '#6c757d',
                  fontSize: '14px',
                  textAlign: 'center',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}>
                  이미지 준비 중<br/>
                  {exhibition.prdGrImg}
                </div>
              </div>

              {/* 기획전 정보 */}
              <div style={{ padding: '20px' }}>
                <h3 style={{
                  margin: '0 0 12px 0',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#333',
                  lineHeight: '1.4'
                }}>
                  {exhibition.prdGrName}
                </h3>

                <div style={{ marginBottom: '12px' }}>
                 
                    {exhibition.prdGrBr}
                    {/* {exhibition.prdGrTm} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialExhibitionList;