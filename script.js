// CLASS BOOK
class Book {
    constructor(title, author, year, price){
        this.title = title;
        this.author = author;
        this.year = year;
        this.price = price;
    }

    // function add book to the table
    addBook() {
        return`
                <td>${this.title}</td>
                <td>${this.author}</td>
                <td>${this.year}</td>
                <td>${this.price}</td>
                <td>
                    <button class="edit-buttom">Edit</button>
                    <button class="delete-buttom">Delete</button>
                </td>
        `;
    }
}

const books = [];
const form = document.getElementById('Form');
const table = document.querySelector('#Table tbody');
let edit = -1;

// "submit" run this
form.addEventListener('submit', function(add){
    add.preventDefault();  // this is stop the submit

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;

    // if there is no book in the table add a one
    if (edit === -1){
        const Newbook = new Book(title, author, year, price);
        const newElemnt = document.createElement('tr');
        newElemnt.innerHTML = Newbook.addBook();

        setupButtons(newElemnt, Newbook);

        table.appendChild(newElemnt);
        books.push(Newbook);
    }
    // if there is a book in the table add or edit a one.
    else {
        books[edit].title = title;
        books[edit].author = author;
        books[edit].year = year;
        books[edit].price = price;

        const updated = document.createElement('tr');
        updated.innerHTML = books[edit].addBook();

        // update the table
        table.replaceChild(updated, table.children[edit]);
        setupButtons(updated, books[edit]);
        // initial the edit to -1
        edit = -1;
    }

    // reset the form 
    form.reset();
    form.querySelector('button[type="submit"]').textContent = 'Add a Book';

});

function setupButtons(Element, book){
    // delete buttom
    Element.querySelector('.delete-buttom').addEventListener('click', function(){
        table.removeChild(Element);
        books.splice(books.indexOf(book), 1);
    });

    // edit buttom
    Element.querySelector('.edit-buttom').addEventListener('click', function() {
        editor(book);
    });
}

// fonction that show the update buttom
function editor(book) {
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('year').value = book.year;
    document.getElementById('price').value = book.price;

    edit = books.indexOf(book);
    form.querySelector('button[type="submit"]').textContent = 'Update book';   
}

// reset buttom 
form.querySelector('button[type="reset"]').addEventListener('click', function(){
    edit = -1;
    form.querySelector('button[type="submit"]').textContent = 'Add Book';
});



