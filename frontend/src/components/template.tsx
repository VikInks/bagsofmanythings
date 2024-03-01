import React from 'react';
import Nav from "./utils/nav/nav";

interface MainFrameProps {
    children: React.ReactNode;
}

const MainFrame: React.FC<MainFrameProps> = ({children}) => {
    return (
        <>
            <header>
                <Nav/>
            </header>
            <div className="main-frame">
                {children}
            </div>
            <footer>
                <p>Footer</p>
            </footer>
        </>
    );
};

export default MainFrame;
