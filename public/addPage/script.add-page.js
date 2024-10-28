document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('libraryForm');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;

        
        

     
        if (isNaN(price) || price <= 0) {
            alert("Будь ласка, введіть коректну ціну (лише цифри та невід'ємні значення).");
            return;
        }

        
        if (title && description && price) {
            const newBook = {
                title: title,
                description: description,
                price: parseFloat(price),
                image: 'public/pank57.jpg'  
            };

            try {
                const response = await fetch('/api/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newBook)  
                });

                if (!response.ok) {
                    const errorResponse = await response.json(); 
                    throw new Error(errorResponse.error || 'Не вдалося додати книгу');
                }

                const result = await response.json();
                alert('Книжку додано успішно!');
                form.reset();  

            } catch (error) {
                console.error('Помилка при додаванні книги:', error);
                alert('Помилка при додаванні книги: ' + error.message);
            }
        } else {
            document.getElementById('errorMessage').style.display = 'block';
        }
    });
});
