import { render } from '@testing-library/react-native';
import React from 'react';
import { TamaguiProvider } from 'tamagui';
import { config } from '@/tamagui.config';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<TamaguiProvider config={config} defaultTheme="light">
			{children}
		</TamaguiProvider>
	);
};

const customRender = (ui: React.ReactElement, options?: any) =>
	render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
