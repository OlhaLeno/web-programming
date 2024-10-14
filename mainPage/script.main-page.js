const booksCards = document.querySelector('#books-cards');
const totalExpenses = document.querySelector('.total-expenses');
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');
const clearBtn = document.querySelector('#clear-btn');
const sortExpensive = document.querySelector('#sort-expensive');
const sortCheap = document.querySelector('#sort-cheap');
const countBtn = document.querySelector('#count-btn');

function getBooksFromStorage() {
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
}

function saveBooksToStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

let originalOrder = [];

function displayBooks() {
    const booksContainer = document.getElementById('books-cards');
    booksContainer.innerHTML = ''; 

    const books = getBooksFromStorage();

    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-price', book.price);
        bookCard.setAttribute('data-index', index + 1);

        bookCard.innerHTML = `
            <h3 class="book-title">${book.title}</h3>
            <img src="${book.imgSrc}" alt="book-${index + 1}" class="book">
            <p>${book.description}</p>
            <h4>Price: ${book.price} грн</h4>
            <hr>
        `;
        booksContainer.appendChild(bookCard);
    });

    originalOrder = Array.from(booksContainer.children);
}

document.addEventListener('DOMContentLoaded', () => {
    displayBooks();
});

sortExpensive.addEventListener('change', () => {
    if (sortExpensive.checked) {
        const booksArray = Array.from(booksCards.children).filter(book => book.style.display !== 'none');
        const sortedBooks = booksArray.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return priceB - priceA; 
        });
        booksCards.innerHTML = '';
        sortedBooks.forEach(book => booksCards.appendChild(book));
        sortCheap.checked = false; 
    }
});

sortCheap.addEventListener('change', () => {
    if (sortCheap.checked) {
        const booksArray = Array.from(booksCards.children).filter(book => book.style.display !== 'none');
        const sortedBooks = booksArray.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return priceA - priceB; 
        });
        booksCards.innerHTML = '';
        sortedBooks.forEach(book => booksCards.appendChild(book));
        sortExpensive.checked = false; 
    }
});

searchBtn.addEventListener('click', () => {
    const query = searchBar.value.trim().toLowerCase();
    const books = booksCards.children;
    Array.from(books).forEach(book => {
        const title = book.querySelector('.book-title').textContent.toLowerCase();
        if (title.includes(query)) {
            book.style.display = '';
        } else {
            book.style.display = 'none';
        }
    });
});

clearBtn.addEventListener('click', () => {
    searchBar.value = ''; 

    booksCards.innerHTML = '';
    originalOrder.forEach(book => booksCards.appendChild(book));

    Array.from(booksCards.children).forEach(book => {
        book.style.display = ''; 
    });

    sortExpensive.checked = false; 
    sortCheap.checked = false;

    totalExpenses.textContent = '0';
});

countBtn.addEventListener('click', () => {
    let totalPrice = 0;
    Array.from(booksCards.children).forEach(book => {
        if (book.style.display !== 'none') {
            totalPrice += parseFloat(book.getAttribute('data-price'));
        }
    });
    totalExpenses.textContent = totalPrice.toFixed(2);
});