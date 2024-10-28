const booksCards = document.querySelector('#books-cards');
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');
const clearBtn = document.querySelector('#clear-btn');
const sortExpensive = document.querySelector('#sort-expensive');
const sortCheap = document.querySelector('#sort-cheap');
const totalExpenses = document.querySelector('.total-expenses');

let originalOrder = [];


async function loadBooks() {
    try {
        const response = await fetch('/api/books');
        const books = await response.json();
        displayBooks(books);
        originalOrder = Array.from(booksCards.children); 
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

async function sortBooks(sortBy, order) {
    try {
        const response = await fetch(`/api/books/sort?sortBy=${sortBy}&order=${order}`);
        if (!response.ok) {
            throw new Error('Error fetching sorted books');
        }
        const sortedBooks = await response.json();
        displayBooks(sortedBooks); 
    } catch (error) {
        console.error('Error:', error);
    }
}



sortExpensive.addEventListener('change', () => {
    if (sortExpensive.checked) {
        sortBooks('price', 'desc');
    }
});

sortCheap.addEventListener('change', () => {
    if (sortCheap.checked) {
        sortBooks('price', 'asc');
    }
});



searchBtn.addEventListener('click', async () => {
    const query = searchBar.value.trim().toLowerCase();

    if (query === '') {
        alert('Please enter a search term');
        return;
    }

    try {
        const response = await fetch(`/api/books/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            if (response.status === 404) {
                booksCards.innerHTML = '<p>No books found.</p>';
                return;
            }
            throw new Error('Error fetching books');
        }

        const filteredBooks = await response.json();
        displayBooks(filteredBooks);
    } catch (error) {
        console.error('Error searching for books:', error);
        booksCards.innerHTML = '<p>There was an error fetching the books.</p>';
    }
});
const totalExpensesElement = document.querySelector('.total-expenses');

async function getTotalPrice(query = '') {
    try {
        const response = await fetch(`/api/books/totalPrice?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Error fetching total price');
        }

        const data = await response.json();
        totalExpensesElement.textContent = ` ${data.totalPrice} грн`;
    } catch (error) {
        console.error('Error:', error);
    }
    
}


document.addEventListener('DOMContentLoaded', () => {
    getTotalPrice();
});


searchBtn.addEventListener('click', () => {
    const query = searchBar.value.trim().toLowerCase();
    getTotalPrice(query);
});



document.addEventListener('DOMContentLoaded', () => {
    getTotalReaders();
});


searchBtn.addEventListener('click', () => {
    const query = searchBar.value.trim().toLowerCase();
    getTotalReaders(query);
});



clearBtn.addEventListener('click', async () => {
    searchBar.value = ''; 

    await loadBooks(); 

    sortExpensive.checked = false; 
    sortCheap.checked = false;

    totalExpenses.textContent = '0'; 
});


document.addEventListener('DOMContentLoaded', () => {
    loadBooks(); 
});
