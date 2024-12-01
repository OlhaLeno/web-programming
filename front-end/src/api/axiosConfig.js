import axios from 'axios';


const API_URL = 'http://localhost:5000/api'; 

export const getBooks = (filters = {}) => {
  const params = new URLSearchParams(filters).toString(); 
  return axios.get(`${API_URL}/books?${params}`);
};

export const addToCartToServer = async (item) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, item); 
    return response.data;
  } catch (error) {
    console.error('Помилка додавання товару в кошик:', error);
    throw error;
  }
};

export const getFilteredBooks = async (filters) => {
  try {

    const queryString = new URLSearchParams(filters).toString(); 
    const response = await axios.get(`http://localhost:3000/api/books?${queryString}`);
    return response.data; 
  } catch (error) {
    console.error("Помилка завантаження книг:", error);
    return []; 
  }
};

export const getCart = async () => {
  try {
    const response = await axios.get(`${API_URL}/cart`);
    return response.data;
  } catch (error) {
    console.error("Помилка отримання кошика:", error);
    return [];
  }
};

export const updateCart = async (id, updatedDetails) => {
  const response = await axios.put(`${API_URL}/cart/${id}`, updatedDetails);
  return response.data;
};

export const removeFromCart = async (id) => {
  const response = await axios.delete(`${API_URL}/cart/${id}`);
  return response.data;
};

export const getBookDetails = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/books/${id}`);
        return response.data;
    } catch (error) {
        console.error('Помилка завантаження деталей книжки:', error);
        throw error;
    }
};

export const updateCartItemDetails = async (itemId, numbers, cover) => {
  try {
    const response = await axios.put(`${API_URL}/cart/${itemId}`, {numbers, cover });
    return response.data;
  } catch (error) {
    console.error('Помилка оновлення кількості та обкладинки для товару в кошику:', error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Помилка завантаження книжки:', error);
    throw error;
  }
};