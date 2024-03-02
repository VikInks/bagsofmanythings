import React from 'react';
import SignIn from "./components/sign/sign.in";
import Modal from "./components/utils/modal/modal";
import MainFrame from "./components/template";

function App() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [signInFunction, setSignInFunction] = React.useState<(()=> void) | null>(null);

    return (
        <div className="App">
            <header className="App-header">
                <MainFrame>
                    <button onClick={() => setIsModalOpen(true)}>Sign In</button>
                    <Modal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}} onSubmit={signInFunction} submitButton={'Sign In'} img_modal={'/modal_images/sign_in_png.png'} background_image={'/modal_images/modal_login_background.webp'}>
                        <SignIn handleSubmit={(fn) => setSignInFunction(() => fn)}/>
                    </Modal>
                </MainFrame>
            </header>
        </div>
    );
}

export default App;
