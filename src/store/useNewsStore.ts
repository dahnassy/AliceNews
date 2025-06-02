import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchNews } from '../screens/services/newsService';

type Article = {
  title: string;
  url: string;
  urlToImage?: string;
  source: { name: string };
  publishedAt: string;
  content?: string;
};

type NewsStore = {
  news: Article[];
  page: number;
  loading: boolean;
  error: string | null;
  query: string;
  loadNews: (query?: string) => Promise<void>;
  loadMore: () => Promise<void>;
};

const CACHE_KEY = '@news_cache';

export const useNewsStore = create<NewsStore>((set, get) => ({
  news: [],
  page: 1,
  loading: false,
  error: null,
  query: '',

  loadNews: async (query = '') => {
    set({ loading: true, error: null, query, page: 1 });
    try {
      const articles = await fetchNews(1, query);

      // Salva no cache
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(articles));

      set({ news: articles, loading: false });
    } catch (error) {
      console.warn('Erro ao buscar notícias. Tentando cache...');
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          set({
            news: JSON.parse(cached),
            loading: false,
            error: 'Sem conexão. Exibindo últimas notícias salvas.',
          });
        } else {
          set({
            news: [],
            loading: false,
            error: 'Erro ao carregar notícias e nenhum cache disponível.',
          });
        }
      } catch (cacheError) {
        set({
          news: [],
          loading: false,
          error: 'Erro ao carregar notícias e falha no cache.',
        });
      }
    }
  },

  loadMore: async () => {
    const { page, news, query } = get();
    const nextPage = page + 1;
    set({ loading: true });
    try {
      const moreArticles = await fetchNews(nextPage, query);
      const updatedNews = [...news, ...moreArticles];

      // Atualiza cache com o novo conjunto completo
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(updatedNews));

      set({
        news: updatedNews,
        page: nextPage,
        loading: false,
      });
    } catch (error) {
      set({ error: 'Erro ao carregar mais notícias.', loading: false });
    }
  },
}));
