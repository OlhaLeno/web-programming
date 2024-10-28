document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('libraryForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const priceInput = document.getElementById('price');
    const deleteButton = document.getElementById('deleteButton');
    let currentBookIndex = -1;  

    async function fetchBooks() {
        const response = await fetch('/api/books');
        if (!response.ok) {
            throw new Error('Не вдалося отримати книги');
        }
        return await response.json();
    }

    async function updateBook(book) {
        const response = await fetch(`/api/books/${book.title}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });
        if (!response.ok) {
            throw new Error('Не вдалося оновити книгу');
        }
        return await response.json();
    }

    async function deleteBook(title) {
        const response = await fetch(`/api/books/${title}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Не вдалося видалити книгу');
        }
        return await response.json();
    }

    titleInput.addEventListener('blur', async () => {
        const searchTitle = titleInput.value.trim();
        const books = await fetchBooks();

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

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const price = priceInput.value;

        if (isNaN(price) || price <= 0) {
            alert('Будь ласка, введіть коректну ціну (лише цифри, більше 0).');
            return;
        }

        if (currentBookIndex !== -1) {
            const bookToUpdate = {
                title: titleInput.value,
                description: descriptionInput.value,
                price: parseFloat(price), 
            };

            try {
                await updateBook(bookToUpdate);
                alert('Книжку відредаговано успішно!');
                form.reset();
                currentBookIndex = -1; 
            } catch (error) {
                alert(error.message);
            }
        } else {
            alert('Книгу не знайдено для редагування!');
        }
    });

    deleteButton.addEventListener('click', async function() {
        if (currentBookIndex !== -1) {
            const bookToDelete = titleInput.value.trim();
            try {
                await deleteBook(bookToDelete);
                alert('Книга видалена успішно!');
                form.reset();
                currentBookIndex = -1; 
            } catch (error) {
                alert(error.message);
            }
        } else {
            alert('Не знайдено книгу для видалення!');
        }
    });
});
