import api from '../api';

// 기획전 관련 API
const specialexhibitionAPI = {

  // === 조회 API ===

  // 기획전 리스트 전체 출력
  // ## PDF 5페이지
  getList: (params = {}) => api.get('/api/list/exhibition', { params }),

  // 기획전별 상세보기
  // ## PDF 6페이지
  getDetail: (id, params = {}) => api.get(`/api/list/detailExhibition/${id}`, { params }),

  // 해당 기획전 상품별 상세보기 
  // ## PDF 페이지 없음
  // 개발예정
  getProducts: (id, params = {}) => api.get(`/api/list/product/${id}`, { params }),
  
  // === 등록 API ===

  // 기획전등록 
  // ## PDF 2페이지
  create: (data) => api.post('/api/regist/exhibition', data),

  // 패턴 등록
  // ## PDF 3페이지
  createPattern: (data) => api.post('/api/regist/pattern', data),

  // 상세 패턴등록
  // ## PDF 3페이지
  createDetailPattern: (data) => api.post('/api/regist/detailPattern', data),

  // 상품 등록
  // ## PDF 4페이지
  createProduct: (data) => api.post('/api/regist/product', data),
  
  // === 삭제 API ===

  //패턴 삭제
  // ## PDF 3페이지
  deletePattern: (id) => api.delete(`/api/delete/pattern/${id}`),

  // 상세 패턴삭제
  // ## PDF 3페이지
  deleteDetailPattern: (id) => api.delete(`/api/delete/detailPattern/${id}`),

  // 상품 삭제
  // ## PDF 4페이지
  deleteProduct: (id) => api.delete(`/api/delete/product/${id}`),
};

export default specialexhibitionAPI;