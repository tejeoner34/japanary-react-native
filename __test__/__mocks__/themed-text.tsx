import React from 'react';
import { Text } from 'react-native';

export function ThemedText({ children, style }: any) {
	return <Text style={style}>{children}</Text>;
}
