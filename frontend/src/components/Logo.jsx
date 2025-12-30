// Spectrum Logo - Intelligence Wave Design
// Represents: Risk spectrum, data analysis waves, comprehensive intelligence

export default function Logo({ variant = 'default', className = '' }) {
  const variants = {
    // Dark logo (for light backgrounds)
    default: {
      primary: '#0F172A',   // slate-900
      secondary: '#334155',  // slate-700
      accent: '#64748B'      // slate-500
    },
    // Light logo (for dark backgrounds)
    light: {
      primary: '#FFFFFF',
      secondary: '#E2E8F0',
      accent: '#CBD5E1'
    },
    // Single color
    mono: {
      primary: '#0F172A',
      secondary: '#0F172A',
      accent: '#0F172A'
    }
  };

  const colors = variants[variant] || variants.default;

  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wave/Spectrum Pattern representing risk analysis */}
      <path
        d="M8 20 Q12 12, 16 20 T24 20 Q28 12, 32 20"
        stroke={colors.primary}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6 25 Q10 18, 14 25 T22 25 Q26 18, 30 25"
        stroke={colors.secondary}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M10 30 Q13 24, 16 30 T22 30 Q25 24, 28 30"
        stroke={colors.accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* Circular container */}
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke={colors.primary}
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

// Alternative: Hexagon Network Design
export function LogoHexagon({ variant = 'default', className = '' }) {
  const variants = {
    default: {
      primary: '#0F172A',
      secondary: '#334155',
      accent: '#64748B'
    },
    light: {
      primary: '#FFFFFF',
      secondary: '#E2E8F0',
      accent: '#CBD5E1'
    }
  };

  const colors = variants[variant] || variants.default;

  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central hexagon */}
      <path
        d="M20 8 L28 13 L28 23 L20 28 L12 23 L12 13 Z"
        stroke={colors.primary}
        strokeWidth="2"
        fill="none"
      />

      {/* Network nodes */}
      <circle cx="20" cy="8" r="2" fill={colors.primary} />
      <circle cx="28" cy="13" r="2" fill={colors.secondary} />
      <circle cx="28" cy="23" r="2" fill={colors.accent} />
      <circle cx="20" cy="28" r="2" fill={colors.secondary} />
      <circle cx="12" cy="23" r="2" fill={colors.accent} />
      <circle cx="12" cy="13" r="2" fill={colors.secondary} />

      {/* Center dot */}
      <circle cx="20" cy="18" r="3" fill={colors.primary} />

      {/* Connection lines */}
      <line x1="20" y1="8" x2="20" y2="18" stroke={colors.secondary} strokeWidth="1" opacity="0.5" />
      <line x1="28" y1="13" x2="20" y2="18" stroke={colors.secondary} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

// Alternative: Shield with Spectrum
export function LogoShield({ variant = 'default', className = '' }) {
  const variants = {
    default: {
      primary: '#0F172A',
      secondary: '#334155',
      accent: '#64748B'
    }
  };

  const colors = variants[variant] || variants.default;

  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield outline */}
      <path
        d="M20 4 L32 9 L32 20 Q32 28, 20 34 Q8 28, 8 20 L8 9 Z"
        stroke={colors.primary}
        strokeWidth="2"
        fill="none"
      />

      {/* Spectrum bars inside shield */}
      <rect x="14" y="14" width="2" height="8" fill={colors.primary} rx="1" />
      <rect x="18" y="12" width="2" height="12" fill={colors.secondary} rx="1" />
      <rect x="22" y="10" width="2" height="16" fill={colors.accent} rx="1" />
      <rect x="26" y="14" width="2" height="8" fill={colors.secondary} rx="1" />
    </svg>
  );
}

// Alternative: Prism/Diamond
export function LogoPrism({ variant = 'default', className = '' }) {
  const variants = {
    default: {
      primary: '#0F172A',
      secondary: '#334155',
      accent: '#64748B'
    }
  };

  const colors = variants[variant] || variants.default;

  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Diamond/Prism shape */}
      <path
        d="M20 6 L32 14 L26 28 L14 28 L8 14 Z"
        stroke={colors.primary}
        strokeWidth="2"
        fill="none"
      />

      {/* Internal facets */}
      <line x1="20" y1="6" x2="20" y2="28" stroke={colors.secondary} strokeWidth="1.5" />
      <line x1="8" y1="14" x2="32" y2="14" stroke={colors.secondary} strokeWidth="1.5" />
      <line x1="14" y1="28" x2="20" y2="6" stroke={colors.accent} strokeWidth="1" opacity="0.5" />
      <line x1="26" y1="28" x2="20" y2="6" stroke={colors.accent} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
