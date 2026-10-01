const title = document.querySelector("h1");
title.textContent = "Yana Tomkovich is the best developer in the Galaxy!";

const books = [
  {
    id: 1,
    title: "The Godfather",
    year: 2026,
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2027,
  },
  {
    id: 3,
    title: "Fight Club",
    year: 1999,
  },
  {
    id: 4,
    title: "lol",
    year: 2027,
  },
];

const booksWrapper = document.getElementById("books");

books.forEach((book) => {
  const element = document.createElement("p");
  element.textContent = `The movie "${book.title}" was created ${book.year}`;
  element.classList.add("movie");

  booksWrapper.insertAdjacentElement("afterbegin", element);
});
