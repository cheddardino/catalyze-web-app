export const COLORS = {
  // Brand colors - Supabase inspired
  primary: '#3ECF8E',
  primaryDark: '#2DA771',
  primaryLight: '#7DDDB4',
  brandAccent: '#F4FFFC',
  
  // Semantic colors
  success: '#3ECF8E',
  warning: '#F5B70F',
  error: '#F04438',
  info: '#6366F1',
  
  // Alert levels
  alertCritical: '#F04438',
  alertImportant: '#F5B70F',
  alertNormal: '#3ECF8E',
  
  // Grayscale - Dark theme optimized
  black: '#000000',
  white: '#FFFFFF',
  gray50: '#FAFAFA',
  gray100: '#F4F5F7',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  gray950: '#0A0A0A',
  
  // Dark theme backgrounds
  background: '#0F1419',
  backgroundSecondary: '#1A1F26',
  backgroundTertiary: '#232930',
  
  // Surface colors
  surface: '#1A1F26',
  surfaceHover: '#232930',
  cardBackground: '#1A1F26',
  
  // Borders
  border: '#2D3748',
  borderLight: '#374151',
  borderHover: '#4B5563',
  
  // Text colors
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textTertiary: '#6B7280',
  textDisabled: '#4B5563',
  textInverse: '#111827',
  text: '#F9FAFB',
};

export const TYPOGRAPHY = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    mono: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", monospace',
  },
  h1: {
    fontSize: 36,
    fontWeight: '600',
    lineHeight: 44,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 30,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  body1: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const RADIUS = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  round: 9999,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const SIZES = {
  buttonHeight: 48,
  inputHeight: 48,
  tabBarHeight: 56,
  headerHeight: 56,
  iconSize: 24,
  iconSizeLarge: 32,
};

export const theme = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  radius: RADIUS,
  shadows: SHADOWS,
  sizes: SIZES,
} as const;