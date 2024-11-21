import axios from 'axios';


const API_URL = 'http://localhost:5000/api'; 

export const getBooks = (filters = {}) => {
  const params = new URLSearchParams(filters).toString(); 
  return axios.get(`${API_URL}/books?${params}`);
};

export const getFilteredBooks = async (filters) => {
  try {
    const queryString = new URLSearchParams(filters).toString(); 
    const response = await axios.get(`${API_URL}/books?${queryString}`);
    return response.data; 
  } catch (error) {
    console.error("Помилка завантаження книг:", error);
    return []; 
  }
};
