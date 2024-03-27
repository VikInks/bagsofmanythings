import React from 'react';
import {ApolloProvider} from "@apollo/client";
import apolloClient from "./graphql/apollo.client";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import {Home} from "./pages/Home/Home";
import {LanguageProvider} from "./utils/lang/lang.context";

function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <LanguageProvider>
                    <Home/>
                </LanguageProvider>
            </Provider>
        </ApolloProvider>
    );
}

export default App;
