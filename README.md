
# 📱 AliceNews - Aplicativo de Notícias - Desafio Senado Federal

Este projeto é um aplicativo mobile desenvolvido em **React Native com Expo**, como parte do desafio técnico do Senado Federal. O app consome uma API pública de notícias e permite ao usuário visualizar, buscar, favoritar e explorar conteúdos por categoria.

---

## 🧩 Funcionalidades

- ✅ Lista de notícias com título, imagem, fonte e data
- ✅ Integração com a [GNews API](https://gnews.io/)
- ✅ Scroll infinito para carregamento de mais notícias
- ✅ Campo de busca com debounce
- ✅ Filtro por categorias (política, saúde, tecnologia, etc)
- ✅ Favoritar notícias com persistência local (AsyncStorage) ✅ *(a implementar)*
- ✅ Cache offline para modo sem internet ✅ *(a implementar)*
- ✅ Tema claro e escuro ✅ *(a implementar)*
- ✅ Splash screen e ícone customizado ✅ *(a implementar)*

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
  GNEWS_API_KEY: "SUA_CHAVE_AQUI" ou deixe a que já está no codigo, vai funcionar
}
```

### 4. Rode o app

```bash
npx expo start
```

Você pode testar no emulador Android/iOS ou com o app **Expo Go** no seu celular.

---

## 🧪 Como testar

- Pesquise por notícias usando o campo no topo
- Use a lista horizontal de categorias para filtrar os resultados
- Clique em uma notícia para ver os detalhes completos
- Toque na estrela ⭐ para favoritar uma notícia *(implementação futura)*

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

## 📦 Próximas melhorias

- [ ] Implementar cache offline com AsyncStorage
- [ ] Implementar tela de favoritos
- [ ] Suporte a tema escuro e claro com `useColorScheme`
- [ ] Splash screen personalizada e ícone do app
- [ ] Deploy (APK/AAB) para instalação offline

---

## 📸 Capturas de tela *(adicione quando quiser)*

| Home | Detalhes | Favoritos |
|------|----------|-----------|
| ![](./assets/home.png) | ![](./assets/details.png) | ![](./assets/favorites.png) |

---

## 🤝 Licença

Projeto desenvolvido para fins de avaliação técnica.

---

## 👨‍💻 Autor

Desenvolvido por **[Nathanael de Souza Leite]**  
[LinkedIn](https://linkedin.com/in/nathanaelleite) • [GitHub](https://github.com/dahnassy)
