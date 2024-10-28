const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let books = [
    {
        title: "Хірург - Тесс Геррітсен",
        price: 290,
        imgSrc: "img/surgeon.jpg",
        description: `"Судовий антрополог Девід Гантер утратив дружину і дочку. <br>
                    Покинувши роботу, він переїздить до містечка Менем та влаштовується на <br>
                    посаду терапевта. Ніхто з нових знайомих і гадки не має про минуле Девіда. <br>
                    Здається, його життя потихеньку повертається у спокійне русло. <br>
                    Поки місцеві хлопці не знаходять на болоті тіло вбитої жінки. <br>
                    Згодом зникає ще одна жінка, а за кілька днів знаходять і її понівечене тіло. <br>
                    Схоже, в Менемі з’явився серійний убивця. У містечку наростає тривога. <br>
                    Мешканці підозрюють одне одного у скоєному. Девід не може стояти осторонь та <br>
                    втягується в розслідування. До того ж остання зникла - нова знайома Девіда."`
    },
    {
        title: "Нотатки ненависті - Ві Кіланд, Пенелопа Уорд",
        price: 310,
        imgSrc: "img/notatku-nenavuski.jpg",
        description: `"Шарлотта завжди мріяла про мить, коли вбереться у весільну сукню, <br>
                    але аж ніяк не про день, коли її доведеться продавати, так і не одягнувши…
                    <br>
                    Дівчина відносить вбрання у вінтажний магазин, де у підкладці плаття <br>
                    іншої нареченої випадково знаходить записку на блакитному клаптику.<br>
                    «Дякую тобі за те, що здійснила всі мої мрії. Твій коханий, Рід». <br>
                    Здається, це наймиліше, що Шарлотта будь-коли бачила,
                    <br>а цей чоловік, імовірно, найромантичніша людина на світі…
                    <br>
                    За іронією долі Рід Іствуд виявляється новим босом дівчини <br>
                    і відкривається їй з дещо іншого боку: він цинічний та зарозумілий. <br>
                    Попри це, Шарлотті не виходить з голови любовна записка, знайдена в сукні, <br>
                    тож їй кортить дізнатися про минуле Ріда."`,
    },
    {
        title: "Хімія смерті - Саймон Бекетт",
        price: 270,
        imgSrc: "img/ximia-smerti.jpg",
        description: `"Судовий антрополог Девід Гантер утратив дружину і дочку. <br>
                    Покинувши роботу, він переїздить до містечка Менем та влаштовується на <br>
                    посаду терапевта. Ніхто з нових знайомих і гадки не має про минуле Девіда. <br>
                    Здається, його життя потихеньку повертається у спокійне русло. <br>
                    Поки місцеві хлопці не знаходять на болоті тіло вбитої жінки. <br>
                    Згодом зникає ще одна жінка, а за кілька днів знаходять і її понівечене тіло. <br>
                    Схоже, в Менемі з’явився серійний убивця. У містечку наростає тривога. <br>
                    Мешканці підозрюють одне одного у скоєному. Девід не може стояти осторонь та <br>
                    втягується в розслідування. До того ж остання зникла - нова знайома Девіда."`,
    },
    {
        title: "Випадкові наречені - Крістіна Лорен",
        price: 340,
        imgSrc: "img/vupadkovi-narecheni.jpg",
        description: `"Сестри-близнючки Олів та Емілія мають геть різну вдачу.<br> 
                    В Олів ніколи ні з чим не складалося — ані в кар’єрі, ані в коханні. <br>
                    Якось шестирічна дівчинка застрягла в автоматі з іграшками, і про це писали всі місцеві видання. <br>
                    А ось Емілія — щасливиця.Навіть весілля з коханим красенем вона<br> 
                    зуміла оплатити завдяки виграшам в інтернет-конкурсах. <br>
                    Утім, під час весілля щось пішло не так: усі гості разом із молодятами отруїлися. <br>
                    Пригода оминула тільки Олів та Ітана, дружку нареченого,<br>
                     який страшенно не сподобався невдачливій сестрі. <br>
                    Та хіба варто через таке марнувати оплачений медовий місяць на Гаваях? <br>
                    Замість молодят у мандрівку вирушають Олів з Ітаном.<br>
                     Чи вдасться їм забути про взаємну неприязнь і добряче відпочити?"`,
    },
]

app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mainPage', 'lab4.index.html'));
});

app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addPage', 'index.html'));
});

app.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'editPage', 'index.html'));
});

app.get('/api/books/search', (req, res) => {
    const query = req.query.q.toLowerCase().trim();

    let filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query)
    );

    filteredBooks.sort((a, b) => b.readers - a.readers);

    if (filteredBooks.length === 0) {
        return res.status(404).json({ error: 'Книг не знайдено' });
    }

    res.json(filteredBooks);
});

app.get('/api/books/sort', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase().trim() : null;
    const order = req.query.order === 'asc' ? 1 : -1;
    const sortBy = req.query.sortBy || 'price';

    let filteredBooks = query 
        ? books.filter(book => book.title.toLowerCase().includes(query)) 
        : books;

    if (query) {
        filteredBooks = filteredBooks.sort((a, b) => {
            const aMatches = a.title.toLowerCase().indexOf(query);
            const bMatches = b.title.toLowerCase().indexOf(query);
            return (aMatches - bMatches) * order;
        });
    }

   
    filteredBooks = filteredBooks.sort((a, b) => {
        if (sortBy === 'price') {
            return (a.price - b.price) * order;
        } else if (sortBy === 'readers') {
            return (a.readers - b.readers) * order;
        }
        return 0;
    });

    res.json(filteredBooks);
});

app.get('/api/books/totalPrice', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase().trim() : null;

    const filteredBooks = query 
        ? books.filter(book => book.title.toLowerCase().includes(query)) 
        : books;

    const totalPrice = filteredBooks.reduce((sum, book) => sum + book.price, 0);

    res.json({ totalPrice });
});

app.post('/api/books', (req, res) => {
    const { title, description, price, image } = req.body;

    console.log('Дані, отримані від клієнта:', req.body);

    if (!title || !description || !price) {
        return res.status(400).json({ error: 'Будь ласка, заповніть всі поля!' });
    }

    const newBook = { title, description, price: parseFloat(price), image: image || 'public/pank57.jpg' };
    books.push(newBook);

    return res.status(201).json(newBook);
});

app.put('/api/books/:title', (req, res) => {
    const { title } = req.params;
    const { description, price } = req.body;

    const bookIndex = books.findIndex(book => book.title === title);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Книгу не знайдено' });
    }

    books[bookIndex].description = description;
    books[bookIndex].price = parseFloat(price);

    return res.status(200).json(books[bookIndex]);
});

app.delete('/api/books/:title', (req, res) => {
    const { title } = req.params;
    const bookIndex = books.findIndex(book => book.title === title);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Книгу не знайдено' });
    }

    books.splice(bookIndex, 1);
    return res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
