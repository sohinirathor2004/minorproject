console.log("this is index.js");

// Constructor for Book
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// Display constructor
function Display() { }

// Add methods to display prototype
Display.prototype.add = function (book) {
  console.log("Adding to UI");
  let tableBody = document.getElementById('tableBody');

  let uiString = `<tr>
                      <td>${book.name}</td>
                      <td>${book.author}</td>
                      <td>${book.type}</td>
                  </tr>`;
  tableBody.innerHTML += uiString;
  // Save the book data to local storage
  this.addToLocalStorage(book);
}

// Clear method
Display.prototype.clear = function () {
  let libraryForm = document.getElementById('libraryform'); // Corrected variable name
  libraryForm.reset();
}

// Validate method
Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
}

// Show method for alerts
Display.prototype.show = function (type, displaymessage) {
  let message = document.getElementById('message');
  let text;
  if (type === 'success') {
    text = 'Success! Your book has been added.';
  } else {
    text = 'Error! Your book could not be added.';
  }
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                         <strong>Message:</strong> ${displaymessage}
                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                         </button>
                       </div>`;
  setTimeout(() => {
    message.innerHTML = '';
  }, 5000);
}


// Method to add book data to local storage
Display.prototype.addToLocalStorage = function (book) {
  let books = localStorage.getItem('books');
  let booksArr;

  // If no books are present in local storage, initialize an empty array
  if (books == null) {
    booksArr = [];
  } else {
    // Parse the stored JSON string to array
    booksArr = JSON.parse(books);
  }

  // Push the new book object to the array
  booksArr.push(book);

  // Store the updated array back to local storage
  localStorage.setItem('books', JSON.stringify(booksArr));
}
// Add submit event listener to library form
let libraryForm = document.getElementById('libraryform'); // Corrected variable name
libraryForm.addEventListener('submit', libraryformSubmit);

function libraryformSubmit(e) {
  console.log('You have submitted the library form');
  let name = document.getElementById('BookName').value;
  let author = document.getElementById('AuthorName').value;
  let type;

  // ML, Programming, DBMS
  let ML = document.getElementById('ML');
  let programming = document.getElementById('Programming');
  let DBMS = document.getElementById('DBMS');

  if (ML.checked) {
    type = ML.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (DBMS.checked) {
    type = DBMS.value;
  }

  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show('success', 'your has been successfully added');
  } else {
    // Show error to user
    display.show('danger', 'sorry you cannot add this book.');
  }

  e.preventDefault();
}
