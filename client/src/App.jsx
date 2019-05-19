// Third-party imports
import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Local imports
import './App.css';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: '/graphql',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="main-container">
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App;
