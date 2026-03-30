/**
 * 5 Pillars of Intelligence Component
 */

const PILLARS = [
  { id: 'financial', name: 'Financial Health' },
  { id: 'cybersecurity', name: 'Cybersecurity' },
  { id: 'esg', name: 'ESG & Sustainability' },
  { id: 'humanRights', name: 'Human Rights' },
  { id: 'antiBribery', name: 'Sanctions & Anti-Bribery' },
];

const categoryToPillar = {
  'Financial Stability': 'financial',
  'Financial Health': 'financial',
  'Credit & Financial': 'financial',
  'Payment Risk': 'financial',
  'Operational Reliability': 'cybersecurity',
  'Operations': 'cybersecurity',
  'Cybersecurity': 'cybersecurity',
  'Supply Chain': 'esg',
  'ESG & Sustainability': 'esg',
  'Business Continuity': 'esg',
  'Legal & Compliance': 'antiBribery',
  'Sanctions & Anti-Bribery': 'antiBribery',
  'Human Rights & Ethics': 'humanRights',
  'Market Position': 'financial',
  'Strategic': 'humanRights',
};

function getPillarCoverage(findings, pillarId) {
  if (!findings || findings.length === 0) return { covered: false, riskLevel: null, count: 0 };
  const pillarFindings = findings.filter(f => categoryToPillar[f.category] === pillarId);
  if (pillarFindings.length === 0) return { covered: false, riskLevel: null, count: 0 };

  const hasCritical = pillarFindings.some(f => f.riskLevel === 'Critical');
  const hasHigh = pillarFindings.some(f => f.riskLevel === 'High');
  const hasMedium = pillarFindings.some(f => f.riskLevel === 'Medium');

  let riskLevel = 'Low';
  if (hasCritical) riskLevel = 'Critical';
  else if (hasHigh) riskLevel = 'High';
  else if (hasMedium) riskLevel = 'Medium';

  return { covered: true, riskLevel, count: pillarFindings.length };
}

function getRiskStyle(riskLevel) {
  switch (riskLevel) {
    case 'Critical': return { border: 'border-l-red-600', text: 'text-red-700', bg: 'bg-red-50' };
    case 'High': return { border: 'border-l-orange-500', text: 'text-orange-700', bg: 'bg-orange-50' };
    case 'Medium': return { border: 'border-l-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' };
    case 'Low': default: return { border: 'border-l-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' };
  }
}

export default function FivePillars({ findings }) {
  return (
    <div className="mb-2">
      <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-4">Risk by Pillar</div>
      <div className="grid grid-cols-5 gap-3">
        {PILLARS.map((pillar) => {
          const coverage = getPillarCoverage(findings, pillar.id);
          const style = coverage.covered ? getRiskStyle(coverage.riskLevel) : { border: 'border-l-slate-200', text: 'text-slate-400', bg: '' };

          return (
            <div
              key={pillar.id}
              className={`border border-slate-200 border-l-[3px] ${style.border} p-4`}
            >
              <div className="text-sm font-semibold text-slate-900 mb-2">{pillar.name}</div>
              {coverage.covered ? (
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium uppercase tracking-wider ${style.text}`}>
                    {coverage.riskLevel}
                  </span>
                  <span className="text-xs text-slate-400">
                    {coverage.count} finding{coverage.count !== 1 ? 's' : ''}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-400">No findings</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
