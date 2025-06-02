import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Article = {
  title: string;
  url: string;
  urlToImage?: string;
  source: { name: string };
  publishedAt: string;
  content?: string;
};

type FavoritesStore = {
  favorites: Article[];
  loadFavorites: () => Promise<void>;
  addFavorite: (article: Article) => Promise<void>;
  removeFavorite: (url: string) => Promise<void>;
  isFavorite: (url: string) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],

  loadFavorites: async () => {
    const stored = await AsyncStorage.getItem('@favorites');
    if (stored) {
      set({ favorites: JSON.parse(stored) });
    }
  },

  addFavorite: async (article) => {
    const updated = [...get().favorites, article];
    set({ favorites: updated });
    await AsyncStorage.setItem('@favorites', JSON.stringify(updated));
  },

  removeFavorite: async (url) => {
    const updated = get().favorites.filter((a) => a.url !== url);
    set({ favorites: updated });
    await AsyncStorage.setItem('@favorites', JSON.stringify(updated));
  },

  isFavorite: (url) => {
    return get().favorites.some((a) => a.url === url);
  },
}));
