import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ActionButton from '../../components/button/ActionButton';
import specialexhibitionAPI from '../../services/specialexhibition/specialexhibition';

const SpecialExhibitionPatternRegister = () => {
  const { exhibitionId } = useParams();
  const navigate = useNavigate();
  
  
  // 패턴 정보 폼 상태
  const [patternInfoForm, setPatternInfoForm] = useState({
    prdptType: 'img1',
    prdptSort: '',
    prdptView: true
  });

  // 패턴 상세 폼 상태
  const [patternDetailForm, setPatternDetailForm] = useState({
    ptdetailType: '',
    ptdetailImg: null,
    ptdetailDesc: '',
    ptdetailMv: ''
  });

  const [exhibitionInfo, setExhibitionInfo] = useState(null);
  const [patternInfoList, setPatternInfoList] = useState([]);
  const [patternDetailList, setPatternDetailList] = useState([]);
  const [selectedPatternIdx, setSelectedPatternIdx] = useState(null);
  const [showDetailSection, setShowDetailSection] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // 상품 관련 상태 추가
  const [productList, setProductList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [exhibitionProductList, setExhibitionProductList] = useState([]);

  // 패턴 타입 옵션
  const patternTypeOptions = [
    { value: 'img1', label: '2단이미지' },
    { value: 'img2', label: '4단이미지' },
    { value: 'text', label: '텍스트' },
    { value: 'movie', label: '동영상' }
  ];

 useEffect(() => {
  console.log('컴포넌트 마운트, exhibitionId:', exhibitionId);
  if (exhibitionId) {
    console.log('API 호출 시작');
    fetchExhibitionInfo();
    fetchPatternInfoList();
    fetchProductList();
    fetchExhibitionProductList();
  } else {
    console.log('exhibitionId가 없음');
  }
}, [exhibitionId]);

  // 패턴 타입 변경 시 상세 필드 업데이트
  useEffect(() => {
    updateDetailFields();
  }, [patternInfoForm.prdptType]);

  const fetchExhibitionInfo = async () => {
    try {
      console.log('기획전 ID로 조회 중:', exhibitionId);
      const response = await specialexhibitionAPI.getDetail(exhibitionId);
      console.log('기획전 정보 전체 응답:', response);
      console.log('response.data:', response.data);
      
      // 다양한 응답 구조 대응
      let exhibitionData = null;
      
      if (response.data) {
        // 응답 구조 확인
        if (response.data.exhibition) {
          exhibitionData = response.data.exhibition;
        } else if (response.data.prdGrName) {
          exhibitionData = response.data;
        } else if (Array.isArray(response.data) && response.data.length > 0) {
          exhibitionData = response.data[0];
        } else {
          exhibitionData = response.data;
        }
      }
      
      console.log('추출된 exhibitionData:', exhibitionData);
      
      if (exhibitionData) {
        setExhibitionInfo({
          prdGrIdx: exhibitionData.prdGrIdx || exhibitionId,
          prdGrName: exhibitionData.prdGrName || exhibitionData.prdgrName || `기획전 ${exhibitionId}`
        });
      } else {
        throw new Error('기획전 데이터를 찾을 수 없습니다.');
      }
      
    } catch (error) {
      console.error('기획전 정보 조회 실패:', error);
      console.error('에러 상세:', error.message);
      
      // 실패 시 기본값 설정
      setExhibitionInfo({
        prdGrIdx: exhibitionId,
        prdGrName: `기획전 ${exhibitionId} (정보 로드 실패)`
      });
    }
  };

  const fetchPatternInfoList = async () => {
    try {
      const response = await specialexhibitionAPI.getPatternList(exhibitionId);
      setPatternInfoList([
        // 임시 데이터
        { prdptIdx: 1, prdptType: 'img1', prdptSort: 1, prdptView: 'Y' },
        { prdptIdx: 2, prdptType: 'img2', prdptSort: 2, prdptView: 'N' },
        { prdptIdx: 3, prdptType: 'text', prdptSort: 3, prdptView: 'Y' },
      ]);
    } catch (error) {
      console.error('패턴 목록 조회 실패:', error);
    }
  };

  const fetchPatternDetailList = async (prdptIdx) => {
    try {
      const response = await specialexhibitionAPI.getDetail(prdptIdx);
      setPatternDetailList([
      ]);
    } catch (error) {
      console.error('패턴 상세 목록 조회 실패:', error);
    }
  };

  // 전체 상품 목록 조회
  const fetchProductList = async () => {
    try {
      const response = await specialexhibitionAPI.getProducts(exhibitionId);
      console.log('상품 목록:', response.data);
      
      // API 응답 구조에 맞게 수정
      const products = response.data.products || response.data || [];
      setProductList(products);
    } catch (error) {
      console.error('상품 목록 조회 실패:', error);
      // 실패 시 임시 데이터 사용
      setProductList([
        { prdIdx: 1, prdName: '테스트 상품 1', prdPrice: 50000, prdBrand: 'BEANPOLE' },
        { prdIdx: 2, prdName: '테스트 상품 2', prdPrice: 75000, prdBrand: 'AMI' },
        { prdIdx: 3, prdName: '테스트 상품 3', prdPrice: 120000, prdBrand: '8SECONDS' },
      ]);
    }
  };

  // 기획전 상품 목록 조회
  const fetchExhibitionProductList = async () => {
    try {
      const response = await specialexhibitionAPI.getProducts(exhibitionId);
      console.log('기획전 상품 목록:', response.data);
      
      // 기획전에 등록된 상품만 필터링
      const exhibitionProducts = response.data.exhibitionProducts || [];
      setExhibitionProductList(exhibitionProducts);
    } catch (error) {
      console.error('기획전 상품 목록 조회 실패:', error);
      setExhibitionProductList([]);
    }
  };

  const updateDetailFields = () => {
    const type = patternInfoForm.prdptType;
    if (type === 'img1' || type === 'img2') {
      setPatternDetailForm(prev => ({ ...prev, ptdetailType: 'img' }));
    } else if (type === 'text') {
      setPatternDetailForm(prev => ({ ...prev, ptdetailType: 'text' }));
    } else if (type === 'movie') {
      setPatternDetailForm(prev => ({ ...prev, ptdetailType: 'movie' }));
    }
  };

  const validateSortOrder = (order) => {
    return !patternInfoList.some(item => item.prdptSort === parseInt(order));
  };

  const getDisplayType = (typeCode) => {
    const option = patternTypeOptions.find(opt => opt.value === typeCode);
    return option ? option.label : typeCode;
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      if (url.length === 11 && /^[a-zA-Z0-9_-]+$/.test(url)) {
        return url;
      }
      return null;
    }
  };

  // 패턴 정보 폼 핸들러
  const handlePatternInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPatternInfoForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 패턴 상세 폼 핸들러
  const handlePatternDetailChange = (e) => {
    const { name, value, type } = e.target;
    if (name === 'ptdetailMv') {
      const videoId = getYouTubeId(value);
      setPatternDetailForm(prev => ({
        ...prev,
        [name]: videoId || value
      }));
    } else {
      setPatternDetailForm(prev => ({
        ...prev,
        [name]: type === 'file' ? e.target.files : value
      }));
    }
  };

  // 패턴 정보 추가
  const handleAddPatternInfo = async (e) => {
    e.preventDefault();
    
    const { prdptSort } = patternInfoForm;
    
    if (!/^\d{1,3}$/.test(prdptSort.toString().trim())) {
      alert('패턴 순서를 입력해주세요');
      return;
    }
    
    if (!validateSortOrder(prdptSort)) {
      alert('패턴 순서는 중복될 수 없습니다.');
      return;
    }

    try {
      setLoading(true);
      
      const submitData = new FormData();
      submitData.append('prdGrIdx', exhibitionId);
      submitData.append('prdptType', patternInfoForm.prdptType);
      submitData.append('prdptSort', patternInfoForm.prdptSort);
      submitData.append('prdptView', patternInfoForm.prdptView ? 'Y' : 'N');

      const response = await specialexhibitionAPI.createPattern(submitData);
      console.log('패턴 등록 응답:', response.data);
      
      alert('패턴 정보가 추가되었습니다.');
      setPatternInfoForm({
        prdptType: 'img1',
        prdptSort: '',
        prdptView: true
      });
      
      // 목록 새로고침
      fetchPatternInfoList();
      
    } catch (error) {
      console.error('패턴 정보 추가 실패:', error);
      alert('패턴 정보 추가에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 패턴 상세 추가
  const handleAddPatternDetail = async (e) => {
    e.preventDefault();
    
    const { ptdetailType, ptdetailImg, ptdetailDesc, ptdetailMv } = patternDetailForm;
    
    // 유효성 검사
    if (ptdetailType === 'img') {
      const needCount = patternInfoForm.prdptType === 'img1' ? 2 : 
                       patternInfoForm.prdptType === 'img2' ? 4 : 1;
      if (!ptdetailImg || ptdetailImg.length !== needCount) {
        alert(`${getDisplayType(patternInfoForm.prdptType)} 유형은 이미지를 ${needCount}개 선택해야 합니다.`);
        return;
      }
    } else if (ptdetailType === 'text' && !ptdetailDesc.trim()) {
      alert('텍스트 내용을 입력해주세요.');
      return;
    } else if (ptdetailType === 'movie' && !ptdetailMv.trim()) {
      alert('동영상 정보를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('prdptIdx', selectedPatternIdx);
      formData.append('ptdetailType', ptdetailType);
      
      if (ptdetailType === 'img' && ptdetailImg) {
        Array.from(ptdetailImg).forEach(file => {
          formData.append('ptdetailImg', file);
        });
      } else if (ptdetailType === 'text') {
        formData.append('ptdetailDesc', ptdetailDesc);
      } else if (ptdetailType === 'movie') {
        formData.append('ptdetailMv', ptdetailMv);
      }

      const response = await specialexhibitionAPI.createDetailPattern(formData);
      console.log('상세 패턴 등록 응답:', response.data);
      
      alert('상세 정보가 추가되었습니다.');
      setPatternDetailForm({
        ptdetailType: '',
        ptdetailImg: null,
        ptdetailDesc: '',
        ptdetailMv: ''
      });
      
      // 파일 input 초기화
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
      // 상세 목록 새로고침
      fetchPatternDetailList(selectedPatternIdx);
      
    } catch (error) {
      console.error('패턴 상세 추가 실패:', error);
      alert('패턴 상세 추가에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 패턴 정보 행 클릭
  const handlePatternInfoClick = (patternInfo) => {
    setSelectedPatternIdx(patternInfo.prdptIdx);
    setShowDetailSection(true);
    updateDetailFields();
    fetchPatternDetailList(patternInfo.prdptIdx);
  };

  // 상품 선택 처리
  const handleProductSelect = (productId, isSelected) => {
    if (isSelected) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  // 선택된 상품들을 기획전에 추가
  const handleAddProductsToExhibition = async () => {
    if (selectedProducts.length === 0) {
      alert('추가할 상품을 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      
      const submitData = new FormData();
      submitData.append('prdGrIdx', exhibitionId);
      selectedProducts.forEach(productId => {
        submitData.append('productIds', productId);
      });

      const response = await specialexhibitionAPI.createProduct(submitData);
      console.log('상품 추가 응답:', response.data);
      
      alert(`${selectedProducts.length}개의 상품이 기획전에 추가되었습니다.`);
      setSelectedProducts([]);
      
      // 기획전 상품 목록 새로고침
      fetchExhibitionProductList();
      
    } catch (error) {
      console.error('상품 추가 실패:', error);
      alert('상품 추가에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1400px', 
      margin: '0 auto',
      backgroundColor: 'white',
      minHeight: '100vh'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 10px 0' }}>패턴 등록</h2>
        <ActionButton
          onClick={() => navigate('/admin/exhibition')}
          backgroundColor="#6c757d"
          padding="8px 16px"
          fontSize="14px"
        >
          리스트로 돌아가기
        </ActionButton>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* 왼쪽 영역 - 40% */}
        <div style={{ width: '40%' }}>
          {/* 1번 영역 - 패턴 정보 등록 */}
          <fieldset style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
            <legend><h4 style={{ margin: 0 }}>1번영역</h4></legend>
            
            <div style={{ marginBottom: '15px' }}>
              <ActionButton
                onClick={handleAddPatternInfo}
                disabled={loading}
                backgroundColor="#007bff"
                padding="8px 16px"
                fontSize="14px"
              >
                추가
              </ActionButton>
            </div>

            <table style={{ width: '100%', border: '1px solid #000', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <th style={{ 
                    width: '120px', 
                    padding: '8px', 
                    border: '1px solid #000',
                    backgroundColor: '#f5f5f5',
                    textAlign: 'left'
                  }}>
                    기획전명
                  </th>
                  <td style={{ padding: '8px', border: '1px solid #000' }}>
                    <input
                      type="text"
                      value={exhibitionInfo?.prdGrName || '기획전 이름을 불러오는 중...'}
                      readOnly
                      style={{ width: '300px', padding: '4px' }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ 
                    padding: '8px', 
                    border: '1px solid #000',
                    backgroundColor: '#f5f5f5',
                    textAlign: 'left'
                  }}>
                    패턴타입
                  </th>
                  <td style={{ padding: '8px', border: '1px solid #000' }}>
                    <select
                      name="prdptType"
                      value={patternInfoForm.prdptType}
                      onChange={handlePatternInfoChange}
                      style={{ padding: '4px' }}
                    >
                      {patternTypeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th style={{ 
                    padding: '8px', 
                    border: '1px solid #000',
                    backgroundColor: '#f5f5f5',
                    textAlign: 'left'
                  }}>
                    패턴 순서
                  </th>
                  <td style={{ padding: '8px', border: '1px solid #000' }}>
                    <input
                      type="number"
                      name="prdptSort"
                      value={patternInfoForm.prdptSort}
                      onChange={handlePatternInfoChange}
                      min="1"
                      max="999"
                      style={{ width: '60px', padding: '4px' }}
                    />
                  </td>
                </tr>
                <tr>
                  <th style={{ 
                    padding: '8px', 
                    border: '1px solid #000',
                    backgroundColor: '#f5f5f5',
                    textAlign: 'left'
                  }}>
                    패턴 전시여부
                  </th>
                  <td style={{ padding: '8px', border: '1px solid #000' }}>
                    <input
                      type="checkbox"
                      name="prdptView"
                      checked={patternInfoForm.prdptView}
                      onChange={handlePatternInfoChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          {/* 2번 영역 - 패턴 목록 */}
          <fieldset style={{ padding: '15px', border: '1px solid #ddd' }}>
            <legend><h4 style={{ margin: 0 }}>2번영역</h4></legend>
            
            <div style={{ marginBottom: '15px' }}>
              <ActionButton
                backgroundColor="#dc3545"
                padding="8px 16px"
                fontSize="14px"
              >
                삭제
              </ActionButton>
            </div>

            <table style={{ width: '100%', border: '1px solid #000', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>선택</td>
                  <th style={{ padding: '8px', border: '1px solid #000' }}>기획전명</th>
                  <th style={{ padding: '8px', border: '1px solid #000' }}>패턴타입</th>
                  <th style={{ padding: '8px', border: '1px solid #000' }}>패턴순서</th>
                  <th style={{ padding: '8px', border: '1px solid #000' }}>패턴 전시여부</th>
                </tr>
              </thead>
              <tbody>
                {patternInfoList.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ 
                      padding: '20px', 
                      border: '1px solid #000', 
                      textAlign: 'center',
                      color: '#666'
                    }}>
                      등록된 패턴이 없습니다.
                    </td>
                  </tr>
                ) : (
                  patternInfoList.map((pattern, index) => (
                    <tr 
                      key={pattern.prdptIdx || index}
                      onClick={() => handlePatternInfoClick(pattern)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        <input type="checkbox" />
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #000' }}>
                        {exhibitionInfo?.prdGrName || '기획전 이름을 불러오는 중...'}
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #000' }}>
                        {getDisplayType(pattern.prdptType)}
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #000' }}>
                        {pattern.prdptSort}
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={pattern.prdptView === 'Y'}
                          onChange={(e) => e.stopPropagation()}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </fieldset>
        </div>

        {/* 오른쪽 영역 - 60% */}
        <div style={{ width: '60%' }}>
          {showDetailSection && (
            <fieldset style={{ padding: '15px', border: '1px solid #ddd' }}>
              <legend><h4 style={{ margin: 0 }}>3번영역</h4></legend>
              
              {/* 패턴 상세 등록 폼 */}
              <table style={{ width: '100%', border: '1px solid #000', borderCollapse: 'collapse', marginBottom: '15px' }}>
                <tbody>
                  {(patternDetailForm.ptdetailType === 'img') && (
                    <tr>
                      <td style={{ 
                        padding: '8px', 
                        border: '1px solid #000',
                        backgroundColor: '#f5f5f5',
                        width: '120px'
                      }}>
                        상세이미지
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #000' }}>
                        <input
                          type="file"
                          name="ptdetailImg"
                          multiple
                          accept="image/*"
                          onChange={handlePatternDetailChange}
                        />
                        <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>
                          (2단: 2개, 4단: 4개)
                        </span>
                      </td>
                    </tr>
                  )}
                  
                  {(patternDetailForm.ptdetailType === 'text') && (
                    <tr>
                      <td style={{ 
                        padding: '8px', 
                        border: '1px solid #000',
                        backgroundColor: '#f5f5f5'
                      }}>
                        상세텍스트
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #000' }}>
                        <input
                          type="text"
                          name="ptdetailDesc"
                          value={patternDetailForm.ptdetailDesc}
                          onChange={handlePatternDetailChange}
                          maxLength="82"
                          style={{ width: '90%', padding: '4px' }}
                        />
                      </td>
                    </tr>
                  )}
                  
                  {(patternDetailForm.ptdetailType === 'movie') && (
                    <tr>
                      <td style={{ 
                        padding: '8px', 
                        border: '1px solid #000',
                        backgroundColor: '#f5f5f5'
                      }}>
                        상세동영상
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #000' }}>
                        <input
                          type="text"
                          name="ptdetailMv"
                          value={patternDetailForm.ptdetailMv}
                          onChange={handlePatternDetailChange}
                          maxLength="82"
                          style={{ width: '90%', padding: '4px' }}
                          placeholder="YouTube URL 또는 Video ID"
                        />
                      </td>
                    </tr>
                  )}
                  
                  <tr>
                    <td colSpan="2" style={{ padding: '8px', border: '1px solid #000' }}>
                      <ActionButton
                        onClick={handleAddPatternDetail}
                        disabled={loading}
                        backgroundColor="#28a745"
                        padding="8px 16px"
                        fontSize="14px"
                        style={{ marginRight: '10px' }}
                      >
                        추가
                      </ActionButton>
                      <ActionButton
                        backgroundColor="#dc3545"
                        padding="8px 16px"
                        fontSize="14px"
                      >
                        삭제
                      </ActionButton>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* 패턴 상세 목록 */}
              <table style={{ width: '100%', border: '1px solid #000', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>선택</td>
                    <th style={{ padding: '8px', border: '1px solid #000' }}>패턴상세타입</th>
                    <th style={{ padding: '8px', border: '1px solid #000' }}>패턴상세이미지</th>
                    <th style={{ padding: '8px', border: '1px solid #000' }}>패턴상세텍스트</th>
                    <th style={{ padding: '8px', border: '1px solid #000' }}>패턴상세동영상</th>
                    <th style={{ padding: '8px', border: '1px solid #000' }}>패턴전시여부</th>
                  </tr>
                </thead>
                <tbody>
                  {patternDetailList.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ 
                        padding: '20px', 
                        border: '1px solid #000', 
                        textAlign: 'center',
                        color: '#666'
                      }}>
                        등록된 상세 정보가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    patternDetailList.map((detail, index) => (
                      <tr key={detail.ptdetailIdx || index}>
                        <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                          <input type="checkbox" />
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #000' }}>
                          {getDisplayType(detail.ptdetailType)}
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #000' }}>
                          {detail.ptdetailImg && (
                            <img 
                              src={`/uploads/ppattern/${detail.ptdetailImg}`} 
                              width="60" 
                              alt="패턴 이미지"
                            />
                          )}
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #000' }}>
                          {detail.ptdetailDesc}
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #000' }}>
                          {detail.ptdetailMv && (
                            <iframe
                              width="160"
                              height="90"
                              src={`https://www.youtube.com/embed/${detail.ptdetailMv}`}
                              title="YouTube video player"
                              frameBorder="0"
                              allowFullScreen
                            />
                          )}
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={detail.ptdetailView === 'Y'}
                            readOnly
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </fieldset>
          )}
        </div>
      </div>

      {/* 4번 영역 - 상품 추가 섹션 */}
      <div style={{ marginTop: '30px' }}>
        <fieldset style={{ padding: '15px', border: '1px solid #ddd' }}>
          <legend><h4 style={{ margin: 0 }}>4번영역 - 기획전 상품 추가</h4></legend>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* 전체 상품 목록 */}
            <div style={{ width: '50%' }}>
              <h5>전체 상품 목록</h5>
              <div style={{ 
                maxHeight: '400px', 
                overflowY: 'auto', 
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>선택</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd' }}>상품명</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd' }}>가격</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd' }}>브랜드</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map(product => (
                      <tr key={product.prdIdx}>
                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.prdIdx)}
                            onChange={(e) => handleProductSelect(product.prdIdx, e.target.checked)}
                          />
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                          {product.prdName}
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                          {product.prdPrice?.toLocaleString()}원
                        </td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                          {product.prdBrand}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <ActionButton
                  onClick={handleAddProductsToExhibition}
                  disabled={loading || selectedProducts.length === 0}
                  backgroundColor="#28a745"
                  padding="10px 20px"
                  fontSize="14px"
                >
                  선택된 상품 추가 ({selectedProducts.length}개)
                </ActionButton>
              </div>
            </div>

            {/* 기획전 상품 목록 */}
            <div style={{ width: '50%' }}>
              <h5>기획전 등록 상품</h5>
              <div style={{ 
                maxHeight: '400px', 
                overflowY: 'auto', 
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th style={{ padding: '8px', border: '1px solid #ddd' }}>상품명</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd' }}>가격</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd' }}>브랜드</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd' }}>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exhibitionProductList.length === 0 ? (
                      <tr>
                        <td colSpan="4" style={{ 
                          padding: '20px', 
                          border: '1px solid #ddd', 
                          textAlign: 'center',
                          color: '#666'
                        }}>
                          등록된 상품이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      exhibitionProductList.map(product => (
                        <tr key={product.prdIdx}>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            {product.prdName}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            {product.prdPrice?.toLocaleString()}원
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            {product.prdBrand}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                            <ActionButton
                              backgroundColor="#dc3545"
                              padding="4px 8px"
                              fontSize="12px"
                            >
                              제거
                            </ActionButton>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
                총 {exhibitionProductList.length}개의 상품이 등록되어 있습니다.
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default SpecialExhibitionPatternRegister;