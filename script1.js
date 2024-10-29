class Book {
    constructor(title, author, year, price) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.price = price;
    }

    addBook() {
        return `
            <tr>
                <td>${this.title}</td>
                <td>${this.author}</td>
                <td>${this.year}</td>
                <td>$${this.price}</td>
                <td>
                    <button class="edit-button">Edit</button>
                    <button class="delete-button"><img src="img/x-mark.png" alt=""></button>
                </td>
            </tr>
        `;
    }
}

const books = [];
const form = document.getElementById('bookForm');
const table = document.querySelector('#Table tbody');
let editingIndex = -1;

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;

    if (editingIndex === -1) {
        const newBook = new Book(title, author, year, price);
        const newRow = newBook.addBook();

        const newRowElement = document.createElement('tr');
        newRowElement.innerHTML = newRow;

        // DELETE BUTTON
        newRowElement.querySelector('.delete-button').addEventListener('click', function() {
            table.removeChild(newRowElement);
            books.splice(books.indexOf(newBook), 1);
        });

        // EDIT BUTTON
        newRowElement.querySelector('.edit-button').addEventListener('click', function() {
            fillFormForEdit(newBook, newRowElement);
        });

        table.appendChild(newRowElement);
        books.push(newBook);
    } else {
        // Update existing book
        books[editingIndex].title = title;
        books[editingIndex].author = author;
        books[editingIndex].year = year;
        books[editingIndex].price = price;

        const updatedRow = books[editingIndex].addBook();
        const rowToUpdate = table.children[editingIndex];
        rowToUpdate.innerHTML = updatedRow;

        // Re-attach event listeners
        rowToUpdate.querySelector('.delete-button').addEventListener('click', function() {
            table.removeChild(rowToUpdate);
            books.splice(editingIndex, 1);
            editingIndex = -1; // Reset editing index
        });

        rowToUpdate.querySelector('.edit-button').addEventListener('click', function() {
            fillFormForEdit(books[editingIndex], rowToUpdate);
        });

        editingIndex = -1; // Reset editing index
    }

    form.reset();
});

function fillFormForEdit(book, rowElement) {
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('year').value = book.year;
    document.getElementById('price').value = book.price;

    editingIndex = books.indexOf(book); // Set editing index
    form.querySelector('button[type="submit"]').textContent = 'Update'; // Change button text to Update
}

// Reset the form and button text when the form is reset or no longer editing
form.querySelector('button[type="reset"]').addEventListener('click', function() {
    editingIndex = -1; // Reset editing index
    form.querySelector('button[type="submit"]').textContent = 'Add'; // Change button text back to Add
});