import { ThemedText } from '@/components/themed-text';
import Badge from '@/components/ui/badge';
import { useThemeColor } from '@/hooks/use-theme-color';
import { SearchResult } from '@/services/api';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = {
  result: SearchResult;
  onSeeAlso: (word: string) => void;
};

export default function DictionaryEntry({ result, onSeeAlso }: Props) {
  const borderColor = useThemeColor({}, 'inputBorder');
  const linkColor = useThemeColor({}, 'tint');
  const subTextColor = useThemeColor({}, 'icon');

  return (
    <View style={[styles.container, { borderColor }]}>
      {/* Header */}
      <View style={styles.header}>
        {result.japaneseReadings.map((r, i) => (
          <View key={i}>
            <ThemedText style={styles.word}>{r.word ?? r.reading}</ThemedText>
            {r.word && (
              <ThemedText style={[styles.reading, { color: subTextColor }]}>{r.reading}</ThemedText>
            )}
          </View>
        ))}

        <View style={styles.badges}>
          {result.isCommon && <Badge variant="common">Common</Badge>}
          {result.jlptLevels.length > 0 && (
            <Badge variant="jlpt">JLPT {result.jlptLevels.join(', ')}</Badge>
          )}
        </View>
      </View>

      {/* Senses */}
      {result.senses.map((sense, index) => (
        <View key={index} style={styles.sense}>
          <ThemedText style={styles.definition}>{sense.englishDefinitions.join('; ')}</ThemedText>

          {sense.wordTypes.length > 0 && (
            <ThemedText style={[styles.meta, { color: subTextColor }]}>
              {sense.wordTypes.join(', ')}
            </ThemedText>
          )}

          {sense.seeAlso.map((word) => (
            <Pressable key={word} onPress={() => onSeeAlso(word)}>
              <ThemedText style={[styles.seeAlso, { color: linkColor }]}>→ {word}</ThemedText>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },

  header: {
    gap: 4,
  },

  word: {
    fontSize: 22,
    fontWeight: '600',
  },

  reading: {
    fontSize: 14,
  },

  badges: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },

  sense: {
    marginTop: 8,
    gap: 4,
  },

  definition: {
    fontSize: 15,
    lineHeight: 22,
  },

  meta: {
    fontSize: 12,
  },

  seeAlso: {
    fontSize: 13,
    marginTop: 2,
  },
});
