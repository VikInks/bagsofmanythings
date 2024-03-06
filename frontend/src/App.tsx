import React from 'react';
import "./components/css/index.css";
import {ApolloProvider} from "@apollo/client";
import apolloClient from "./graphql/apollo.client";
import {BrowserRouter as Router} from "react-router-dom";
import {store} from "./redux/store";
import {Provider} from "react-redux";

function App() {
    return (
        <ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <Router/>
            </Provider>
        </ApolloProvider>
    );
}

export default App;
