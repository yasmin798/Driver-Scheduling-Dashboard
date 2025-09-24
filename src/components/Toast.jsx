import React from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}
        </span>
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;