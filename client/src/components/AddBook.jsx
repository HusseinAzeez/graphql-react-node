// Third-party imports
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation,
} from '../queries/queries';

const AddBook = props => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const renderAuthors = () => {
    const { loading, authors } = props.getAuthorsQuery;
    return loading ? (
      <option disabled>Loading Authors...</option>
    ) : (
      authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.addBookMutation({
      variables: { title, genre, authorId },
      refetchQueries: [{ query: getBooksQuery }],
    });
    setTitle('');
    setGenre('');
    setAuthorId('');
  };

  return (
    <form className="add-book" onSubmit={handleSubmit}>
      <div className="form-title">Add New Book</div>
      <div className="field">
        <input
          name="title"
          type="text"
          value={title}
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="field">
        <input
          name="genre"
          type="text"
          value={genre}
          placeholder="Genre"
          onChange={e => setGenre(e.target.value)}
        />
      </div>
      <div className="field">
        <select
          name="author"
          value={authorId}
          onChange={e => setAuthorId(e.target.value)}
        >
          <option>Select Author</option>
          {renderAuthors()}
        </select>
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

AddBook.propTypes = {
  addBookMutation: PropTypes.func.isRequired,
  getAuthorsQuery: PropTypes.objectOf(PropTypes.array, PropTypes.bool)
    .isRequired,
};

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBook);
