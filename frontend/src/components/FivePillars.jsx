/**
 * 5 Pillars of Intelligence Component
 * Matches the visual from the pitch deck
 */

const PILLARS = [
  {
    id: 'financial',
    name: 'Financial Health',
    description: 'Cash flow analysis, Altman Z-scores, bankruptcy prediction, and liquidity ratios',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accentColor: 'bg-blue-600',
    iconBgColor: 'bg-blue-50',
    iconTextColor: 'text-blue-600',
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Security posture assessment, breach history, and SOC2/ISO27001 certification verification',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    accentColor: 'bg-red-600',
    iconBgColor: 'bg-red-50',
    iconTextColor: 'text-red-600',
  },
  {
    id: 'esg',
    name: 'ESG & Sustainability',
    description: 'Environmental compliance, CSRD readiness, and supply chain sustainability tracking',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accentColor: 'bg-green-600',
    iconBgColor: 'bg-green-50',
    iconTextColor: 'text-green-600',
  },
  {
    id: 'humanRights',
    name: 'Human Rights',
    description: 'Modern slavery screening, labor practices, and ethical sourcing transparency',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accentColor: 'bg-purple-600',
    iconBgColor: 'bg-purple-50',
    iconTextColor: 'text-purple-600',
  },
  {
    id: 'antiBribery',
    name: 'Anti-Bribery',
    description: 'OFAC/UN/EU sanctions screening, FCPA compliance, and corruption risk indicators',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    accentColor: 'bg-amber-600',
    iconBgColor: 'bg-amber-50',
    iconTextColor: 'text-amber-600',
  },
];

// Map findings categories to pillars
const categoryToPillar = {
  'Financial Stability': 'financial',
  'Credit & Financial': 'financial',
  'Payment Risk': 'financial',
  'Operational Reliability': 'cybersecurity',
  'Operations': 'cybersecurity',
  'Supply Chain': 'esg',
  'Business Continuity': 'esg',
  'Legal & Compliance': 'antiBribery',
  'Market Position': 'financial',
  'Strategic': 'humanRights',
};

function getPillarCoverage(findings, pillarId) {
  if (!findings || findings.length === 0) return { covered: false, riskLevel: null, count: 0 };

  const pillarFindings = findings.filter(f => categoryToPillar[f.category] === pillarId);
  if (pillarFindings.length === 0) return { covered: false, riskLevel: null, count: 0 };

  // Determine overall risk level for pillar
  const hasPositive = pillarFindings.some(f => f.riskLevel === 'Positive' || f.riskLevel === 'Low');
  const hasCritical = pillarFindings.some(f => f.riskLevel === 'Critical');
  const hasHigh = pillarFindings.some(f => f.riskLevel === 'High');
  const hasMedium = pillarFindings.some(f => f.riskLevel === 'Medium');

  let riskLevel = 'Low';
  if (hasCritical) riskLevel = 'Critical';
  else if (hasHigh) riskLevel = 'High';
  else if (hasMedium) riskLevel = 'Medium';
  else if (hasPositive) riskLevel = 'Low';

  return { covered: true, riskLevel, count: pillarFindings.length };
}

function getRiskBadgeStyle(riskLevel) {
  switch (riskLevel) {
    case 'Critical':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'High':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Low':
    default:
      return 'bg-green-100 text-green-800 border-green-300';
  }
}

export default function FivePillars({ findings }) {
  return (
    <div className="mb-10 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg mb-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm font-bold">The 5 Pillars of Intelligence</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We assess all five dimensions procurement teams require. Every report covers every pillar.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {PILLARS.map((pillar, index) => {
          const coverage = getPillarCoverage(findings, pillar.id);

          return (
            <div
              key={pillar.id}
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animationFillMode: 'forwards'
              }}
              className="relative bg-white rounded-lg p-5 border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200 animate-fade-in"
            >
              {/* Left accent bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${pillar.accentColor} rounded-l-lg`}></div>

              {/* Icon */}
              <div className={`inline-flex p-2.5 rounded ${pillar.iconBgColor} ${pillar.iconTextColor} mb-3`}>
                {pillar.icon}
              </div>

              {/* Title */}
              <h3 className="font-bold text-slate-900 mb-2">
                {pillar.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {pillar.description}
              </p>

              {/* Coverage Status */}
              <div className="relative mt-auto">
                {coverage.covered ? (
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getRiskBadgeStyle(coverage.riskLevel)}`}>
                      {coverage.riskLevel}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {coverage.count} finding{coverage.count !== 1 ? 's' : ''}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                    <span className="text-xs text-gray-400">Available in full report</span>
                  </div>
                )}
              </div>

              {/* Checkmark for covered pillars */}
              {coverage.covered && (
                <div className="absolute top-4 right-4">
                  <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-700">Quick Due Diligence</span> covers key pillars in under 60 seconds.
          <span className="text-blue-600 font-medium"> Full reports</span> include comprehensive analysis across all five pillars.
        </p>
      </div>
    </div>
  );
}
