import React, { useState } from 'react';
import './Filters.css';

function Filters({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState('');
  const [pagesRange, setPagesRange] = useState('');
  const [genreRange, setGenreRange] = useState('');

  const handleFilterChange = () => {
    onFilterChange({
      price: priceRange,
      pages: pagesRange,
      genre: genreRange,
    });
  };
  const handleResetFilters = () => {
    setPriceRange('');
    setPagesRange('');
    setGenreRange('');
    onFilterChange({ price: '', pages: '', genre: '' });
  };

  return (
    <div className="filters">
      <select
        className="filter-select"
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
      >
        <option value="">Ціна</option>
        <option value="300">До 300</option>
        <option value="500">До 500</option>
        <option value="1000">До 1000</option>
      </select>

      <select
        className="filter-select"
        value={pagesRange}
        onChange={(e) => setPagesRange(e.target.value)}
      >
        <option value="">Кількість сторінок</option>
        <option value="300">До 300</option>
        <option value="500">До 500</option>
        <option value="1000">До 1000</option>
      </select>

      <select
        className="filter-select"
        value={genreRange}
        onChange={(e) => setGenreRange(e.target.value)}
      >
        <option value="">Жанр</option>
        <option value="роман">Роман</option>
        <option value="детектив">Детектив</option>
        <option value="психологія">Психологія</option>
        <option value="фентезі">Фентезі</option>
      </select>

      <button className="apply-button" onClick={handleFilterChange}>
        Підтвердити
      </button>
      <button className="reset-button" onClick={handleResetFilters}>
        Скинути
      </button>
    </div>
  );
}

export default Filters;
