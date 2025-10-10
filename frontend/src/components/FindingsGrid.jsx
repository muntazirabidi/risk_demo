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

const getRiskIcon = (riskLevel) => {
  if (riskLevel === 'Positive') {
    return (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    );
  }
  
  if (riskLevel === 'Critical' || riskLevel === 'High') {
    return (
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
  }
  
  return (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

export default function FindingsGrid({ findings }) {
  // Show top 5 findings
  const topFindings = findings.slice(0, 5);

  return (
    <div className="mb-10 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Key Findings</h3>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
          Top {topFindings.length}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topFindings.map((finding, index) => (
          <div
            key={index}
            className="card hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 hover:-translate-y-1 animate-fade-in group"
            style={{
              borderLeftColor:
                finding.riskLevel === 'Critical' ? '#dc2626' :
                finding.riskLevel === 'High' ? '#ea580c' :
                finding.riskLevel === 'Medium' ? '#eab308' :
                finding.riskLevel === 'Positive' ? '#22c55e' :
                '#3b82f6',
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {getRiskIcon(finding.riskLevel)}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2 text-base group-hover:text-blue-700 transition-colors">
                  {finding.title || finding.riskIndicator}
                </h4>
                <span className={getRiskBadgeClass(finding.riskLevel) + ' text-xs font-semibold'}>
                  {finding.riskLevel}
                </span>
              </div>
            </div>

            {finding.quantifiedImpact && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-3 border-blue-400 px-4 py-3 mb-4 rounded-md">
                <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {finding.quantifiedImpact}
                </p>
              </div>
            )}

            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {finding.description}
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {finding.category}
                </span>
              </div>

              {(finding.evidenceUrl || finding.sourceUrl) && finding.evidenceUrl !== 'Multiple sources' && (
                <a
                  href={finding.evidenceUrl || finding.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="line-clamp-1">{finding.evidenceTitle || 'View source'}</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
