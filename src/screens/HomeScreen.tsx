import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl,TouchableOpacity, TextInput} from 'react-native';
import { useNewsStore } from '../store/useNewsStore';
import NewsCard from '../components/NewsCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { debounce } from 'lodash';
import { Ionicons } from '@expo/vector-icons'; // ícone do "x" vou testar depois no cli
import { useColorScheme } from 'react-native'; 
import { lightTheme, darkTheme } from '../theme/colors';
import styled from 'styled-components/native';

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

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;


const CategoryButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  margin-right: 8px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.card};
  border: 1px solid ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.border};
  align-self: flex-start;
`;


const CategoryText = styled.Text<{ active: boolean }>`
  font-weight: 600;
  color: ${({ active, theme }) => (active ? '#fff' : theme.colors.text)};
`;


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SearchInput = styled.TextInput`
  flex: 1;
  padding: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

const SearchWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 16px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 0 8px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-offset: 0px 2px;
`;

const FavoriteFAB = styled.TouchableOpacity`
  position: absolute;
  bottom: 24px;
  right: 24px;
  background-color: #facc15;
  padding: 14px;
  border-radius: 32px;
  elevation: 6;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
  z-index: 100;
`;

type RootStackParamList = {
  Home: undefined;
  Details: { article: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const categories = [
  'todas',
  'tecnologia',
  'esporte',
  'negócios',
  'política',
  'entretenimento',
  'ciência',
  'saúde',
  ];
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const navigation = useNavigation<NavigationProp>();
  const { news, loadNews, loadMore, loading, error } = useNewsStore();
  

  useEffect(() => {
    loadNews();
  }, []);

  const [search, setSearch] = useState('');

  const debouncedSearch = useCallback(
  debounce((value: string) => {
    loadNews(value);
  }, 600),
  []
  );

  const handleRefresh = () => {
    loadNews();
  };

  const handleEndReached = () => {
    if (!loading) {
      loadMore();
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ marginVertical: 16 }} size="small" />;
  };

  return (
      
    <Container>
              <Header>
                <TitleImage source={require('../../assets/icon.png')} />
                <Title>Alice News</Title>
              </Header>

      
              <SearchWrapper>
                <SearchInput
                  placeholder="Buscar notícias..."
                  placeholderTextColor={theme.muted}
                  value={search}
                  onChangeText={(text) => {
                    setSearch(text);
                    debouncedSearch(text);
                  }}
                  style={[styles.searchInput, { color: theme.text }]}
                />
                {search.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSearch('');
                      loadNews();
                    }}
                    style={styles.clearButton}
                  >
                    <Ionicons name="close" size={20} color="#666" />
                  </TouchableOpacity>
                )}
                  
              </SearchWrapper>
              <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 0, }}
                renderItem={({ item }) => {
                const isActive = item === selectedCategory;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCategory(item);
                      loadNews(item === 'todas' ? '' : item);
                    }}
                    style={{
                      backgroundColor: isActive ? theme.primary : theme.border,
                      borderRadius: 20,
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        paddingHorizontal:16,
                        paddingBottom:5,
                        
                        color: isActive ? '#fff' : theme.text,
                        flexShrink: 1,            //  permite o texto encolher
                        maxWidth: 120,            //  impede de passar demais
                        textAlign: 'center',      //  centraliza
                        
                      }}
                      numberOfLines={1} 
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

              <FavoriteFAB onPress={() => navigation.navigate('Favorites')}>
                <Ionicons name="star" size={28} color="#fff" />
              </FavoriteFAB>
                  
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        
        <FlatList
          data={news}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              onPress={() => navigation.navigate('Details', { article: item })}
            />
          )}
          contentContainerStyle={{ paddingVertical: 16 }}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={loading && news.length === 0} onRefresh={handleRefresh} />
          }
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  errorText: {
    padding: 16,
    color: 'red',
    textAlign: 'center',
  },
  searchInput: {
    padding: 12,
    //se eu quiser gordão
    //margin: 16,
    // backgroundColor: '#fff',
    // borderRadius: 8,
    // elevation: 2, 
    flex: 1,
  },
  searchWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 16,
  marginTop: 16,
  backgroundColor: '#fff',
  borderRadius: 8,
  elevation: 2,
  },
  clearButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  favoritesButton: {
  position: 'absolute',
  top: 40,
  right: 20,
  zIndex: 10,
  backgroundColor: '#ffffffee',
  borderRadius: 28,
  padding: 8,
  elevation: 5,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
},

  
});
