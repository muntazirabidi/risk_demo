// Spectrum Logo - Professional Isometric S Design
// Represents: Clarity, precision, value discovery, quality intelligence

export default function Logo({ variant = 'default', className = '' }) {
  return (
    <img
      src="/spectrum-logo.png"
      alt="Spectrum"
      className={className}
      style={{ height: '45px', width: 'auto', objectFit: 'contain' }}
    />
  );
}

// Alternative: Sight Line (Perspective/Vision)
export function LogoSightLine({ variant = 'default', className = '' }) {
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
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Three converging lines creating perspective */}
      <path d="M 20 80 L 50 20" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" />
      <path d="M 50 85 L 50 20" stroke={colors.secondary} strokeWidth="3" strokeLinecap="round" />
      <path d="M 80 80 L 50 20" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" />

      {/* Horizon point */}
      <circle cx="50" cy="20" r="4" fill={colors.primary} />

      {/* Base indicators */}
      <circle cx="20" cy="80" r="2.5" fill={colors.accent} />
      <circle cx="80" cy="80" r="2.5" fill={colors.accent} />
    </svg>
  );
}

// Alternative: Spectrum Arc (Modern gradient feel)
export function LogoSpectrumArc({ variant = 'default', className = '' }) {
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
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Forward-leaning arc bands */}
      <path
        d="M 30 70 Q 45 35, 70 20"
        stroke={colors.primary}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 27 75 Q 42 40, 67 25"
        stroke={colors.secondary}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M 24 80 Q 39 45, 64 30"
        stroke={colors.accent}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* Forward momentum indicator */}
      <circle cx="70" cy="20" r="3" fill={colors.primary} />
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
