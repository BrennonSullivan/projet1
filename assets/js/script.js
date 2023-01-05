// The Movie Database API Key
var tmdbAPI = "72e6d16c6e6cd21a8016a0865ce0c219";

// Taste Dive API Key
var tasteDiveAPI = "446474-bootcamp-PA85OKRH"

// Define Global Variables
var newbook;
var searchTerm="";
var lastBook="";

// Get street cred for our work!
console.log(`
UT Coding Bootcamp Project #1 - Group #2

Developed by:
Brennon Sullivan
Eric Reyes
Ilknur Dayanc


Repository:
https://github.com/brennonsullivan/project1
`);

// Google Books Search and append to html
var runGBSearch = (event => {
});

// MOVIE TMDB Search
var runTMDBSearch = (event => {
});

// Run Taste Dive API https://tastedive.com/read/api
var runTasteDive = (event => {
});

// save the searches to storage
var saveBook = (newBook) => {
    let bookExists = false;
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage["books" + i] === newBook) {
        bookExists = true;
        break;
        }
    }
    if (bookExists === false) {
        localStorage.setItem('books' + localStorage.length, newBook);
    };
    // Render to update in "real-time"
    renderBook();
};

// render the books to the dropdown menu
var renderBook = () => {
    $('#menu-title').empty();
    let lastBookKey = "books"+(localStorage.length-1);
    lastBook = localStorage.getItem(lastBookKey);
    for (let i = 0; i < localStorage.length; i++) {
        let book = localStorage.getItem("books" + i);
        let bookEl = `<li id="recall-book"><a id="searchedBook">${book}</a></li>`;
        $('#menu-title').prepend(bookEl);
        }
};

// run main application
var runApp = (event => {
    runGBSearch();
    runTMDBSearch();
    runTasteDive();
    renderBook();
    $('#search-input').val(function() {
        if (this.value.length == 0) {
          return $(this).attr('placeholder');
        }
      });
});

renderBook();

// to call the saved books in to search
$('#menu-title').on("click", (event) => {
    event.preventDefault();
    $("#search-input").val(event.target.textContent);
    runApp();
    $('#search-input').empty(); 
});

