import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '../themed-text';
import { ThemedTextInput } from '../themed-text-input';

type FormData = {
  query: string;
};

type WordSearchFormProps = {
  onSearch: (query: string) => void;
};

const WordSearchForm = ({ onSearch }: WordSearchFormProps) => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      query: '',
    },
  });

  const primaryColor = useThemeColor({}, 'tint');
  const cardBg = useThemeColor({}, 'background');

  const onSubmit = (data: FormData) => {
    console.log('フォーム送信データ：', data);
    onSearch(data.query);
    reset();
  };

  return (
    <View style={[styles.container, { backgroundColor: cardBg }]}>
      <Controller
        control={control}
        name="query"
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedTextInput
            style={styles.input}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="言葉を検索（例：辞書）"
            returnKeyType="search"
          />
        )}
      />

      <Pressable
        style={[styles.button, { backgroundColor: primaryColor }]}
        onPress={handleSubmit(onSubmit)}
      >
        <ThemedText type="defaultSemiBold" lightColor="#fff" darkColor="#000">
          検索
        </ThemedText>
      </Pressable>
    </View>
  );
};

export default WordSearchForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 16,
  },
  input: {
    flex: 1,
    height: 44,
  },
  button: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
