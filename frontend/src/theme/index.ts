export const COLORS = {
  primary: '#2196F3',
  primaryDark: '#1976D2',
  primaryLight: '#BBDEFB',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
  alertCritical: '#F44336',
  alertImportant: '#FFC107',
  alertNormal: '#4CAF50',
  black: '#000000',
  white: '#FFFFFF',
  gray900: '#212121',
  gray800: '#424242',
  gray700: '#616161',
  gray600: '#757575',
  gray500: '#9E9E9E',
  gray400: '#BDBDBD',
  gray300: '#E0E0E0',
  gray200: '#EEEEEE',
  gray100: '#F5F5F5',
  gray: '#9E9E9E',
  surface: '#FFFFFF',
  cardBackground: '#FFFFFF',
  border: '#E0E0E0',
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  textPrimary: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',
  textInverse: '#FFFFFF',
  text: '#212121',
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
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
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
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