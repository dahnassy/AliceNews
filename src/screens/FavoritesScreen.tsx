import React, { useEffect } from 'react';
import { FlatList, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { useNavigation } from '@react-navigation/native';
import NewsCard from '../components/NewsCard';
import { lightTheme, darkTheme } from '../theme/colors';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  padding: 16px;
  padding-top: 48px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
`;

const TitleImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 8px;
`;

const AppTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const EmptyText = styled.Text`
  margin-top: 32px;
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.muted};
`;

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { favorites, loadFavorites } = useFavoritesStore();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <Container>
      <Header>
        <TitleImage source={require('../../assets/icon.png')} />
        <AppTitle>Alice News</AppTitle>
      </Header>

      {favorites.length === 0 ? (
        <EmptyText>Nenhuma notícia favoritada ainda.</EmptyText>
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
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      )}
    </Container>
  );
}
