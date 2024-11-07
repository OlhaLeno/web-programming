import React from 'react';
import './PrimaryButton.css'; 

function PrimaryButton({ label, onClick }) {
  return (
    <button className="primary-button" onClick={onClick}>
      {label}
    </button>
  );
}

export default PrimaryButton;
