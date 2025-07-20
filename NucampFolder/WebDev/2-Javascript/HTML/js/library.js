
// class Book with a constructor method having three parameters.
class Book {
    // the boolean parameter called available has a default value of true. // the constructor's three parameters are set 
        // as properties of the object 
    constructor(title, author, available = true) {
       
        this.title = title;
        this.author = author;
        this.available = available;
    }
} // end Books

        
// This object contains an array of books and add, check out, and 
// available methods to manage the books array.

// This creates a new instance of an object using a constructor 
// using the new keyword and passing the appropriate arguments.
// An addBook method to add a new book to the library when a patron 
// donates a book.

const library = {
    books: [],
    addBook: function (title, author) {
        const book = new Book(title, author);
        this.books.push(book);
        console.log(`\nBest-in-class book added:\n"${book.title}", by ${book.author}.`)
        console.log(`Books in the library's database: ${this.books.length}`);
        },  
        
        checkOutBook: function(title) {
            try {
                let found = false;
                for (let book of this.books) {
                    if (book.title === title && !book.available) {
                        console.log(`\n${book.title} is already checked out`);
                        return false; 
                    }
                    else if (book.title === title && book.available) {
                        found = true;
                        book.available = false;
                        console.log(`\nChecked out: ${book.title}`);
                        return false;
                    }
                } // end for
                // books that were "!found" but had a title match out 
                // were filtered in the first if clause 
                if (!found) throw new Error(`The book: "${title}" was not found`)
            } catch (error) {
                console.error(error.message);
            }
        },
    
        getAvailableBooks: function() {
            let bookList = [];
            for (let book of this.books) {
                if (book.available) {
                    bookList.push(book.title);
                    console.log(`\nWe have ${bookList.length} available titles:\n\n${bookList.join("\n")}`);
                }
            return;
        }   
    }
} // end library 
const newBooks = `[
        {"title": "How Not To Die", "author": "Michael Greger"},
        {"title": "How Not To Diet", "author": "Michael Greger"},
        {"title": "How Not To Age", "author": "Michael Greger"},
        {"title": "Structure and Interpretation of Computer Programs", "author": "Gerald Sussmann"},
        {"title": "Structure and Interpretation of Computer Programs, JavaScript edition", "author": "Gerald Sussmann"},
        {"title": "The Little Schemer", "author": "Daniel P. Friedman"},
        {"title": "JavaScript: The Good Parts", "author": "Douglas Crockford"},
        {"title": "Eloquent JavaScript", "author": "Marijn Haverbeke"}
        ]`;

function receiveBooks(bookJSON) {
    const booksToAdd = JSON.parse(bookJSON);
    for (let book of booksToAdd) {
        library.addBook(book.title, book.author);
    }
}


// Tests
console.log(`There are currently ${library.books.length} books in the library's database.`);
library.addBook("Eloquent JavaScript", "Marijn Haverbeke");
receiveBooks(newBooks);
library.checkOutBook("Eloquent JavaScript");
library.checkOutBook("Grokking the Coding Interview");
library.getAvailableBooks();



