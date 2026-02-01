// AppToast.tsx
import { CheckCircle, Info, XCircle } from '@tamagui/lucide-icons';
import { Toast, useToastState } from '@tamagui/toast';
import { ColorTokens, XStack } from 'tamagui';

type ToastPreset = {
  bg: ColorTokens;
  color: ColorTokens;
  icon: React.ComponentType<any>;
};

const toastPresets: Record<'success' | 'error' | 'info', ToastPreset> = {
  success: {
    bg: '$green9',
    color: '$green1',
    icon: CheckCircle,
  },
  error: {
    bg: '$red9',
    color: '$red1',
    icon: XCircle,
  },
  info: {
    bg: '$blue9',
    color: '$blue1',
    icon: Info,
  },
};

export function AppToast() {
  const toast = useToastState();

  if (!toast || toast.isHandledNatively) return null;

  const presetKey = toast.customData?.preset ?? 'info';
  const preset = toastPresets[presetKey];
  const Icon = preset.icon;

  return (
    <Toast
      key={toast.id}
      duration={100000}
      bg={preset.bg}
      animation="100ms"
      enterStyle={{ x: -20, opacity: 0 }}
      exitStyle={{ x: -20, opacity: 0 }}
    >
      <XStack gap="$3">
        <Icon color={preset.color} />

        <Toast.Title color={preset.color}>{toast.title}</Toast.Title>

        {toast.message && (
          <Toast.Description color={preset.color}>{toast.message}</Toast.Description>
        )}
      </XStack>
    </Toast>
  );
}
