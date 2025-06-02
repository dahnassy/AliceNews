import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function DetailsScreen() {
  const route = useRoute();
  const { article }: any = route.params;

  const openLink = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.source}>{article.source.name}</Text>
      <Text style={styles.date}>
        {new Date(article.publishedAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}
      </Text>
      {article.content ? <Text style={styles.content}>{article.content}</Text> : null}
      <Button title="Ler notícia completa" onPress={openLink} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  source: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#777',
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
});
