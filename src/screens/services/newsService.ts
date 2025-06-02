import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4/top-headlines';

export const fetchNews = async (page = 1, query = '') => {
  const response = await axios.get(BASE_URL, {
    params: {
      lang: 'pt',
      country: 'br',
      q: query || undefined,
      max: 10,
      page,
      token: API_KEY,
    },
  });

  return response.data.articles;
};
