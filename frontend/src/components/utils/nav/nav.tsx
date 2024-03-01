import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineDashboard, AiOutlineUser, AiOutlineMessage, AiOutlineSetting } from 'react-icons/ai';
import { BsBoxArrowRight } from 'react-icons/bs';
import './nav.css';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="logo-details">
                <AiOutlineMenu className="menu-bars" onClick={toggleSidebar} />
                <span className="logo_name">CodingLab</span>
            </div>
            <ul className="nav-list">

            </ul>
        </div>
    );
};

export default Sidebar;
