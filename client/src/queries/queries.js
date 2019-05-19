import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
  query {
    authors {
      id
      name
      age
    }
  }
`;

const getBooksQuery = gql`
  query {
    books {
      id
      title
    }
  }
`;
const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      title
      genre
      author {
        id
        name
        age
        books {
          id
          title
        }
      }
    }
  }
`;
const addBookMutation = gql`
  mutation($title: String!, $genre: String!, $authorId: ID!) {
    addBook(title: $title, genre: $genre, authorId: $authorId) {
      id
      title
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, getBookQuery, addBookMutation };
