import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ExampleSentence } from '@/services/api';
import { StyleSheet, View } from 'react-native';

type Props = {
  example: ExampleSentence;
};

export default function ExampleItem({ example }: Props) {
  const subTextColor = useThemeColor({}, 'icon');

  return (
    <View style={styles.container}>
      <ThemedText style={styles.japanese}>
        {example.japanese.map((j) => j.word).join('')}
      </ThemedText>
      <ThemedText style={[styles.english, { color: subTextColor }]}>{example.english}</ThemedText>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    gap: 4,
  },

  japanese: {
    fontSize: 16,
    lineHeight: 24,
  },

  english: {
    fontSize: 14,
  },
});
