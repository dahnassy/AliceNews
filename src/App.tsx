import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from '../src/navigation';
import { ThemeProvider } from 'styled-components/native';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../src/theme';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
