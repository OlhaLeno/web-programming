document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('libraryForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const priceInput = document.getElementById('price');
    const deleteButton = document.getElementById('deleteButton');
    let currentBookIndex = -1;  // Для зберігання індексу книги, яку редагуємо

    function getBooksFromStorage() {
        const books = localStorage.getItem('books');
        return books ? JSON.parse(books) : [];
    }

    function saveBooksToStorage(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }

    titleInput.addEventListener('blur', () => {
        const searchTitle = titleInput.value.trim();
        const books = getBooksFromStorage();

        currentBookIndex = books.findIndex(book => book.title === searchTitle);

        if (currentBookIndex !== -1) {
            const bookToEdit = books[currentBookIndex];
            descriptionInput.value = bookToEdit.description;
            priceInput.value = bookToEdit.price;
            alert('Книгу знайдено!');
        } else {
            alert('Книгу не знайдено!');
            form.reset();
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const price = priceInput.value;
        
        if (isNaN(price) || price <= 0) {
            alert('Будь ласка, введіть коректну ціну (лише цифри, більше 0).');
            return;
        }
        if (currentBookIndex !== -1) {
            const books = getBooksFromStorage();

            books[currentBookIndex].title = titleInput.value;
            books[currentBookIndex].description = descriptionInput.value;
            books[currentBookIndex].price = priceInput.value;

            saveBooksToStorage(books);
            alert('Книжку відредаговано успішно!');
            form.reset();
        } else {
            alert('Книгу не знайдено для редагування!');
        }
    });

    deleteButton.addEventListener('click', function() {
        if (currentBookIndex !== -1) {
            const books = getBooksFromStorage();

            books.splice(currentBookIndex, 1);

            saveBooksToStorage(books);

            alert('Книга видалена успішно!');
            form.reset();  
            currentBookIndex = -1;  
        } else {
            alert('Не знайдено книгу для видалення!');
        }
    });
});
