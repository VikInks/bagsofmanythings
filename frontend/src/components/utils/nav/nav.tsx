import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineDashboard, AiOutlineUser, AiOutlineMessage, AiOutlineSetting } from 'react-icons/ai';
import './nav.css';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className={`upbar ${isOpen ? 'open' : ''}`}>
            <div className="logo-details">
                <AiOutlineMenu className="menu-bars" style={{width: '50px', height: '50px', color: 'whitesmoke'}} onClick={toggleSidebar} />
                <span className="logo_name">Bags of many things</span>
            </div>
            <ul className="nav-list">

            </ul>
        </div>
    );
};

export default Sidebar;
