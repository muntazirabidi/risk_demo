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

const getRiskIcon = (riskLevel) => {
  const icons = {
    Critical: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    High: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Medium: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Low: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Positive: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  };
  return icons[riskLevel] || icons.Low;
};

const getRiskGradient = (riskLevel) => {
  const gradients = {
    Critical: 'from-red-500 to-red-600',
    High: 'from-orange-500 to-orange-600',
    Medium: 'from-yellow-500 to-yellow-600',
    Low: 'from-blue-500 to-blue-600',
    Positive: 'from-green-500 to-green-600',
  };
  return gradients[riskLevel] || gradients.Low;
};

export default function FindingsGrid({ findings }) {
  // Show top 5 findings
  const topFindings = findings.slice(0, 5);

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-bold text-slate-900">Key Findings</h3>
        <span className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-teal-500/25">
          Top {topFindings.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topFindings.map((finding, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden animate-fade-in"
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              animationFillMode: 'forwards'
            }}
          >
            {/* Colored top accent bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getRiskGradient(finding.riskLevel)}`}
            />

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`p-1 rounded bg-gradient-to-br ${getRiskGradient(finding.riskLevel)} text-white`}>
                    {getRiskIcon(finding.riskLevel)}
                  </div>
                  <h4 className="font-bold text-gray-900 text-base leading-tight">
                    {finding.title || finding.riskIndicator}
                  </h4>
                </div>
                <span className="text-xs text-gray-500 font-medium ml-7">
                  {finding.category}
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ${getRiskBadgeClass(finding.riskLevel)}`}>
                {finding.riskLevel}
              </span>
            </div>

            {/* Impact (if available) */}
            {finding.quantifiedImpact && (
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg px-3 py-2.5 mb-4 border border-gray-100">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-800">
                    {finding.quantifiedImpact}
                  </span>
                </div>
              </div>
            )}

            {/* Description - Full Risk Story */}
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {finding.description}
            </p>

            {/* Procurement Implication */}
            {finding.procurementImplication && (
              <div className="bg-amber-50 border-l-2 border-amber-400 rounded px-3 py-2 mb-3">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-amber-900 font-medium">
                    <strong>Impact:</strong> {finding.procurementImplication}
                  </span>
                </div>
              </div>
            )}

            {/* Date and Source Info */}
            <div className="flex items-center justify-between gap-3 mb-3 text-xs text-gray-500">
              {finding.assessmentDate && (
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{new Date(finding.assessmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              )}
              {finding.pillar && (
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                  {finding.pillar}
                </span>
              )}
            </div>

            {/* Source Link with Evidence Title */}
            {(finding.evidenceUrl || finding.sourceUrl) && finding.evidenceUrl !== 'Multiple sources' && (
              <div className="border-t border-gray-100 pt-3">
                {finding.evidenceTitle && (
                  <p className="text-xs text-gray-600 mb-1.5 line-clamp-1 font-medium">
                    {finding.evidenceTitle}
                  </p>
                )}
                <a
                  href={finding.evidenceUrl || finding.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View source
                </a>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
