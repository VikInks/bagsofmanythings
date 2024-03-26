import React, {useState} from 'react';
import {ApolloProvider} from "@apollo/client";
import apolloClient from "./graphql/apollo.client";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import {Home} from "./pages/Home/Home";
import LangContext from "./utils/lang/lang.context";

function App() {
    // add check of prefered parameters for language and add it to the context => || navigator.userLanguage
    const browserLang = ['en', 'fr'].includes(navigator.language) ? navigator.language : 'en';
    const [lang, setLang] = useState(browserLang);

    return (
        <ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <LangContext.Provider value={{ lang, setLang }}>
                    <Home/>
                </LangContext.Provider>
            </Provider>
        </ApolloProvider>
    );
}

export default App;
