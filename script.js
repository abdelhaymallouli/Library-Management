// CLASS BOOK 
class Book {
    constructor(title, author, year, price) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.price = price;
    }
    // function add book HAS THE HTML CODE
    addBook() {
        return `
                <td>${this.title}</td>
                <td>${this.author}</td>
                <td>${this.year}</td>
                <td>$${this.price}</td>
                <td>
                    <button class="edit-button"><img src="img/add.svg" alt="add"></button>
                    <button class="delete-button"><img src="img/x-mark.png" alt=""></button>
                </td>
        `;
    }
}

const books = [];
const form = document.getElementById('bookForm');
const table = document.querySelector('#Table tbody');
let editing = -1;

// WHEN "SUBMIT" RUN THIS
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;
    // if there is no book add a book
    if (editing === -1) { 
        const newBook = new Book(title, author, year, price);
        const newRowElement = document.createElement('tr');
        newRowElement.innerHTML = newBook.addBook();

        buttoms(newRowElement, newBook);

        table.appendChild(newRowElement);
        books.push(newBook);
        // if there is a book edit in the form
    } else {
        books[editing].title = title;
        books[editing].author = author;
        books[editing].year = year;
        books[editing].price = price;

        const updatedRow = document.createElement('tr');
        updatedRow.innerHTML = books[editing].addBook();
        // update the table 
        table.replaceChild(updatedRow, table.children[editing]);
        buttoms(updatedRow, books[editing]);
        // resiting the editing 
        editing = -1;
    }

    form.reset();
    form.querySelector('button[type="submit"]').textContent = 'Add Book';
});


function buttoms(rowElement, book) {
    // delete buttom
    rowElement.querySelector('.delete-button').addEventListener('click', function() {
        table.removeChild(rowElement);
        books.splice(books.indexOf(book), 1);
    });
    // update buttom
    rowElement.querySelector('.edit-button').addEventListener('click', function() {
        edit(book);
    });
}

// edit buttom add/ Update
function edit(book) {
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('year').value = book.year;
    document.getElementById('price').value = book.price;

    editing = books.indexOf(book);
    form.querySelector('button[type="submit"]').textContent = 'Update Book';
}

form.querySelector('button[type="reset"]').addEventListener('click', function() {
    editing = -1;
    form.querySelector('button[type="submit"]').textContent = 'Add Book';
});
