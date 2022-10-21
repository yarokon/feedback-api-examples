import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://feedback-api5.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': '637316bb60msh72029ce58a98a83p19d6d5jsnb9fefc607f61',
    'X-RapidAPI-Host': 'feedback-api5.p.rapidapi.com',
    'x-api-key': 'LgcVsiwdXDt1AYSqtf5fbt4GYhk2jGGW'
  }
});