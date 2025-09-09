class Book {
    #copies;
    constructor(title, author, isbn, copies) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.#copies = copies;
    }

    getCopies() {
        return this.#copies;
    }

    updateCopies(count) {
        this.#copies = count;
    }

    getBookInfo() {
        return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.isbn}, Copies: ${this.getCopies()}`;
    }
}

const Library = (function () {
    const bookCollection = {};

    return {
        addBook(bookObject) {
            if (bookObject.isbn in bookCollection) {
                alert(`Book with ISBN ${bookObject.isbn} already exists.`);
            } else {
                bookCollection[bookObject.isbn] = bookObject;
                Library.renderBooks();
            }
        },

        removeBook(isbn) {
            if (isbn in bookCollection) {
                delete bookCollection[isbn];
                Library.renderBooks();
            } else {
                alert(`Book with ISBN ${isbn} does not exist.`);
            }
        },

        renderBooks() {
            const booksList = document.getElementById("books");
            booksList.innerHTML = "";
            for (const isbn in bookCollection) {
                const book = bookCollection[isbn];
                const li = document.createElement("li");
                li.textContent = book.getBookInfo();

                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.onclick = () => Library.removeBook(isbn);

                li.appendChild(removeButton);
                booksList.appendChild(li);
            }
        }
    };
})();


document.getElementById("bookForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    const copies = parseInt(document.getElementById("copies").value, 10);

    if (title && author && isbn && copies >= 0) {
        const newBook = new Book(title, author, isbn, copies);
        Library.addBook(newBook);

       
        this.reset();
    } else {
        alert("Please fill out all fields correctly.");
    }
});