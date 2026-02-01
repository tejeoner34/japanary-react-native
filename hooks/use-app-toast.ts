import { useToastController } from '@tamagui/toast';

export function useAppToast() {
  const toast = useToastController();

  return {
    success: (title: string, message?: string) =>
      toast.show(title, {
        message,
        customData: { preset: 'success' },
        preset: 'success',
      }),

    error: (title: string, message?: string) =>
      toast.show(title, {
        message,
        customData: { preset: 'error' },
        preset: 'error',
      }),

    info: (title: string, message?: string) =>
      toast.show(title, {
        message,
        customData: { preset: 'info' },
        preset: 'info',
      }),
  };
}
