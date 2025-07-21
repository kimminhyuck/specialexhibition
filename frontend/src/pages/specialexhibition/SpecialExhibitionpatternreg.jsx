import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ActionButton from '../../components/button/ActionButton';
import specialexhibitionAPI from '../../services/specialexhibition/specialexhibition';

const SpecialExhibitionPatternRegister = () => {
  const { exhibitionId } = useParams();
  const navigate = useNavigate();
  
  // 기본 상태들
  const [exhibitionInfo, setExhibitionInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  
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

  // 로컬 상태로 관리되는 데이터들 (저장 버튼 눌러야 실제 저장)
  const [patternInfoList, setPatternInfoList] = useState([]);
  const [patternDetailList, setPatternDetailList] = useState([]);
  const [exhibitionProductList, setExhibitionProductList] = useState([]);
  const [allProductList, setAllProductList] = useState([]);
  
  // UI 관련 상태
  const [selectedPatternIdx, setSelectedPatternIdx] = useState(null);
  const [selectedPatternIds, setSelectedPatternIds] = useState([]);
  const [selectedDetailIds, setSelectedDetailIds] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showDetailSection, setShowDetailSection] = useState(false);

  const patternTypeOptions = [
    { value: 'img1', label: '2단이미지' },
    { value: 'img2', label: '4단이미지' },
    { value: 'text', label: '텍스트' },
    { value: 'movie', label: '동영상' }
  ];

  // 컴포넌트 마운트 시 기획전 상세 정보 로드
  useEffect(() => {
    if (exhibitionId) {
      loadExhibitionDetailData();
    }
  }, [exhibitionId]);

  // 패턴 타입 변경 시 상세 필드 업데이트 - 🐛 버그 수정
  useEffect(() => {
    updateDetailFields();
  }, [patternInfoForm.prdptType]);

  // 선택된 패턴이 변경될 때 상세 폼 초기화 - 🐛 버그 수정
  useEffect(() => {
    if (selectedPatternIdx) {
      const selectedPattern = patternInfoList.find(p => p.prdptIdx === selectedPatternIdx);
      if (selectedPattern) {
        // 선택된 패턴의 타입에 맞춰 상세 폼 초기화
        const detailType = getDetailTypeFromPattern(selectedPattern.prdptType);
        setPatternDetailForm({
          ptdetailType: detailType,
          ptdetailImg: null,
          ptdetailDesc: '',
          ptdetailMv: ''
        });
        
        // 파일 input 초기화
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      }
    }
  }, [selectedPatternIdx, patternInfoList]);

  // ===== 데이터 로드 =====
  
  // 기획전 상세 정보 로드 (패턴, 상세패턴, 상품 모든 정보)
  const loadExhibitionDetailData = async () => {
    setLoading(true);
    try {
      
      // 1. 기획전 상세 정보 조회
      const response = await specialexhibitionAPI.getDetail(exhibitionId);
      
      const data = response.data;
      
      // 2. 기획전 기본 정보 설정 - 🐛 버그 수정
      if (data.exhibition) {
        // 응답에 기획전 정보가 있는 경우
        setExhibitionInfo({
          prdGrIdx: data.exhibition.prdGrIdx || exhibitionId,
          prdGrName: data.exhibition.prdGrName || `기획전 ${exhibitionId}`
        });
      } else {
        // 응답에 기획전 정보가 없는 경우 → 기획전 리스트에서 찾기
        try {
          const listResponse = await specialexhibitionAPI.getList();
          const exhibitions = listResponse.data.exhibitionList || [];
          const currentExhibition = exhibitions.find(ex => ex.prdGrIdx == exhibitionId);
          
          if (currentExhibition) {
            console.log('기획전 리스트에서 찾은 정보:', currentExhibition);
            setExhibitionInfo({
              prdGrIdx: currentExhibition.prdGrIdx,
              prdGrName: currentExhibition.prdGrName
            });
          } else {
            console.log('기획전 정보를 찾을 수 없음, 기본값 사용');
            setExhibitionInfo({
              prdGrIdx: exhibitionId,
              prdGrName: `기획전 ${exhibitionId}`
            });
          }
        } catch (listError) {
          console.error('기획전 리스트 조회 실패:', listError);
          setExhibitionInfo({
            prdGrIdx: exhibitionId,
            prdGrName: `기획전 ${exhibitionId}`
          });
        }
      }
      
      // 3. 패턴 목록
      const patterns = data.patterns || data.patternList || [];
      console.log('로드된 패턴 목록:', patterns);
      setPatternInfoList(patterns);
      
      // 4. 패턴 상세 목록
      const patternDetails = data.patternDetails || data.patternDetailList || [];
      console.log('로드된 패턴 상세 목록:', patternDetails);
      setPatternDetailList(patternDetails);
      
      // 5. 기획전 상품 목록
      const products = data.products || data.productList || [];
      console.log('로드된 상품 목록:', products);
      setExhibitionProductList(products);
      
      // 6. 전체 상품 목록 (임시 데이터)
      setAllProductList([
        { prdIdx: 1, prdName: '테스트 상품 1', prdPrice: 50000, prdBrand: 'BEANPOLE' },
        { prdIdx: 2, prdName: '테스트 상품 2', prdPrice: 75000, prdBrand: 'AMI' },
        { prdIdx: 3, prdName: '테스트 상품 3', prdPrice: 120000, prdBrand: '8SECONDS' },
        { prdIdx: 4, prdName: '테스트 상품 4', prdPrice: 95000, prdBrand: 'SPAO' },
        { prdIdx: 5, prdName: '테스트 상품 5', prdPrice: 150000, prdBrand: 'MARC' }
      ]);
      
    } catch (error) {
      console.error('기획전 상세 정보 로드 실패:', error);
      
      // 에러 시 기본값 설정
      setExhibitionInfo({
        prdGrIdx: exhibitionId,
        prdGrName: `기획전 ${exhibitionId} (로드 실패)`
      });
      
      // 임시 데이터로 초기화
      setPatternInfoList([]);
      setPatternDetailList([]);
      setExhibitionProductList([]);
      setAllProductList([
        { prdIdx: 1, prdName: '테스트 상품 1', prdPrice: 50000, prdBrand: 'BEANPOLE' },
        { prdIdx: 2, prdName: '테스트 상품 2', prdPrice: 75000, prdBrand: 'AMI' },
        { prdIdx: 3, prdName: '테스트 상품 3', prdPrice: 120000, prdBrand: '8SECONDS' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ===== 로컬 상태 관리 함수들 (실제 저장은 저장 버튼 클릭 시) =====
  
  // 패턴 정보 추가 (로컬 상태에만)
  const handleAddPatternInfo = (e) => {
    e.preventDefault();
    
    if (!patternInfoForm.prdptSort) {
      alert('패턴 순서를 입력해주세요');
      return;
    }
    
    if (!validateSortOrder(patternInfoForm.prdptSort)) {
      alert('패턴 순서는 중복될 수 없습니다.');
      return;
    }

    const newPattern = {
      prdptIdx: Date.now(), // 임시 ID
      prdptType: patternInfoForm.prdptType,
      prdptSort: parseInt(patternInfoForm.prdptSort),
      prdptView: patternInfoForm.prdptView ? 'Y' : 'N',
      isNew: true // 새로 추가된 것 표시
    };
    
    setPatternInfoList(prev => [...prev, newPattern]);
    
    // 폼 초기화
    setPatternInfoForm({
      prdptType: 'img1',
      prdptSort: '',
      prdptView: true
    });
    
    alert('패턴이 임시 저장되었습니다. 저장 버튼을 눌러 실제 저장하세요.');
  };

  // 패턴 정보 삭제 (로컬 상태에서만)
  const handleDeletePatternInfo = () => {
    if (selectedPatternIds.length === 0) {
      alert('삭제할 패턴을 선택해주세요.');
      return;
    }

    if (!window.confirm(`선택된 ${selectedPatternIds.length}개의 패턴을 삭제하시겠습니까?`)) {
      return;
    }

    // 로컬 상태에서 삭제
    setPatternInfoList(prev => 
      prev.filter(pattern => !selectedPatternIds.includes(pattern.prdptIdx))
    );
    
    // 삭제된 패턴의 상세 정보도 함께 삭제
    setPatternDetailList(prev => 
      prev.filter(detail => !selectedPatternIds.includes(detail.prdptIdx))
    );
    
    setSelectedPatternIds([]);
    
    // 선택된 패턴이 삭제되면 상세 섹션 숨기기
    if (selectedPatternIds.includes(selectedPatternIdx)) {
      setSelectedPatternIdx(null);
      setShowDetailSection(false);
    }
    
    alert('패턴이 임시 삭제되었습니다. 저장 버튼을 눌러 실제 삭제하세요.');
  };

  // 패턴 상세 추가 (로컬 상태에만)
  const handleAddPatternDetail = (e) => {
    e.preventDefault();
    
    if (!selectedPatternIdx) {
      alert('먼저 패턴을 선택해주세요.');
      return;
    }

    const { ptdetailType, ptdetailImg, ptdetailDesc, ptdetailMv } = patternDetailForm;
    
    // 선택된 패턴의 타입 확인
    const selectedPattern = patternInfoList.find(p => p.prdptIdx === selectedPatternIdx);
    if (!selectedPattern) {
      alert('패턴 정보를 찾을 수 없습니다.');
      return;
    }

    // 유효성 검사
    if (ptdetailType === 'img') {
      const needCount = selectedPattern.prdptType === 'img1' ? 2 : 
                       selectedPattern.prdptType === 'img2' ? 4 : 1;
      if (!ptdetailImg || ptdetailImg.length !== needCount) {
        alert(`${getDisplayType(selectedPattern.prdptType)} 유형은 이미지를 ${needCount}개 선택해야 합니다.`);
        return;
      }
    } else if (ptdetailType === 'text' && !ptdetailDesc.trim()) {
      alert('텍스트 내용을 입력해주세요.');
      return;
    } else if (ptdetailType === 'movie' && !ptdetailMv.trim()) {
      alert('동영상 정보를 입력해주세요.');
      return;
    }

    const newDetail = {
      ptdetailIdx: Date.now(), // 임시 ID
      prdptIdx: selectedPatternIdx,
      ptdetailType: ptdetailType,
      ptdetailImg: ptdetailImg ? Array.from(ptdetailImg).map(file => file.name).join(', ') : '',
      ptdetailDesc: ptdetailDesc,
      ptdetailMv: ptdetailType === 'movie' ? getYouTubeId(ptdetailMv) : ptdetailMv,
      ptdetailView: 'Y',
      isNew: true,
      files: ptdetailImg // 실제 파일 객체 저장
    };
    
    setPatternDetailList(prev => [...prev, newDetail]);
    
    // 폼 초기화 - 🐛 버그 수정: 선택된 패턴 타입에 맞게 초기화
    const detailType = getDetailTypeFromPattern(selectedPattern.prdptType);
    setPatternDetailForm({
      ptdetailType: detailType,
      ptdetailImg: null,
      ptdetailDesc: '',
      ptdetailMv: ''
    });
    
    // 파일 input 초기화
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
    
    alert('패턴 상세가 임시 저장되었습니다. 저장 버튼을 눌러 실제 저장하세요.');
  };

  // 패턴 상세 삭제 (로컬 상태에서만)
  const handleDeletePatternDetail = () => {
    if (selectedDetailIds.length === 0) {
      alert('삭제할 상세 정보를 선택해주세요.');
      return;
    }

    if (!window.confirm(`선택된 ${selectedDetailIds.length}개의 상세 정보를 삭제하시겠습니까?`)) {
      return;
    }

    setPatternDetailList(prev => 
      prev.filter(detail => !selectedDetailIds.includes(detail.ptdetailIdx))
    );
    
    setSelectedDetailIds([]);
    alert('패턴 상세가 임시 삭제되었습니다. 저장 버튼을 눌러 실제 삭제하세요.');
  };

  // 상품 추가 (로컬 상태에만)
  const handleAddProductsToExhibition = () => {
    if (selectedProducts.length === 0) {
      alert('추가할 상품을 선택해주세요.');
      return;
    }

    const addedProducts = allProductList.filter(product => 
      selectedProducts.includes(product.prdIdx)
    );
    
    setExhibitionProductList(prev => [...prev, ...addedProducts]);
    setSelectedProducts([]);
    
    alert(`${addedProducts.length}개의 상품이 임시 추가되었습니다. 저장 버튼을 눌러 실제 저장하세요.`);
  };

  // 상품 제거 (로컬 상태에서만)
  const handleRemoveProductFromExhibition = (productId) => {
    if (!window.confirm('이 상품을 기획전에서 제거하시겠습니까?')) {
      return;
    }

    setExhibitionProductList(prev => 
      prev.filter(product => product.prdIdx !== productId)
    );
    
    alert('상품이 임시 제거되었습니다. 저장 버튼을 눌러 실제 저장하세요.');
  };

  // ===== 전체 저장 함수 =====
  
  // 모든 변경사항을 한번에 저장 - 🐛 버그 수정
  const handleSaveAll = async () => {
    if (!window.confirm('모든 변경사항을 저장하시겠습니까?')) {
      return;
    }

    try {
      setLoading(true);
      
      // API 함수 존재 확인
      if (!specialexhibitionAPI.createExhibitionDetail) {
        alert('저장 API가 구현되지 않았습니다.\nspecialexhibitionAPI.createExhibitionDetail 함수를 추가해주세요.');
        return;
      }
      
      // FormData 구성 (Spring Boot에서 요구하는 형식)
      const formData = new FormData();
      
      // 기본 정보
      formData.append('prdGrIdx', exhibitionId);
      
      // 패턴 정보 추가
      patternInfoList.forEach((pattern, index) => {
        if (pattern.isNew) {
          // 새로 추가된 패턴만 전송
          formData.append(`patternDTOList[${index}].prdGrIdx`, exhibitionId);
          formData.append(`patternDTOList[${index}].prdptType`, pattern.prdptType);
          formData.append(`patternDTOList[${index}].prdptSort`, pattern.prdptSort);
          formData.append(`patternDTOList[${index}].prdptView`, pattern.prdptView);
        }
      });
      
      // 패턴 상세 정보 추가
      let detailIndex = 0;
      patternDetailList.forEach((detail) => {
        if (detail.isNew) {
          // 새로 추가된 상세만 전송
          formData.append(`patternDetailDTOList[${detailIndex}].prdptIdx`, detail.prdptIdx);
          formData.append(`patternDetailDTOList[${detailIndex}].ptdetailType`, detail.ptdetailType);
          formData.append(`patternDetailDTOList[${detailIndex}].ptdetailDesc`, detail.ptdetailDesc || '');
          formData.append(`patternDetailDTOList[${detailIndex}].ptdetailMv`, detail.ptdetailMv || '');
          formData.append(`patternDetailDTOList[${detailIndex}].ptdetailView`, detail.ptdetailView);
          
          // 파일들 추가
          if (detail.files && detail.files.length > 0) {
            Array.from(detail.files).forEach((file, fileIndex) => {
              formData.append(`patternDetailFiles_${detailIndex}_${fileIndex}`, file);
            });
          }
          detailIndex++;
        }
      });
      
      // 상품 정보 추가
      exhibitionProductList.forEach((product, index) => {
        formData.append(`productDTOList[${index}].prdIdx`, product.prdIdx);
        formData.append(`productDTOList[${index}].prdGrIdx`, exhibitionId);
      });

      console.log('저장할 데이터 (FormData):', formData);
      
      // FormData 내용 로깅
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // API 호출
      const response = await specialexhibitionAPI.createExhibitionDetail(formData);
      console.log('저장 응답:', response.data);
      
      if (response.data && response.data.insertResult > 0) {
        alert('모든 정보가 성공적으로 저장되었습니다.');
        // 저장 후 데이터 새로고침
        await loadExhibitionDetailData();
        
        // UI 초기화
        setSelectedPatternIdx(null);
        setShowDetailSection(false);
        setSelectedPatternIds([]);
        setSelectedDetailIds([]);
        setSelectedProducts([]);
      } else {
        alert('저장에 실패했습니다.');
      }
      
    } catch (error) {
      console.error('저장 실패:', error);
      
      if (error.message && error.message.includes('is not a function')) {
        alert('저장 API 함수가 정의되지 않았습니다.\nspecialexhibitionAPI에 createExhibitionDetail 함수를 추가해주세요.');
      } else if (error.response?.status === 404) {
        alert('저장 API 엔드포인트가 구현되지 않았습니다.\n백엔드에서 /api/regist/exhibitionDetail을 구현해주세요.');
      } else {
        alert(`저장 중 오류가 발생했습니다: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // ===== 유틸리티 함수들 =====
  
  // 패턴 타입에서 상세 타입 추출 - 🐛 버그 수정
  const getDetailTypeFromPattern = (patternType) => {
    if (patternType === 'img1' || patternType === 'img2') {
      return 'img';
    } else if (patternType === 'text') {
      return 'text';
    } else if (patternType === 'movie') {
      return 'movie';
    }
    return '';
  };
  
  const updateDetailFields = () => {
    const type = patternInfoForm.prdptType;
    const detailType = getDetailTypeFromPattern(type);
    setPatternDetailForm(prev => ({ ...prev, ptdetailType: detailType }));
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

  // 전체 상품에서 이미 기획전에 등록된 상품 제외
  const getAvailableProducts = () => {
    const exhibitionProductIds = exhibitionProductList.map(product => product.prdIdx);
    return allProductList.filter(product => !exhibitionProductIds.includes(product.prdIdx));
  };

  // 이미지 미리보기 URL 생성 - 🐛 버그 수정
  const getImagePreviewUrl = (files, index = 0) => {
    if (files && files[index]) {
      return URL.createObjectURL(files[index]);
    }
    return null;
  };

  // ===== 이벤트 핸들러들 =====
  
  const handlePatternInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPatternInfoForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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

  const handlePatternInfoClick = (patternInfo) => {
    setSelectedPatternIdx(patternInfo.prdptIdx);
    setShowDetailSection(true);
    
    // 선택된 패턴 타입에 맞게 상세 폼 설정 - 🐛 버그 수정
    const detailType = getDetailTypeFromPattern(patternInfo.prdptType);
    setPatternDetailForm({
      ptdetailType: detailType,
      ptdetailImg: null,
      ptdetailDesc: '',
      ptdetailMv: ''
    });
    
    // 파일 input 초기화
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const handleProductSelect = (productId, isSelected) => {
    if (isSelected) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  const handlePatternCheck = (patternId, isChecked) => {
    if (isChecked) {
      setSelectedPatternIds(prev => [...prev, patternId]);
    } else {
      setSelectedPatternIds(prev => prev.filter(id => id !== patternId));
    }
  };

  const handleDetailCheck = (detailId, isChecked) => {
    if (isChecked) {
      setSelectedDetailIds(prev => [...prev, detailId]);
    } else {
      setSelectedDetailIds(prev => prev.filter(id => id !== detailId));
    }
  };

  // 현재 선택된 패턴의 상세 정보만 필터링
  const getCurrentPatternDetails = () => {
    return patternDetailList.filter(detail => detail.prdptIdx === selectedPatternIdx);
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1400px', 
      margin: '0 auto',
      backgroundColor: 'white',
      minHeight: '100vh'
    }}>
      {/* 헤더 */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: '0 0 10px 0' }}>패턴 등록</h2>
          <ActionButton
            onClick={() => navigate('/admin/exhibition')}
            backgroundColor="#6c757d"
            padding="8px 16px"
            fontSize="14px"
            disabled={loading}
          >
            리스트로 돌아가기
          </ActionButton>
        </div>
        
        {/* 저장 버튼 */}
        <ActionButton
          onClick={handleSaveAll}
          disabled={loading}
          backgroundColor="#28a745"
          padding="12px 24px"
          fontSize="16px"
          style={{ fontWeight: 'bold' }}
        >
          전체 저장
        </ActionButton>
      </div>

      {/* 로딩 오버레이 */}
      {loading && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          zIndex: 1000 
        }}>
          <div style={{ color: 'white', fontSize: '18px' }}>처리 중...</div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* 왼쪽 영역 - 패턴 관리 (40%) */}
        <div style={{ width: '40%' }}>
          {/* 1번 영역 - 패턴 정보 등록 */}
          <fieldset style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
            <legend><h4 style={{ margin: 0 }}>1번영역 - 패턴 정보 등록</h4></legend>
            
            <div style={{ marginBottom: '15px' }}>
              <ActionButton
                onClick={handleAddPatternInfo}
                disabled={loading}
                backgroundColor="#007bff"
                padding="8px 16px"
                fontSize="14px"
              >
                패턴 추가
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
                      value={exhibitionInfo?.prdGrName || '로딩 중...'}
                      readOnly
                      style={{ width: '100%', padding: '4px', backgroundColor: '#f8f9fa' }}
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
                      style={{ padding: '4px', width: '100%' }}
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
                      style={{ width: '100%', padding: '4px' }}
                      placeholder="1~999"
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
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        name="prdptView"
                        checked={patternInfoForm.prdptView}
                        onChange={handlePatternInfoChange}
                        style={{ marginRight: '5px' }}
                      />
                      전시함
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          {/* 2번 영역 - 패턴 목록 */}
          <fieldset style={{ padding: '15px', border: '1px solid #ddd' }}>
            <legend><h4 style={{ margin: 0 }}>2번영역 - 패턴 목록</h4></legend>
            
            <div style={{ marginBottom: '15px' }}>
              <ActionButton
                onClick={handleDeletePatternInfo}
                disabled={loading || selectedPatternIds.length === 0}
                backgroundColor="#dc3545"
                padding="8px 16px"
                fontSize="14px"
              >
                선택 삭제 ({selectedPatternIds.length})
              </ActionButton>
            </div>

            <table style={{ width: '100%', border: '1px solid #000', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center', width: '50px' }}>선택</td>
                  <th style={{ padding: '8px', border: '1px solid #000' }}>타입</th>
                  <th style={{ padding: '8px', border: '1px solid #000', width: '60px' }}>순서</th>
                  <th style={{ padding: '8px', border: '1px solid #000', width: '60px' }}>전시</th>
                  <th style={{ padding: '8px', border: '1px solid #000', width: '60px' }}>상태</th>
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
                      style={{ 
                        cursor: 'pointer',
                        backgroundColor: selectedPatternIdx === pattern.prdptIdx ? '#e3f2fd' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        <input 
                          type="checkbox" 
                          checked={selectedPatternIds.includes(pattern.prdptIdx)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handlePatternCheck(pattern.prdptIdx, e.target.checked);
                          }}
                        />
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #000' }}>
                        {getDisplayType(pattern.prdptType)}
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        {pattern.prdptSort}
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        <span style={{ 
                          color: pattern.prdptView === 'Y' ? '#28a745' : '#dc3545',
                          fontWeight: 'bold'
                        }}>
                          {pattern.prdptView === 'Y' ? '✓' : '✗'}
                        </span>
                      </td>
                      <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        {pattern.isNew && (
                          <span style={{ 
                            fontSize: '10px', 
                            color: '#007bff', 
                            fontWeight: 'bold' 
                          }}>
                            새로추가
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </fieldset>
        </div>

        {/* 오른쪽 영역 - 패턴 상세 관리 (60%) */}
        <div style={{ width: '60%' }}>
          {showDetailSection && selectedPatternIdx ? (
            <fieldset style={{ padding: '15px', border: '1px solid #ddd' }}>
              <legend><h4 style={{ margin: 0 }}>3번영역 - 패턴 상세 관리</h4></legend>
              
              {/* 선택된 패턴 정보 표시 */}
              <div style={{ 
                marginBottom: '15px', 
                padding: '10px', 
                backgroundColor: '#e3f2fd', 
                border: '1px solid #2196f3',
                borderRadius: '4px'
              }}>
                <strong>선택된 패턴:</strong> {
                  (() => {
                    const selectedPattern = patternInfoList.find(p => p.prdptIdx === selectedPatternIdx);
                    return selectedPattern ? 
                      `${getDisplayType(selectedPattern.prdptType)} (순서: ${selectedPattern.prdptSort})` 
                      : '패턴 정보 없음';
                  })()
                }
              </div>
              
              {/* 패턴 상세 등록 폼 */}
              <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px' }}>
                <h5 style={{ margin: '0 0 10px 0' }}>상세 정보 추가</h5>
                
                <table style={{ width: '100%', border: '1px solid #000', borderCollapse: 'collapse' }}>
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
                            style={{ width: '100%' }}
                          />
                          <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
                            * 2단이미지: 2개, 4단이미지: 4개 파일을 선택하세요
                          </div>
                          {/* 🐛 버그 수정: 이미지 미리보기 추가 */}
                          {patternDetailForm.ptdetailImg && (
                            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              {Array.from(patternDetailForm.ptdetailImg).map((file, index) => (
                                <div key={index} style={{ textAlign: 'center' }}>
                                  <img 
                                    src={getImagePreviewUrl(patternDetailForm.ptdetailImg, index)} 
                                    alt={`미리보기 ${index + 1}`}
                                    style={{ 
                                      width: '80px', 
                                      height: '80px', 
                                      objectFit: 'cover',
                                      border: '1px solid #ddd',
                                      borderRadius: '4px'
                                    }}
                                  />
                                  <div style={{ fontSize: '10px', marginTop: '2px', color: '#666' }}>
                                    {file.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
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
                          <textarea
                            name="ptdetailDesc"
                            value={patternDetailForm.ptdetailDesc}
                            onChange={handlePatternDetailChange}
                            maxLength="82"
                            rows="3"
                            style={{ width: '100%', padding: '4px', resize: 'vertical' }}
                            placeholder="텍스트를 입력하세요 (최대 82자)"
                          />
                          <div style={{ textAlign: 'right', fontSize: '12px', color: '#666' }}>
                            {patternDetailForm.ptdetailDesc.length}/82
                          </div>
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
                            style={{ width: '100%', padding: '4px' }}
                            placeholder="YouTube URL 또는 Video ID를 입력하세요"
                          />
                          <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
                            예: https://youtube.com/watch?v=abcd1234567 또는 abcd1234567
                          </div>
                          {/* YouTube 미리보기 */}
                          {patternDetailForm.ptdetailMv && (
                            <div style={{ marginTop: '10px' }}>
                              <iframe
                                width="200"
                                height="113"
                                src={`https://www.youtube.com/embed/${getYouTubeId(patternDetailForm.ptdetailMv)}`}
                                title="YouTube 미리보기"
                                frameBorder="0"
                                allowFullScreen
                                style={{ borderRadius: '4px' }}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                    
                    <tr>
                      <td colSpan="2" style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                        <ActionButton
                          onClick={handleAddPatternDetail}
                          disabled={loading}
                          backgroundColor="#28a745"
                          padding="8px 16px"
                          fontSize="14px"
                          style={{ marginRight: '10px' }}
                        >
                          상세 추가
                        </ActionButton>
                        <ActionButton
                          onClick={handleDeletePatternDetail}
                          disabled={loading || selectedDetailIds.length === 0}
                          backgroundColor="#dc3545"
                          padding="8px 16px"
                          fontSize="14px"
                        >
                          선택 삭제 ({selectedDetailIds.length})
                        </ActionButton>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 패턴 상세 목록 */}
              <div>
                <h5 style={{ margin: '0 0 10px 0' }}>등록된 상세 정보</h5>
                <table style={{ width: '100%', border: '1px solid #000', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center', width: '50px' }}>선택</td>
                      <th style={{ padding: '8px', border: '1px solid #000', width: '80px' }}>타입</th>
                      <th style={{ padding: '8px', border: '1px solid #000', width: '100px' }}>이미지/내용</th>
                      <th style={{ padding: '8px', border: '1px solid #000' }}>상세정보</th>
                      <th style={{ padding: '8px', border: '1px solid #000', width: '60px' }}>전시</th>
                      <th style={{ padding: '8px', border: '1px solid #000', width: '60px' }}>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentPatternDetails().length === 0 ? (
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
                      getCurrentPatternDetails().map((detail, index) => (
                        <tr key={detail.ptdetailIdx || index}>
                          <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                            <input 
                              type="checkbox" 
                              checked={selectedDetailIds.includes(detail.ptdetailIdx)}
                              onChange={(e) => handleDetailCheck(detail.ptdetailIdx, e.target.checked)}
                            />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #000' }}>
                            {getDisplayType(detail.ptdetailType)}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                            {/* 🐛 버그 수정: 이미지 표시 개선 */}
                            {detail.ptdetailType === 'img' && (
                              <div>
                                {detail.isNew && detail.files ? (
                                  // 새로 추가된 이미지: 미리보기 표시
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                    {Array.from(detail.files).slice(0, 2).map((file, idx) => (
                                      <img 
                                        key={idx}
                                        src={URL.createObjectURL(file)} 
                                        width="40" 
                                        height="40"
                                        alt={`이미지 ${idx + 1}`}
                                        style={{ 
                                          objectFit: 'cover',
                                          border: '1px solid #ddd',
                                          borderRadius: '4px'
                                        }}
                                      />
                                    ))}
                                    {detail.files.length > 2 && (
                                      <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '10px',
                                        backgroundColor: '#f8f9fa'
                                      }}>
                                        +{detail.files.length - 2}
                                      </div>
                                    )}
                                  </div>
                                ) : detail.ptdetailImg ? (
                                  // 기존 이미지: 서버에서 로드
                                  <img 
                                    src={`/uploads/ppattern/${detail.ptdetailImg}`} 
                                    width="60" 
                                    alt="패턴 이미지"
                                    style={{ 
                                      cursor: 'pointer', 
                                      borderRadius: '4px', 
                                      border: '1px solid #ddd',
                                      objectFit: 'cover'
                                    }}
                                    onClick={() => window.open(`/uploads/ppattern/${detail.ptdetailImg}`, '_blank')}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.parentNode.innerHTML = '<span style="color: #999; font-size: 12px;">이미지 없음</span>';
                                    }}
                                  />
                                ) : (
                                  <span style={{ color: '#999', fontSize: '12px' }}>이미지 없음</span>
                                )}
                              </div>
                            )}
                            
                            {detail.ptdetailType === 'text' && (
                              <div style={{ 
                                maxWidth: '100px', 
                                wordBreak: 'break-word',
                                fontSize: '12px',
                                padding: '4px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '4px'
                              }}>
                                {detail.ptdetailDesc || '텍스트 없음'}
                              </div>
                            )}
                            
                            {detail.ptdetailType === 'movie' && detail.ptdetailMv && (
                              <div style={{ textAlign: 'center' }}>
                                <iframe
                                  width="80"
                                  height="45"
                                  src={`https://www.youtube.com/embed/${detail.ptdetailMv}`}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allowFullScreen
                                  style={{ borderRadius: '4px' }}
                                />
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #000' }}>
                            {detail.ptdetailType === 'img' && (
                              <div style={{ fontSize: '11px' }}>
                                {detail.isNew ? (
                                  `${detail.files?.length || 0}개 파일`
                                ) : (
                                  detail.ptdetailImg || '파일명 없음'
                                )}
                              </div>
                            )}
                            {detail.ptdetailType === 'text' && (
                              <div style={{ fontSize: '11px', color: '#666' }}>
                                {detail.ptdetailDesc?.length || 0}/82 글자
                              </div>
                            )}
                            {detail.ptdetailType === 'movie' && (
                              <div style={{ fontSize: '11px', color: '#666' }}>
                                ID: {detail.ptdetailMv}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                            <span style={{ 
                              color: detail.ptdetailView === 'Y' ? '#28a745' : '#dc3545',
                              fontWeight: 'bold'
                            }}>
                              {detail.ptdetailView === 'Y' ? '✓' : '✗'}
                            </span>
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #000', textAlign: 'center' }}>
                            {detail.isNew && (
                              <span style={{ 
                                fontSize: '10px', 
                                color: '#007bff', 
                                fontWeight: 'bold' 
                              }}>
                                새로추가
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </fieldset>
          ) : (
            <div style={{ 
              padding: '40px', 
              textAlign: 'center', 
              border: '2px dashed #ddd', 
              color: '#666',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa'
            }}>
              <h4 style={{ margin: '0 0 10px 0' }}>패턴을 선택하세요</h4>
              <p style={{ margin: 0 }}>왼쪽에서 패턴을 클릭하면 상세 관리가 가능합니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* 4번 영역 - 상품 관리 섹션 */}
      <div style={{ marginTop: '30px' }}>
        <fieldset style={{ padding: '15px', border: '1px solid #ddd' }}>
          <legend><h4 style={{ margin: 0 }}>4번영역 - 기획전 상품 관리</h4></legend>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* 전체 상품 목록 (추가 가능한 상품들) */}
            <div style={{ width: '50%' }}>
              <h5>추가 가능한 상품 목록</h5>
              <div style={{ 
                maxHeight: '400px', 
                overflowY: 'auto', 
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', width: '50px' }}>선택</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd' }}>상품명</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd', width: '100px' }}>가격</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd', width: '80px' }}>브랜드</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAvailableProducts().length === 0 ? (
                      <tr>
                        <td colSpan="4" style={{ 
                          padding: '20px', 
                          border: '1px solid #ddd', 
                          textAlign: 'center',
                          color: '#666'
                        }}>
                          추가 가능한 상품이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      getAvailableProducts().map(product => (
                        <tr key={product.prdIdx} style={{
                          backgroundColor: selectedProducts.includes(product.prdIdx) ? '#e3f2fd' : 'transparent'
                        }}>
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
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>
                            {product.prdPrice?.toLocaleString()}원
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            {product.prdBrand}
                          </td>
                        </tr>
                      ))
                    )}
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
                      <th style={{ padding: '8px', border: '1px solid #ddd', width: '100px' }}>가격</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd', width: '80px' }}>브랜드</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd', width: '80px' }}>관리</th>
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
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>
                            {product.prdPrice?.toLocaleString()}원
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            {product.prdBrand}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                            <ActionButton
                              onClick={() => handleRemoveProductFromExhibition(product.prdIdx)}
                              disabled={loading}
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
              
              <div style={{ marginTop: '15px' }}>
                <div style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
                  총 <strong>{exhibitionProductList.length}</strong>개의 상품이 등록되어 있습니다.
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default SpecialExhibitionPatternRegister;