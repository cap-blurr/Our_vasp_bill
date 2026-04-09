export const COLORS = {
  bg: '#FFFFFF',
  surface: '#F8FAFC',
  surfaceHover: '#F1F5F9',
  border: '#E2E8F0',
  borderLight: '#CBD5E1',
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textDim: '#CBD5E1',
  heading: '#0F172A',
  accent: '#6366F1',
  accentBg: '#EEF2FF',
  accentBorder: '#C7D2FE',
  green: '#059669',
  greenBg: '#ECFDF5',
  red: '#DC2626',
  redBg: '#FEF2F2',
  yellow: '#D97706',
  yellowBg: '#FFFBEB',
  blue: '#2563EB',
  blueBg: '#EFF6FF',
};

export const FONT = "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif";

// Treasury submission emails — where users send their formatted DOCX submissions
export const TREASURY_EMAIL = 'pstnt@treasury.go.ke';
export const TREASURY_CC    = 'vasps@treasury.go.ke';

// Severity config — used on cards and filter badges
export const SEVERITY = {
  red: {
    color: '#DC2626',
    bg: '#FEF2F2',
    border: '#FECACA',
    label: 'Needs Redesign',
    dot: '#DC2626',
  },
  yellow: {
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
    label: 'Needs Adjustment',
    dot: '#D97706',
  },
  green: {
    color: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    label: 'Can Enhance',
    dot: '#059669',
  },
  // Kept as fallback — not used in filters
  blue: {
    color: '#2563EB',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    label: 'Standard',
    dot: '#2563EB',
  },
};
