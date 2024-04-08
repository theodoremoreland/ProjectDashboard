import React from 'react';

// Styles
import './Modal.css';

const Modal = ({ children, title, handleClose }) => {
    return (
        <div className="custom-modal-backdrop" onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
        }}>
            <div className="custom-modal">
            <header className="custom-modal-header">
                <button title='close' className="x" onClick={handleClose}>
                        Close
                </button>
            </header>
            <h2 className="custom-modal-title">{title}</h2>
            <div className="custom-modal-content">
                {children}
            </div>
            </div>
        </div>
    );
};

export default Modal;