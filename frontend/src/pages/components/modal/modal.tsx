import React from 'react';
import './modal.css';

type ModalProps = {
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
    footer: React.ReactNode;
    onClose: () => void;
};

const Modal = ({ isOpen, title, content, footer, onClose } : ModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-window">
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button onClick={onClose} className="modal-close-button">X</button>
                </div>
                <div className="modal-content">
                    {content}
                </div>
                <div className="modal-footer">
                    {footer}
                </div>
            </div>
        </div>
    )
};

export default Modal;
