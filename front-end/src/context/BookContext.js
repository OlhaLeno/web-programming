import React, { createContext, useContext, useState } from 'react';
import booksData from '../data/Books.json'; 

export const BookContext = createContext();

export const useBookContext = () => {
  return useContext(BookContext);
};

export const BookProvider = ({ children }) => {
  const [books] = useState(booksData); 

  return (
    <BookContext.Provider value={{ books }}>
      {children}
    </BookContext.Provider>
  );
};
