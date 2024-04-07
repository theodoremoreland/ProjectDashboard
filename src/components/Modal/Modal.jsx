import React from 'react';

// Styles
import './Modal.css';

const Modal = ({ children, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-backdrop" onClick={onClose}></div>
            <header className="modal-header">
                <button className="close" onClick={onClose}>
                        X
                </button>
            </header>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default Modal;