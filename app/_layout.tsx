import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }}    //  hides the "index" header
        />
        <Stack.Screen 
          name="details" 
          options={{ title: '' }}             // blank header (shows just back arrow)
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
