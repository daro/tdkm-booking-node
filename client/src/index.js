import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient} from 'apollo-boost';
import {ApolloProvider} from  "@apollo/react-hooks";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import notificationsReducer from './notifications';

import { toIdValue } from 'apollo-utilities';

import { InMemoryCache } from 'apollo-cache-inmemory';
import  HttpLink  from 'apollo-link-http';

const link = new HttpLink({
    uri: 'http://localhost:4000/'
});

const cache = new InMemoryCache();

const dataIdFromObject = object => `${object.__typename}__${object.id || object.tweet_id}`;

const client = new ApolloClient({
    link,
    cache,
    dataIdFromObject,
    customResolvers: {
        Query: {
            Tweet: (_, { id }) => toIdValue(dataIdFromObject({ __typename: 'Tweet', id })),
        },
    },
});

const store = createStore(
    combineReducers({
        notifications: notificationsReducer,
       // apollo: client.reducer(),
    }),
    {}, // initial state
    compose(
        // applyMiddleware(client.middleware()),
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
);

ReactDOM.render(
    <ApolloProvider store={store} client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);


registerServiceWorker();
