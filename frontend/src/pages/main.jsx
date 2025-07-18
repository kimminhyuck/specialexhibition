
const Main = () => {

  return (
    <div>
      <div>
        <h1>사용자 페이지 링크</h1>
        <ul>
          <li><a href="/exhibition/detail">기획전 리스트 </a></li>
          
        </ul>
      </div>

        <div>
        <h1>관리자 페이지 링크</h1>
        <ul>
          <li><a href="/admin/exhibition/register">기획전 등록</a></li>
          <li><a href="/admin/exhibition">기획전 관리</a></li>
        
        </ul>
      </div>
    </div>

    
  );
};

export default Main;