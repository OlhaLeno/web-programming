document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('libraryForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const imageUpload = document.getElementById('image').files[0];

        if (isNaN(price) || price <= 0) {
            alert("Будь ласка, введіть коректну ціну (лише цифри та невід'ємні значення).");
            return;
        }
        
        if (title && description && price && imageUpload) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgSrc = e.target.result;
                const newBook = { title, description, price, imgSrc };
                const books = getBooksFromStorage();

                const isDuplicate = books.some(book => book.title === title);

                if (isDuplicate) {
                    alert('Книга з таким заголовком вже існує.');
                } else {
                    books.push(newBook);
                    saveBooksToStorage(books);
                    alert('Книжку додано успішно!');
                    form.reset();
                }
            };
            reader.readAsDataURL(imageUpload);
        } else {
            document.getElementById('errorMessage').style.display = 'block'; 
        }
    });
});

function getBooksFromStorage() {
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
}

function saveBooksToStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}
