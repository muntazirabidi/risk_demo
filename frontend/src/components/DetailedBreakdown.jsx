import { useState } from 'react';

const getRiskBadgeClass = (riskLevel) => {
  const classes = {
    Critical: 'badge-critical',
    High: 'badge-high',
    Medium: 'badge-medium',
    Low: 'badge-low',
    Positive: 'badge-positive',
  };
  return classes[riskLevel] || 'badge-low';
};

const categories = [
  'Financial Stability',
  'Operational Reliability',
  'Supply Chain',
  'Legal & Compliance',
  'Market Position',
  'Strategic',
  'Credit & Financial',
  'Operations',
  'Payment Risk',
  'Business Continuity',
];

export default function DetailedBreakdown({ findings }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const groupedFindings = categories.reduce((acc, category) => {
    acc[category] = findings.filter((f) => f.category === category);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="mb-10 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Detailed Risk Breakdown</h3>
      </div>
      <div className="space-y-px">
        {categories.map((category) => {
          const categoryFindings = groupedFindings[category];
          if (!categoryFindings || categoryFindings.length === 0) return null;

          const isExpanded = expandedCategory === category;
          const criticalCount = categoryFindings.filter(f => f.riskLevel === 'Critical').length;
          const highCount = categoryFindings.filter(f => f.riskLevel === 'High').length;

          return (
            <div key={category} className="border border-slate-200 bg-white">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between text-left px-6 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{category}</h4>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                      {categoryFindings.length} finding{categoryFindings.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {criticalCount > 0 && (
                    <span className="badge-critical text-[10px]">{criticalCount} Critical</span>
                  )}
                  {highCount > 0 && (
                    <span className="badge-high text-[10px]">{highCount} High</span>
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-slate-200">
                  {categoryFindings.map((finding, index) => (
                    <div
                      key={index}
                      className="px-6 py-5 border-b border-slate-100 last:border-b-0 bg-slate-50 border-l-[3px]"
                      style={{
                        borderLeftColor:
                          finding.riskLevel === 'Critical' ? '#dc2626' :
                          finding.riskLevel === 'High' ? '#ea580c' :
                          finding.riskLevel === 'Medium' ? '#eab308' :
                          finding.riskLevel === 'Positive' ? '#22c55e' :
                          '#3b82f6'
                      }}
                    >
                      {/* Title and Risk Badge */}
                      <div className="flex items-start justify-between mb-3">
                        <h5 className="text-sm font-semibold text-slate-900 flex-1">
                          {finding.title || finding.riskIndicator}
                        </h5>
                        <span className={getRiskBadgeClass(finding.riskLevel)}>
                          {finding.riskLevel}
                        </span>
                      </div>

                      {/* Quantified Impact */}
                      {finding.quantifiedImpact && (
                        <div className="bg-white border border-slate-200 border-l-[2px] border-l-slate-400 px-4 py-2.5 mb-3">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Impact</p>
                              <p className="text-sm font-semibold text-slate-900">{finding.quantifiedImpact}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-sm text-slate-600 mb-3 leading-relaxed">{finding.description}</p>

                      {/* Procurement Implication */}
                      {finding.procurementImplication && (
                        <div className="bg-amber-50 border-l-[2px] border-amber-500 px-4 py-3 mt-3">
                          <p className="text-[10px] text-amber-800 font-medium uppercase tracking-wider mb-1">Procurement Implication</p>
                          <p className="text-sm text-amber-900">{finding.procurementImplication}</p>
                        </div>
                      )}

                      {/* Source URL */}
                      {(finding.evidenceUrl || finding.sourceUrl) && finding.evidenceUrl !== 'Multiple sources' && (
                        <div className="bg-blue-50 border-l-[2px] border-blue-500 px-4 py-3 mt-3">
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Source</p>
                          <a
                            href={finding.evidenceUrl || finding.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-700 hover:text-blue-900 font-medium hover:underline break-all"
                          >
                            {finding.evidenceTitle || finding.evidenceUrl || finding.sourceUrl}
                          </a>
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 mt-3">
                        {finding.financialImpact && (
                          <span className="bg-blue-50 text-blue-800 px-2 py-0.5 border border-blue-200 uppercase tracking-wider">
                            {finding.financialImpact}
                          </span>
                        )}
                        {finding.assessmentDate && (
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{finding.assessmentDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
