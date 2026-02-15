import { Plus } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { Button, Sheet, View, YStack } from 'tamagui';

type MenuOption = {
  label: string;
  isDestructive?: boolean;
  icon?: any;
  action: () => void;
};

type Props = {
  actions: MenuOption[];
};

export default function DeckOptionsButton({ actions }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <View position="absolute" b="$4" r="$4" zIndex={10}>
        <Button theme="accent" circular size="$5" icon={Plus} onPress={() => setOpen(true)} />
      </View>

      {/* Bottom sheet */}
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[35]} // ← RNではこれが安定
        dismissOnSnapToBottom
      >
        <Sheet.Overlay bg="$shadow6" />

        <Sheet.Frame p="$4" borderTopLeftRadius="$6" borderTopRightRadius="$6">
          <YStack gap="$3">
            {actions.map((item) => (
              <Button
                key={item.label}
                theme={item.isDestructive ? 'red' : undefined}
                icon={item.icon}
                onPress={() => {
                  setOpen(false);
                  item.action();
                }}
              >
                {item.label}
              </Button>
            ))}
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
