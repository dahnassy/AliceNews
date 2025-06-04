import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavoritesStore } from '../store/useFavoritesStore';


type NewsCardProps = {
  article: {
    title: string;
    url: string; // ← necessário!
    urlToImage?: string;
    source: { name: string };
    publishedAt: string;
    content?: string;
  };
  onPress?: () => void;
};

export default function NewsCard({ article, onPress }: NewsCardProps) {
  const { title, urlToImage, source, publishedAt } = article;
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const toggleFavorite = () => {
  isFavorite(article.url)
    ? removeFavorite(article.url)
    : addFavorite(article);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {urlToImage ? (
        <Image source={{ uri: urlToImage }} style={styles.image} />
      ) : null}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.meta}>
          <Text style={styles.source}>{source.name}</Text>
          <Text style={styles.date}>
            {new Date(publishedAt).toLocaleDateString('pt-BR')}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleFavorite} style={styles.star}>
          <Ionicons
            name={isFavorite(article.url) ? 'star' : 'star-outline'}
            size={20}
            color="#facc15"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    marginHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 180,
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  source: {
    fontSize: 12,
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  star: {
  position: 'absolute',
  top: 10,
  right: 10,
  },
});
