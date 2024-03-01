import React from 'react';
import SignIn from "./components/sign/sign.in";
import Modal from "./components/utils/modal/modal";
import MainFrame from "./components/template";

function App() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <div className="App">
            <header className="App-header">
                <MainFrame>
                    <button onClick={() => setIsModalOpen(true)}>Sign In</button>
                    <Modal isOpen={isModalOpen} onClose={() => {}} title={'Login'}>
                        <SignIn/>
                    </Modal>
                </MainFrame>
            </header>
        </div>
    );
}

export default App;
