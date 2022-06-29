function findAccountById(accounts, id) {
  const accountName = accounts.find((account) => account.id == id);
  if (accountName) {
    return accountName;
  }
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((idA, idB) => {
    return idA.name.last.toLowerCase() > idB.name.last.toLowerCase() ? 1 : -1;
  });
}
function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  for (let i = 0; i < books.length; i++) {
    for (let x = 0; x < books[i].borrows.length; x++) {
      if (books[i].borrows[x].id == account.id) {
        total++;
      }
    }
  }
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  const rentedOut = books.filter((book) => {
    if (
      book.borrows.some((borrow) => {
        return borrow.id === account.id && borrow.returned === false
          ? true
          : false;
      })
    )
      return true;
    else return false;
  });

  const booksCheckedOutWithAuthor = rentedOut.map((book) => {
    const foundAuthor = authors.find((author) => author.id == book.authorId);
    return { ...book, author: foundAuthor };
  });
  return booksCheckedOutWithAuthor;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};