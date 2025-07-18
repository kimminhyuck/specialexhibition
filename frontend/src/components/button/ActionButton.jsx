import React from 'react';

const ActionButton = ({ 
  onClick, 
  children, 
  backgroundColor = '#06b83b96',
  color = 'white',
  padding = '10px',
  fontSize = '12px',
  disabled = false,
  type = 'button',
  style = {}
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding,
        backgroundColor: disabled ? '#ccc' : backgroundColor,
        color,
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize,
        fontWeight: 'bold',
        transition: 'all 0.2s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.opacity = '0.8';
          e.target.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </button>
  );
};

export default ActionButton;