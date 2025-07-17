import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh' 
    }}>
      <Header />
      
      <main style={{
        flex: 1, 
        padding: '20px',
        backgroundColor: '#f8f9fa'
      }}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;