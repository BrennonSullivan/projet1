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
    searchTerm = $("#search-input").val();
    var googleFetch = "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm;
    // fetch API
    fetch(googleFetch)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        // for reference - delete console.log when finished
        saveBook(response.items[0].volumeInfo.title);
        // populates the html div
        // Book Cover
        $('#image').html(`<a href="#"><img src="${response.items[0].volumeInfo.imageLinks.smallThumbnail}"></a>`);
        // Book Title
        $('#title').html(response.items[0].volumeInfo.title);
        // Book Author
        $('#author').html(response.items[0].volumeInfo.authors[0]);
        // Book Rating
        let bookRating = response.items[0].volumeInfo.averageRating;
        $('#book-rating').html(`Book Rating: <span id="bRate"> ${bookRating}</span>`);
        // Color Rating based on score
        if (bookRating>=0 && bookRating<2){
            $('#bRate').attr("class", "round alert label");
        } else if (bookRating>=2 && bookRating<4){
            $('#bRate').attr("class", "round warning label");
        } else if (bookRating>=4){
            $('#bRate').attr("class", "round success label");
        };
        // Preview in Google Books
        $('#google-preview').html(`  <a href="${response.items[0].volumeInfo.previewLink}"><i class="fas fa-book-reader"></i>     Preview (Google Books)</a>`);
        // Book description
        $('#book-description').html("<h5>Book Description: </h5>" + response.items[0].volumeInfo.description + "<br>");

    });
})

// MOVIE TMDB Search
var runTMDBSearch = (event => {

})

// Run Taste Dive API https://tastedive.com/read/api
var runTasteDive = (event => {
})

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

// Can now press "ENTER" to execute the click event and run search
$("#search-input").keypress((event) => { 
    if (event.keyCode === 13) { 
        $(".button").click(); 
    } 
}); 
$(".button").on('click', (event) => {
    runApp();
});
