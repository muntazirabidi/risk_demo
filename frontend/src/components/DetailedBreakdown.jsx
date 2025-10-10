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
  'Credit & Financial',
  'Operations',
  'Market Position',
  'Payment Risk',
  'Business Continuity',
  'Strategic',
];

export default function DetailedBreakdown({ findings }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Group findings by category
  const groupedFindings = categories.reduce((acc, category) => {
    acc[category] = findings.filter((f) => f.category === category);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="mb-10 animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        Detailed Risk Breakdown
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </h3>
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryFindings = groupedFindings[category];
          if (!categoryFindings || categoryFindings.length === 0) return null;

          const isExpanded = expandedCategory === category;
          const criticalCount = categoryFindings.filter(f => f.riskLevel === 'Critical').length;
          const highCount = categoryFindings.filter(f => f.riskLevel === 'High').length;

          return (
            <div key={category} className="card hover:shadow-xl transition-all duration-300">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <svg
                      className={`w-5 h-5 text-blue-700 transition-transform duration-300 ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {category}
                    </h4>
                    <span className="text-xs text-gray-500 font-medium">
                      {categoryFindings.length} finding{categoryFindings.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {criticalCount > 0 && (
                    <span className="badge-critical text-xs font-bold shadow-sm">
                      {criticalCount} Critical
                    </span>
                  )}
                  {highCount > 0 && (
                    <span className="badge-high text-xs font-bold shadow-sm">
                      {highCount} High
                    </span>
                  )}
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isExpanded && (
                <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
                  {categoryFindings.map((finding, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-colors duration-150 border-l-4"
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
                        <h5 className="text-lg font-bold text-gray-900 flex-1">
                          {finding.title || finding.riskIndicator}
                        </h5>
                        <span className={getRiskBadgeClass(finding.riskLevel)}>
                          {finding.riskLevel}
                        </span>
                      </div>

                      {/* Quantified Impact Box */}
                      {finding.quantifiedImpact && (
                        <div className="bg-white border-l-3 border-gray-400 px-4 py-3 mb-3 rounded">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Impact</p>
                              <p className="text-sm font-bold text-gray-900">
                                {finding.quantifiedImpact}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Summary Description */}
                      <p className="text-gray-700 mb-4 leading-relaxed">{finding.description}</p>

                      {/* Source URL - Prominent Display */}
                      {(finding.evidenceUrl || finding.sourceUrl) && finding.evidenceUrl !== 'Multiple sources' && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                          <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <div className="flex-1">
                              <p className="text-xs text-gray-600 font-medium mb-1">Source</p>
                              <a
                                href={finding.evidenceUrl || finding.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-700 hover:text-blue-900 font-medium hover:underline break-all"
                              >
                                {finding.evidenceTitle || finding.evidenceUrl || finding.sourceUrl}
                              </a>
                            </div>
                            <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {/* Additional Metadata */}
                      <div className="flex flex-wrap items-center gap-3 text-sm mt-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {finding.financialImpact}
                        </span>

                        <div className="flex items-center gap-1 text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs">{finding.assessmentDate}</span>
                        </div>
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
