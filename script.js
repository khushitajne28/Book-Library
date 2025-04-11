const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");
const searchInput = document.getElementById("search");

let books = JSON.parse(localStorage.getItem("books")) || [];

function renderBooks(filter = "") {
  bookList.innerHTML = "";
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(filter.toLowerCase()) ||
    book.author.toLowerCase().includes(filter.toLowerCase())
  );

  filteredBooks.forEach((book, index) => {
    const div = document.createElement("div");
    div.className = "book-card";
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Year:</strong> ${book.year}</p>
      <p><strong>Status:</strong> ${book.status || "Available"}</p>
      <button onclick="deleteBook(${index})">Delete</button>
      <button onclick="toggleBorrow(${index})">
        ${book.status === "Borrowed" ? "Return" : "Borrow"}
      </button>
    `;
    bookList.appendChild(div);
  });
}

function addBook(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  const year = document.getElementById("year").value;

  books.push({ title, author, genre, year, status: "Available" });
  localStorage.setItem("books", JSON.stringify(books));
  bookForm.reset();
  renderBooks();
}

function deleteBook(index) {
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

function toggleBorrow(index) {
  books[index].status = books[index].status === "Borrowed" ? "Available" : "Borrowed";
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

searchInput.addEventListener("input", () => {
  renderBooks(searchInput.value);
});

bookForm.addEventListener("submit", addBook);
renderBooks();
