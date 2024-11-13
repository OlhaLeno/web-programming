import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

export const getProducts = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return axios.get(`${API_URL}/books?${params}`);
};
export const getFilteredBooks = async (filters) => {
  try {
    
    const queryString = new URLSearchParams(filters).toString();
    
    
    const response = await axios.get(`http://localhost:3000/api/books?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Помилка завантаження книжок:", error);
    return [];
  }
};
