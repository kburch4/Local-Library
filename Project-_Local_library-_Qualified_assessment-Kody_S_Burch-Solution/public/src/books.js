function findAuthorById(authors, id) {
  for (let i = 0; i < authors.length; i++) {
    if (authors[i].id == id) {
      return authors[i];
    }
  }
}

function findBookById(books, id) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      return books[i];
    }
  }
}

function partitionBooksByBorrowedStatus(books) {
  const rentedOut = [];

  const returned = books.reduce((returnedBooks, book) => {
    if (book.borrows[0].returned) {
      returnedBooks.push(book);
    } else {
      rentedOut.push(book);
    }
    return returnedBooks;
  }, []);
  return [rentedOut, returned];
}

function getBorrowersForBook(book, accounts) {
  const borrowedAccountId = book.borrows.reduce((accountId, borrow) => {
    accountId.push(borrow);
    return accountId;
  }, []);

  const borrowersForBook = [];
  borrowedAccountId.forEach((borrowedAccount) => {
    const fullBorrowerAccountInfo = accounts.find(({ id }) => {
      return id == borrowedAccount.id;
    });
    borrowersForBook.push({
      ...fullBorrowerAccountInfo,
      returned: borrowedAccount.returned,
    });
  });

  return borrowersForBook.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};