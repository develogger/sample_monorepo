import type { Config } from 'tailwindcss';

import borderRadius from '../../libs/ui/src/designTokens/borderRadius';
import boxShadow from '../../libs/ui/src/designTokens/boxShadow';
import colors from '../../libs/ui/src/designTokens/colors';
import fontFamily from '../../libs/ui/src/designTokens/fontFamily';
import fontSize from '../../libs/ui/src/designTokens/fontSize';
import rotate from '../../libs/ui/src/designTokens/rotate';
import screens from '../../libs/ui/src/designTokens/screens';
import spacing from '../../libs/ui/src/designTokens/spacing';

export { colors };
// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default <Partial<Config>>(<unknown>{
  content: [`./src/**/*.{vue,js,ts,scss,tsx}`, `../../libs/ui/src/**/*.{vue,js,ts,scss,tsx}`],
  darkMode: ['class'],
  safelist: [
    'rounded-lg',
    'rounded-md',
    'rounded-xs',
    'rounded-sm',
    'rounded-circle',
    'rounded-xl',
    'rounded-none',
  ],
  theme: {
    ...borderRadius,
    ...boxShadow,
    ...colors,
    ...fontFamily,
    ...fontSize,
    ...rotate,
    ...screens,
    ...spacing,
    extend: {
      animation: {
        loading: 'loading 800ms infinite ease-in-out',
        reels: 'reels 2s ease infinite',
      },
      keyframes: {
        loading: {
          '0%, 100%': { height: '12px', width: '12px' },
          '50%': { height: '24px', width: '24px' },
        },
        reels: {
          '0%': { background: '#9dadff', left: '98%', right: 0 },
          '25%': { background: 'rgba(10, 51, 255, 1)', left: 0, right: ' 50%' },
          '50%': { background: '#9dadff', left: 0, right: '98%' },
          '75%': { background: 'rgba(10, 51, 255, 1)', left: '50%', right: 0 },
          '100%': { background: '#9dadff', left: '98%', right: 0 },
        },
      },
    },
  },
});
