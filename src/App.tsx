import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './navigation';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </ThemeProvider>
  );
}
