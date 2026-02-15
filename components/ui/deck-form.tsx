import { Check } from '@tamagui/lucide-icons';
import { Controller, useForm } from 'react-hook-form';
import { Button, Checkbox, Form, Input, Label, XStack, YStack } from 'tamagui';

type FormData = {
  name: string;
  description: string;
  isDefault: boolean;
};

export function DeckForm() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      isDefault: false,
    },
  });

  return (
    <Form onSubmit={handleSubmit((data) => console.log(data))}>
      <YStack gap="$4">
        {/* Name */}
        <YStack gap="$2">
          <Label htmlFor="name">Name</Label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input id="name" size="$4" value={field.value} onChangeText={field.onChange} />
            )}
          />
        </YStack>
        {/* Description */}
        <YStack gap="$2">
          <Label htmlFor="description">Description</Label>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Input id="description" size="$4" value={field.value} onChangeText={field.onChange} />
            )}
          />
        </YStack>
        {/* Checkbox */}
        <Controller
          control={control}
          name="isDefault"
          render={({ field }) => (
            <XStack items="center" gap="$2">
              <Checkbox
                id="isDefault"
                checked={field.value}
                onCheckedChange={(val) => field.onChange(!!val)}
                size="$4"
              >
                <Checkbox.Indicator>
                  <Check />
                </Checkbox.Indicator>
              </Checkbox>
              <Label htmlFor="isDefault">Set as default deck</Label>
            </XStack>
          )}
        />
        <Form.Trigger asChild>
          <Button>Submit</Button>
        </Form.Trigger>{' '}
      </YStack>
    </Form>
  );
}
