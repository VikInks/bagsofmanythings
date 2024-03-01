import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineDashboard, AiOutlineUser, AiOutlineMessage, AiOutlineSetting } from 'react-icons/ai';
import { BsBoxArrowRight } from 'react-icons/bs';
import './Sidebar.module.css';

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
                <li>
                    <a href="#">
                        <AiOutlineSearch />
                        <input type="text" placeholder="Search..." />
                        <span className="tooltip">Search</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <AiOutlineDashboard />
                        <span className="links_name">Dashboard</span>
                    </a>
                    <span className="tooltip">Dashboard</span>
                </li>
                <li className="profile">
                    <div className="profile-details">
                        <div className="name_job">
                            <div className="name">Prem Shahi</div>
                            <div className="job">Web designer</div>
                        </div>
                    </div>
                    <BsBoxArrowRight id="log_out" />
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
