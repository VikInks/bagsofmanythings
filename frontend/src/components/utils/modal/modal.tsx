import React, {ReactNode, useEffect} from 'react';
import './modal.css';

interface ModalProps {
    img_modal: string;
    buttonSubmit?: string;
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (() => void) | null;
    submitButton?: string;
    background_image?: string;
}

const Modal: React.FC<ModalProps> = ({
                                         background_image,
                                         img_modal,
                                         children,
                                         isOpen,
                                         onClose,
                                         onSubmit,
                                         buttonSubmit
                                     }) => {

    const modalRef = React.useRef<HTMLDivElement>(null);
    const [mouseDownOutside, setMouseDownOutside] = React.useState(false);

    const handleMouseDown = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setMouseDownOutside(true);
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (mouseDownOutside && modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
        setMouseDownOutside(false);
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`}>
            <div className={`modal ${isOpen ? 'show' : ''}`} ref={modalRef}>
                <div className="modal-background" style={{backgroundImage: `url(${background_image ?? null})`}}/>
                <div className="modal-content">
                    <div className="modal-header">
                        <img src={img_modal} alt={img_modal}/>
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            marginTop: '20px'
                        }}>
                            <button className='button-dnd' onClick={onClose}>Cancel</button>
                            <button className='button-dnd'
                                    onClick={() => onSubmit && onSubmit()}>{buttonSubmit ?? 'Submit'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
