// Third-party imports
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

// Local imports
import BookDetails from './BookDetails';

const BookList = ({ data }) => {
  const [selected, setSelected] = useState(null);
  const { books, loading } = data;

  const renderBookList = () => {
    return loading ? (
      <div>Loading books...</div>
    ) : (
      books.map(book => (
        <button
          key={book.id}
          type="button"
          onClick={() => setSelected(book.id)}
        >
          {book.title}
        </button>
      ))
    );
  };

  return (
    <Fragment>
      <ul className="book-list">{renderBookList()}</ul>
      <BookDetails bookId={selected} />
    </Fragment>
  );
};

BookList.propTypes = {
  data: PropTypes.objectOf(PropTypes.array, PropTypes.bool).isRequired,
};

export default graphql(getBooksQuery)(BookList);
