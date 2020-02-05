import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { client } from './api/api'
import Search from './components/Search'
import Layout from './components/Layout'

const App: React.FC = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Search />
      </Layout>
    </ApolloProvider>
  )
}

export default App
