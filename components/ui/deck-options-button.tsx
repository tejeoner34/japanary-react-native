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
			<View position="absolute" bottom="$4" right="$4">
				<Button
					theme="accent"
					circular
					size="$5"
					icon={Plus}
					onPress={() => setOpen(true)}
				/>
			</View>

			<Sheet
				modal
				open={open}
				onOpenChange={setOpen}
				snapPointsMode="fit"
				dismissOnSnapToBottom
				zIndex={100_000}
			>
				<Sheet.Overlay
					bg="$shadow6"
					enterStyle={{ opacity: 0 }}
					exitStyle={{ opacity: 0 }}
				/>
				<Sheet.Handle />

				<Sheet.Frame
					padding="$4"
					borderTopLeftRadius="$6"
					borderTopRightRadius="$6"
				>
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
