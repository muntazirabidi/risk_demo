const getRiskBadgeClass = (riskLevel) => {
  const classes = {
    Critical: 'bg-red-100 text-red-800 border border-red-200',
    High: 'bg-orange-100 text-orange-800 border border-orange-200',
    Medium: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    Low: 'bg-blue-100 text-blue-800 border border-blue-200',
    Positive: 'bg-green-100 text-green-800 border border-green-200',
  };
  return classes[riskLevel] || classes.Low;
};

const getRiskAccentColor = (riskLevel) => {
  const colors = {
    Critical: '#dc2626',
    High: '#ea580c', 
    Medium: '#eab308',
    Low: '#3b82f6',
    Positive: '#22c55e',
  };
  return colors[riskLevel] || colors.Low;
};

export default function FindingsGrid({ findings }) {
  // Show top 5 findings
  const topFindings = findings.slice(0, 5);

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Key Findings</h3>
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          Top {topFindings.length}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topFindings.map((finding, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
            style={{ 
              borderTopColor: getRiskAccentColor(finding.riskLevel),
              borderTopWidth: '4px',
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-3">
                <h4 className="font-semibold text-gray-900 text-base mb-1 leading-tight">
                  {finding.title || finding.riskIndicator}
                </h4>
                <span className="text-xs text-gray-500 font-medium">
                  {finding.category}
                </span>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${getRiskBadgeClass(finding.riskLevel)}`}>
                {finding.riskLevel}
              </span>
            </div>

            {/* Impact (if available) */}
            {finding.quantifiedImpact && (
              <div className="bg-gray-50 rounded-md px-3 py-2 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm font-medium text-gray-800">
                    {finding.quantifiedImpact}
                  </span>
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {finding.description}
            </p>

            {/* Source Link (if available) */}
            {(finding.evidenceUrl || finding.sourceUrl) && finding.evidenceUrl !== 'Multiple sources' && (
              <a
                href={finding.evidenceUrl || finding.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View source
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
