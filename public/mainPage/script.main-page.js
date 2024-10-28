const booksCards = document.querySelector('#books-cards');
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');
const clearBtn = document.querySelector('#clear-btn');
const sortExpensive = document.querySelector('#sort-expensive');
const sortCheap = document.querySelector('#sort-cheap');
const totalExpensesElement = document.querySelector('.total-expenses');

let originalOrder = [];
let currentBooks = []; 

async function loadBooks() {
    try {
        const response = await fetch('/api/books');
        const books = await response.json();
        currentBooks = books; 
        displayBooks(currentBooks);
        originalOrder = Array.from(booksCards.children); 
        await getTotalPrice();
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

function displayBooks(books) {
    booksCards.innerHTML = ''; 
    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-price', book.price);
        bookCard.innerHTML = `
            <h3 class="book-title">${book.title}</h3>
            <img src="${book.imgSrc}" alt="book-${index + 1}" class="book">
            <p>${book.description}</p>
            <h4>Price: ${book.price} грн</h4>
            <hr>
        `;
        booksCards.appendChild(bookCard);
    });
}

function sortCurrentBooks(sortBy, order) {
    const query = searchBar.value.trim().toLowerCase();
    fetch(`/api/books/sort?q=${encodeURIComponent(query)}&sortBy=${sortBy}&order=${order}`)
        .then(response => {
            if (!response.ok) throw new Error("Помилка сортування");
            return response.json();
        })
        .then(sortedBooks => {
            displayBooks(sortedBooks); 
            getTotalPrice(query); 
        })
        .catch(error => console.error("Помилка:", error));
}

searchBtn.addEventListener('click', () => {
    const query = searchBar.value.trim().toLowerCase();
    if (query) {
        searchBooks(query);
        if (sortExpensive.checked) {
            sortCurrentBooks('price', 'desc');
        } else if (sortCheap.checked) {
            sortCurrentBooks('price', 'asc');
        }
    } else {
        alert('Please enter a search term');
    }
});

sortExpensive.addEventListener('change', () => {
    if (sortExpensive.checked) {
        sortCurrentBooks('price', 'desc');
        sortCheap.checked = false;
    }
});

sortCheap.addEventListener('change', () => {
    if (sortCheap.checked) {
        sortCurrentBooks('price', 'asc');
        sortExpensive.checked = false;
    }
});



async function searchBooks(query) {
    try {
        const response = await fetch(`/api/books/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            if (response.status === 404) {
                booksCards.innerHTML = '<p>No books found.</p>';
                totalExpensesElement.textContent = '0 грн';
                currentBooks = []; 
                return;
            }
            throw new Error('Error fetching books');
        }
        currentBooks = await response.json(); 
        displayBooks(currentBooks);
        await getTotalPrice(query);
    } catch (error) {
        console.error('Error searching for books:', error);
        booksCards.innerHTML = '<p>There was an error fetching the books.</p>';
    }
}

async function getTotalPrice(query = '') {
    try {
        const response = await fetch(`/api/books/totalPrice?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Error fetching total price');
        }
        const data = await response.json();
        totalExpensesElement.textContent = `${data.totalPrice} грн`;
    } catch (error) {
        console.error('Error:', error);
    }
}

function clearSearchAndFilters() {
    searchBar.value = '';
    loadBooks(); 
    sortExpensive.checked = false; 
    sortCheap.checked = false;
}

searchBtn.addEventListener('click', () => {
    const query = searchBar.value.trim().toLowerCase();
    if (query) {
        searchBooks(query);
    } else {
        alert('Please enter a search term');
    }
});

sortExpensive.addEventListener('change', () => {
    if (sortExpensive.checked) {
        sortCurrentBooks('price', 'desc');
        sortCheap.checked = false;
    }
});

sortCheap.addEventListener('change', () => {
    if (sortCheap.checked) {
        sortCurrentBooks('price', 'asc');
        sortExpensive.checked = false;
    }
});

clearBtn.addEventListener('click', clearSearchAndFilters);

document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
});
