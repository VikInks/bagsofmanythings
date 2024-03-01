import React from 'react';
import './modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children, title}:ModalProps) => {
    if (!isOpen) return null;
    const onOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className="modal-overlay" onClick={onOverlayClick}>
            <div>
                {title}
            </div>
            <div className="modal">
                {children}
            </div>
            <div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
