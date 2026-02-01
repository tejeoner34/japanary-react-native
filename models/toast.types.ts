// toast.types.ts
import '@tamagui/toast';

declare module '@tamagui/toast' {
  interface CustomData {
    preset: 'success' | 'error' | 'info';
  }
}
