import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sensores'; // Substitua com o seu IP real se for o caso

export const getDadosSensores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
