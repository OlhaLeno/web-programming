import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const getProducts = () => {
  return axios.get(`${API_URL}/books`); 
};
export const getFilteredBooks = async (filters) => {
  try {
    
    const queryString = new URLSearchParams(filters).toString();
    
    
    const response = await axios.get(`http://localhost:5000/api/books?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Помилка завантаження книжок:", error);
    return [];
  }
};
