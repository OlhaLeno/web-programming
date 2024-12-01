import React, { useState, useEffect } from 'react';
import BookCard from './BookCard/BookCard';
import Filters from '../Filters/Filters';
import Loader from '../Loader/Loader';
import  {getBooks} from '../../api/axiosConfig';
import './BooksList.css';

function BooksList({ searchTerm }) {
    const [books, setBooks] = useState([]);
    const [filters, setFilters] = useState({ price: '', pages: '', genre: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async (filters) => {
        setLoading(true);
        try {
            const response = await getBooks(filters);
            setBooks(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks(filters);
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const filteredBooks = books.filter((book) =>
        searchTerm
            ? book.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
            : true
    );

    return (
        <div>
            <Filters onFilterChange={handleFilterChange} />
            {loading ? (
                <Loader />
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div className="books-list">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <BookCard
                                id={book.id}
                                key={book.id}
                                name={book.title}
                                price={book.price}
                                pages={book.pages}
                                genre={book.genre}
                                image={book.image}
                                description={book.description}
                            />
                        ))
                    ) : (
                        <div>Книга не знайдена</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default BooksList;
