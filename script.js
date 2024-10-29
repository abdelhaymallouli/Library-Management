class Book {
    constructor(title, author, year, price) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.price = price;
    }
    // function add book
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

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;

    if (editing === -1) { 
        const newBook = new Book(title, author, year, price);
        const newRowElement = document.createElement('tr');
        newRowElement.innerHTML = newBook.addBook();

        buttoms(newRowElement, newBook);

        table.appendChild(newRowElement);
        books.push(newBook);
    } else {
        books[editing].title = title;
        books[editing].author = author;
        books[editing].year = year;
        books[editing].price = price;

        const updatedRow = document.createElement('tr');
        updatedRow.innerHTML = books[editing].addBook();

        // Replace the old row with the updated row and attach new event listeners
        table.replaceChild(updatedRow, table.children[editing]);
        buttoms(updatedRow, books[editing]);

        editing = -1;
    }

    form.reset();
    form.querySelector('button[type="submit"]').textContent = 'Add Book';
});

//  delete buttom and delete buttom
function buttoms(rowElement, book) {
    rowElement.querySelector('.delete-button').addEventListener('click', function() {
        table.removeChild(rowElement);
        books.splice(books.indexOf(book), 1);
    });

    rowElement.querySelector('.edit-button').addEventListener('click', function() {
        edit(book);
    });
}

// edit buttom add
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
