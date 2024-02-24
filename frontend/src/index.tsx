import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import App from './App';
import store from './app/store';
import client from './apollo';

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
