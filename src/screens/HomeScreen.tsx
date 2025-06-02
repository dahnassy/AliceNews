import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl,TouchableOpacity, TextInput} from 'react-native';
import { useNewsStore } from '../store/useNewsStore';
import NewsCard from '../components/NewsCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { debounce } from 'lodash';
import { Ionicons } from '@expo/vector-icons'; // ícone do "x" vou testar depois no cli


type RootStackParamList = {
  Home: undefined;
  Details: { article: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
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
      
    <View style={styles.container}>
      
              <View style={styles.searchWrapper}>
                <TextInput
                  placeholder="Buscar notícias..."
                  value={search}
                  onChangeText={(text) => {
                    setSearch(text);
                    debouncedSearch(text);
                  }}
                  style={styles.searchInput}
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
                
              </View>
              <FlatList
                    horizontal
                    data={categories}
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    renderItem={({ item }) => {
                      const isActive = item === selectedCategory;
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedCategory(item);
                            loadNews(item === 'todas' ? '' : item);
                          }}
                          style={{
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            backgroundColor: isActive ? '#0053A0' : '#e0e0e0',
                            borderRadius: 20,
                            marginRight: 8,
                          }}
                        >
                          <Text style={{ color: isActive ? '#fff' : '#333', fontWeight: 'bold' }}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Favorites')}
                    style={styles.favoritesButton}
                  >
                    <Ionicons name="star" size={28} color="#facc15" />
                  </TouchableOpacity>
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
    </View>
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
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  favoritesButton: {
  position: 'absolute',
  top: 40,
  right: 20,
  zIndex: 10,
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 6,
  elevation: 3,
},

  
});
