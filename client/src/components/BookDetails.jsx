// Third-party imports
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
// Local imports
import { getBookQuery } from '../queries/queries';

const BookDetails = ({ data }) => {
  const renderBookDetails = () => {
    const { book } = data;
    return book ? (
      <Fragment>
        <h2>{book.title}</h2>
        <p>Genre: {book.genre}</p>
        <p>Author: {book.author.name}</p>
        <p>All books by this author:</p>
        <ol>
          {book.author.books.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ol>
      </Fragment>
    ) : (
      <div>No book selected...</div>
    );
  };

  return <div className="book-details">{renderBookDetails()}</div>;
};

BookDetails.propTypes = {
  data: PropTypes.string.isRequired,
};

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId,
      },
      refetchQueries: [{ query: getBookQuery }],
    };
  },
})(BookDetails);
