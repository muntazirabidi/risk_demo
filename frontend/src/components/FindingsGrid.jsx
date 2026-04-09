const getRiskBadgeClass = (riskLevel) => {
  const classes = {
    Critical: 'bg-red-50 text-red-800 border border-red-200',
    High: 'bg-orange-50 text-orange-800 border border-orange-200',
    Medium: 'bg-amber-50 text-amber-800 border border-amber-200',
    Low: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    Positive: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  };
  return classes[riskLevel] || classes.Low;
};

const getRiskAccentColor = (riskLevel) => {
  const colors = {
    Critical: 'border-l-red-600',
    High: 'border-l-orange-500',
    Medium: 'border-l-amber-500',
    Low: 'border-l-emerald-500',
    Positive: 'border-l-emerald-500',
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

const getRiskIconColor = (riskLevel) => {
  const colors = {
    Critical: 'text-red-600',
    High: 'text-orange-600',
    Medium: 'text-amber-600',
    Low: 'text-emerald-600',
    Positive: 'text-emerald-600',
  };
  return colors[riskLevel] || colors.Low;
};

export default function FindingsGrid({ findings }) {
  const topFindings = findings.slice(0, 5);

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Key Findings</h3>
        <span className="bg-slate-900 text-white px-3 py-0.5 text-[10px] font-medium uppercase tracking-wider">
          Top {topFindings.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topFindings.map((finding, index) => (
          <div
            key={index}
            className={`bg-white border border-slate-200 border-l-[3px] ${getRiskAccentColor(finding.riskLevel)} p-5 hover:border-slate-300 transition-colors animate-fade-in`}
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              animationFillMode: 'forwards'
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 pr-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className={getRiskIconColor(finding.riskLevel)}>
                    {getRiskIcon(finding.riskLevel)}
                  </span>
                  <h4 className="font-semibold text-slate-900 text-sm leading-tight">
                    {finding.title || finding.riskIndicator}
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider ml-6">
                  {finding.category}
                </span>
              </div>
              <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider flex-shrink-0 ${getRiskBadgeClass(finding.riskLevel)}`}>
                {finding.riskLevel}
              </span>
            </div>

            {/* Impact */}
            {finding.quantifiedImpact && (
              <div className="bg-slate-50 border border-slate-100 px-3 py-2 mb-3">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-xs font-medium text-slate-700">
                    {finding.quantifiedImpact}
                  </span>
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              {finding.description}
            </p>

            {/* Procurement Implication */}
            {finding.procurementImplication && (
              <div className="bg-amber-50 border-l-[2px] border-amber-500 px-3 py-2 mb-3">
                <span className="text-[10px] text-amber-800 font-medium">
                  <strong>Impact:</strong> {finding.procurementImplication}
                </span>
              </div>
            )}

            {/* Date and Source */}
            <div className="flex items-center justify-between gap-3 mb-3 text-[10px] text-slate-400">
              {finding.assessmentDate && (
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(finding.assessmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              )}
              {finding.pillar && (
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 font-medium uppercase tracking-wider">
                  {finding.pillar}
                </span>
              )}
            </div>

            {/* Source Link */}
            {(finding.evidenceUrl || finding.sourceUrl) && finding.evidenceUrl !== 'Multiple sources' && (
              <div className="border-t border-slate-100 pt-3">
                {finding.evidenceTitle && (
                  <p className="text-[10px] text-slate-500 mb-1 line-clamp-1">
                    {finding.evidenceTitle}
                  </p>
                )}
                <a
                  href={finding.evidenceUrl || finding.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
