import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#fff',
      borderBottom: '1px solid #ddd',
      padding: '0 20px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundColor: '#6c757d'
    }}>
      <div style={{
        maxWidth: '1200px',
        leftMargin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        height: '70px',
        backgroundColor: '#6c757d'
      }}>
        
        {/* 로고 */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/logo/logo.png" 
              alt="로고" 
              style={{ 
                height: '40px',
                marginRight: '10px'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = '#505050';
              }}
            />
            <span style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#333',
              display: 'none' 
            }}>
              EXHIBITION
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;