import React, { useState, useEffect } from 'react';
import specialexhibitionAPI from '../../services/specialexhibition/specialexhibition';

const ExhibitionRegistration = () => {
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    prdgrName: '',
    prdgrBr: '',
    prdgrTm: '',
    prdGrImg: null,
    prdgrPrriod: '',
    prdgrSale: '',
    prdgrView: false
  });

  // 브랜드, 테마 옵션 상태
  const [brandOptions, setBrandOptions] = useState([]);
  const [themeOptions, setThemeOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 컴포넌트 마운트 시 브랜드/테마 데이터 로드
  useEffect(() => {
    // 실제 API에서 브랜드, 테마 데이터를 가져와야 함
    // 임시 데이터
    setBrandOptions([
      { key: 'kuhoplus', value: 'kuhoplus' },
      { key: '10CorsoComo', value: '10CorsoComo' },
      { key: '8seconds', value: '8seconds' },
      { key: 'AMI', value: 'AMI' },
      { key: 'ANOTHERSHOP', value: 'ANOTHERSHOP' },
      { key: 'Alice+Olivia', value: 'Olivia' },
      { key: 'BEAKER', value: 'BEAKER' },
      { key: 'BEANPOLE', value: 'BEANPOLE' },
      { key: 'BEANPOLEACCESSORY', value: 'BEANPOLEACCESSORY' },
      { key: 'BEANPOLEGOLF', value: 'BEANPOLEGOLF' },
      { key: 'BEANPOLEKIDS', value: 'BEANPOLEKIDS' },
      { key: 'BEANPOLELADIES', value: 'BEANPOLELADIES' },
      { key: 'BEANPOLEMEN', value: 'BEANPOLEMEN' }
    ]);
    
    setThemeOptions([
      { key: 'NEWARRIVALS', value: 'NEWARRIVALS' },
      { key: 'SALES', value: 'SALES' },
      { key: 'REVIEWS', value: 'REVIEWS' },
      { key: 'POP-UP STORE', value: 'POP-UP STORE' }
    ]);
  }, []);

  // 기획전명 입력 제한 (84글자)
  const handleNameChange = (e) => {
    let value = e.target.value;
    if (value.length > 84) {
      value = value.slice(0, 84);
    }
    setFormData(prev => ({ ...prev, prdgrName: value }));
  };

  // 할인율 입력 제한 (1-100%)
  const handleSaleChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    
    if (value !== '') {
      const num = Number(value);
      if (num === 0) value = '';
      else if (num > 100) value = '100';
      else value = String(num);
    }
    
    setFormData(prev => ({ ...prev, prdgrSale: value }));
  };

  // 파일 선택 처리
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, prdGrImg: file }));
  };

  // 일반 입력 필드 처리
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 폼 유효성 검사
  const validateForm = () => {
    const { prdgrName, prdgrBr, prdgrTm, prdGrImg, prdgrPrriod, prdgrSale } = formData;

    if (!prdgrName.trim()) {
      alert('기획전명을 입력하세요.');
      return false;
    }

    if (prdgrName.length > 84) {
      alert('기획전명은 최대 84글자까지만 가능합니다.');
      return false;
    }

    if (!prdgrBr) {
      alert('브랜드를 선택하세요.');
      return false;
    }

    if (!prdgrTm) {
      alert('테마를 선택하세요.');
      return false;
    }

    if (!prdGrImg) {
      alert('기획전 이미지를 업로드하세요.');
      return false;
    }

    if (!prdgrPrriod) {
      alert('전시 기간을 입력하세요.');
      return false;
    }

    if (prdgrSale.trim()) {
      const sale = Number(prdgrSale);
      if (!Number.isInteger(sale) || sale < 1 || sale > 100) {
        alert('할인율은 1~100% 사이로 입력하세요.');
        return false;
      }
    }

    return true;
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const submitData = new FormData();
      submitData.append('prdgrName', formData.prdgrName);
      submitData.append('prdgrBr', formData.prdgrBr);
      submitData.append('prdgrTm', formData.prdgrTm);
      submitData.append('prdGrImg', formData.prdGrImg);
      submitData.append('prdgrPrriod', formData.prdgrPrriod);
      submitData.append('prdgrSale', formData.prdgrSale);
      submitData.append('prdgrView', formData.prdgrView ? 'Y' : 'N');

      await specialexhibitionAPI.create(submitData);
      
      alert('기획전이 성공적으로 등록되었습니다!');
      
      setFormData({
        prdgrName: '',
        prdgrBr: '',
        prdgrTm: '',
        prdGrImg: null,
        prdgrPrriod: '',
        prdgrSale: '',
        prdgrView: false
      });
      
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('기획전 등록 실패:', error);
      alert('기획전 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>기획전 등록</h2>

      <form 
        onSubmit={handleSubmit}
        style={{ textAlign: 'center' }}
        encType="multipart/form-data"
      >
        <table style={{ 
          margin: '0 auto', 
          borderCollapse: 'collapse', 
          width: '450px',
          border: '2px solid #000'
        }}>
          <tbody>
            {/* 기획전명 */}
            <tr>
              <th style={{ 
                border: '2px solid #000', 
                width: '180px', 
                textAlign: 'left', 
                padding: '8px',
                backgroundColor: '#f5f5f5'
              }}>
                기획전명
              </th>
              <td style={{ border: '2px solid #000', textAlign: 'left', padding: '8px' }}>
                <input
                  type="text"
                  name="prdgrName"
                  value={formData.prdgrName}
                  onChange={handleNameChange}
                  style={{ width: '250px', padding: '4px' }}
                  maxLength={84}
                />
                <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                  {formData.prdgrName.length}/84
                </div>
              </td>
            </tr>

            {/* 기획전 브랜드 */}
            <tr>
              <th style={{ 
                border: '2px solid #000', 
                textAlign: 'left', 
                padding: '8px',
                backgroundColor: '#f5f5f5'
              }}>
                기획전브랜드
              </th>
              <td style={{ border: '2px solid #000', textAlign: 'left', padding: '8px' }}>
                <select
                  name="prdgrBr"
                  value={formData.prdgrBr}
                  onChange={handleInputChange}
                  style={{ width: '200px', padding: '4px' }}
                >
                  <option value="">선택하세요</option>
                  {brandOptions.map(brand => (
                    <option key={brand.key} value={brand.key}>
                      {brand.value}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            {/* 기획전 테마 */}
            <tr>
              <th style={{ 
                border: '2px solid #000', 
                textAlign: 'left', 
                padding: '8px',
                backgroundColor: '#f5f5f5'
              }}>
                기획전테마
              </th>
              <td style={{ border: '2px solid #000', textAlign: 'left', padding: '8px' }}>
                <select
                  name="prdgrTm"
                  value={formData.prdgrTm}
                  onChange={handleInputChange}
                  style={{ width: '200px', padding: '4px' }}
                >
                  <option value="">선택하세요</option>
                  {themeOptions.map(theme => (
                    <option key={theme.key} value={theme.key}>
                      {theme.value}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            {/* 기획전 이미지 */}
            <tr>
              <th style={{ 
                border: '2px solid #000', 
                textAlign: 'left', 
                padding: '8px',
                backgroundColor: '#f5f5f5'
              }}>
                기획전이미지
              </th>
              <td style={{ border: '2px solid #000', textAlign: 'left', padding: '8px' }}>
                <input
                  type="file"
                  name="prdGrImg"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {formData.prdGrImg && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                    선택됨: {formData.prdGrImg.name}
                  </div>
                )}
              </td>
            </tr>

            {/* 기획전 전시기간 */}
            <tr>
              <th style={{ 
                border: '2px solid #000', 
                textAlign: 'left', 
                padding: '8px',
                backgroundColor: '#f5f5f5'
              }}>
                기획전전시기간
              </th>
              <td style={{ border: '2px solid #000', textAlign: 'left', padding: '8px' }}>
                <input
                  type="date"
                  name="prdgrPrriod"
                  value={formData.prdgrPrriod}
                  onChange={handleInputChange}
                  style={{ padding: '4px' }}
                />
              </td>
            </tr>

            {/* 상품할인율 */}
            <tr>
              <th style={{ 
                border: '2px solid #000', 
                textAlign: 'left', 
                padding: '8px',
                backgroundColor: '#f5f5f5'
              }}>
                상품할인율
              </th>
              <td style={{ border: '2px solid #000', textAlign: 'left', padding: '8px' }}>
                <input
                  type="text"
                  name="prdgrSale"
                  value={formData.prdgrSale}
                  onChange={handleSaleChange}
                  style={{ width: '60px', padding: '4px' }}
                  placeholder="1-100"
                />
                <span style={{ marginLeft: '5px' }}>%</span>
              </td>
            </tr>

            {/* 기획전 전시여부 */}
            <tr>
              <th style={{ 
                border: '2px solid #000', 
                textAlign: 'left', 
                padding: '8px',
                backgroundColor: '#f5f5f5'
              }}>
                기획전전시여부
              </th>
              <td style={{ border: '2px solid #000', textAlign: 'left', padding: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    name="prdgrView"
                    checked={formData.prdgrView}
                    onChange={handleInputChange}
                  />
                  전시함
                </label>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: '30px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '120px',
              height: '35px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {loading ? '저장 중...' : '저장'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExhibitionRegistration;