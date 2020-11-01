let myLibrary = [];

function Book(title, author, numOfPages, read) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;

};


if (localStorage.getItem('myLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
}

function addBookToLibrary(author, title, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};


function clearModalFields() {
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#read').checked = false;
}

function retriveFormData() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;

    if (!title || !author || !pages) {
        alert('All fields are mandatory!')
    } else {
    addBookToLibrary(author, title, pages, read);
    showBooks()
    }
    // Clearing the fields
    clearModalFields()
}

function deleteBook() {
    myLibrary.splice(this.dataset.index, 1)
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    showBooks()

}

function changeStatus() {
    if (myLibrary[this.dataset.index].read === true) {
        myLibrary[this.dataset.index].read = false;
    } else {
        myLibrary[this.dataset.index].read = true;
    }
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    showBooks();
}


function showBooks() {
    const books = document.querySelector('.book-list');

    // Rendering Books
    // Read Status and button set up based on current status
    const renderBooks = myLibrary.map((book, index) => {

        let readClass = "";
        let readStatus = "";
        let readText = "";
        if (book.read === true) {
            readClass = `btn-warning`;
            readStatus = `Didn't read`;
            readText = `I have read it`;
        } else {
            readClass = `btn-success`;
            readStatus = `Read it`;
            readText = `Haven't read it yet`
        }

        // Returning a Book Card HTML
        return `
        <div class="card m-2" style="width: 18rem;" >
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">written by ${book.author}</h6>
                <p class="card-text">${book.numOfPages} pages long</p>
                <p class="card-text">${readText}</p>
                <button type="button" class="btn btn-danger btn-del" data-index="${index}">Delete</button>
                <button type="button" class="btn ${readClass} btn-toggle" data-index="${index}">${readStatus}</button>
            </div>
        </div>
        `
    }).join('');

    books.innerHTML = renderBooks;
    // Deleting a book using its data-index attribute
    document.querySelectorAll('.btn-del').forEach(del => del.addEventListener('click', deleteBook));
    // Changing the read status using its data-index attribute
    document.querySelectorAll('.btn-toggle').forEach(change => change.addEventListener('click', changeStatus));

}

showBooks();