import { Controller, useForm } from 'react-hook-form';
import { Button, Form, Input } from 'tamagui';

type FormData = {
  name: string;
  description: string;
};

export function DeckForm() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { name: '', description: '' },
  });
  return (
    <Form onSubmit={handleSubmit((data) => console.log(data))}>
      {/* name */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value }, fieldState }) => (
          <Input size="$4" borderWidth={2} value={value} onChangeText={onChange} />
        )}
      />

      {/* name */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value }, fieldState }) => (
          <Input size="$4" borderWidth={2} value={value} onChangeText={onChange} />
        )}
      />
      <Form.Trigger asChild>
        <Button>Submit</Button>
      </Form.Trigger>
    </Form>
  );
}
