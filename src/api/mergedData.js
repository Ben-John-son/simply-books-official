import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleBook(bookFirebaseKey)
      .then((bookObject) => {
        getSingleAuthor(bookObject.author_id).then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
      })
      .catch((error) => reject(error));
  });

const viewAuthorDetails = (authorFirebaseKey) =>
  new Promise((resolve, reject) => {
    Promise.all([getSingleAuthor(authorFirebaseKey), getAuthorBooks(authorFirebaseKey)])
      .then(([authorObject, authorBooksArray]) => {
        resolve({ ...authorObject, books: authorBooksArray });
      })
      .catch((error) => reject(error));
  });

// const viewAuthorDetails = (firebaseKey) =>
//   new Promise((resolve, reject) => {
//     // GET SINGLE AUTHOR
//     getSingleAuthor(firebaseKey)
//       .then((authorObject) => {
//         // return single author object, make an API call using this object.
//         getAuthorBooks(authorObject.firebaseKey) // we nest this promise so that we can use the author object from above.
//           .then((bookObject) => {
//             const test = { ...authorObject, bookObject };
//             console.warn(test);
//             resolve(test);
//           });
//       })
//       .catch(reject);
//   });

const deleteAuthorBooks = (authorId) =>
  new Promise((resolve, reject) => {
    getAuthorBooks(authorId)
      .then((booksArray) => {
        console.warn(booksArray, 'Author Books');
        const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

        Promise.all(deleteBookPromises).then(() => {
          deleteSingleAuthor(authorId).then(resolve);
        });
      })
      .catch((error) => reject(error));
  });

export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks };
