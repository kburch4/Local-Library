function getTotalBooksCount(books) {
  let total = 0;
  for (let i = 0; i < books.length; i++) {
    if (books[i]) {
      total++;
    }
  }
  return total;
}

function getTotalAccountsCount(accounts) {
  let total = 0;
  for (const i in accounts) {
    if (accounts[i]) {
      total++;
    }
  }
  return total;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  for (let i = 0; i < books.length; i++) {
    for (let x = 0; x < books[i].borrows.length; x++) {
      if (!books[i].borrows[x].returned) {
        total++;
      }
    }
  }
  return total;
}

function getMostCommonGenres(books) {
  const genreList = {};
  books.forEach(({ genre }) => {
    if (Object.keys(genreList).includes(genre)) {
      genreList[genre].count++;
    } else {
      genreList[genre] = { name: genre, count: 1 };
    }
  });
  return SortObjectIntoArray(genreList, 5);
}

function getMostPopularBooks(books) {
  const bookScores = {};

  books.forEach(({ id, borrows, title }) => {
    bookScores[id] = { name: title, count: borrows.length };
  });
  return SortObjectIntoArray(bookScores, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorList = {};

  authors.forEach(({ id, name }) => {
    books.forEach(({ authorId, borrows }) => {
      if (authorId === id) {
        if (Object.keys(authorList).includes(authorId)) {
          authorList[authorId].count += borrows.length;
        } else {
          authorList[authorId] = {
            name: `${name.first} ${name.last}`,
            count: borrows.length,
          };
        }
      }
    });
  });
  return SortObjectIntoArray(authorList, 5);
}

//Helper Function

const SortObjectIntoArray = (unsortedObj) => {
  const sortedObj = Object.values(unsortedObj).sort((prev, current) => {
    return prev.count > current.count ? -1 : 1;
  });
  return sortedObj.slice(0, 5);
};

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
