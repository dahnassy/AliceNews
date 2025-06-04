
# 📱 AliceNews - Aplicativo de Notícias - Desafio Senado Federal

Este projeto é um aplicativo mobile desenvolvido em **React Native com Expo**, como parte do desafio técnico do Senado Federal. O app consome uma API pública de notícias e permite ao usuário visualizar, buscar, favoritar e explorar conteúdos por categoria.

A origem do nome veio em homenagem a minha menina de 6 anos, que é muito curiosa, carismatica e comunicativa.

---

## 🧩 Funcionalidades

- ✅ Lista de notícias com título, imagem, fonte e data
- ✅ Integração com a [GNews API](https://gnews.io/)
- ✅ Scroll infinito para carregamento de mais notícias
- ✅ Campo de busca com debounce
- ✅ Filtro por categorias (política, saúde, tecnologia, etc)
- ✅ Favoritar notícias com persistência local (AsyncStorage) 
- ✅ Cache offline para modo sem internet 
- ✅ Tema claro e escuro
- ✅ Splash screen e ícone customizado 

---

## 🛠️ Tecnologias e Bibliotecas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Axios](https://axios-http.com/)
- [GNews API](https://gnews.io/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) *(para cache e favoritos)*
- [Expo Vector Icons](https://icons.expo.fyi/)
- [Lodash](https://lodash.com/) *(debounce)*
- entre outras bibliotecas especificas como Suporte a tema escuro e claro com `useColorScheme`
---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/dahnassy/AliceNews.git
cd alice-news
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure sua API Key

- Crie uma conta gratuita em: [https://gnews.io/](https://gnews.io/)
- Copie sua API key e configure em `app.config.js`:

```js
extra: {
  GNEWS_API_KEY: "SUA_CHAVE_AQUI"
}
```

- ou deixe a que já está no codigo, vai funcionar sem problemas

### 4. Rode o app

```bash
npx expo start
```

Você pode testar no emulador Android/iOS ou com o app **Expo Go** no seu celular.

---

## 🧪 Como testar

- Pesquise por notícias usando o campo no topo
- Use a lista horizontal de categorias para filtrar os resultados
- Clique em uma notícia para ver os detalhes completos, podendo abrir no site original
- Toque na estrela ⭐ para favoritar uma notícia 
- Na ⭐ Inferior direita você acha a pagina de favoritos

![Video Gravado no Android 10+](./assets/alicenews.gif)

[Baixar vídeo demonstrativo](./assets/alicenews.webm)


---

## 📁 Estrutura de pastas

```bash
src/
├── assets/              # Imagens e fontes
├── components/          # Componentes reutilizáveis
├── screens/             # Telas do app (Home, Details, Favorites)
├── services/            # Integração com API
├── store/               # Zustand stores (estado global)
├── navigation/          # Rotas com React Navigation
├── utils/               # Funções utilitárias
```

---

## 📦 Disponivel o apk neste link

- [Baixar apk](./assets/alicenews.apk)


---

## 🤝 Licença

Projeto desenvolvido para fins de avaliação técnica.

---

## 👨‍💻 Autor

Desenvolvido por **[Nathanael de Souza Leite]**  
[LinkedIn](https://linkedin.com/in/nathanaelleite) • [GitHub](https://github.com/dahnassy)
