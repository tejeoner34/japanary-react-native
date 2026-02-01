import { createAnimations } from '@tamagui/animations-react-native';
import { defaultConfig } from '@tamagui/config/v5';
import { createTamagui } from 'tamagui';

export const animations = createAnimations({
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1,
    stiffness: 250,
  },
});

export const config = createTamagui({
  ...defaultConfig,
  animations,
  media: {
    ...defaultConfig.media,
    // add your own media queries here, if wanted
  },
});

type OurConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends OurConfig {}
}
