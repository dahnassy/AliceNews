import React, { useEffect, useRef } from 'react';
import { ScrollView, Linking, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Inner = styled.View`
  padding: 16px;
`;

const Header = styled.View`
  padding-bottom: 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

const ArticleImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const ArticleTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const Source = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 4px;
`;

const DateText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 12px;
`;


const Content = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 22px;
  margin-bottom: 20px;
`;

const OpenButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 12px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export default function DetailsScreen() {
  const route = useRoute<any>();
  const article = route.params?.article;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!article) {
    return (
      <Container>
        <Inner>
          <ArticleTitle>Artigo não encontrado.</ArticleTitle>
        </Inner>
      </Container>
    );
  }

  const openLink = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  return (
    <Container>
      <Animated.View style={{ flex: 1, opacity: fade }}>
        <ScrollView>
          <Inner>
            <Header>
              <TitleImage source={require('../../assets/icon.png')} />
              <AppTitle>Alice News</AppTitle>
            </Header>

            {article.urlToImage && <ArticleImage source={{ uri: article.urlToImage }} />}
            <ArticleTitle>{article.title}</ArticleTitle>
            <Source>{article.source?.name}</Source>
            {article.publishedAt && (
              <DateText>
                {new Date(article.publishedAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </DateText>
            )}

            {article.content && <Content>{article.content}</Content>}
            <OpenButton onPress={openLink}>
              <ButtonText>Ler notícia completa</ButtonText>
            </OpenButton>
          </Inner>
        </ScrollView>
      </Animated.View>
    </Container>
  );
}
