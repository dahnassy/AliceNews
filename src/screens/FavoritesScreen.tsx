import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import NewsCard from '../components/NewsCard';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { useNavigation } from '@react-navigation/native';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { favorites, loadFavorites } = useFavoritesStore();

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>Nenhuma notícia favoritada ainda.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              onPress={() => navigation.navigate('Details', { article: item })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  empty: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});
