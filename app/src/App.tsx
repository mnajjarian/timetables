import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from './api/api';
import Search from './Search';
import Layout from './Layout';

const App: React.FC = (): JSX.Element => {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <Search />
            </Layout>
        </ApolloProvider>
    );
};

export default App;
